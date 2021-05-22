async function fetchGql(query, variables) {
  const authToken = window.localStorage.getItem("token");
  let headers = { "Content-Type": "application/json" };
  if (authToken) {
    headers["Authorization"] = "JWT " + authToken;
  }
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/graphql`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ query, variables }),
  });

  return await response.json();
}

export default fetchGql;
