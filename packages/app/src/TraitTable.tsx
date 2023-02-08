import { useEffect,useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { gql } from "urql";

import { useInviniteTraitsQuery } from "../codegen/subgraph";
import { GetBase64,GetTraitSVG } from "./GetTraitSVG";
import Panel from "./Panel"
import { Trait } from "./SharedInterfaces";

const ITEMS_PER_PAGE = 30;
gql`
  query InviniteTraits($skip: Int!, $name: String!, $contract: String!) {
        traits(
            first: 30
            skip: $skip
            where: {layer_: {name_starts_with: $name, name_ends_with: $name}, layer_starts_with: $contract}
            orderBy: id
            ) {
          data
          id
          name
          index
          mimeType
          layer {
            name
            index
            contract {
              id
            }
          }
        }
      }
`;

interface Selector{
    collection: number,
    layer: string,
  }

interface TraitTableProps {
    selectedValue: Selector;
    handlePiecesId: (trait:Trait) => void,
  }

const TraitTable = ({ selectedValue, handlePiecesId }: TraitTableProps) => {
    const [skip, setSkip] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [items, setItems] = useState<Trait[]>([]);

    const [result, executeQuery] = useInviniteTraitsQuery({
        variables: { skip, name: selectedValue.layer, contract: selectedValue.collection === 0 ? "": selectedValue.collection.toString() + "-"  },
        requestPolicy: 'network-only',
    });
    //console.log(result.data);

    useEffect(() => {
        if (result.data) {
            let traitResults = result.data?.traits.map((item, index) => {return {value: parseInt(item.id), label: `${item.id}`, tokenURI: "", layer: item.layer.name, data: GetBase64(item.data, parseInt(item.layer.contract.id), item.layer.name, item.index), contract: parseInt(item.layer.contract.id), mimeType: item.mimeType, layerNr: item.layer.index, traitNr: item.index, name: item.name}});
            traitResults = traitResults.map((item) => {return {...item, tokenURI: GetTraitSVG({traitData: item.data, mimeType: item.mimeType})}})
            setItems(prevItems => [...prevItems, ...traitResults]);
            setHasMore(result.data.traits.length === ITEMS_PER_PAGE);
        }
    }, [result.data]);
     
    useEffect(() => {
        setSkip(0);
        setItems([]);
        setHasMore(true);
  }, [selectedValue]);


    const fetchMoreData = () => {
        setSkip(prevOffset => prevOffset + ITEMS_PER_PAGE);
        executeQuery({ requestPolicy: 'network-only' });
    };

    return (
        <InfiniteScroll
            dataLength={items.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={
              <div className='pb-[50vh]'>
            <h4 className='pb-[50vh]'>Loading...</h4>
            </div>}
        >
            <div className="grid grid-cols-5">
            {items?.map( (panel, index) => (
                    <Panel
                    trait={panel}
                    key={index}
                    onClick={handlePiecesId}
                    />
                ))}
            </div>
        </InfiniteScroll>
    );
};

export default TraitTable;