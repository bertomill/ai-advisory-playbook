'use client';

import { useState, useEffect, useRef, FormEvent, ChangeEvent } from 'react';
import { IconSend, IconRobot, IconUser, IconX } from '@tabler/icons-react';
import ReactMarkdown from 'react-markdown';
import type { Task } from '@/types/roadmap';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface ChatDrawerProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatDrawer({ task, isOpen, onClose }: ChatDrawerProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Reset messages when task changes
  useEffect(() => {
    if (task) {
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content: `I'm here to help you with: **${task.title}**\n\nAsk me anything about this task - I can help you:\n- Understand what to do\n- Write scripts, templates, or copy\n- Get feedback on your work\n- Overcome challenges\n\nWhat would you like help with?`,
        },
      ]);
      setInputValue('');
    }
  }, [task]);

  // Focus input when drawer opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Enter without Shift (Shift+Enter for new line)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (inputValue.trim() && !isLoading) {
        handleSubmit(e as unknown as FormEvent);
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content,
          })),
          taskContext: task ? {
            title: task.title,
            guidance: task.guidance,
          } : null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Server error:', response.status, errorData);
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader');

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
      };
      setMessages(prev => [...prev, assistantMessage]);

      const decoder = new TextDecoder();
      let fullContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('0:')) {
            try {
              const text = JSON.parse(line.slice(2));
              fullContent += text;
              setMessages(prev =>
                prev.map(m =>
                  m.id === assistantMessage.id
                    ? { ...m, content: fullContent }
                    : m
                )
              );
            } catch {
              // Skip malformed chunks
            }
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Sorry, I encountered an error: ${errorMsg}`,
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className="fixed right-0 top-0 h-full w-full max-w-md bg-gray-900 border-l border-gray-800 z-50 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-4 py-3 bg-gray-800 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconRobot className="w-5 h-5 text-[#41B3A3]" />
            <span className="font-medium text-white">AI Coach</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-700 rounded transition-colors"
          >
            <IconX className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Task Context */}
        {task && (
          <div className="px-4 py-3 bg-gray-800/50 border-b border-gray-700">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Helping with</p>
            <p className="text-sm text-white font-medium line-clamp-2">{task.title}</p>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-[#41B3A3] flex items-center justify-center shrink-0">
                  <IconRobot className="w-5 h-5 text-white" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-lg px-4 py-2 ${
                  message.role === 'user'
                    ? 'bg-[#41B3A3] text-white'
                    : 'bg-gray-800 text-gray-200'
                }`}
              >
                <div className="text-sm leading-relaxed prose prose-invert prose-sm max-w-none prose-p:my-2 prose-ul:my-2 prose-li:my-0.5 prose-strong:text-white prose-headings:text-white">
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
              </div>
              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center shrink-0">
                  <IconUser className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
          ))}
          {isLoading && messages[messages.length - 1]?.role === 'user' && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-[#41B3A3] flex items-center justify-center shrink-0">
                <IconRobot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-gray-800 rounded-lg px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700 bg-gray-900">
          <div className="flex gap-2">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask for help with this task... (Shift+Enter for new line)"
              rows={1}
              className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-sm text-gray-200
                         placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#41B3A3] focus:border-transparent
                         resize-none min-h-[48px] max-h-[120px] overflow-y-auto"
              style={{ height: 'auto' }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = Math.min(target.scrollHeight, 120) + 'px';
              }}
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="px-4 py-3 bg-[#41B3A3] hover:bg-[#359E8F] disabled:bg-gray-700 disabled:cursor-not-allowed
                         rounded-lg transition-colors"
            >
              <IconSend className="w-5 h-5 text-white" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
