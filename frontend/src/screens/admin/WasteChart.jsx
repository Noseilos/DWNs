import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const WasteChart = () => {
  // Generate fake data
  const generateFakeData = () => {
    const data = [];
    const userNames = ["Bones", "Fish", "Meat", "Leftovers", "Rotten"];
    for (let i = 0; i < userNames.length; i++) {
      const userDetails = { name: userNames[i] };
      const total = Math.floor(Math.random() * 100); // Generate random total value
      data.push({ userDetails, total });
    }
    return data;
  };

  const barColors = ["#1f77b4", "#ff7f0e", "#2ca02c"];

  // Fetch fake data
  const wastes = generateFakeData();

  return (
    <div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={wastes}>
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis dataKey="userDetails.name" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Bar dataKey="total">
            {wastes.map((item, index) => (
              <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WasteChart;
