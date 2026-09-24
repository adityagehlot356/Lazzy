import { useState } from 'react'
import { MessageSquare, FileText, Settings } from 'lucide-react'

function App() {
  const [activeTab, setActiveTab] = useState('chat')
  const [chatInput, setChatInput] = useState('')
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! How can I help you today?' }
  ])

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    const newMsg = { role: 'user', content: chatInput };
    setMessages(prev => [...prev, newMsg]);
    setChatInput('');

    try {
      const res = await fetch("http://localhost:8000/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newMsg.content })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Error connecting to AI." }]);
    }
  }

  return (
    <div className="w-96 h-[600px] flex flex-col bg-gray-50 text-gray-900 font-sans">
      <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <h1 className="text-lg font-bold text-blue-600">IntelliAsk AI</h1>
        <Settings className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        {activeTab === 'chat' && (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {messages.map((msg, idx) => (
                <div key={idx} className={`p-3 rounded-lg max-w-[80%] ${msg.role === 'user' ? 'bg-blue-600 text-white self-end rounded-tr-none ml-auto' : 'bg-blue-100 text-blue-900 self-start rounded-tl-none'}`}>
                  {msg.content}
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask something..." 
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button onClick={handleSendMessage} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Send
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'notes' && (
          <div className="h-full flex items-center justify-center text-gray-500">
            Notes will appear here.
          </div>
        )}
      </main>

      <footer className="flex justify-around p-3 bg-white border-t border-gray-200">
        <button 
          onClick={() => setActiveTab('chat')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'chat' ? 'text-blue-600' : 'text-gray-500'}`}
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-xs">Chat</span>
        </button>
        <button 
          onClick={() => setActiveTab('notes')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'notes' ? 'text-blue-600' : 'text-gray-500'}`}
        >
          <FileText className="w-5 h-5" />
          <span className="text-xs">Notes</span>
        </button>
      </footer>
    </div>
  )
}

export default App

