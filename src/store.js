import { action, computed } from "easy-peasy";

const storeModel = {
  user: null,
  contentTypes: [],
  // NOTE: in real world-aplications, one would simply use state and usePreloadedQuery
  refreshCounter: 0,

  setUser: action((state, payload) => {
    state.user = payload;
  }),
  setContentTypes: action((state, payload) => {
    state.contentTypes = payload;
  }),
  refresh: action((state) => {
    // NOTE: in real world-aplications, one would simply use state and usePreloadedQuery
    state.refreshCounter = state.refreshCounter + 1;
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
