import { TooltipProps } from "recharts";
import { RFMChartData } from "@/app/types/api";
export default function CustomTooltip({
  active,
  payload,
}: TooltipProps<number, string> & {
  payload?: Array<{
    payload: RFMChartData;
  }>;
}) {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload;
    return (
      <div className="p-3 bg-white border border-gray-300 rounded-md shadow-lg">
        <p className="font-bold text-gray-800">ID: {dataPoint.id}</p>
        <p className="text-sm text-gray-600">Recency: {dataPoint.recency}</p>
        <p className="text-sm text-gray-600">Monetary: ${dataPoint.monetary}</p>
        <p className="text-sm text-gray-600">
          Frequency: {dataPoint.frequency}
        </p>
      </div>
    );
  }

  return null;
}
