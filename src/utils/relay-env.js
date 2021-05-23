import { Environment, Network, RecordSource, Store } from "relay-runtime";
import fetchGql from "utils/fetchGql";
async function fetchRelay(params, variables) {
  console.log(`fetching ${params.name} with ${JSON.stringify(variables)}`);
  return fetchGql(params.text, variables);
}
export default new Environment({
  network: Network.create(fetchRelay),
  store: new Store(new RecordSource()),
});
