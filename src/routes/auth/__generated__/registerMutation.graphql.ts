/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type RegisterInput = {
  password: string;
  username: string;
  clientMutationId?: string | null;
};
export type registerMutationVariables = {
  input: RegisterInput;
};
export type registerMutationResponse = {
  readonly register: {
    readonly user: {
      readonly id: string | null;
      readonly username: string | null;
    } | null;
  } | null;
};
export type registerMutation = {
  readonly response: registerMutationResponse;
  readonly variables: registerMutationVariables;
};

/*
mutation registerMutation(
  $input: RegisterInput!
) {
  register(input: $input) {
    user {
      id
      username
    }
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
        concreteType: "RegisterPayload",
        kind: "LinkedField",
        name: "register",
        plural: false,
        selections: [
          {
            alias: null,
            args: null,
            concreteType: "UserType",
            kind: "LinkedField",
            name: "user",
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
        ],
        storageKey: null,
      },
    ];
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Fragment",
      metadata: null,
      name: "registerMutation",
      selections: v1 /*: any*/,
      type: "Mutation",
      abstractKey: null,
    },
    kind: "Request",
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Operation",
      name: "registerMutation",
      selections: v1 /*: any*/,
    },
    params: {
      cacheID: "b81fcdee78234877598120adb109179d",
      id: null,
      metadata: {},
      name: "registerMutation",
      operationKind: "mutation",
      text: "mutation registerMutation(\n  $input: RegisterInput!\n) {\n  register(input: $input) {\n    user {\n      id\n      username\n    }\n  }\n}\n",
    },
  };
})();
(node as any).hash = "2d56218ca18892492dbaf3f4aa3d14b3";
export default node;
