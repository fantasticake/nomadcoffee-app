import { makeVar, useReactiveVar } from "@apollo/client";

export const tokenVar = makeVar("");

export const useToken = () => {
  return useReactiveVar(tokenVar);
};
