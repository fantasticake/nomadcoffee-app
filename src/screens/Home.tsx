import { gql, useQuery } from "@apollo/client";
import styled from "styled-components/native";
import { SeeCoffeeShopsDocument } from "../gql/graphql";
import { FlatList } from "react-native";
import { ActivityIndicator } from "react-native";
import { useState } from "react";
import Shop from "../components/Shop";

const Container = styled.View``;

gql`
  query SeeCoffeeShops($page: Int) {
    seeCoffeeShops(page: $page) {
      ok
      error
      result {
        id
        name
        photos {
          id
          url
        }
        categories {
          id
          name
          slug
        }
      }
    }
  }
`;

const Home = () => {
  const { data, loading, refetch, fetchMore } = useQuery(
    SeeCoffeeShopsDocument,
    {
      variables: { page: 1 },
    }
  );
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const onEndReached = () => {
    if (!loading && data?.seeCoffeeShops.result) {
      fetchMore({
        variables: {
          page: Math.ceil(data.seeCoffeeShops.result.length / 5 + 1),
        },
      });
    }
  };

  return loading ? (
    <ActivityIndicator />
  ) : (
    <Container>
      <FlatList
        onEndReached={onEndReached}
        onEndReachedThreshold={0.2}
        refreshing={refreshing}
        onRefresh={onRefresh}
        data={data?.seeCoffeeShops.result}
        renderItem={({ item }) => <Shop data={item} />}
      />
    </Container>
  );
};

export default Home;
