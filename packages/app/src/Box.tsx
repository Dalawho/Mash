import React from 'react'
import { useDrag, useDrop } from 'react-dnd'

interface BoxProps {
  id: number
  index: number
  text: string
  moveBox: (dragIndex: number, hoverIndex: number) => void
  removeBox: (id: number) => void
}

export const Box: React.FC<BoxProps> = ({ id, index, text, moveBox, removeBox }) => {

    const ItemTypes = {
        BOX: 'box',
      }  
      const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.BOX,
        item: {type: 'box', id, index: index },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
      }))
  const [, drop] = useDrop({
    accept: ItemTypes.BOX,
    hover(item: {type:string, id:number, index:number} , monitor) {
        if (!ref.current || !monitor.getClientOffset()) {
            return
          }
          const dragIndex = item.index
          const hoverIndex = index
          if (dragIndex === hoverIndex) {
            return
          }
          const hoverBoundingRect = ref.current.getBoundingClientRect()
          const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
          const clientOffset = monitor.getClientOffset()
          if(!clientOffset){
            return
            }
          const hoverClientY = clientOffset.y - hoverBoundingRect.top
          if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return
          }
          if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return
          }
          moveBox(dragIndex, hoverIndex)
          item.index = hoverIndex
        },
  })
  const ref = React.useRef<HTMLDivElement>(null)
  drop(ref)

//   const onMouseDown = (event: React.MouseEvent) => {
//     event.preventDefault();
// };
  return (
    <div ref={ref} className={`box ${isDragging ? 'dragging ' : ' '} rounded-lg border-2 border-gray-800` }>
      <div ref={drag} className="box-content flex flex-row justify-content p-x-3 m-auto">
        <div className="box-text">{text}</div>
        <button onClick={() => removeBox(id)} className=" font-extrabold font-mono"> X</button>
      </div>
    </div>
  )
}