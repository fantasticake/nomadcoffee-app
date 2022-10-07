import { gql, useLazyQuery } from "@apollo/client";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components/native";
import Button from "../components/Button";
import Input from "../components/Input";
import { SearchUsersDocument } from "../gql/graphql";
import { ActivityIndicator, FlatList } from "react-native";

const Container = styled.View`
  padding: 20px 10px;
`;

const Result = styled.View`
  margin-top: 10px;
`;

const User = styled.View`
  margin-bottom: 10px;
`;

const Username = styled.Text`
  font-size: 16px;
`;

gql`
  query SearchUsers($key: String!) {
    searchUsers(key: $key) {
      ok
      result {
        id
        username
      }
      error
    }
  }
`;

interface IForm {
  key: string;
}

const Search = () => {
  const { control, handleSubmit } = useForm<IForm>();
  const [searchUsersQuery, { data, loading }] =
    useLazyQuery(SearchUsersDocument);

  const onValid: SubmitHandler<IForm> = ({ key }) => {
    if (!loading) {
      searchUsersQuery({ variables: { key } });
    }
  };

  return (
    <Container>
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
            placeholder="Search..."
          />
        )}
        name="key"
      />
      <Button onPress={handleSubmit(onValid)}>Search</Button>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Result>
          <FlatList
            data={data?.searchUsers.result}
            renderItem={({ item }) => (
              <User>
                <Username>{item?.username}</Username>
              </User>
            )}
          />
        </Result>
      )}
    </Container>
  );
};

export default Search;
