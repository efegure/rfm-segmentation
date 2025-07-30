import { faker } from "@faker-js/faker";
import { RFMData, RFMChartData } from "../types/api";

export const monetarySlices = [0.2, 0.4, 0.6, 0.8, 1].map(
  (item) => item * 10000
);
export const frequencySlices = [0.2, 0.4, 0.6, 0.8, 1].map(
  (item) => item * 100
);
export const recencySlices = [0.2, 0.4, 0.6, 0.8, 1].map((item) => item * 365);

export function normalizeData(data: RFMData[]): RFMChartData[] {
  return data.map((item: RFMData) => {
    const monetaryGroup = monetarySlices.findIndex(
      (slice) => item.monetary <= slice
    );
    const frequencyGroup = frequencySlices.findIndex(
      (slice) => item.frequency <= slice
    );
    const recencyGroup = recencySlices.findIndex(
      (slice) => item.recency <= slice
    );
    return {
      ...item,
      monetaryGroup,
      frequencyGroup,
      recencyGroup,
      cellColor: getGroupColors[monetaryGroup + frequencyGroup],
    };
  });
}

export const getGroupColors = Array.from({ length: 25 }, () =>
  faker.color.rgb()
);
