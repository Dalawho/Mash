import { useState, useEffect, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Box } from "./Box2";
import { Locations } from "./Location";

interface Props {
  boxes: Locations[];
  setBoxes: (boxes: Locations[]) => void;
  handleLocationChange: (coord:string,e:number, index:number) => void;
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
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {boxes.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="border-4"
                      >
                        <Box
                        key={item.id}
                        id={item.id}
                        index={index}
                        location={item}
                        removeBox={removeBox}
                        handleLocationChange = {handleLocationChange}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          ) : null}
          </div>
        </DragDropContext>
    );
  }