import { action, Action } from "easy-peasy";

export interface ContentTypeModel {
  id: number;
  app_label: string;
  model: string;
}

export interface StoreModel {
  user: any;
  contentTypes: ContentTypeModel[];
  setUser: Action<StoreModel, any>;
}

const storeModel: StoreModel = {
  user: null,
  contentTypes: [],
  setUser: action((state, payload) => {
    state.user = payload;
  }),
};

export default storeModel;
