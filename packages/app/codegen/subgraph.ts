import { gql } from 'urql';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

export type BlockChangedFilter = {
  readonly number_gte: Scalars['Int'];
};

export type Block_Height = {
  readonly hash?: InputMaybe<Scalars['Bytes']>;
  readonly number?: InputMaybe<Scalars['Int']>;
  readonly number_gte?: InputMaybe<Scalars['Int']>;
};

export type Contract = {
  readonly __typename?: 'Contract';
  readonly address: Scalars['Bytes'];
  readonly height: Scalars['BigInt'];
  readonly id: Scalars['ID'];
  readonly layerNames: ReadonlyArray<Scalars['String']>;
  readonly layers: ReadonlyArray<Layer>;
  readonly maxSupply: Scalars['BigInt'];
  readonly minted: Scalars['BigInt'];
  readonly width: Scalars['BigInt'];
};


export type ContractLayersArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Layer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Layer_Filter>;
};

export type Contract_Filter = {
  /** Filter for the block changed event. */
  readonly _change_block?: InputMaybe<BlockChangedFilter>;
  readonly address?: InputMaybe<Scalars['Bytes']>;
  readonly address_contains?: InputMaybe<Scalars['Bytes']>;
  readonly address_in?: InputMaybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly address_not?: InputMaybe<Scalars['Bytes']>;
  readonly address_not_contains?: InputMaybe<Scalars['Bytes']>;
  readonly address_not_in?: InputMaybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly height?: InputMaybe<Scalars['BigInt']>;
  readonly height_gt?: InputMaybe<Scalars['BigInt']>;
  readonly height_gte?: InputMaybe<Scalars['BigInt']>;
  readonly height_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly height_lt?: InputMaybe<Scalars['BigInt']>;
  readonly height_lte?: InputMaybe<Scalars['BigInt']>;
  readonly height_not?: InputMaybe<Scalars['BigInt']>;
  readonly height_not_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly id?: InputMaybe<Scalars['ID']>;
  readonly id_gt?: InputMaybe<Scalars['ID']>;
  readonly id_gte?: InputMaybe<Scalars['ID']>;
  readonly id_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly id_lt?: InputMaybe<Scalars['ID']>;
  readonly id_lte?: InputMaybe<Scalars['ID']>;
  readonly id_not?: InputMaybe<Scalars['ID']>;
  readonly id_not_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly layerNames?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly layerNames_contains?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly layerNames_contains_nocase?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly layerNames_not?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly layerNames_not_contains?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly layerNames_not_contains_nocase?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly layers_?: InputMaybe<Layer_Filter>;
  readonly maxSupply?: InputMaybe<Scalars['BigInt']>;
  readonly maxSupply_gt?: InputMaybe<Scalars['BigInt']>;
  readonly maxSupply_gte?: InputMaybe<Scalars['BigInt']>;
  readonly maxSupply_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly maxSupply_lt?: InputMaybe<Scalars['BigInt']>;
  readonly maxSupply_lte?: InputMaybe<Scalars['BigInt']>;
  readonly maxSupply_not?: InputMaybe<Scalars['BigInt']>;
  readonly maxSupply_not_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly minted?: InputMaybe<Scalars['BigInt']>;
  readonly minted_gt?: InputMaybe<Scalars['BigInt']>;
  readonly minted_gte?: InputMaybe<Scalars['BigInt']>;
  readonly minted_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly minted_lt?: InputMaybe<Scalars['BigInt']>;
  readonly minted_lte?: InputMaybe<Scalars['BigInt']>;
  readonly minted_not?: InputMaybe<Scalars['BigInt']>;
  readonly minted_not_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly width?: InputMaybe<Scalars['BigInt']>;
  readonly width_gt?: InputMaybe<Scalars['BigInt']>;
  readonly width_gte?: InputMaybe<Scalars['BigInt']>;
  readonly width_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly width_lt?: InputMaybe<Scalars['BigInt']>;
  readonly width_lte?: InputMaybe<Scalars['BigInt']>;
  readonly width_not?: InputMaybe<Scalars['BigInt']>;
  readonly width_not_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
};

export enum Contract_OrderBy {
  Address = 'address',
  Height = 'height',
  Id = 'id',
  LayerNames = 'layerNames',
  Layers = 'layers',
  MaxSupply = 'maxSupply',
  Minted = 'minted',
  Width = 'width'
}

