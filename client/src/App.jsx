import { useState } from 'react'
import chatBotLogo from './assets/chat-bot-white.svg'
import ibmSecurityLogo from '/ibm-security-white.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev">
          <img src={ibmSecurityLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev">
          
        </a>
      </div>
      <h1>IBM Chatbot</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <p className="read-the-docs">
        Click on the Chatbot Icon in the bottom right to start chatting!
      </p>

      <button className='open-chatbot'><img src={chatBotLogo} className="logo react" alt="IBM Chatbot logo" /></button>
    </>
  )
}

export default App
