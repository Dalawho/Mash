export interface Trait {
    value: number;
    label: string;
    tokenURI: string;
    layer: string;
    contract: number;
    layerNr: number;
    traitNr: number; 
    name: string;
    mimeType: string;
    data: string;
}

export interface Color {
    hex: string;
    tailwind: string;
    index: number;
}

export interface Contract {
    value: number;
    label: string;
    maxSupply: number;
    minted: number;
    x: number;
    y: number;
}