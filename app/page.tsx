"use client";
import RFMChart from "@/components/RFMChart";
import { useEffect, useMemo, useState } from "react";
import { RFMData } from "@/app/types/api";
import { normalizeData } from "./helpers";
import RFMList from "@/components/RFMList";
import SelectFilter from "@/components/SelectFilter";

export default function Home() {
  const [apiData, setApiData] = useState<RFMData[]>([]);
  const [frequency, setFrequency] = useState(-1);
  const [monetary, setMonetary] = useState(-1);
  const [recency, setRecency] = useState(-1);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  // call our mock api
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/proxy/data");
      // mock api status handling
      if (response.status === 200) {
        const data = await response.json();
        setApiData(data.data);
      }
    };
    fetchData();
  }, []);

  const data = useMemo(() => {
    return normalizeData(apiData);
  }, [apiData]);

  const handleSendSelection = () => {
    fetch("/api/proxy/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ids: Array.from(selectedIds),
      }),
    });
  };

  return (
    <div className="font-sans flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full">
        <div className="flex flex-row flex-wrap items-center sm:gap-8 gap-4 w-full justify-between">
          <h1 className="text-2xl font-bold">RFM Chart</h1>
          <div className="flex flex-row flex-wrap items-center sm:gap-8 gap-4">
            <SelectFilter
              label="Frequency"
              value={frequency}
              onChange={setFrequency}
              options={[
                { value: -1, label: "All" },
                { value: 0, label: "Frequency 1" },
                { value: 1, label: "Frequency 2" },
                { value: 2, label: "Frequency 3" },
                { value: 3, label: "Frequency 4" },
                { value: 4, label: "Frequency 5" },
              ]}
            />
            <SelectFilter
              label="Monetary"
              value={monetary}
              onChange={setMonetary}
              options={[
                { value: -1, label: "All" },
                { value: 0, label: "Monetary 1" },
                { value: 1, label: "Monetary 2" },
                { value: 2, label: "Monetary 3" },
                { value: 3, label: "Monetary 4" },
                { value: 4, label: "Monetary 5" },
              ]}
            />
            <SelectFilter
              label="Recency"
              value={recency}
              onChange={setRecency}
              options={[
                { value: -1, label: "All" },
                { value: 0, label: "Recency 1" },
                { value: 1, label: "Recency 2" },
                { value: 2, label: "Recency 3" },
                { value: 3, label: "Recency 4" },
                { value: 4, label: "Recency 5" },
              ]}
            />
          </div>
        </div>
        <RFMChart
          data={data}
          frequencyFilter={frequency}
          monetaryFilter={monetary}
          recencyFilter={recency}
        />
        <RFMList
          data={data}
          frequencyFilter={frequency}
          monetaryFilter={monetary}
          recencyFilter={recency}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer mt-4 self-end"
          onClick={handleSendSelection}
          disabled={selectedIds.size === 0}
        >
          Send Selection
        </button>
      </main>
    </div>
  );
}
