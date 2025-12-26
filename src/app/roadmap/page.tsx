'use client';

import { useState, useEffect, useCallback } from 'react';
import { phases, getTotalTasks } from '@/lib/milestones';
import { getProgress, toggleTask, updateNotes, isSupabaseConfigured } from '@/lib/supabase';
import RoadmapProgress from '@/components/RoadmapProgress';
import MilestoneCard from '@/components/MilestoneCard';
import ChatDrawer from '@/components/ChatDrawer';
import type { Task } from '@/types/roadmap';

export default function RoadmapPage() {
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [taskNotes, setTaskNotes] = useState<Map<string, string>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [isConfigured, setIsConfigured] = useState(false);

  // Chat drawer state
  const [chatTask, setChatTask] = useState<Task | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const totalTasks = getTotalTasks();

  const openChat = useCallback((task: Task) => {
    setChatTask(task);
    setIsChatOpen(true);
  }, []);

  const closeChat = useCallback(() => {
    setIsChatOpen(false);
  }, []);

  useEffect(() => {
    const configured = isSupabaseConfigured();
    setIsConfigured(configured);

    if (configured) {
      getProgress().then((progress) => {
        const completed = new Set(
          progress
            .filter((p) => p.completed)
            .map((p) => `${p.milestone_id}:${p.task_id}`)
        );
        setCompletedTasks(completed);

        const notes = new Map(
          progress
            .filter((p) => p.notes)
            .map((p) => [`${p.milestone_id}:${p.task_id}`, p.notes || ''])
        );
        setTaskNotes(notes);

        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleToggleTask = useCallback(
    async (milestoneId: string, taskId: string, completed: boolean) => {
      const key = `${milestoneId}:${taskId}`;

      // Optimistic update
      setCompletedTasks((prev) => {
        const next = new Set(prev);
        if (completed) {
          next.add(key);
        } else {
          next.delete(key);
        }
        return next;
      });

      // Persist to Supabase
      if (isConfigured) {
        const success = await toggleTask(milestoneId, taskId, completed);
        if (!success) {
          // Revert on failure
          setCompletedTasks((prev) => {
            const next = new Set(prev);
            if (completed) {
              next.delete(key);
            } else {
              next.add(key);
            }
            return next;
          });
        }
      }
    },
    [isConfigured]
  );

  const handleNotesChange = useCallback(
    async (milestoneId: string, taskId: string, notes: string) => {
      const key = `${milestoneId}:${taskId}`;

      // Optimistic update
      setTaskNotes((prev) => {
        const next = new Map(prev);
        next.set(key, notes);
        return next;
      });

      // Persist to Supabase
      if (isConfigured) {
        await updateNotes(milestoneId, taskId, notes);
      }
    },
    [isConfigured]
  );

  if (isLoading) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-800 rounded w-1/3 mb-4" />
          <div className="h-32 bg-gray-800 rounded mb-8" />
          <div className="h-48 bg-gray-800 rounded" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Your $1M Roadmap
          </h1>
          <p className="text-gray-400">
            Track your progress building a million-dollar AI advisory business.
            Click any task to see detailed guidance and notes.
          </p>
        </div>

        {!isConfigured && (
          <div className="mb-6 p-4 bg-[#d97757]/10 border border-[#d97757]/30 rounded-lg">
            <p className="text-[#e8e6dc] text-sm">
              <strong>Note:</strong> Set up Supabase to save your progress and notes. Add{' '}
              <code className="bg-gray-800 px-1 rounded">NEXT_PUBLIC_SUPABASE_URL</code> and{' '}
              <code className="bg-gray-800 px-1 rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>{' '}
              to your <code className="bg-gray-800 px-1 rounded">.env.local</code> file.
            </p>
          </div>
        )}

        <div className="mb-8">
          <RoadmapProgress completed={completedTasks.size} total={totalTasks} />
        </div>

        <div className="space-y-8">
          {phases.map((phase) => (
            <div key={phase.number}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#41B3A3] flex items-center justify-center text-white font-bold">
                  {phase.number}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Phase {phase.number}: {phase.title}
                  </h2>
                  <p className="text-sm text-gray-400">{phase.timeframe}</p>
                </div>
              </div>

              <div className="space-y-4 ml-4 border-l-2 border-gray-800 pl-6">
                {phase.milestones.map((milestone) => (
                  <MilestoneCard
                    key={milestone.id}
                    milestone={milestone}
                    completedTasks={completedTasks}
                    taskNotes={taskNotes}
                    onToggleTask={handleToggleTask}
                    onNotesChange={handleNotesChange}
                    onOpenChat={openChat}
                    disabled={false}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Drawer */}
      <ChatDrawer
        task={chatTask}
        isOpen={isChatOpen}
        onClose={closeChat}
      />
    </>
  );
}
