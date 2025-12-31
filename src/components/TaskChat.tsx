'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, type UIMessage } from 'ai';
import { useState, useEffect, useRef, useMemo } from 'react';
import { IconSend, IconRobot, IconUser } from '@tabler/icons-react';
import type { Task } from '@/types/roadmap';

interface TaskChatProps {
  task: Task;
}

// Helper to extract text content from UIMessage parts
function getMessageText(message: UIMessage): string {
  return message.parts
    .filter((part): part is { type: 'text'; text: string } => part.type === 'text')
    .map(part => part.text)
    .join('');
}

export default function TaskChat({ task }: TaskChatProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState('');

  const transport = useMemo(() => new DefaultChatTransport({
    api: '/api/chat',
    body: {
      taskContext: {
        title: task.title,
        guidance: task.guidance,
      },
    },
  }), [task.title, task.guidance]);

  const initialMessages: UIMessage[] = useMemo(() => [
    {
      id: 'welcome',
      role: 'assistant' as const,
      parts: [
        {
          type: 'text' as const,
          text: `I'm here to help you with: **${task.title}**\n\nAsk me anything about this task - I can help you:\n- Understand what to do\n- Write scripts, templates, or copy\n- Get feedback on your work\n- Overcome challenges\n\nWhat would you like help with?`,
        },
      ],
    },
  ], [task.title]);

  const { messages, sendMessage, status } = useChat({
    transport,
    messages: initialMessages,
  });

  const isLoading = status === 'streaming' || status === 'submitted';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    sendMessage({ text: inputValue.trim() });
    setInputValue('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="bg-gray-800/30 rounded-lg border border-gray-700 overflow-hidden" onClick={(e) => e.stopPropagation()}>
      {/* Chat Header */}
      <div className="px-4 py-2 bg-gray-800 border-b border-gray-700 flex items-center gap-2">
        <IconRobot className="w-4 h-4 text-[#41B3A3]" />
        <span className="text-sm font-medium text-gray-300">AI Coach</span>
      </div>

      {/* Messages */}
      <div className="h-64 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.role === 'assistant' && (
              <div className="w-6 h-6 rounded-full bg-[#41B3A3] flex items-center justify-center shrink-0">
                <IconRobot className="w-4 h-4 text-white" />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                message.role === 'user'
                  ? 'bg-[#41B3A3] text-white'
                  : 'bg-gray-700 text-gray-200'
              }`}
            >
              <div className="whitespace-pre-wrap prose prose-invert prose-sm max-w-none">
                {getMessageText(message)}
              </div>
            </div>
            {message.role === 'user' && (
              <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center shrink-0">
                <IconUser className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-[#41B3A3] flex items-center justify-center shrink-0">
              <IconRobot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-gray-700 rounded-lg px-3 py-2">
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
      <form onSubmit={handleSubmit} className="p-3 border-t border-gray-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask for help with this task..."
            className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-200
                       placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#41B3A3] focus:border-transparent"
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="px-3 py-2 bg-[#41B3A3] hover:bg-[#359E8F] disabled:bg-gray-700 disabled:cursor-not-allowed
                       rounded-lg transition-colors"
          >
            <IconSend className="w-4 h-4 text-white" />
          </button>
        </div>
      </form>
    </div>
  );
}
