import React, { useState } from 'react';
import { GithubPicker } from 'react-color';

import { Color } from './SharedInterfaces';

interface Props {
  onChange: (color: Color) => void;
  selectedColor: Color;
  colors: Color[]
}

const ColorPicker: React.FC<Props> = ({ onChange, selectedColor, colors }) => {
  
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className='flex flex-col items-center'>
        <div className='flex flex-row items-center justify-center'>
        <p className='pr-2'>Set background color: </p>
            <button onClick={() => setShowPicker(!showPicker)} className={`btn btn-outline btn-xs ${selectedColor.tailwind} w-10`}>
            </button>
      </div>
      {showPicker && (
        <div className="color-picker z-auto absolute pt-10 pl-8" >
            <GithubPicker
              color={selectedColor.hex}
              className=""
              triangle='top-right'
              colors={colors.map(item => item.hex)}
              onChange={color => {
                onChange(colors.filter(obj => obj.hex === color.hex) ? colors.filter(obj => obj.hex === color.hex)[0] : colors[0]);
                setShowPicker(false);
              }}
              width={"240"}
            />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
