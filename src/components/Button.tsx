import styled from "styled-components/native";

const SButton = styled.TouchableOpacity`
  width: 100%;
  background-color: #ff9500;
  border-radius: 10px;
  padding: 10px 0;
`;

const BtnTxt = styled.Text`
  text-align: center;
  color: white;
`;

const Button = ({ children, ...rest }: any) => {
  return (
    <SButton {...rest}>
      <BtnTxt>{children}</BtnTxt>
    </SButton>
  );
};

export default Button;