export type Layer = {
  readonly __typename?: 'Layer';
  readonly contract: Contract;
  readonly id: Scalars['ID'];
  readonly name: Scalars['String'];
  readonly traits: ReadonlyArray<Trait>;
};


export type LayerTraitsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Trait_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Trait_Filter>;
};

export type Layer_Filter = {
  /** Filter for the block changed event. */
  readonly _change_block?: InputMaybe<BlockChangedFilter>;
  readonly contract?: InputMaybe<Scalars['String']>;
  readonly contract_?: InputMaybe<Contract_Filter>;
  readonly contract_contains?: InputMaybe<Scalars['String']>;
  readonly contract_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly contract_ends_with?: InputMaybe<Scalars['String']>;
  readonly contract_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly contract_gt?: InputMaybe<Scalars['String']>;
  readonly contract_gte?: InputMaybe<Scalars['String']>;
  readonly contract_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly contract_lt?: InputMaybe<Scalars['String']>;
  readonly contract_lte?: InputMaybe<Scalars['String']>;
  readonly contract_not?: InputMaybe<Scalars['String']>;
  readonly contract_not_contains?: InputMaybe<Scalars['String']>;
  readonly contract_not_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly contract_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly contract_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly contract_not_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly contract_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly contract_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly contract_starts_with?: InputMaybe<Scalars['String']>;
  readonly contract_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly id?: InputMaybe<Scalars['ID']>;
  readonly id_gt?: InputMaybe<Scalars['ID']>;
  readonly id_gte?: InputMaybe<Scalars['ID']>;
  readonly id_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly id_lt?: InputMaybe<Scalars['ID']>;
  readonly id_lte?: InputMaybe<Scalars['ID']>;
  readonly id_not?: InputMaybe<Scalars['ID']>;
  readonly id_not_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly name?: InputMaybe<Scalars['String']>;
  readonly name_contains?: InputMaybe<Scalars['String']>;
  readonly name_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly name_ends_with?: InputMaybe<Scalars['String']>;
  readonly name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly name_gt?: InputMaybe<Scalars['String']>;
  readonly name_gte?: InputMaybe<Scalars['String']>;
  readonly name_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly name_lt?: InputMaybe<Scalars['String']>;
  readonly name_lte?: InputMaybe<Scalars['String']>;
  readonly name_not?: InputMaybe<Scalars['String']>;
  readonly name_not_contains?: InputMaybe<Scalars['String']>;
  readonly name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly name_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly name_not_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly name_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly name_starts_with?: InputMaybe<Scalars['String']>;
  readonly name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly traits_?: InputMaybe<Trait_Filter>;
};

export enum Layer_OrderBy {
  Contract = 'contract',
  Id = 'id',
  Name = 'name',
  Traits = 'traits'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Query = {
  readonly __typename?: 'Query';
  /** Access to subgraph metadata */
  readonly _meta?: Maybe<_Meta_>;
  readonly contract?: Maybe<Contract>;
  readonly contracts: ReadonlyArray<Contract>;
  readonly layer?: Maybe<Layer>;
  readonly layers: ReadonlyArray<Layer>;
  readonly token?: Maybe<Token>;
  readonly tokens: ReadonlyArray<Token>;
  readonly trait?: Maybe<Trait>;
  readonly traits: ReadonlyArray<Trait>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryContractArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryContractsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Contract_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Contract_Filter>;
};


export type QueryLayerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryLayersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Layer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Layer_Filter>;
};


export type QueryTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Token_Filter>;
};


export type QueryTraitArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTraitsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Trait_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Trait_Filter>;
};

export type Subscription = {
  readonly __typename?: 'Subscription';
  /** Access to subgraph metadata */
  readonly _meta?: Maybe<_Meta_>;
  readonly contract?: Maybe<Contract>;
  readonly contracts: ReadonlyArray<Contract>;
  readonly layer?: Maybe<Layer>;
  readonly layers: ReadonlyArray<Layer>;
  readonly token?: Maybe<Token>;
  readonly tokens: ReadonlyArray<Token>;
  readonly trait?: Maybe<Trait>;
  readonly traits: ReadonlyArray<Trait>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionContractArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionContractsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Contract_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Contract_Filter>;
};


