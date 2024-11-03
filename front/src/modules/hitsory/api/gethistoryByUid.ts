import { api } from "@shared/api/instance";

import type { IHistoryData } from "../types";

interface IGetHistoryByUidParams {
  uid: string;
}

export type THistoryByUidConfig = RequestConfig<IGetHistoryByUidParams>;

export const getHistoryByUid = ({ config, params }: THistoryByUidConfig) =>
  api.get<IHistoryData>(`/history/${params.uid}`, config);
