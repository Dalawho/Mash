import React, { useState, useCallback } from 'react'
import { Box } from './Box'

interface BoxData {
    id: number
    text: string
    index: number
  }
  
  interface Props {
    boxes: Array<{ id: number, text: string, index: number }>;
    setBoxes: React.Dispatch<React.SetStateAction<Array<{ id: string, text: string, index: number }>>>;
  }

export default function BoxContainer({boxes, setBoxes}: {boxes: BoxData[], setBoxes: (boxes: BoxData[]) => void}) {

//   const moveBox = useCallback((dragIndex: number, hoverIndex: number) => {
//     const newBoxes = [...boxes]
//     const [draggedBox] = newBoxes.splice(dragIndex, 1)
//     newBoxes.splice(hoverIndex, 0, draggedBox)
//     setBoxes(newBoxes)
//   }, [boxes])

const moveBox = (dragIndex: number, hoverIndex: number) => {
    if (!boxes.length || dragIndex < 0 || hoverIndex < 0 || dragIndex >= boxes.length || hoverIndex >= boxes.length) {
        return
      }
      const boxesClone = [...boxes];
      const [removed] = boxesClone.splice(dragIndex, 1);
      boxesClone.splice(hoverIndex, 0, removed);
      boxesClone.forEach((box, i) => {box.index = i});
      setBoxes(boxesClone);
  }

  const removeBox = useCallback((id: number) => {
    setBoxes(boxes.filter((box) => box.id !== id))
  }, [boxes])

  return (
    <div className="space-y-2 flex flex-col">
      {boxes.map((box, index) => (
        <Box
          key={box.id}
          id={box.id}
          index={index}
          text={box.text}
          moveBox={moveBox}
          removeBox={removeBox}
        />
      ))}
    </div>
  )
}