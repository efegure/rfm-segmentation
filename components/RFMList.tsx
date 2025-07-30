import { RFMChartData } from "@/app/types/api";
import { useEffect, useMemo, useState } from "react";

export default function RFMList({
  data,
  frequencyFilter,
  monetaryFilter,
  recencyFilter,
  selectedIds,
  setSelectedIds,
}: {
  data: RFMChartData[];
  frequencyFilter: number;
  monetaryFilter: number;
  recencyFilter: number;
  selectedIds: Set<number>;
  setSelectedIds: (ids: Set<number>) => void;
}) {
  const filteredData = useMemo(
    () =>
      data
        .filter((item) => {
          return (
            (frequencyFilter < 0 || item.frequencyGroup === frequencyFilter) &&
            (monetaryFilter < 0 || item.monetaryGroup === monetaryFilter) &&
            (recencyFilter < 0 || item.recencyGroup === recencyFilter)
          );
        })
        .sort((a, b) => a.id - b.id)
        .map((item) => ({
          ...item,
        })),
    [data, frequencyFilter, monetaryFilter, recencyFilter]
  );

  const handleSelect = (itemId: number) => {
    const newSelectedIds = new Set(selectedIds);

    if (newSelectedIds.has(itemId)) {
      newSelectedIds.delete(itemId);
    } else {
      newSelectedIds.add(itemId);
    }

    setSelectedIds(newSelectedIds);
  };

  useEffect(() => {
    setSelectedIds(new Set());
  }, [filteredData]);

  return (
    <div className="flex flex-col gap-8 w-full ">
      <div className="flex flex-row items-center justify-between gap-8">
        <h2 className="text-2xl font-bold">RFM List</h2>
        <div className="flex flex-row gap-2">
          <span className="text-gray-600">[ {selectedIds.size} selected ]</span>
          <span className="text-gray-600">{filteredData.length} entries</span>
        </div>
      </div>
      <ul className="flex flex-col gap-[16px] w-full max-h-[400px] overflow-y-scroll">
        {filteredData.map((item) => (
          <li
            className="flex flex-row gap-[16px] p-4 even:bg-gray-100 w-full justify-between cursor-pointer"
            key={item.id}
            onClick={() => handleSelect(item.id)}
          >
            <div className="flex flex-row gap-[16px]">
              <input
                type="checkbox"
                checked={selectedIds.has(item.id)}
                readOnly
              />
              <p className="text-sm md:text-base font-bold">{item.id}</p>
            </div>

            <p className="text-sm md:text-base text-gray-600">
              Recency: {item.recency}
            </p>
            <p className="text-sm md:text-base text-gray-600">
              Monetary: {item.monetary}
            </p>
            <p className="text-sm md:text-base text-gray-600">
              Frequency: {item.frequency}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
