import { action, Action, computed, Computed } from "easy-peasy";

export interface ContentTypeModel {
  id: number;
  appLabel: string;
  model: string;
}

export interface StoreModel {
  user: any;
  contentTypes: ContentTypeModel[];
  setUser: Action<StoreModel, any>;
  setContentTypes: Action<StoreModel, ContentTypeModel[]>;
  //getContentTypeById: Computed<StoreModel, ContentTypeModel>;
  //getContentTypeByModel: Computed<StoreModel, ContentTypeModel>;
}

const storeModel: StoreModel = {
  user: null,
  contentTypes: [],
  setUser: action((state, payload) => {
    state.user = payload;
  }),
  setContentTypes: action((state, payload) => {
    state.contentTypes = payload;
  }),
  /*
  getContentTypeById: computed(
    (state) => (id) =>
      state.contentTypes.find((contentType) => contentType.id === id)
  ),
  getContentTypeByModel: computed(
    (state) => (appLabel, model) =>
      state.contentTypes.find(
        (contentType) =>
          contentType.appLabel === appLabel && contentType.model === model
      )
  ),*/
};

export default storeModel;
