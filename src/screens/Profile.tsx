import { gql, useMutation } from "@apollo/client";
import styled from "styled-components/native";
import { useQuery } from "@apollo/client";
import { LoginDocument, SeeProfileDocument } from "../gql/graphql";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { tokenVar, useToken } from "../variables";
import Input from "../components/Input";
import Button from "../components/Button";
import { ActivityIndicator } from "react-native";

const Container = styled.View``;

const Content = styled.View`
  padding: 20px 10px;
`;

const Username = styled.Text`
  font-size: 18px;
  margin-bottom: 10px;
`;

const Email = styled.Text`
  font-size: 14px;
  margin-bottom: 10px;
`;

const Form = styled.View`
  margin: 20px 10px;
`;

const Title = styled.Text`
  font-size: 20px;
  text-align: center;
  margin-bottom: 16px;
`;

const Error = styled.Text`
  color: tomato;
`;

gql`
  query SeeProfile {
    seeProfile {
      ok
      result {
        id
        username
        email
        coffeeShop {
          id
          name
          photos {
            id
            url
          }
        }
      }
      error
    }
  }
`;

gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      error
    }
  }
`;

interface IForm {
  email: string;
  password: string;
}

const Profile = () => {
  const token = useToken();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  const {
    data: profileData,
    loading: profileLoading,
    refetch,
  } = useQuery(SeeProfileDocument);

  const [loginMutation, { loading: loginLoading }] = useMutation(
    LoginDocument,
    {
      onCompleted: async ({ login: { ok, token } }) => {
        if (ok && token) {
          await AsyncStorage.setItem("token", token);
          tokenVar(token);
          refetch();
        }
      },
    }
  );

  const onValid: SubmitHandler<IForm> = input => {
    if (!loginLoading) {
      loginMutation({ variables: input });
    }
  };

  const logout = async () => {
    tokenVar("");
    await AsyncStorage.removeItem("token");
  };

  return profileLoading || loginLoading ? (
    <ActivityIndicator />
  ) : token && profileData ? (
    <Container>
      <Content>
        <Username>{profileData.seeProfile.result?.username}</Username>
        <Email>{profileData.seeProfile.result?.email}</Email>
        <Button onPress={logout}>Logout</Button>
      </Content>
    </Container>
  ) : (
    <Container>
      <Form>
        <Title>Login</Title>
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
              placeholder="email"
            />
          )}
          name="email"
        />
        {errors.email && <Error>This is required.</Error>}

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
              placeholder="password"
            />
          )}
          name="password"
        />
        {errors.password && <Error>This is required.</Error>}

        <Button onPress={handleSubmit(onValid)}>Login</Button>
      </Form>
    </Container>
  );
};

export default Profile;
