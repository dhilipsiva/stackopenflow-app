import React, { useState } from "react";
import graphql from "babel-plugin-relay/macro";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { useStoreState } from "easy-peasy";
import Comments from "routes/questions/comments";
import NewAnswerModal from "components/new-answer-modal";

const { useLazyLoadQuery } = require("react-relay");

const query = graphql`
  query detailQuestionQuery($id: ID!) {
    question(id: $id) {
      id
      text
      title
      voteCount
      voteUp
      voteDown
      user {
        id
        username
      }
      answers {
        edges {
          node {
            id
            text
            voteCount
            voteUp
            voteDown
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;
function Detail() {
  const refreshCounter = useStoreState((state) => state.refreshCounter);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let { questionId } = useParams();
  const data = useLazyLoadQuery(
    query,
    { id: questionId, refreshCounter },
    { fetchPolicy: "network-only" }
  );
  const questionContentType = useStoreState((store) =>
    store.getContentTypeByModel("qna", "question")
  );
  const answerContentType = useStoreState((store) =>
    store.getContentTypeByModel("qna", "answer")
  );

  if (data && data.question) {
    return (
      <>
        <Row className="mt-4">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>
                  <Badge variant="dark">{data.question.voteCount}</Badge>{" "}
                  {data.question.title}
                </Card.Title>
                <Card.Text>{data.question.text}</Card.Text>
                <Button variant="primary" onClick={handleShow}>
                  New Answer
                </Button>{" "}
                <NewAnswerModal
                  show={show}
                  handleClose={handleClose}
                  questionId={questionId}
                />
                <Comments
                  objectId={data.question.id}
                  contentType={questionContentType}
                />
                <Button variant="outline-success">
                  <Badge variant="dark">{data.question.voteUp}</Badge> Upvote
                </Button>{" "}
                <Button variant="outline-danger">
                  <Badge variant="dark">{data.question.voteDown}</Badge> Down
                  Vote
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <h4>Answers ({data.question.answers.edges.length})</h4>
          </Col>
        </Row>
        {data.question.answers.edges.map((answerEdge) => (
          <Row className="mt-3" key={answerEdge.node.id}>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>
                    <Badge variant="dark">{answerEdge.node.voteCount}</Badge>{" "}
                    Answer by {answerEdge.node.user.username}
                  </Card.Title>
                  <Card.Text>{answerEdge.node.text}</Card.Text>
                  <Comments
                    objectId={answerEdge.node.id}
                    contentType={answerContentType}
                  />
                  <Button variant="outline-success">
                    <Badge variant="dark">{answerEdge.node.voteUp}</Badge>{" "}
                    Upvote
                  </Button>{" "}
                  <Button variant="outline-danger">
                    <Badge variant="dark">{answerEdge.node.voteDown}</Badge>{" "}
                    Down Vote
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ))}
      </>
    );
  } else {
    return <p>Loading</p>;
  }
}

export default Detail;
