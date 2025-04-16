import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LabelList, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Awaash', value: 24975 },
  { name: 'Harooreti', value: 24140 },
  { name: 'T/Oboo', value: 20792 },
  { name: "Ida'ama", value: 69907 },
];

const PopulationBarChart = () => (
  <div style={{ width: '50vw', minWidth: 200, maxWidth: '100%', height: 350, margin: '0 auto 16px auto' }}>
    <h2 style={{ textAlign: 'center', marginBottom: 12, fontSize: '1.1rem' }}>III. Jiraataa</h2>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 16, right: 30, left: 16, bottom: 30 }}
        barCategoryGap={30}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" tick={{ fontSize: 14, fontWeight: 'bold' }} />
        <YAxis tick={{ fontSize: 12 }} domain={[0, 80000]} allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="value" fill="#888888">
          <LabelList dataKey="value" position="top" style={{ fontWeight: 'bold', fill: '#000', fontSize: 16 }} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default PopulationBarChart;
