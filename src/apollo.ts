import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { onError } from "@apollo/client/link/error";
import { SeeCoffeeShopsOutput } from "./gql/graphql";

const httpLink = createHttpLink({
  uri: "https://ef8a-172-107-194-165.jp.ngrok.io/graphql",
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem("token");
  return {
    headers: {
      ...headers,
      "x-token": token ? token : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(errorLink).concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          seeCoffeeShops: {
            keyArgs: false,
            merge: (e: SeeCoffeeShopsOutput, i: SeeCoffeeShopsOutput) => {
              if (e && e.result && i.result)
                return { ...i, result: [...e.result, ...i.result] };
              else return i;
            },
          },
        },
      },
    },
  }),
});

export default client;
