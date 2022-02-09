from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
import firebase_admin
from firebase_admin import credentials, firestore

# Initialize FireStore
cred_obj = credentials.Certificate('./my-project.json')
default_app = firebase_admin.initialize_app(cred_obj)
db = firestore.client()

def get_data_from_firebase():
    doc_ref = db.collection(u'user').document(u'history')
    data = doc_ref.get()
    return data.to_dict()

def push_data_to_firebase(data):
    doc_ref = db.collection(u'user').document(u'history')
    doc_ref.update({
        u'convos': firestore.ArrayUnion(data)
    })


tokenizer = AutoTokenizer.from_pretrained("microsoft/DialoGPT-small")
model = AutoModelForCausalLM.from_pretrained("microsoft/DialoGPT-small")

def generate_conv(user_data):    
    data = get_data_from_firebase()
    bot_input_ids = None
    history = data['convos']
    for l in history[3:]:
        res = tokenizer.encode(l + tokenizer.eos_token, return_tensors='pt')
        bot_input_ids = torch.cat([bot_input_ids, res], dim=-1) if bot_input_ids != None else res

    # encode the new user input, add the eos_token and return a tensor in Pytorch
    new_user_input_ids = tokenizer.encode(user_data + tokenizer.eos_token, return_tensors='pt')

    # append the new user input tokens to the chat history
    bot_input_ids = torch.cat([bot_input_ids, new_user_input_ids], dim=-1)

    # generated a response while limiting the total chat history to 1000 tokens, 
    chat_history_ids = model.generate(bot_input_ids, max_length=1000, pad_token_id=tokenizer.eos_token_id)

    # pretty print last ouput tokens from bot
    response = tokenizer.decode(chat_history_ids[:, bot_input_ids.shape[-1]:][0], skip_special_tokens=True)

    new_data = [user_data, response]
    push_data_to_firebase(new_data)

    return response