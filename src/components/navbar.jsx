import React from 'react'
import './navbar.css'

const navbar = () => {
  return (
    <>
      <div className="navbar">
        <div><h2>TaskTrack</h2></div>
        <ul>
          <li>Home</li>
          <li>Your Tasks</li>
        </ul>
      </div>
    </>
  )
}

export default navbar
