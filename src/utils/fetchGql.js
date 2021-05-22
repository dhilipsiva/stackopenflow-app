async function fetchGql(text, variables) {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: text,
      variables,
    }),
  });

  return await response.json();
}

export default fetchGql;
