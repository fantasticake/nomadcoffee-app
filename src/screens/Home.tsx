import { gql, useQuery } from "@apollo/client";
import styled from "styled-components/native";
import { SeeCoffeeShopsDocument } from "../gql/graphql";
import { FlatList } from "react-native";
import { ActivityIndicator } from "react-native";
import { useState } from "react";

const Container = styled.View``;

const Shop = styled.View`
  margin-bottom: 20px;
`;

const Photo = styled.Image`
  width: 100%;
  height: 160px;
`;

const Name = styled.Text`
  font-size: 16px;
`;

const Category = styled.Text`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.7);
`;

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
        renderItem={({ item }) => (
          <Shop>
            <Photo source={{ uri: item?.photos ? item.photos[0]?.url : "" }} />
            <Name>{item?.name}</Name>
            <FlatList
              data={item?.categories}
              renderItem={({ item }) => <Category>{item?.name}</Category>}
            />
          </Shop>
        )}
      />
    </Container>
  );
};

export default Home;
