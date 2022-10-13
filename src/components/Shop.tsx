import { FlatList } from "react-native";
import styled from "styled-components/native";
import { CoffeeShop } from "../gql/graphql";

const Container = styled.View`
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

const Shop = ({ data }: { data: any }) => {
  return (
    <Container>
      <Photo source={{ uri: data?.photos ? data.photos[0]?.url : "" }} />
      <Name>{data?.name}</Name>
      <FlatList
        data={data?.categories}
        renderItem={({ item }) => <Category>{item?.name}</Category>}
      />
    </Container>
  );
};

export default Shop;
