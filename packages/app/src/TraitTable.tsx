import { useEffect,useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { gql } from "urql";

import { useInviniteTraitsQuery } from "../codegen/subgraph";
import { GetTraitSVG, getBase64 } from "./GetTraitSVG";
import Panel from "./Panel"
import { Trait } from "./SharedInterfaces";

const ITEMS_PER_PAGE = 50;
gql`
  query InviniteTraits($skip: Int!, $name: String!, $contract: String!) {
        traits(
            first: 50
            skip: $skip
            where: {layer_: {name_contains: $name}, layer_starts_with: $contract}
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

    useEffect(() => {
        if (result.data) {
            const traitResults = result.data?.traits.map((item, index) => {return {value: parseInt(item.id), label: `${item.id}`, tokenURI: GetTraitSVG( {traitData: item.data, mimeType: item.mimeType, contract: parseInt(item.layer.contract.id)}), layer: item.layer.name, data: getBase64(item.data, parseInt(item.layer.contract.id)), contract: parseInt(item.layer.contract.id), mimeType: item.mimeType, layerNr: item.layer.index, traitNr: item.index, name: item.name}});
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

    const filteredTraits = items?.filter(trait => {
        if(selectedValue.collection === 0 && selectedValue.layer === "") { return items; }
        if(selectedValue.collection === 0) { return trait.layer === selectedValue.layer; }
        if(selectedValue.layer === "") { return trait.contract == selectedValue.collection}
        return trait.contract === selectedValue.collection && trait.layer === selectedValue.layer;
      });

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
            {filteredTraits?.map( (panel, index) => (
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