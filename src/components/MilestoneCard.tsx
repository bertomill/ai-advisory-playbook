'use client';

import { useState } from 'react';
import type { Milestone, Task } from '@/types/roadmap';
import TaskItem from './TaskItem';

interface MilestoneCardProps {
  milestone: Milestone;
  completedTasks: Set<string>;
  taskNotes: Map<string, string>;
  onToggleTask: (milestoneId: string, taskId: string, completed: boolean) => void;
  onNotesChange: (milestoneId: string, taskId: string, notes: string) => void;
  onOpenChat: (task: Task) => void;
  disabled?: boolean;
}

export default function MilestoneCard({
  milestone,
  completedTasks,
  taskNotes,
  onToggleTask,
  onNotesChange,
  onOpenChat,
  disabled = false,
}: MilestoneCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const completedCount = milestone.tasks.filter((t) =>
    completedTasks.has(`${milestone.id}:${t.id}`)
  ).length;
  const totalCount = milestone.tasks.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  const isComplete = completedCount === totalCount;

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-800/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
              isComplete
                ? 'bg-[#788c5d] text-white'
                : 'bg-gray-700 text-gray-300'
            }`}
          >
            {isComplete ? '✓' : `${completedCount}`}
          </div>
          <div className="text-left">
            <h3 className="text-white font-medium">{milestone.title}</h3>
            <p className="text-sm text-gray-400">{milestone.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500">
            {completedCount}/{totalCount}
          </span>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform ${
              isExpanded ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      {isExpanded && (
        <>
          <div className="h-1 bg-gray-800">
            <div
              className="h-full bg-[#41B3A3] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="px-4 py-2 border-t border-gray-800">
            {milestone.tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                milestoneId={milestone.id}
                completed={completedTasks.has(`${milestone.id}:${task.id}`)}
                notes={taskNotes.get(`${milestone.id}:${task.id}`) || ''}
                onToggle={onToggleTask}
                onNotesChange={onNotesChange}
                onOpenChat={onOpenChat}
                disabled={disabled}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
