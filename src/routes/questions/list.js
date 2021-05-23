import React, { useState } from "react";
import graphql from "babel-plugin-relay/macro";
import { Link, useRouteMatch } from "react-router-dom";

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
    <ul>
      {data &&
        data.questions &&
        data.questions.map((question) => (
          <li>
            <Link to={`${url}/${question.id}`}>{question.title}</Link>
          </li>
        ))}
    </ul>
  );
}

export default List;
