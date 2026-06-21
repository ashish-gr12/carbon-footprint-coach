import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function ResultsPieChart({ result }) {

  const data = [
    {
      name: "Transport",
      value: result.transport,
    },
    {
      name: "Flights",
      value: result.flights,
    },
    {
      name: "Electricity",
      value: result.electricity,
    },
    {
      name: "Fuel",
      value: result.fuel,
    },
    {
      name: "LPG",
      value: result.gas,
    },
    {
      name: "Food",
      value: result.food,
    },
    {
      name: "Shopping",
      value: result.shopping,
    },
    {
      name: "Electronics",
      value: result.electronics,
    },
    {
      name: "Travel",
      value: result.travelSpend,
    },
  ].filter(item => item.value > 0);

  const COLORS = [
    "#22c55e",
    "#3b82f6",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
    "#84cc16",
    "#ec4899",
    "#f97316",
  ];

  return (
    <div className="bg-slate-800 rounded-3xl p-6 shadow-xl">

      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        📊 Emission Distribution
      </h2>

      <ResponsiveContainer
        width="100%"
        height={400}
      >
        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={140}
            label
          >

            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={
                  COLORS[
                    index % COLORS.length
                  ]
                }
              />
            ))}

          </Pie>

          <Tooltip />
          <Legend />

        </PieChart>
      </ResponsiveContainer>

    </div>
  );
}

export default ResultsPieChart;