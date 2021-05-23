import React, { useState } from "react";
import graphql from "babel-plugin-relay/macro";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { useStoreState } from "easy-peasy";

const { useLazyLoadQuery } = require("react-relay");

const query = graphql`
  query commentsQuery($objectId: ID!, $contentTypeId: Int!) {
    comments(objectId: $objectId, contentTypeId: $contentTypeId) {
      id
      text
      voteUp
      voteDown
      voteCount
      user {
        username
      }
    }
  }
`;

function CommentsModal({ show, handleClose, objectId, contentType }) {
  const refreshCounter = useStoreState((state) => state.refreshCounter);
  const data = useLazyLoadQuery(query, {
    refreshCounter,
    objectId,
    contentTypeId: parseInt(contentType.id),
  });
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Comments</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {data?.comments?.length === 0 && <h1>no comments yet!</h1>}
        {data?.comments?.map((comment) => (
          <Row className="mt-3" key={comment.id}>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>
                    <Badge variant="dark">{comment.voteCount}</Badge> Commented
                    by {comment.user.username}
                  </Card.Title>
                  <Card.Text>{comment.text}</Card.Text>
                  <Button variant="outline-success">
                    <Badge variant="dark">{comment.voteUp}</Badge> Upvote
                  </Button>{" "}
                  <Button variant="outline-danger">
                    <Badge variant="dark">{comment.voteDown}</Badge> Down Vote
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary">
          <Badge variant="dark"></Badge> New Comment
        </Button>{" "}
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function Comments({ objectId, contentType }) {
  const commentContentType = useStoreState((store) =>
    store.getContentTypeByModel("qna", "comment")
  );

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        Comments
      </Button>{" "}
      {show && (
        <CommentsModal
          show={show}
          handleClose={handleClose}
          objectId={objectId}
          contentType={contentType}
        />
      )}
    </>
  );
}

export default Comments;
