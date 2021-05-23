import React, { useState } from "react";
import graphql from "babel-plugin-relay/macro";
import { Link, useRouteMatch } from "react-router-dom";
import Table from "react-bootstrap/Table";

const { useLazyLoadQuery } = require("react-relay");

const query = graphql`
  query listQuestionsQuery {
    questions {
      id
      text
      title
      voteCount
      commentCount
    }
  }
`;

function List() {
  const data = useLazyLoadQuery(query);
  const { url } = useRouteMatch();
  return (
    <>
      <h3>Questions</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Votes</th>
            <th>Title</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.questions &&
            data.questions.map((question) => (
              <tr>
                <td>{question.voteCount}</td>
                <td>
                  <Link to={`${url}/${question.id}`}>{question.title}</Link>
                </td>
                <td>{question.commentCount}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
}

export default List;
