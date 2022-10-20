import { useQuery } from "@apollo/client";
import styled from "styled-components/native";
import { SeeProfileDocument } from "../gql/graphql";
import { ActivityIndicator, FlatList } from "react-native";
import Button from "../components/Button";
import Shop from "../components/Shop";
import { useNavigation } from "@react-navigation/native";

const Container = styled.View`
  padding: 20px;
  flex: 1;
`;

const Photo = styled.Image`
  width: 100%;
  height: 160px;
  margin-bottom: 20px;
`;

const Text = styled.Text``;

const Upload = () => {
  const { data, loading } = useQuery(SeeProfileDocument);
  const navigation = useNavigation<any>();

  return loading ? (
    <ActivityIndicator />
  ) : data?.seeProfile.ok ? (
    data?.seeProfile.result?.coffeeShop?.id ? (
      <Container>
        <Shop data={data.seeProfile.result.coffeeShop} />
        <FlatList
          style={{ marginBottom: 20 }}
          data={data.seeProfile.result.coffeeShop.photos?.slice(1)}
          renderItem={({ item }) => <Photo source={{ uri: item?.url }} />}
          ListFooterComponent={
            <Button onPress={() => navigation.navigate("cameraTab")}>
              New Photo
            </Button>
          }
        />
      </Container>
    ) : (
      <Button onPress={() => navigation.navigate("newShop")}>
        New coffee shop
      </Button>
    )
  ) : (
    <Text>Log in to upload.</Text>
  );
};

export default Upload;
