import { gql, useLazyQuery } from "@apollo/client";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components/native";
import Button from "../components/Button";
import Input from "../components/Input";
import { ActivityIndicator, FlatList } from "react-native";
import { SearchShopsDocument } from "../gql/graphql";
import Shop from "../components/Shop";

const Container = styled.View`
  padding: 20px 10px;
`;

gql`
  query SearchShops($key: String!) {
    searchShops(key: $key) {
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

interface IForm {
  key: string;
}

const Search = () => {
  const { control, handleSubmit } = useForm<IForm>();
  const [searchShopsQuery, { data, loading }] =
    useLazyQuery(SearchShopsDocument);

  const onValid: SubmitHandler<IForm> = ({ key }) => {
    if (!loading) {
      searchShopsQuery({ variables: { key } });
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
        <Container>
          <FlatList
            data={data?.searchShops.result}
            renderItem={({ item }) => <Shop data={item} />}
          />
        </Container>
      )}
    </Container>
  );
};

export default Search;
