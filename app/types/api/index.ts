export type RFMData = {
  id: number;
  recency: number;
  frequency: number;
  monetary: number;
};

export type RFMChartData = RFMData & {
  monetaryGroup?: number;
  frequencyGroup?: number;
  cellColor?: string;
  recencyGroup?: number;
};

export type APIResponse = {
  status: number;
  data: RFMData[];
  message: string;
  success: boolean;
};
