import { createClient } from '@supabase/supabase-js';
import type { TaskProgress } from '@/types/roadmap';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const isSupabaseConfigured = () => !!supabase;

const DEFAULT_USER_ID = 'default_user';

export async function getProgress(): Promise<TaskProgress[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', DEFAULT_USER_ID);

  if (error) {
    console.error('Error fetching progress:', error);
    return [];
  }

  return data || [];
}

export async function toggleTask(
  milestoneId: string,
  taskId: string,
  completed: boolean
): Promise<boolean> {
  if (!supabase) return false;

  const { error } = await supabase
    .from('user_progress')
    .upsert({
      user_id: DEFAULT_USER_ID,
      milestone_id: milestoneId,
      task_id: taskId,
      completed,
      completed_at: completed ? new Date().toISOString() : null,
    }, {
      onConflict: 'user_id,milestone_id,task_id'
    });

  if (error) {
    console.error('Error toggling task:', error);
    return false;
  }

  return true;
}

export async function updateNotes(
  milestoneId: string,
  taskId: string,
  notes: string
): Promise<boolean> {
  if (!supabase) return false;

  const { error } = await supabase
    .from('user_progress')
    .upsert({
      user_id: DEFAULT_USER_ID,
      milestone_id: milestoneId,
      task_id: taskId,
      notes,
      completed: false, // default, will be overwritten if exists
    }, {
      onConflict: 'user_id,milestone_id,task_id'
    });

  if (error) {
    console.error('Error updating notes:', error);
    return false;
  }

  return true;
}

export async function getCompletionStats(): Promise<{ completed: number; total: number }> {
  if (!supabase) return { completed: 0, total: 0 };

  const { data, error } = await supabase
    .from('user_progress')
    .select('completed')
    .eq('user_id', DEFAULT_USER_ID);

  if (error) {
    console.error('Error fetching stats:', error);
    return { completed: 0, total: 0 };
  }

  const completed = data?.filter(p => p.completed).length || 0;
  return { completed, total: data?.length || 0 };
}
