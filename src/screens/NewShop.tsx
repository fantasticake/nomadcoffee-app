import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import Button from "../components/Button";
import Input from "../components/Input";
import { CreateCoffeeShopDocument, SeeProfileDocument } from "../gql/graphql";

const Container = styled.View``;

const Form = styled.View`
  margin: 20px 10px;
`;

interface IForm {
  name: string;
}

gql`
  mutation CreateCoffeeShop($name: String!) {
    createCoffeeShop(name: $name) {
      ok
      error
    }
  }
`;

const NewShop = () => {
  const navigation = useNavigation<any>();
  const { control, handleSubmit } = useForm<IForm>();
  const [_, { refetch }] = useLazyQuery(SeeProfileDocument);

  const [createCoffeeShopMutation, { loading }] = useMutation(
    CreateCoffeeShopDocument,
    {
      onCompleted: async ({ createCoffeeShop: { ok } }) => {
        if (ok) {
          await refetch();
          navigation.navigate("upload");
        }
      },
    }
  );

  const onValid: SubmitHandler<IForm> = input => {
    if (!loading) {
      createCoffeeShopMutation({ variables: input });
    }
  };

  return (
    <Container>
      <Form>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="name"
            />
          )}
          name="name"
        />

        <Button onPress={handleSubmit(onValid)}>
          {loading ? <ActivityIndicator /> : "New coffee shop"}
        </Button>
      </Form>
    </Container>
  );
};

export default NewShop;
