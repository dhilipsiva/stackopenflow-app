import graphql from "babel-plugin-relay/macro";
import React from "react";
import { useHistory } from "react-router-dom";
import { useStoreActions } from "easy-peasy";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useMutation } from "react-relay";
import Form from "react-bootstrap/Form";
import { useForm, Controller } from "react-hook-form";

const mutation = graphql`
  mutation newQuestionModalMutation($input: CreateQuestionInput!) {
    createQuestion(input: $input) {
      question {
        id
      }
    }
  }
`;

const NewQuestionModal = ({ show, handleClose }) => {
  const [commit, isInFlight] = useMutation(mutation);
  const history = useHistory();
  const refresh = useStoreActions((actions) => actions.refresh);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    commit({
      variables: { input: data },
      onCompleted: (data, errors) => {
        if (errors === null) {
          refresh();
          history.push(`/questions/${data.createQuestion.question.id}`);
          handleClose();
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
        <Modal.Title>New Question</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Form.Group className={errors.title ? "error" : ""}>
            <Form.Label htmlFor="question-title" srOnly>
              Question Title
            </Form.Label>
            <Controller
              name="title"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Form.Control
                  type="text"
                  className="mb-2"
                  id="question-title"
                  placeholder="Question Title"
                  {...field}
                />
              )}
            />
            <p>{errors.title}</p>
          </Form.Group>{" "}
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
};

export default NewQuestionModal;
