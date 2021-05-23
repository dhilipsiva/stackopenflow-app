import React, { useState } from "react";
import graphql from "babel-plugin-relay/macro";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useMutation } from "react-relay";
import { useForm, Controller } from "react-hook-form";
import Form from "react-bootstrap/Form";
import { Upvote, Downvote } from "routes/questions/vote";

const { useLazyLoadQuery } = require("react-relay");
const MODAL_LIST = "list",
  MODAL_NEW = "new";

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

const mutation = graphql`
  mutation commentsNewMutation($input: CreateCommentInput!) {
    createComment(input: $input) {
      comment {
        id
      }
    }
  }
`;
function NewCommentModal({
  show,
  handleClose,
  objectId,
  contentType,
  setActiveModal,
}) {
  const [commit, isInFlight] = useMutation(mutation);
  const refresh = useStoreActions((actions) => actions.refresh);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const commentInput = {
      objectId: objectId,
      contentTypeId: parseInt(contentType.id),
      text: data.text,
    };
    commit({
      variables: { input: commentInput },
      onCompleted: (data, errors) => {
        if (errors === null) {
          refresh();
          setActiveModal(MODAL_LIST);
        } else {
          errors.map((error) => alert(error.message));
        }
      },
      onError: (errors) => {
        alert(errors);
      },
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>New Comment</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Form.Group className={errors.text ? "error" : ""}>
            <Form.Label htmlFor="question-text" srOnly>
              Question Text
            </Form.Label>
            <Controller
              name="text"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Form.Control
                  type="text"
                  as="textarea"
                  className="mb-2"
                  id="question-text"
                  placeholder="Question Text"
                  {...field}
                />
              )}
            />
            <p>{errors.text}</p>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setActiveModal(MODAL_LIST)}
          >
            Back
          </Button>{" "}
          <Button
            variant="secondary"
            onClick={handleClose}
            disabled={isInFlight}
          >
            Close
          </Button>
          <Button variant="primary" type="submit" disabled={isInFlight}>
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

function CommentsModal({
  show,
  handleClose,
  objectId,
  contentType,
  setActiveModal,
}) {
  const commentContentType = useStoreState((store) =>
    store.getContentTypeByModel("qna", "comment")
  );
  const refreshCounter = useStoreState((state) => state.refreshCounter);
  const data = useLazyLoadQuery(
    query,
    {
      refreshCounter,
      objectId,
      contentTypeId: parseInt(contentType.id),
    },
    { fetchPolicy: "network-only" }
  );
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
                  <Upvote
                    voteCount={comment.voteUp}
                    objectId={comment.id}
                    contentType={commentContentType}
                  />{" "}
                  <Downvote
                    voteCount={comment.voteDown}
                    objectId={comment.id}
                    contentType={commentContentType}
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => setActiveModal(MODAL_NEW)}>
          New Comment
        </Button>{" "}
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function Comments({ objectId, contentType }) {
  const [show, setShow] = useState(false);
  const [activeModal, setActiveModal] = useState(MODAL_LIST);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        Comments
      </Button>{" "}
      {show && activeModal === MODAL_LIST && (
        <CommentsModal
          show={show}
          handleClose={handleClose}
          objectId={objectId}
          contentType={contentType}
          setActiveModal={setActiveModal}
        />
      )}
      {show && activeModal === MODAL_NEW && (
        <NewCommentModal
          show={show}
          handleClose={handleClose}
          objectId={objectId}
          contentType={contentType}
          setActiveModal={setActiveModal}
        />
      )}
    </>
  );
}

export default Comments;
