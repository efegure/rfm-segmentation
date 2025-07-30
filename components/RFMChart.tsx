import { frequencySlices, monetarySlices } from "@/app/helpers";
import { RFMChartData } from "@/app/types/api";
import {
  ResponsiveContainer,
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Scatter,
  Cell,
  ReferenceArea,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import { useMemo } from "react";

export default function RFMChart({
  data,
  frequencyFilter,
  monetaryFilter,
  recencyFilter,
}: {
  data: RFMChartData[];
  frequencyFilter: number;
  monetaryFilter: number;
  recencyFilter: number;
}) {
  const highlightArea = useMemo(() => {
    const extendedFrequencySlices = [0, ...frequencySlices];
    const extendedMonetarySlices = [0, ...monetarySlices];
    const freqActive = frequencyFilter >= 0;
    const monActive = monetaryFilter >= 0;

    if (!freqActive && !monActive) {
      return null;
    }

    return {
      x1: freqActive ? extendedFrequencySlices[frequencyFilter] : 0,
      x2: freqActive
        ? extendedFrequencySlices[frequencyFilter + 1]
        : extendedFrequencySlices[extendedFrequencySlices.length - 1],

      y1: monActive ? extendedMonetarySlices[monetaryFilter] : 0,
      y2: monActive
        ? extendedMonetarySlices[monetaryFilter + 1]
        : extendedMonetarySlices[extendedMonetarySlices.length - 1],
    };
  }, [frequencyFilter, monetaryFilter]);
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid />
        <XAxis
          type="number"
          dataKey="frequency"
          name="frequency"
          domain={[0, 5]}
          ticks={frequencySlices}
          tickFormatter={(value, index) => (index + 1).toString()}
          label={{ value: "Frequency", position: "insideLeft", angle: 0 }}
          interval={0}
        />
        <YAxis
          interval={0}
          domain={[0.5, 5.5]}
          type="number"
          dataKey="monetary"
          name="monetary"
          ticks={monetarySlices}
          tickFormatter={(value, index) => (index + 1).toString()}
          label={{ value: "Monetary", position: "insideLeft", angle: -90 }}
        />
        <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          content={<CustomTooltip />}
        />
        {highlightArea && (
          <ReferenceArea
            x1={highlightArea.x1}
            x2={highlightArea.x2}
            y1={highlightArea.y1}
            y2={highlightArea.y2}
            stroke="rgba(40, 120, 255, 0.5)"
            strokeOpacity={0.8}
            fill="rgba(40, 120, 255, 0.2)"
            ifOverflow="visible"
          />
        )}

        <Scatter data={data}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.cellColor}
              fillOpacity={
                (frequencyFilter < 0 ||
                  entry.frequencyGroup === frequencyFilter) &&
                (monetaryFilter < 0 ||
                  entry.monetaryGroup === monetaryFilter) &&
                (recencyFilter < 0 || entry.recencyGroup === recencyFilter)
                  ? 1
                  : 0.2
              }
            />
          ))}
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
}
