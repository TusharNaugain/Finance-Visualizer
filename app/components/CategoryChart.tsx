'use client';

import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Transaction, DEFAULT_CATEGORIES } from '@/app/types/finance';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CategoryChartProps {
  transactions: Transaction[];
}

export function CategoryChart({ transactions }: CategoryChartProps) {
  const categoryData = useMemo(() => {
    const data: { [key: string]: number } = {};
    transactions.forEach(transaction => {
      const category = DEFAULT_CATEGORIES.find(c => c.id === transaction.category)?.name || 'Other';
      data[category] = (data[category] || 0) + transaction.amount;
    });
    return Object.entries(data).map(([name, value]) => ({
      name,
      value,
      color: DEFAULT_CATEGORIES.find(c => c.name === name)?.color || '#666'
    }));
  }, [transactions]);

  return (
    <Card className="bg-gradient-to-br from-pink-900 to-rose-900 border-none">
      <CardHeader>
        <CardTitle className="text-white">Spending by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                label={({ name, percent }) => 
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                labelLine={true}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']}
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  borderRadius: '8px'
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}