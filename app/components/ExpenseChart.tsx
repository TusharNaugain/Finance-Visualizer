'use client';

import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Transaction } from '@/app/types/finance';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
    return Object.entries(data).map(([month, amount]) => ({
      month,
      amount
    }));
  }, [transactions]);

  return (
    <Card className="bg-gradient-to-br from-indigo-900 to-purple-900 border-none">
      <CardHeader>
        <CardTitle className="text-white">Monthly Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <XAxis
                dataKey="month"
                stroke="#fff"
                tick={{ fill: '#fff' }}
              />
              <YAxis
                stroke="#fff"
                tick={{ fill: '#fff' }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  borderRadius: '8px'
                }}
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']}
              />
              <Bar
                dataKey="amount"
                fill="#6366f1"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}