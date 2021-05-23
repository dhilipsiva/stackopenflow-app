import React from "react";
import graphql from "babel-plugin-relay/macro";
import { Link, useRouteMatch } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { useStoreState } from "easy-peasy";

const { useLazyLoadQuery } = require("react-relay");

const query = graphql`
  query listQuestionsQuery {
    questions {
      id
      text
      title
      voteCount
      commentCount
      user {
        username
      }
    }
  }
`;

function List() {
  const refreshCounter = useStoreState((state) => state.refreshCounter);
  const data = useLazyLoadQuery(
    query,
    { refreshCounter },
    { fetchPolicy: "network-only" }
  );
  const { url } = useRouteMatch();
  return (
    <>
      <h3>Questions</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Votes</th>
            <th>Title</th>
            <th>User</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.questions &&
            data.questions.map((question) => (
              <tr key={question.id}>
                <td>{question.voteCount}</td>
                <td>
                  <Link to={`${url}/${question.id}`}>{question.title}</Link>
                </td>
                <td>{question.user.username}</td>
                <td>{question.commentCount}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
}

export default List;
