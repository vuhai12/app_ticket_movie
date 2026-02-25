import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/solid";

type Message = {
  text: string;
  sender: "user" | "support";
};

type ChatWindowProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  messages: Message[];
  messagesEndRef: React.MutableRefObject<HTMLDivElement | null>;
  input: string;
  handleSend: () => void;
  setInput: (input: string) => void;
};

const ChatWindow: React.FC<ChatWindowProps> = ({
  isOpen,
  setIsOpen,
  messages,
  messagesEndRef,
  handleSend,
  setInput,
  input,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.2 }}
          className="
    fixed inset-0 z-[999999]
    w-full h-[100dvh]
    sm:inset-auto
    sm:bottom-6 sm:right-6
    sm:w-[360px]
    sm:max-h-[85vh]
    bg-[#140B1C]
    rounded-none sm:rounded-2xl
    border border-purple-500/20
    shadow-xl
    flex flex-col
    overflow-hidden
  "
        >
          {/* HEADER */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <span className="text-sm font-semibold">🎬 Cinema Support</span>

            <button onClick={() => setIsOpen(false)}>
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* MESSAGES */}
          <div className="relative flex-1 overflow-y-auto overflow-x-hidden custom-scroll scroll-smooth">
            {/* Fade top */}
            <div
              className="absolute top-0 left-0 right-0 h-6 
  bg-gradient-to-b from-[#140B1C] to-transparent 
  pointer-events-none z-10"
            />

            {/* Fade bottom */}
            <div
              className="absolute bottom-0 left-0 right-0 h-6 
  bg-gradient-to-t from-[#140B1C] to-transparent 
  pointer-events-none z-10 "
            />

            <div className="p-4 space-y-3">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: msg.sender === "user" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`
          text-sm px-4 py-2 rounded-2xl max-w-[75%] break-words 
          ${
            msg.sender === "user"
              ? "ml-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white"
              : "bg-gray-800 text-gray-200"
          }
        `}
                >
                  {msg.text}
                </motion.div>
              ))}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* INPUT */}
          <div className="flex items-center px-3 py-3 border-t border-white/10 bg-black/30">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="flex-1 bg-transparent px-3 py-2 text-sm text-white placeholder-gray-400 outline-none"
            />

            <button
              onClick={handleSend}
              className="ml-2 px-4 py-2 rounded-xl bg-purple-600 text-sm text-white"
            >
              Send
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatWindow;
