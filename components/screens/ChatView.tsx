"use client";

import { useState, useEffect, useRef } from "react";
import { INITIAL_MESSAGES, Message } from "@/lib/data";

export default function ChatView() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const now = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setMessages((m) => [
      ...m,
      { id: Date.now(), from: "You", text: input, time: now, role: "user" },
    ]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: Date.now() + 1,
          from: "Support",
          text: "Thank you for your message. Our distribution team will respond shortly.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          role: "support",
        },
      ]);
    }, 1200);
  };

  return (
    <div className="p-6 flex flex-col" style={{ height: "calc(100vh - 120px)" }}>
      <div
        className="rounded-xl flex flex-col overflow-hidden flex-1"
        style={{ border: "1px solid #1e293b", background: "#050b14" }}
      >
        {/* Header */}
        <div
          className="p-4 flex items-center gap-3"
          style={{ borderBottom: "1px solid #0f172a", background: "#0a0f1a" }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "#E6394622" }}
          >
            🎬
          </div>
          <div>
            <div className="text-sm font-medium">Nile Distribution Support</div>
            <div
              className="flex items-center gap-1 text-xs"
              style={{ color: "#22c55e" }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 pulse-dot" />
              Online
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className="max-w-xs">
                <div
                  className="rounded-xl px-4 py-2.5 text-sm"
                  style={{
                    background: msg.role === "user" ? "#E63946" : "#0f172a",
                    color: "white",
                    borderRadius:
                      msg.role === "user"
                        ? "18px 18px 4px 18px"
                        : "18px 18px 18px 4px",
                  }}
                >
                  {msg.text}
                </div>
                <div
                  className="text-xs mt-1 px-1"
                  style={{
                    color: "#334155",
                    textAlign: msg.role === "user" ? "right" : "left",
                  }}
                >
                  {msg.time}
                </div>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="p-4" style={{ borderTop: "1px solid #0f172a" }}>
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type a message..."
              className="flex-1 rounded-xl px-4 py-2.5 text-sm outline-none"
              style={{
                background: "#0f172a",
                border: "1px solid #1e293b",
                color: "white",
              }}
            />
            <button
              onClick={send}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-white hover:opacity-90 transition-opacity"
              style={{ background: "#E63946" }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
