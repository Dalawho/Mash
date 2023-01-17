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
    <div className={`rounded-lg border-2 border-gray-800` }>
      <div className="flex flex-row justify-between ml-2">
        <div className="">{index+1}. {location.name}</div>
        <div className='grid grid-flow-col'>
        <LocationForm loc={location} id={location.id} onChange={(coord:string,e:string) => handleLocationChange(coord, Number(e), id)} />
        <button onClick={() => removeBox(id)} className="font-extrabold font-mono justify-self-end mx-2"> X</button>
        </div>
      </div>
    </div>
  )
}