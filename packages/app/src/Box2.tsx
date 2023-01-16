import React from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { LocationForm, Locations } from './Location'

interface BoxProps {
  id: number
  index: number
  location: Locations
  removeBox: (id: number) => void
  handleLocationChange: (coord:string,e:number, index:number) => void
}

export const Box: React.FC<BoxProps> = ({ id, index, location, removeBox, handleLocationChange }) => {

  return (
    <div className={` rounded-lg border-2 border-gray-800` }>
      <div className="grid grid-cols-8 justify-items-stretch">
        <div className="box-text justify-self-start col-span-3">{index} {location.name}</div>
        <LocationForm loc={location} id={location.id} onChange={(coord:string,e:string) => handleLocationChange(coord, Number(e), id)} />
        <button onClick={() => removeBox(id)} className="font-extrabold font-mono justify-self-end"> X</button>
      </div>
    </div>
  )
}