export type SubscriptionLayerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionLayersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Layer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Layer_Filter>;
};


export type SubscriptionTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Token_Filter>;
};


export type SubscriptionTraitArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTraitsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Trait_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Trait_Filter>;
};

export type Token = {
  readonly __typename?: 'Token';
  readonly id: Scalars['ID'];
  readonly owner: Scalars['Bytes'];
  readonly tokenURI: Scalars['String'];
};

export type Token_Filter = {
  /** Filter for the block changed event. */
  readonly _change_block?: InputMaybe<BlockChangedFilter>;
  readonly id?: InputMaybe<Scalars['ID']>;
  readonly id_gt?: InputMaybe<Scalars['ID']>;
  readonly id_gte?: InputMaybe<Scalars['ID']>;
  readonly id_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly id_lt?: InputMaybe<Scalars['ID']>;
  readonly id_lte?: InputMaybe<Scalars['ID']>;
  readonly id_not?: InputMaybe<Scalars['ID']>;
  readonly id_not_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly owner?: InputMaybe<Scalars['Bytes']>;
  readonly owner_contains?: InputMaybe<Scalars['Bytes']>;
  readonly owner_in?: InputMaybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly owner_not?: InputMaybe<Scalars['Bytes']>;
  readonly owner_not_contains?: InputMaybe<Scalars['Bytes']>;
  readonly owner_not_in?: InputMaybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly tokenURI?: InputMaybe<Scalars['String']>;
  readonly tokenURI_contains?: InputMaybe<Scalars['String']>;
  readonly tokenURI_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly tokenURI_ends_with?: InputMaybe<Scalars['String']>;
  readonly tokenURI_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly tokenURI_gt?: InputMaybe<Scalars['String']>;
  readonly tokenURI_gte?: InputMaybe<Scalars['String']>;
  readonly tokenURI_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly tokenURI_lt?: InputMaybe<Scalars['String']>;
  readonly tokenURI_lte?: InputMaybe<Scalars['String']>;
  readonly tokenURI_not?: InputMaybe<Scalars['String']>;
  readonly tokenURI_not_contains?: InputMaybe<Scalars['String']>;
  readonly tokenURI_not_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly tokenURI_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly tokenURI_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly tokenURI_not_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly tokenURI_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly tokenURI_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly tokenURI_starts_with?: InputMaybe<Scalars['String']>;
  readonly tokenURI_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum Token_OrderBy {
  Id = 'id',
  Owner = 'owner',
  TokenUri = 'tokenURI'
}

export type Trait = {
  readonly __typename?: 'Trait';
  readonly data: Scalars['String'];
  readonly id: Scalars['ID'];
  readonly layer: Layer;
  readonly name: Scalars['String'];
};

export type Trait_Filter = {
  /** Filter for the block changed event. */
  readonly _change_block?: InputMaybe<BlockChangedFilter>;
  readonly data?: InputMaybe<Scalars['String']>;
  readonly data_contains?: InputMaybe<Scalars['String']>;
  readonly data_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly data_ends_with?: InputMaybe<Scalars['String']>;
  readonly data_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly data_gt?: InputMaybe<Scalars['String']>;
  readonly data_gte?: InputMaybe<Scalars['String']>;
  readonly data_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly data_lt?: InputMaybe<Scalars['String']>;
  readonly data_lte?: InputMaybe<Scalars['String']>;
  readonly data_not?: InputMaybe<Scalars['String']>;
  readonly data_not_contains?: InputMaybe<Scalars['String']>;
  readonly data_not_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly data_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly data_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly data_not_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly data_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly data_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly data_starts_with?: InputMaybe<Scalars['String']>;
  readonly data_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly id?: InputMaybe<Scalars['ID']>;
  readonly id_gt?: InputMaybe<Scalars['ID']>;
  readonly id_gte?: InputMaybe<Scalars['ID']>;
  readonly id_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly id_lt?: InputMaybe<Scalars['ID']>;
  readonly id_lte?: InputMaybe<Scalars['ID']>;
  readonly id_not?: InputMaybe<Scalars['ID']>;
  readonly id_not_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly layer?: InputMaybe<Scalars['String']>;
  readonly layer_?: InputMaybe<Layer_Filter>;
  readonly layer_contains?: InputMaybe<Scalars['String']>;
  readonly layer_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly layer_ends_with?: InputMaybe<Scalars['String']>;
  readonly layer_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly layer_gt?: InputMaybe<Scalars['String']>;
  readonly layer_gte?: InputMaybe<Scalars['String']>;
  readonly layer_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly layer_lt?: InputMaybe<Scalars['String']>;
  readonly layer_lte?: InputMaybe<Scalars['String']>;
  readonly layer_not?: InputMaybe<Scalars['String']>;
  readonly layer_not_contains?: InputMaybe<Scalars['String']>;
  readonly layer_not_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly layer_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly layer_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly layer_not_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly layer_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly layer_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly layer_starts_with?: InputMaybe<Scalars['String']>;
  readonly layer_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly name?: InputMaybe<Scalars['String']>;
  readonly name_contains?: InputMaybe<Scalars['String']>;
  readonly name_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly name_ends_with?: InputMaybe<Scalars['String']>;
  readonly name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly name_gt?: InputMaybe<Scalars['String']>;
  readonly name_gte?: InputMaybe<Scalars['String']>;
  readonly name_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly name_lt?: InputMaybe<Scalars['String']>;
  readonly name_lte?: InputMaybe<Scalars['String']>;
  readonly name_not?: InputMaybe<Scalars['String']>;
  readonly name_not_contains?: InputMaybe<Scalars['String']>;
  readonly name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly name_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly name_not_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly name_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly name_starts_with?: InputMaybe<Scalars['String']>;
  readonly name_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum Trait_OrderBy {
  Data = 'data',
  Id = 'id',
  Layer = 'layer',
  Name = 'name'
}

export type _Block_ = {
  readonly __typename?: '_Block_';
  /** The hash of the block */
  readonly hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  readonly number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  readonly timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  readonly __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  readonly block: _Block_;
  /** The deployment ID */
  readonly deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  readonly hasIndexingErrors: Scalars['Boolean'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type ContractsQueryVariables = Exact<{ [key: string]: never; }>;


export type ContractsQuery = { readonly __typename?: 'Query', readonly contracts: ReadonlyArray<{ readonly __typename?: 'Contract', readonly id: string, readonly address: any, readonly maxSupply: any, readonly minted: any, readonly layerNames: ReadonlyArray<string> }> };

export type LayersQueryVariables = Exact<{ [key: string]: never; }>;


export type LayersQuery = { readonly __typename?: 'Query', readonly layers: ReadonlyArray<{ readonly __typename?: 'Layer', readonly id: string, readonly name: string, readonly contract: { readonly __typename?: 'Contract', readonly id: string } }> };

export type TraitsQueryVariables = Exact<{ [key: string]: never; }>;


export type TraitsQuery = { readonly __typename?: 'Query', readonly traits: ReadonlyArray<{ readonly __typename?: 'Trait', readonly data: string, readonly id: string, readonly name: string, readonly layer: { readonly __typename?: 'Layer', readonly name: string, readonly contract: { readonly __typename?: 'Contract', readonly id: string } } }> };


export const ContractsDocument = gql`
    query Contracts {
  contracts(first: 5) {
    id
    address
    maxSupply
    minted
    layerNames
  }
}
    `;

export function useContractsQuery(options?: Omit<Urql.UseQueryArgs<ContractsQueryVariables>, 'query'>) {
  return Urql.useQuery<ContractsQuery, ContractsQueryVariables>({ query: ContractsDocument, ...options });
};
export const LayersDocument = gql`
    query Layers {
  layers(first: 10) {
    id
    name
    contract {
      id
    }
  }
}
    `;

export function useLayersQuery(options?: Omit<Urql.UseQueryArgs<LayersQueryVariables>, 'query'>) {
  return Urql.useQuery<LayersQuery, LayersQueryVariables>({ query: LayersDocument, ...options });
};
export const TraitsDocument = gql`
    query Traits {
  traits(first: 100) {
    data
    id
    name
    layer {
      name
      contract {
        id
      }
    }
  }
}
    `;

export function useTraitsQuery(options?: Omit<Urql.UseQueryArgs<TraitsQueryVariables>, 'query'>) {
  return Urql.useQuery<TraitsQuery, TraitsQueryVariables>({ query: TraitsDocument, ...options });
};