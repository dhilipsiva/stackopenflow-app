export interface ContentTypeModel {
  id: number;
  app_label: string;
  model: string;
}

export interface StoreModel {
  contentTypes: ContentTypeModel[];
}

const storeModel: StoreModel = {
  contentTypes: [],
};

export default storeModel;
