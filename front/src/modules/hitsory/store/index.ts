import { create } from "zustand";

import type { IHistoryData } from "../types";

interface IState {
  historyData: IHistoryData[];
}

interface IAction {
  setUml: (newData: IState["historyData"]) => void;
}

export const useHistoryStore = create<IState & IAction>((set) => ({
  historyData: [],
  setUml: (newData) => set(() => ({ historyData: newData }))
}));
