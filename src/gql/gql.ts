/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  query SeeCoffeeShops($page: Int) {\n    seeCoffeeShops(page: $page) {\n      ok\n      error\n      result {\n        id\n        name\n        photos {\n          id\n          url\n        }\n        categories {\n          id\n          name\n          slug\n        }\n      }\n    }\n  }\n": types.SeeCoffeeShopsDocument,
    "\n  query SeeProfile {\n    seeProfile {\n      ok\n      result {\n        id\n        username\n        email\n      }\n      error\n    }\n  }\n": types.SeeProfileDocument,
    "\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      ok\n      token\n      error\n    }\n  }\n": types.LoginDocument,
    "\n  query SearchShops($key: String!) {\n    searchShops(key: $key) {\n      ok\n      error\n      result {\n        id\n        name\n        photos {\n          id\n          url\n        }\n        categories {\n          id\n          name\n          slug\n        }\n      }\n    }\n  }\n": types.SearchShopsDocument,
};

export function graphql(source: "\n  query SeeCoffeeShops($page: Int) {\n    seeCoffeeShops(page: $page) {\n      ok\n      error\n      result {\n        id\n        name\n        photos {\n          id\n          url\n        }\n        categories {\n          id\n          name\n          slug\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query SeeCoffeeShops($page: Int) {\n    seeCoffeeShops(page: $page) {\n      ok\n      error\n      result {\n        id\n        name\n        photos {\n          id\n          url\n        }\n        categories {\n          id\n          name\n          slug\n        }\n      }\n    }\n  }\n"];
export function graphql(source: "\n  query SeeProfile {\n    seeProfile {\n      ok\n      result {\n        id\n        username\n        email\n      }\n      error\n    }\n  }\n"): (typeof documents)["\n  query SeeProfile {\n    seeProfile {\n      ok\n      result {\n        id\n        username\n        email\n      }\n      error\n    }\n  }\n"];
export function graphql(source: "\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      ok\n      token\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      ok\n      token\n      error\n    }\n  }\n"];
export function graphql(source: "\n  query SearchShops($key: String!) {\n    searchShops(key: $key) {\n      ok\n      error\n      result {\n        id\n        name\n        photos {\n          id\n          url\n        }\n        categories {\n          id\n          name\n          slug\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query SearchShops($key: String!) {\n    searchShops(key: $key) {\n      ok\n      error\n      result {\n        id\n        name\n        photos {\n          id\n          url\n        }\n        categories {\n          id\n          name\n          slug\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;