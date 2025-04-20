'use client';

import { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  Treemap,
  Tooltip,
} from 'recharts';
import type { ReactNode } from 'react';

interface BranchData {
  name: string;
  size: number;
  color: string;
}

interface Props {
  children?: ReactNode;
}

export default function VisualizationPage() {
  const [data, setData] = useState<BranchData[]>([
    {
      name: 'main',
      size: 100,
      color: '#4CAF50',
    },
    {
      name: 'feature/visualization',
      size: 80,
      color: '#2196F3',
    },
  ]);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Git Branch Visualization</h1>
      <div className="w-full h-[500px] bg-white rounded-lg shadow-lg p-4">
        <ResponsiveContainer width="100%" height="100%">
          <Treemap
            data={data}
            dataKey="size"
            aspectRatio={4 / 3}
            stroke="#fff"
            fill="#8884d8"
          >
            <Tooltip />
          </Treemap>
        </ResponsiveContainer>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Current Branch:</h2>
        <div className="bg-blue-100 p-4 rounded-lg">
          <code>feature/visualization</code>
        </div>
      </div>
    </div>
  );
} 