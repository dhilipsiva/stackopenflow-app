import graphql from "babel-plugin-relay/macro";
import React from "react";
import { useStoreActions } from "easy-peasy";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useMutation } from "react-relay";
import Form from "react-bootstrap/Form";
import { useForm, Controller } from "react-hook-form";

const mutation = graphql`
  mutation newAnswerModalMutation($input: CreateAnswerInput!) {
    createAnswer(input: $input) {
      answer {
        id
      }
    }
  }
`;

const NewAnswerModal = ({ show, handleClose, questionId }) => {
  const [commit, isInFlight] = useMutation(mutation);
  const refresh = useStoreActions((actions) => actions.refresh);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    data["questionId"] = questionId;
    commit({
      variables: { input: data },
      onCompleted: (data, errors) => {
        if (errors === null) {
          refresh();
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
        <Modal.Title>New Answer</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Form.Group className={errors.text ? "error" : ""}>
            <Form.Label htmlFor="answer-text" srOnly>
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
                  id="answer-text"
                  placeholder="Answer Text"
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

export default NewAnswerModal;
