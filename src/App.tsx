import * as React from 'react'
import './App.scss'
import {useState, useEffect} from 'react'
import {addInputs} from './ChatBot.js'

import {FaFreebsd, FaArchive, FaSpotify, FaBong} from "react-icons/fa";

export default function App() {
  const [text, setText] = useState('');
  const [history, setHistory] = useState([]);
  
  const submitHandle = () => {
    const res = addInputs(text);
    setHistory(prev => [...prev, text]);
    setHistory(prev => [...prev, res]);
    setText('');
  };
  
  return (
    <main>
      <div class="sidebar">
        <ul>
          <li><FaArchive /></li>
          <li><FaFreebsd /></li>
          <li><FaSpotify /></li>
          <li><FaBong /></li>
        </ul>
      </div>
      <div class="main">
        <div class="channel">
          <nav>
            Test Server
          </nav>
          <ul>
            <li>kkk</li>
            <li>kkk</li>
            <li>kkk</li>
            <li>kkk</li>
            <li>Voice Channels</li>
          </ul>
        </div>

        <div class="main-channel">
          <nav>
            Test Server-chatroom
          </nav>
          <div class="flex-main-channel">          
            <div class="main-box">
              <div class="msg-box">
                <ul>
                  {history.map((t, index) => (
                    <li key={index}>{t}</li>
                  ))}
                </ul>
              </div>
              <div class="msg-inp">
                <input 
                  class="msg" 
                  type="text" 
                  value={text}
                  onChange={e => setText(e.target.value)}
                />
                <button 
                  class="msg" 
                  onClick={submitHandle}>
                  Send
                </button>
              </div>
            </div>
  
            <div class="acc">
              <ul>
                <li>kkk</li>
                <li>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</li>
                <li>kkk</li>
                <li>kkk</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}