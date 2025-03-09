import {
  ResponsiveContainer,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  ComposedChart,
} from "recharts";
import { chartsData } from "../data/ChartsData";

const ChartsComponent = () => {
  const transformedData = chartsData.map((item) => ({
    ...item,
    "GM %": item["GM %"] * 100,
  }));

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-full max-w-6xl bg-gradient-to-bl from-neutral-900 via-neutral-800 to-neutral-700">
        <h1 className="text-3xl font-bold text-white m-8 text-center">
          Gross Margin
        </h1>
        <ResponsiveContainer width="100%" height={500}>
          <ComposedChart
            data={transformedData}
            margin={{ top: 20, right: 50, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />

            <XAxis dataKey="Week" tick={{ fill: "#fff" }} />

            <YAxis
              yAxisId="left"
              tick={{ fill: "#fff" }}
              label={{
                value: "",
                angle: -90,
                position: "insideLeft",
                fill: "#fff",
              }}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />

            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fill: "#fff" }}
              label={{
                value: "",
                angle: 90,
                position: "insideRight",
                fill: "#fff",
              }}
              tickFormatter={(value) => `${value.toFixed(0)}%`}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0,0,0,0.75)",
                border: "none",
              }}
              labelStyle={{ color: "#fff" }}
              itemStyle={{ color: "#fff" }}
              formatter={(value: number, name: string) => {
                if (name === "GM %") {
                  return [`${value.toFixed(2)}%`, name];
                }
                return [`$${value.toLocaleString()}`, name];
              }}
            />

            <Legend wrapperStyle={{ color: "#fff" }} />

            <Bar
              yAxisId="left"
              dataKey="GM Dollars"
              fill="#3b82f6"
              name="GM Dollars"
            />

            <Line
              yAxisId="right"
              type="monotone"
              dataKey="GM %"
              stroke="#f97316"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              name="GM %"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartsComponent;
