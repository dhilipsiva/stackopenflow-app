/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type navigationQueryVariables = {};
export type navigationQueryResponse = {
  readonly me: {
    readonly id: string | null;
    readonly username: string | null;
  } | null;
};
export type navigationQuery = {
  readonly response: navigationQueryResponse;
  readonly variables: navigationQueryVariables;
};

/*
query navigationQuery {
  me {
    id
    username
  }
}
*/

const node: ConcreteRequest = (function () {
  var v0 = [
    {
      alias: null,
      args: null,
      concreteType: "UserType",
      kind: "LinkedField",
      name: "me",
      plural: false,
      selections: [
        {
          alias: null,
          args: null,
          kind: "ScalarField",
          name: "id",
          storageKey: null,
        },
        {
          alias: null,
          args: null,
          kind: "ScalarField",
          name: "username",
          storageKey: null,
        },
      ],
      storageKey: null,
    },
  ];
  return {
    fragment: {
      argumentDefinitions: [],
      kind: "Fragment",
      metadata: null,
      name: "navigationQuery",
      selections: v0 /*: any*/,
      type: "Query",
      abstractKey: null,
    },
    kind: "Request",
    operation: {
      argumentDefinitions: [],
      kind: "Operation",
      name: "navigationQuery",
      selections: v0 /*: any*/,
    },
    params: {
      cacheID: "f2a62232050e04f9e654829ab0c22938",
      id: null,
      metadata: {},
      name: "navigationQuery",
      operationKind: "query",
      text: "query navigationQuery {\n  me {\n    id\n    username\n  }\n}\n",
    },
  };
})();
(node as any).hash = "79ae43d57ff0c3182d8fcdee0cc04fb1";
export default node;
