import { useCallback,useEffect, useState } from 'react';
import { DragDropContext, Draggable,Droppable } from 'react-beautiful-dnd';

import { LocationForm, Locations, ScaleForm } from "./Location";

import { Contract } from "./SharedInterfaces";

interface Props {
  boxes: Locations[];
  setBoxes: (boxes: Locations[]) => void;
  handleLocationChange: (coord:string,e:string, index:number) => void;
}
  
  export const BoxContainer = ({boxes, setBoxes, handleLocationChange}: Props) =>  {
  
    const onDragEnd = (result: any) => {
      if (!result.destination) {
        return;
      }
      const boxesClone = [...boxes];
      const [removed] = boxesClone.splice(result.source.index, 1);
      boxesClone.splice(result.destination.index, 0, removed);
      setBoxes(boxesClone);
    };

    const removeBox = useCallback((id: number) => {
      setBoxes(boxes.filter((box) => box.id !== id))
    }, [boxes])

    const [isBrowser, setIsBrowser] = useState(false);
    useEffect(() => {
        if (typeof window !== "undefined") {
          setIsBrowser(true);
        }
      }, []);
  
    return (
        <DragDropContext onDragEnd={onDragEnd}>
          <div>
            {isBrowser ? (
                <div className="overflow-x-auto">
                <table className="table table-compact text-center text-xl min-w-[546px]">
                  <thead >
                    <tr >
                        <th className='text-xl'>Nr.</th> 
                        <th className='text-xl'>Name</th> 
                        <th className='text-xl'>Scale</th> 
                        <th className='text-xl'>X-Y</th> 
                        <th className='text-xl'>Remove</th>
                    </tr>
                </thead> 
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <tbody
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {boxes.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                    {(provided, snapshot) => (
                      <tr
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className=""
                      >
                        <td className='text-xl'>{index+1}</td>
                        <td className='text-xl'>{item.name}</td>
                        <td className='text-xl'><ScaleForm loc={item} id={item.id} onChange={(coord:string,e:string) => handleLocationChange(coord, e, item.id)} /></td>
                        <td className='text-xl'><LocationForm loc={item} id={item.id} onChange={(coord:string,e:string) => handleLocationChange(coord, e, item.id)} /></td>
                        <td>
                            <button onClick={() => removeBox(item.id)} className="font-extrabold font-mono justify-self-end mx-2"> X</button>
                        </td>
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                </tbody>
                )}
          </Droppable>
          </table>
          </div>
          ) : null}
          </div>
        </DragDropContext>
    );
  }