'use client';

import { useMemo } from 'react';
import { BoxGeometry, MeshStandardMaterial } from 'three';
import { Transaction } from '@/app/types/finance';
import { format } from 'date-fns';

interface ExpenseChartProps {
  transactions: Transaction[];
}

export function ExpenseChart({ transactions }: ExpenseChartProps) {
  const monthlyData = useMemo(() => {
    const data: { [key: string]: number } = {};
    transactions.forEach(transaction => {
      const month = format(new Date(transaction.date), 'MMM yyyy');
      data[month] = (data[month] || 0) + transaction.amount;
    });
    return Object.entries(data);
  }, [transactions]);

  const maxAmount = Math.max(...monthlyData.map(([_, amount]) => amount));
  const geometry = new BoxGeometry(1, 1, 1);
  const material = new MeshStandardMaterial({ color: 'royalblue' });

  return (
    <group position={[-monthlyData.length / 2, 0, 0]}>
      {monthlyData.map(([month, amount], index) => {
        const height = (amount / maxAmount) * 10;
        return (
          <mesh
            key={month}
            geometry={geometry}
            material={material}
            position={[index, height / 2, 0]}
            scale={[0.8, height, 0.8]}
          >
            <meshStandardMaterial color="royalblue" />
          </mesh>
        );
      })}
    </group>
  );
}