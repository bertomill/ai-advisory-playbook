'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Task } from '@/types/roadmap';
import { IconChevronDown, IconMessageCircle } from '@tabler/icons-react';

interface TaskItemProps {
  task: Task;
  milestoneId: string;
  completed: boolean;
  notes: string;
  onToggle: (milestoneId: string, taskId: string, completed: boolean) => void;
  onNotesChange: (milestoneId: string, taskId: string, notes: string) => void;
  onOpenChat: (task: Task) => void;
  disabled?: boolean;
}

export default function TaskItem({
  task,
  milestoneId,
  completed,
  notes,
  onToggle,
  onNotesChange,
  onOpenChat,
  disabled = false,
}: TaskItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localNotes, setLocalNotes] = useState(notes);

  const handleNotesBlur = () => {
    if (localNotes !== notes) {
      onNotesChange(milestoneId, task.id, localNotes);
    }
  };

  return (
    <div className="border-b border-gray-800 last:border-b-0">
      {/* Task Header */}
      <div
        className="flex items-start gap-3 py-3 cursor-pointer hover:bg-gray-800/30 -mx-2 px-2 rounded-lg transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => {
            e.stopPropagation();
            onToggle(milestoneId, task.id, !completed);
          }}
          disabled={disabled}
          className="mt-1 h-4 w-4 rounded border-gray-600 bg-gray-800 text-[#41B3A3]
                     focus:ring-[#41B3A3] focus:ring-offset-gray-900 cursor-pointer
                     disabled:cursor-not-allowed disabled:opacity-50"
          onClick={(e) => e.stopPropagation()}
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span
              className={`text-sm ${
                completed ? 'text-gray-500 line-through' : 'text-gray-300'
              }`}
            >
              {task.title}
            </span>
            <IconChevronDown
              className={`w-4 h-4 text-gray-500 transition-transform ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          </div>
          {task.chapterSlug && (
            <Link
              href={`/chapter/${task.chapterSlug}`}
              className="text-xs text-[#41B3A3] hover:text-[#5BC4B5] transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              (see chapter)
            </Link>
          )}
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="pb-4 pl-7">
          {/* Guidance */}
          <div className="bg-gray-800/50 rounded-lg p-4 mb-3">
            <h4 className="text-xs font-semibold text-[#41B3A3] uppercase tracking-wide mb-2">
              How to do this
            </h4>
            <div className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
              {task.guidance}
            </div>
          </div>

          {/* AI Chat Button */}
          <button
            onClick={() => onOpenChat(task)}
            className="mb-3 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors bg-gray-800 text-gray-300 hover:bg-gray-700"
          >
            <IconMessageCircle className="w-4 h-4" />
            Ask AI Coach for Help
          </button>

          {/* Notes */}
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2 block">
              My Notes
            </label>
            <textarea
              value={localNotes}
              onChange={(e) => setLocalNotes(e.target.value)}
              onBlur={handleNotesBlur}
              placeholder="Record what you did, decisions made, links, etc..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-sm text-gray-300
                         placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#41B3A3]
                         focus:border-transparent resize-y min-h-[100px]"
              rows={4}
            />
            <p className="text-xs text-gray-500 mt-1">
              Notes auto-save when you click away
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
