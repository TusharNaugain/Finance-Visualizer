'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { ExpenseChart } from './ExpenseChart';
import { Transaction } from '@/app/types/finance';

interface SceneProps {
  transactions: Transaction[];
}

export function Scene({ transactions }: SceneProps) {
  return (
    <div className="w-full h-[500px]">
      <Canvas camera={{ position: [0, 0, 20], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <ExpenseChart transactions={transactions} />
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
}