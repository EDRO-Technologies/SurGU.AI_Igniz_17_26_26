import { create } from "zustand";

interface IState {
  data: {
    summary: string;
    plantuml_code: string;
  };
}

interface IAction {
  setUml: (newData: IState["data"]) => void;
}

export const umlStore = create<IState & IAction>((set) => ({
  data: {
    summary: "",
    plantuml_code: ""
  },
  setUml: (newData) => set(() => ({ data: newData }))
}));
