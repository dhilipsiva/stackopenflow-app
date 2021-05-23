import { action, computed } from "easy-peasy";

const storeModel = {
  user: null,
  contentTypes: [],

  setUser: action((state, payload) => {
    state.user = payload;
  }),
  setContentTypes: action((state, payload) => {
    state.contentTypes = payload;
  }),

  getContentTypeById: computed(
    (state) => (id) =>
      state.contentTypes.find((contentType) => contentType.id === id.toString())
  ),
  getContentTypeByModel: computed(
    (state) => (appLabel, model) =>
      state.contentTypes.find(
        (contentType) =>
          contentType.appLabel === appLabel && contentType.model === model
      )
  ),
};

export default storeModel;
