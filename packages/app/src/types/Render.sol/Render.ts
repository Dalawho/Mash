/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export declare namespace IIndelible {
  export type TraitStruct = {
    name: PromiseOrValue<string>;
    mimetype: PromiseOrValue<string>;
  };

  export type TraitStructOutput = [string, string] & {
    name: string;
    mimetype: string;
  };
}

export declare namespace SharedStructs {
  export type LayerStructStruct = {
    collection: PromiseOrValue<BigNumberish>;
    layerId: PromiseOrValue<BigNumberish>;
    traitId: PromiseOrValue<BigNumberish>;
    pfpRender: PromiseOrValue<boolean>;
    scale: PromiseOrValue<BigNumberish>;
    xOffset: PromiseOrValue<BigNumberish>;
    yOffset: PromiseOrValue<BigNumberish>;
  };

  export type LayerStructStructOutput = [
    number,
    number,
    number,
    boolean,
    number,
    number,
    number
  ] & {
    collection: number;
    layerId: number;
    traitId: number;
    pfpRender: boolean;
    scale: number;
    xOffset: number;
    yOffset: number;
  };

  export type CollectionInfoStruct = {
    collection: PromiseOrValue<string>;
    maxSupply: PromiseOrValue<BigNumberish>;
    minted: PromiseOrValue<BigNumberish>;
    xSize: PromiseOrValue<BigNumberish>;
    ySize: PromiseOrValue<BigNumberish>;
  };

  export type CollectionInfoStructOutput = [
    string,
    number,
    number,
    number,
    number
  ] & {
    collection: string;
    maxSupply: number;
    minted: number;
    xSize: number;
    ySize: number;
  };
}

