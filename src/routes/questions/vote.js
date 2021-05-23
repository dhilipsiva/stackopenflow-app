import React, { useState } from "react";
import graphql from "babel-plugin-relay/macro";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { useStoreActions } from "easy-peasy";
import { useMutation } from "react-relay";

import CHOICES from "CHOICES";

const mutation = graphql`
  mutation voteMutation($input: ApplyVoteInput!) {
    applyVote(input: $input) {
      vote {
        id
      }
    }
  }
`;

function Vote({ objectId, variant, contentType, kind, voteCount, buttonText }) {
  const [commit, isInFlight] = useMutation(mutation);
  const refresh = useStoreActions((actions) => actions.refresh);
  const [newCount, setNewCount] = useState(voteCount || 0);
  const incrementCount = () => setNewCount(newCount + 1);

  const applyVote = (data) => {
    const voteInput = {
      objectId: objectId,
      contentTypeId: parseInt(contentType.id),
      kind: kind,
    };
    commit({
      variables: { input: voteInput },
      onCompleted: (data, errors) => {
        if (errors === null) {
          alert("vote cast!");
          refresh();
          incrementCount();
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
    <Button variant={variant} onClick={applyVote} disabled={isInFlight}>
      <Badge variant="dark">{newCount}</Badge> {buttonText}
    </Button>
  );
}

function Upvote(props) {
  return (
    <Vote
      kind={CHOICES.VoteKind.UP}
      buttonText="Upvote"
      variant="outline-success"
      {...props}
    />
  );
}

function Downvote(props) {
  return (
    <Vote
      kind={CHOICES.VoteKind.DOWN}
      buttonText="Downvote"
      variant="outline-danger"
      {...props}
    />
  );
}

export { Upvote, Downvote };
