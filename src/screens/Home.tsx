import { gql, useQuery } from "@apollo/client";
import styled from "styled-components/native";
import { SeeCoffeeShopsDocument } from "../gql/graphql";
import { FlatList } from "react-native";
import { ActivityIndicator } from "react-native";

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
      }
    }
  }
`;

const Home = () => {
  const { data, loading } = useQuery(SeeCoffeeShopsDocument, {
    variables: { page: 1 },
  });

  return loading ? (
    <ActivityIndicator />
  ) : (
    <Container>
      <FlatList
        data={data?.seeCoffeeShops.result}
        renderItem={({ item }) => (
          <Shop>
            <Photo source={{ uri: item?.photos ? item.photos[0]?.url : "" }} />
            <Name>{item?.name}</Name>
          </Shop>
        )}
      />
    </Container>
  );
};

export default Home;
