import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import ChatWindow from "@components/ChatWindow";

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState<
    { text: string; sender: "user" | "support" }[]
  >([
    {
      text: "Hi 👋 Welcome to Cinema Support. How can we help you?",
      sender: "support",
    },
  ]);

  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { text: input, sender: "user" }]);

    setInput("");
  };

  return (
    <>
      <AnimatePresence>
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-[99999]
            w-14 h-14 rounded-full
            bg-gradient-to-br from-purple-600 to-pink-600
            shadow-lg
            flex items-center justify-center text-white"
        >
          <ChatBubbleLeftRightIcon className="w-6 h-6" />
        </motion.button>
      </AnimatePresence>

      <ChatWindow
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        messages={messages}
        messagesEndRef={messagesEndRef}
        input={input}
        handleSend={handleSend}
        setInput={setInput}
      />
    </>
  );
};

export default ChatBox;
