import { useState } from 'react';
import chatBotLogo from './assets/chat-bot-white.svg';
import ibmSecurityLogo from '/ibm-security-white.svg';
import chatBot from './components/Chatmodal'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={ibmSecurityLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>IBM Chatbot</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Chatbot Icon to start chatting!
      </p>

      <chatBot></chatBot>
    </>
  )
}

export default App
