import styled from "styled-components/native";
import * as MediaLibrary from "expo-media-library";
import { ActivityIndicator, FlatList } from "react-native";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { useLazyQuery, useMutation } from "@apollo/client";
import { EditCoffeeShopDocument, SeeProfileDocument } from "../gql/graphql";
import { useNavigation } from "@react-navigation/native";
import { ReactNativeFile } from "apollo-upload-client";

const Container = styled.View``;

const PhotoBtn = styled.TouchableOpacity<{ selected: boolean }>`
  height: 100px;
  width: 33%;
  ${props => (props.selected ? "border: 2px solid black" : null)};
`;

const Photo = styled.Image`
  width: 100%;
  height: 100%;
`;

const Seperator = styled.View`
  height: 2px;
`;

const Album = () => {
  const [status, requestMediaPermission] = MediaLibrary.usePermissions();
  const [assets, setAssets] = useState<MediaLibrary.Asset[]>();
  const [selected, setSelected] = useState<MediaLibrary.Asset>();
  if (!status?.granted) requestMediaPermission();

  useEffect(() => {
    MediaLibrary.getAssetsAsync().then(res => {
      setAssets(res.assets);
    });
  });

  const navigation = useNavigation<any>();
  const [_, { refetch }] = useLazyQuery(SeeProfileDocument);
  const [editCoffeeShop, { loading }] = useMutation(EditCoffeeShopDocument, {
    onCompleted: ({ editCoffeeShop: { ok } }) => {
      if (ok) {
        refetch();
        navigation.navigate("upload");
      }
    },
  });

  const uploadPhoto = () => {
    if (!loading && selected) {
      const file = new ReactNativeFile({
        uri: selected.uri,
        name: selected.uri,
        type: "image/jpeg",
      });
      editCoffeeShop({ variables: { photos: [file] } });
    }
  };

  return (
    <Container>
      <Button
        onPress={uploadPhoto}
        disabled={!selected}
        style={{ marginTop: 10, marginBottom: 10 }}
      >
        {loading ? <ActivityIndicator /> : "Uplaod"}
      </Button>
      <FlatList
        data={assets}
        numColumns={3}
        ItemSeparatorComponent={Seperator}
        columnWrapperStyle={{ flex: 1, justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <PhotoBtn
            selected={selected?.id == item.id}
            onPress={() => setSelected(item)}
          >
            <Photo source={{ uri: item.uri }} />
          </PhotoBtn>
        )}
      />
    </Container>
  );
};

export default Album;
