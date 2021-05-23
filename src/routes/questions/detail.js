import React, { useState } from "react";
import graphql from "babel-plugin-relay/macro";
import { Link, useRouteMatch, useParams } from "react-router-dom";

const { useLazyLoadQuery } = require("react-relay");

const query = graphql`
  query detailQuestionQuery($id: ID!) {
    question(id: $id) {
      id
      text
      title
      voteCount
      commentCount
      answers {
        edges {
          node {
            id
            text
            voteCount
          }
        }
      }
    }
  }
`;
function Detail() {
  let { questionId } = useParams();
  const data = useLazyLoadQuery(query, { id: questionId });
  if (data && data.question) {
    return (
      <div>
        <p>{data.question.text}</p>
        <ul>
          {data.question.answers.edges.map((answerEdge) => (
            <div>
              <li>{answerEdge.node.text}</li>
            </div>
          ))}
        </ul>
      </div>
    );
  } else {
    return <p>Loading</p>;
  }
}

export default Detail;
