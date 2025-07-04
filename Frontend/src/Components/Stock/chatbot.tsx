import { useState } from "react";
import { MessageCircle } from "lucide-react";
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [send , setSend] = useState(true)

  const MAX_CALLS = 8;
const WINDOW_MS = 3 * 60 * 60 * 1000; // 3 hours in ms
const STORAGE_KEY = "chatbot_api_calls";

const handleSend = () => {
  if (!input.trim()) return;

  // Check API call limits
  let calls: number[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

  const now = Date.now();
  // Filter out calls older than 3 hours
  calls = calls.filter(ts => now - ts < WINDOW_MS);

  if (calls.length >= MAX_CALLS) {
    toast.error("Chat limit reached. Please try again after some time.");
    console.log("Chat limit reached. Please try again after some time.");
    return;
  }

  // Add current call timestamp
  calls.push(now);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(calls));

  setSend(false);
  setMessages(prev => [...prev, input]);

  const chatbot = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_CHATBOT_API}`, { query: input });
      const botReply = response.data.RESPONSE;
      setMessages(prev => [...prev, botReply]);
    } catch (err) {
      alert("QUERY REQUEST FAILED");
    } finally {
      setSend(true);
    }
  };

  chatbot();
  setInput("");
};



  return (
    <>
    <ToastContainer/>
      {/* Chat Popup Window */}
      {open && (
        <div className="fixed bottom-5 right-8 w-110 h-150 bg-white shadow-xl rounded-lg z-50 border border-gray-300">
          <div className="p-4 bg-purple-600 text-white rounded-t-lg font-semibold flex justify-between items-center">
            <span className="text-shadow-destructive font-serif">FinoAI</span>
            <button onClick={() => setOpen(false)} className="text-white  hover:text-red-500">✕</button>
          </div>
          <div className="flex flex-col h-115 overflow-y-auto p-3 space-y-2 text-sm">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`
                    max-w-[70%] 
                    p-2 rounded 
                    ${idx % 2 !== 0 ? "bg-gray-100 self-start text-black" : "bg-purple-500 self-end text-white"}
                  `}
                >
                  <p>{msg}</p>
                </div>
              ))}
            </div>

          <div className="p-3 border-t flex gap-2">
            <input
              type="text"
              placeholder="Ask something..."
              className="flex-1 h-10 border border-gray-300 rounded px-3 py-1 text-sm"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              className={`${send?"bg-green-500 ":"bg-green-700"} text-white px-3 rounded`} 
              disabled = {!send}
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Circular Chat Icon Button */}
      {!open && <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-8 bg-purple-600 w-26 h-26 rounded-full flex items-center justify-center text-white shadow-lg z-50 hover:bg-purple-700"
        aria-label="Chat with us"
      >
        <MessageCircle className="w-9 h-9" />
      </button>}
    </>
  );
}
export default ChatBot
