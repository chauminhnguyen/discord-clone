import * as React from 'react'
import './Sidebar.scss'

import {FaFreebsd, FaArchive, FaSpotify, FaBong} from "react-icons/fa";

export function Sidebar() {
  return (
    <div class="sidebar">
      <ul>
        <li><FaArchive /></li>
        <li><FaFreebsd /></li>
        <li><FaSpotify /></li>
        <li><FaBong /></li>
      </ul>
    </div>
  )
}