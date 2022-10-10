/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['Int'];
  name: Scalars['String'];
  shops?: Maybe<Array<Maybe<CoffeeShop>>>;
  slug: Scalars['String'];
  totalShops: Scalars['Int'];
};

export type CoffeeShop = {
  __typename?: 'CoffeeShop';
  categories?: Maybe<Array<Maybe<Category>>>;
  id: Scalars['Int'];
  latitude?: Maybe<Scalars['String']>;
  longitude?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  photos?: Maybe<Array<Maybe<CoffeeShopPhoto>>>;
  user: User;
};

export type CoffeeShopPhoto = {
  __typename?: 'CoffeeShopPhoto';
  id: Scalars['Int'];
  shop: CoffeeShop;
  url: Scalars['String'];
};

export type LoginOutput = {
  __typename?: 'LoginOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  token?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccount: SharedOutput;
  createCoffeeShop: SharedOutput;
  deleteCoffeeShop: SharedOutput;
  editCoffeeShop: SharedOutput;
  editProfile: SharedOutput;
  follow: SharedOutput;
  login: LoginOutput;
  unfollow: SharedOutput;
};


export type MutationCreateAccountArgs = {
  avatarURL?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  githubUsername?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationCreateCoffeeShopArgs = {
  categories?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  latitude?: InputMaybe<Scalars['String']>;
  longitude?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  photos?: InputMaybe<Array<InputMaybe<Scalars['Upload']>>>;
};


export type MutationDeleteCoffeeShopArgs = {
  shopId: Scalars['Int'];
};


export type MutationEditCoffeeShopArgs = {
  categories?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  latitude?: InputMaybe<Scalars['String']>;
  longitude?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  photos?: InputMaybe<Array<InputMaybe<Scalars['Upload']>>>;
};


export type MutationEditProfileArgs = {
  avatarURL?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};


export type MutationFollowArgs = {
  userId: Scalars['Int'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUnfollowArgs = {
  userId: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  searchUsers: SearchUsersOutput;
  seeCategories: SeeCategoriesOutput;
  seeCategory: SeeCategoryOutput;
  seeCoffeeShop: SeeCoffeeShopOutput;
  seeCoffeeShops: SeeCoffeeShopsOutput;
  seeProfile: SeeProfileOutput;
  seeUser: SeeUserOutput;
};


export type QuerySearchUsersArgs = {
  key: Scalars['String'];
};


export type QuerySeeCategoriesArgs = {
  page?: InputMaybe<Scalars['Int']>;
};


export type QuerySeeCategoryArgs = {
  page?: InputMaybe<Scalars['Int']>;
  slug: Scalars['String'];
};


export type QuerySeeCoffeeShopArgs = {
  shopId: Scalars['Int'];
};


export type QuerySeeCoffeeShopsArgs = {
  page?: InputMaybe<Scalars['Int']>;
};


export type QuerySeeUserArgs = {
  userId: Scalars['Int'];
};

export type SeeCategoriesOutput = {
  __typename?: 'SeeCategoriesOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  result?: Maybe<Array<Maybe<Category>>>;
};

export type SeeCategoryOutput = {
  __typename?: 'SeeCategoryOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  result?: Maybe<Array<Maybe<CoffeeShop>>>;
};

export type SeeCoffeeShopOutput = {
  __typename?: 'SeeCoffeeShopOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  result?: Maybe<CoffeeShop>;
};

export type SeeCoffeeShopsOutput = {
  __typename?: 'SeeCoffeeShopsOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  result?: Maybe<Array<Maybe<CoffeeShop>>>;
};

export type SeeProfileOutput = {
  __typename?: 'SeeProfileOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  result?: Maybe<User>;
};

export type SeeUserOutput = {
  __typename?: 'SeeUserOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  result?: Maybe<User>;
};

export type SharedOutput = {
  __typename?: 'SharedOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  avatarURL?: Maybe<Scalars['String']>;
  coffeeShop?: Maybe<CoffeeShop>;
  createdAt: Scalars['String'];
  email: Scalars['String'];
  followers?: Maybe<Array<Maybe<User>>>;
  following?: Maybe<Array<Maybe<User>>>;
  githubUsername?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  location?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};


export type UserFollowersArgs = {
  page?: InputMaybe<Scalars['Int']>;
};


export type UserFollowingArgs = {
  page?: InputMaybe<Scalars['Int']>;
};

export type SearchUsersOutput = {
  __typename?: 'searchUsersOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  result?: Maybe<Array<Maybe<User>>>;
};

export type SeeCoffeeShopsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
}>;


export type SeeCoffeeShopsQuery = { __typename?: 'Query', seeCoffeeShops: { __typename?: 'SeeCoffeeShopsOutput', ok: boolean, error?: string | null, result?: Array<{ __typename?: 'CoffeeShop', id: number, name: string, photos?: Array<{ __typename?: 'CoffeeShopPhoto', id: number, url: string } | null> | null, categories?: Array<{ __typename?: 'Category', id: number, name: string, slug: string } | null> | null } | null> | null } };

export type SeeProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type SeeProfileQuery = { __typename?: 'Query', seeProfile: { __typename?: 'SeeProfileOutput', ok: boolean, error?: string | null, result?: { __typename?: 'User', id: number, username: string, email: string } | null } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginOutput', ok: boolean, token?: string | null, error?: string | null } };

export type SearchUsersQueryVariables = Exact<{
  key: Scalars['String'];
}>;


export type SearchUsersQuery = { __typename?: 'Query', searchUsers: { __typename?: 'searchUsersOutput', ok: boolean, error?: string | null, result?: Array<{ __typename?: 'User', id: number, username: string } | null> | null } };


export const SeeCoffeeShopsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SeeCoffeeShops"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seeCoffeeShops"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SeeCoffeeShopsQuery, SeeCoffeeShopsQueryVariables>;
export const SeeProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SeeProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seeProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<SeeProfileQuery, SeeProfileQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const SearchUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"key"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"key"},"value":{"kind":"Variable","name":{"kind":"Name","value":"key"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<SearchUsersQuery, SearchUsersQueryVariables>;