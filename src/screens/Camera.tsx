import styled from "styled-components/native";
import { Camera, FlashMode } from "expo-camera";
import { useState, useRef } from "react";
import Slider from "@react-native-community/slider";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { EditCoffeeShopDocument, SeeProfileDocument } from "../gql/graphql";
import { ReactNativeFile } from "apollo-upload-client";
import { useNavigation } from "@react-navigation/native";

const Container = styled.View``;

const Btns = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  position: absolute;
  bottom: 0;
  padding: 10px;
`;

const FlashBtn = styled.TouchableOpacity`
  background-color: rgba(0, 0, 0, 0.3);
  width: 40px;
  height: 40px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;

const FlashTxt = styled.Text`
  color: white;
  font-size: 10px;
`;

const Zoom = styled(Slider)`
  width: 200px;
`;

const TakeBtn = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  background-color: white;
  border: 8px solid rgba(0, 0, 0, 0.3);
  border-radius: 30px;
`;

gql`
  mutation EditCoffeeShop($photos: [Upload]) {
    editCoffeeShop(photos: $photos) {
      ok
      error
    }
  }
`;

const CameraScreen = () => {
  const [permission, requestCameraPermission] = Camera.useCameraPermissions();
  const [flash, setFlash] = useState(FlashMode.off);
  const [zoom, setZoom] = useState(0);
  const [_, { refetch }] = useLazyQuery(SeeProfileDocument);

  const cameraRef = useRef<Camera>(null);

  const navigation = useNavigation<any>();

  const [editCoffeeShop, { loading }] = useMutation(EditCoffeeShopDocument, {
    onCompleted: ({ editCoffeeShop: { ok } }) => {
      if (ok) {
        refetch();
        navigation.navigate("upload");
      }
    },
  });

  if (!permission) requestCameraPermission();

  const toggleFlash = () => {
    setFlash(prev => {
      if (prev == FlashMode.off) return FlashMode.torch;
      return FlashMode.off;
    });
  };

  const takePicture = async () => {
    if (cameraRef.current && !loading) {
      const { uri } = await cameraRef.current.takePictureAsync();
      const file = new ReactNativeFile({
        uri,
        name: uri,
        type: "image/jpeg",
      });
      editCoffeeShop({ variables: { photos: [file] } });
    }
  };

  return (
    <Container>
      <Camera
        ref={cameraRef}
        flashMode={flash}
        zoom={zoom}
        style={{ height: 300 }}
      >
        <Btns>
          <FlashBtn onPress={toggleFlash}>
            <FlashTxt>Flash</FlashTxt>
          </FlashBtn>
          <Zoom
            minimumValue={0}
            maximumValue={1}
            onValueChange={v => setZoom(v)}
          />
          <TakeBtn onPress={takePicture} />
        </Btns>
      </Camera>
    </Container>
  );
};

export default CameraScreen;
