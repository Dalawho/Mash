    //formstyles 
    import { StylesConfig } from 'react-select';

    export const customStyles: StylesConfig = {
        menu: (provided) => {
             return({
          ...provided,
          width: 250,
          color: "#121234",
          padding: 0,
          backgroundColor: "#1e1e1e",
          textColor: "white"
        })},
        
        option: (provided, { isFocused }) => {
            return({
                ...provided,
                color: "#d4d4d8",
                backgroundColor: isFocused ? "#27272a" :"#1e1e1e"
            });
        },

        singleValue: (styles) => {
            return(
                {...styles,
                    color: "#d4d4d8"
                });
        },
        control: (styles) => ({
            ...styles,
             width: 250,
             backgroundColor: "#1e1e1e",
             padding: 0
           })
      }