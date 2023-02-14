import { gql } from "urql";
import { useNamesQuery } from "../codegen/subgraph";

gql`
    query Names($name: String!, $contract: String!) {
  traits(
    where: {layer_: {name_starts_with: $name, name_ends_with: $name}, layer_starts_with: $contract}
    orderBy: id
  ) {
    id
    name
    index
  }
}
    `;
interface Selector{
    collection: number,
    layer: string,
    name: string,
  } 
const GetNames = (selectedValues: Selector)  => {

  const [query] = useNamesQuery({
    variables: {name: selectedValues.layer, contract: selectedValues.collection === 0 ? "": selectedValues.collection.toString() + "-"}
  });
  console.log(query);
  const returnData = query.data?.traits.map((item, index) => { return {value: index, label: item.name} } ).sort( (a,b) => {    if (a.label < b.label) {
    return -1;
  }
  if (a.label > b.label) {
    return 1;
  }
  return 0;
}  );
    console.log(returnData);
  return returnData;
};

export default GetNames;