'use client';

interface RoadmapProgressProps {
  completed: number;
  total: number;
}

export default function RoadmapProgress({ completed, total }: RoadmapProgressProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Your Progress</h2>
          <p className="text-sm text-gray-400">
            {completed} of {total} tasks completed
          </p>
        </div>
        <div className="text-3xl font-bold text-[#41B3A3]">{percentage}%</div>
      </div>

      <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#41B3A3] to-[#5BC4B5] transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2">
        {[1, 2, 3, 4].map((phase) => (
          <div key={phase} className="text-center">
            <div
              className={`text-xs font-medium ${
                percentage >= phase * 25 ? 'text-[#41B3A3]' : 'text-gray-500'
              }`}
            >
              Phase {phase}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
