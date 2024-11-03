import { api } from "@shared/api/instance";

import type { IHistoryData } from "../types";

interface IGetHistoryResponse extends IBaseResponse {
  data: IHistoryData[];
}

export const getHistory = ({ config }: RequestConfig) =>
  api.get<IGetHistoryResponse>("/history", config);