export interface RenderInterface extends utils.Interface {
  functions: {
    "MAX_LAYERS()": FunctionFragment;
    "getCollectionName(uint256)": FunctionFragment;
    "getSVGForTrait(uint8,uint8,uint8)": FunctionFragment;
    "getTraitData(address,uint8,uint8)": FunctionFragment;
    "getTraitDetails(address,uint8,uint8)": FunctionFragment;
    "initialize()": FunctionFragment;
    "int8ToString(int8)": FunctionFragment;
    "mash()": FunctionFragment;
    "owner()": FunctionFragment;
    "previewCollage(tuple[7])": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setMash(address)": FunctionFragment;
    "tokenURI(uint256,tuple[7],tuple[7])": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "MAX_LAYERS"
      | "getCollectionName"
      | "getSVGForTrait"
      | "getTraitData"
      | "getTraitDetails"
      | "initialize"
      | "int8ToString"
      | "mash"
      | "owner"
      | "previewCollage"
      | "renounceOwnership"
      | "setMash"
      | "tokenURI"
      | "transferOwnership"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "MAX_LAYERS",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getCollectionName",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getSVGForTrait",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getTraitData",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getTraitDetails",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "int8ToString",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "mash", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "previewCollage",
    values: [SharedStructs.LayerStructStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setMash",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenURI",
    values: [
      PromiseOrValue<BigNumberish>,
      SharedStructs.LayerStructStruct[],
      SharedStructs.CollectionInfoStruct[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(functionFragment: "MAX_LAYERS", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getCollectionName",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getSVGForTrait",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTraitData",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTraitDetails",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "int8ToString",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "mash", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "previewCollage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setMash", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "tokenURI", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "Initialized(uint8)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export interface InitializedEventObject {
  version: number;
}
export type InitializedEvent = TypedEvent<[number], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface Render extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: RenderInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    MAX_LAYERS(overrides?: CallOverrides): Promise<[BigNumber]>;

    getCollectionName(
      _collectionNr: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string] & { out: string }>;

    getSVGForTrait(
      _collectionId: PromiseOrValue<BigNumberish>,
      _layerId: PromiseOrValue<BigNumberish>,
      _traitId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getTraitData(
      _collection: PromiseOrValue<string>,
      _layerId: PromiseOrValue<BigNumberish>,
      _traitId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getTraitDetails(
      _collection: PromiseOrValue<string>,
      layerId: PromiseOrValue<BigNumberish>,
      traitId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[IIndelible.TraitStructOutput]>;

    initialize(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    int8ToString(
      num: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    mash(overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    previewCollage(
      layerInfo: SharedStructs.LayerStructStruct[],
      overrides?: CallOverrides
    ): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setMash(
      _newMash: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    tokenURI(
      tokenId: PromiseOrValue<BigNumberish>,
      layerInfo: SharedStructs.LayerStructStruct[],
      _collections: SharedStructs.CollectionInfoStruct[],
      overrides?: CallOverrides
    ): Promise<[string]>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  MAX_LAYERS(overrides?: CallOverrides): Promise<BigNumber>;

  getCollectionName(
    _collectionNr: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  getSVGForTrait(
    _collectionId: PromiseOrValue<BigNumberish>,
    _layerId: PromiseOrValue<BigNumberish>,
    _traitId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  getTraitData(
    _collection: PromiseOrValue<string>,
    _layerId: PromiseOrValue<BigNumberish>,
    _traitId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  getTraitDetails(
    _collection: PromiseOrValue<string>,
    layerId: PromiseOrValue<BigNumberish>,
    traitId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<IIndelible.TraitStructOutput>;

  initialize(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  int8ToString(
    num: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  mash(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  previewCollage(
    layerInfo: SharedStructs.LayerStructStruct[],
    overrides?: CallOverrides
  ): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setMash(
    _newMash: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  tokenURI(
    tokenId: PromiseOrValue<BigNumberish>,
    layerInfo: SharedStructs.LayerStructStruct[],
    _collections: SharedStructs.CollectionInfoStruct[],
    overrides?: CallOverrides
  ): Promise<string>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    MAX_LAYERS(overrides?: CallOverrides): Promise<BigNumber>;

    getCollectionName(
      _collectionNr: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    getSVGForTrait(
      _collectionId: PromiseOrValue<BigNumberish>,
      _layerId: PromiseOrValue<BigNumberish>,
      _traitId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    getTraitData(
      _collection: PromiseOrValue<string>,
      _layerId: PromiseOrValue<BigNumberish>,
      _traitId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    getTraitDetails(
      _collection: PromiseOrValue<string>,
      layerId: PromiseOrValue<BigNumberish>,
      traitId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<IIndelible.TraitStructOutput>;

    initialize(overrides?: CallOverrides): Promise<void>;

    int8ToString(
      num: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    mash(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    previewCollage(
      layerInfo: SharedStructs.LayerStructStruct[],
      overrides?: CallOverrides
    ): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    setMash(
      _newMash: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    tokenURI(
      tokenId: PromiseOrValue<BigNumberish>,
      layerInfo: SharedStructs.LayerStructStruct[],
      _collections: SharedStructs.CollectionInfoStruct[],
      overrides?: CallOverrides
    ): Promise<string>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "Initialized(uint8)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
  };

  estimateGas: {
    MAX_LAYERS(overrides?: CallOverrides): Promise<BigNumber>;

    getCollectionName(
      _collectionNr: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSVGForTrait(
      _collectionId: PromiseOrValue<BigNumberish>,
      _layerId: PromiseOrValue<BigNumberish>,
      _traitId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTraitData(
      _collection: PromiseOrValue<string>,
      _layerId: PromiseOrValue<BigNumberish>,
      _traitId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTraitDetails(
      _collection: PromiseOrValue<string>,
      layerId: PromiseOrValue<BigNumberish>,
      traitId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initialize(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    int8ToString(
      num: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    mash(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    previewCollage(
      layerInfo: SharedStructs.LayerStructStruct[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setMash(
      _newMash: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    tokenURI(
      tokenId: PromiseOrValue<BigNumberish>,
      layerInfo: SharedStructs.LayerStructStruct[],
      _collections: SharedStructs.CollectionInfoStruct[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    MAX_LAYERS(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getCollectionName(
      _collectionNr: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getSVGForTrait(
      _collectionId: PromiseOrValue<BigNumberish>,
      _layerId: PromiseOrValue<BigNumberish>,
      _traitId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTraitData(
      _collection: PromiseOrValue<string>,
      _layerId: PromiseOrValue<BigNumberish>,
      _traitId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTraitDetails(
      _collection: PromiseOrValue<string>,
      layerId: PromiseOrValue<BigNumberish>,
      traitId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initialize(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    int8ToString(
      num: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    mash(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    previewCollage(
      layerInfo: SharedStructs.LayerStructStruct[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setMash(
      _newMash: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    tokenURI(
      tokenId: PromiseOrValue<BigNumberish>,
      layerInfo: SharedStructs.LayerStructStruct[],
      _collections: SharedStructs.CollectionInfoStruct[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
