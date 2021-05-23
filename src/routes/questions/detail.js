import React, { useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  let { questionId } = useParams();
  return (
    <div>
      <p>Body: {questionId}</p>
    </div>
  );
}

export default Detail;
