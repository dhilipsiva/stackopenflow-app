/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type ObtainJSONWebTokenInput = {
  clientMutationId?: string | null;
  username: string;
  password: string;
};
export type loginMutationVariables = {
  input: ObtainJSONWebTokenInput;
};
export type loginMutationResponse = {
  readonly login: {
    readonly payload: unknown;
  } | null;
};
export type loginMutation = {
  readonly response: loginMutationResponse;
  readonly variables: loginMutationVariables;
};

/*
mutation loginMutation(
  $input: ObtainJSONWebTokenInput!
) {
  login(input: $input) {
    payload
  }
}
*/

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: "LocalArgument",
        name: "input",
      },
    ],
    v1 = [
      {
        alias: null,
        args: [
          {
            kind: "Variable",
            name: "input",
            variableName: "input",
          },
        ],
        concreteType: "ObtainJSONWebTokenPayload",
        kind: "LinkedField",
        name: "login",
        plural: false,
        selections: [
          {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "payload",
            storageKey: null,
          },
        ],
        storageKey: null,
      },
    ];
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Fragment",
      metadata: null,
      name: "loginMutation",
      selections: v1 /*: any*/,
      type: "Mutation",
      abstractKey: null,
    },
    kind: "Request",
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Operation",
      name: "loginMutation",
      selections: v1 /*: any*/,
    },
    params: {
      cacheID: "a238e249ff43c8525a68f6e9683b08c5",
      id: null,
      metadata: {},
      name: "loginMutation",
      operationKind: "mutation",
      text: "mutation loginMutation(\n  $input: ObtainJSONWebTokenInput!\n) {\n  login(input: $input) {\n    payload\n  }\n}\n",
    },
  };
})();
(node as any).hash = "3c974aace2554d06edf5d154d9106ebd";
export default node;
