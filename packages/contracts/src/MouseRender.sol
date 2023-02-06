// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import { Strings} from "openzeppelin/utils/Strings.sol";
import {DynamicBuffer} from 'ethier/utils/DynamicBuffer.sol';
import "./interfaces/IIndelible.sol";
import {IGenericRender} from "./interfaces/IGenericRender.sol";

interface IMouse {
    function traitTypes(uint256 , uint256) external view returns (string memory , string memory, string memory, uint256);
    struct Trait {
        string traitName;
        string traitType;
        string pixels;
        uint256 pixelCount;
    }
}

contract MouseRender is IGenericRender {
    using DynamicBuffer for bytes;
    using Strings for uint8;
        //string arrays
    string[] LETTERS = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z"
    ];

    IMouse mouse = IMouse(0xbad6186E92002E312078b5a1dAfd5ddf63d3f731);

    function getTraitDetails(uint8 _layerId, uint8 _traitId) external view returns(IIndelible.Trait memory){
        (string memory traitName, , ,) = mouse.traitTypes(_layerId, _traitId);
        return IIndelible.Trait(traitName, "image/svg+xml");
    }

    function getTraitData(uint8 _layerId, uint8 _traitId) external view returns(bytes memory){
        bytes memory buffer = DynamicBuffer.allocate(2**18);
        (,, string memory pixels, uint256 pixelCount) = mouse.traitTypes(_layerId, _traitId);

        buffer.appendSafe('<svg id="mouse-svg" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 24 24"> ');
        traitToSVG(pixels, pixelCount, buffer);
        buffer.appendSafe("<style>rect{width:1px;height:1px;} #mouse-svg{shape-rendering: crispedges;} .c00{fill:#000000}.c01{fill:#B1ADAC}.c02{fill:#D7D7D7}.c03{fill:#FFA6A6}.c04{fill:#FFD4D5}.c05{fill:#B9AD95}.c06{fill:#E2D6BE}.c07{fill:#7F625A}.c08{fill:#A58F82}.c09{fill:#4B1E0B}.c10{fill:#6D2C10}.c11{fill:#D8D8D8}.c12{fill:#F5F5F5}.c13{fill:#433D4B}.c14{fill:#8D949C}.c15{fill:#05FF00}.c16{fill:#01C700}.c17{fill:#0B8F08}.c18{fill:#421C13}.c19{fill:#6B392A}.c20{fill:#A35E40}.c21{fill:#DCBD91}.c22{fill:#777777}.c23{fill:#848484}.c24{fill:#ABABAB}.c25{fill:#BABABA}.c26{fill:#C7C7C7}.c27{fill:#EAEAEA}.c28{fill:#0C76AA}.c29{fill:#0E97DB}.c30{fill:#10A4EC}.c31{fill:#13B0FF}.c32{fill:#2EB9FE}.c33{fill:#54CCFF}.c34{fill:#50C0F2}.c35{fill:#54CCFF}.c36{fill:#72DAFF}.c37{fill:#B6EAFF}.c38{fill:#FFFFFF}.c39{fill:#954546}.c40{fill:#0B87F7}.c41{fill:#FF2626}.c42{fill:#180F02}.c43{fill:#2B2319}.c44{fill:#FBDD4B}.c45{fill:#F5B923}.c46{fill:#CC8A18}.c47{fill:#3C2203}.c48{fill:#53320B}.c49{fill:#7B501D}.c50{fill:#FFE646}.c51{fill:#FFD627}.c52{fill:#F5B700}.c53{fill:#242424}.c54{fill:#4A4A4A}.c55{fill:#676767}.c56{fill:#F08306}.c57{fill:#FCA30E}.c58{fill:#FEBC0E}.c59{fill:#FBEC1C}.c60{fill:#14242F}.c61{fill:#B06837}.c62{fill:#8F4B0E}.c63{fill:#D88227}.c64{fill:#B06837}</style></svg>");
        return buffer;
    }

    function getCollectionName() external pure returns(string memory){
        return "Anonymice";
    }

    function traitToSVG(string memory pixels, uint256 pixelCount, bytes memory buffer)
        public
        view
    {

        for (uint16 j = 0; j < pixelCount; j++) {

            string memory thisPixel = substring(
                pixels,
                j * 4,
                j * 4 + 4
            );

            uint8 x = letterToNumber(
                substring(thisPixel, 0, 1)
            );
            uint8 y = letterToNumber(
                substring(thisPixel, 1, 2)
            );

            buffer.appendSafe(
                abi.encodePacked(
                    "<rect class='c",
                    substring(thisPixel, 2, 4),
                    "' x='",
                    x.toString(),
                    "' y='",
                    y.toString(),
                    "'/>"
                )
            );
        }
    }
        function letterToNumber(string memory _inputLetter)
        internal
        view
        returns (uint8)
    {
        for (uint8 i = 0; i < LETTERS.length; i++) {
            if (
                keccak256(abi.encodePacked((LETTERS[i]))) ==
                keccak256(abi.encodePacked((_inputLetter)))
            ) return (i + 1);
        }
        revert();
    }

        function substring(
        string memory str,
        uint256 startIndex,
        uint256 endIndex
    ) internal pure returns (string memory) {
        bytes memory strBytes = bytes(str);
        bytes memory result = new bytes(endIndex - startIndex);
        for (uint256 i = startIndex; i < endIndex; i++) {
            result[i - startIndex] = strBytes[i];
        }
        return string(result);
    }
}