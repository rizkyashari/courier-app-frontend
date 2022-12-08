import styled from "styled-components";

export const ContainerGlobal = styled.div`
  margin: 0 auto;
  padding: 0 300px;

  @media (max-width: 991px) {
    padding: 0 100px;
  }
`;

export const RowGlobal = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 991px) {
  }
`;

type ColProps = {
  limitCol?: number;
  limitColResponsive?: number;
};
export const ColGlobal = styled.div<ColProps>`
  margin: 5px 0px;
  height: 100%;
  width: calc(100% * (1 / ${(props) => props.limitCol}) - 10px - 1px);

  @media (max-width: 991px) {
    margin: 5px 0px;

    height: 100%;
    width: calc(
      100% * (1 / ${(props) => props.limitColResponsive}) - 10px - 1px
    );
  }
`;

export const FlexDirectionColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const JustifyContentCenter = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
`;

export const JustifyContentEnd = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: end;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
`;

export const JustifyContentBetween = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const RectangularButton = styled.button`
  padding: 5px 10px;
  background-color: #007500;
  color: white;
  border: none;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  transition-duration: 0.4s;
  font-size: 14px;
  :hover {
    background-color: #00d100;
  }
`;

export const RedRectangularButton = styled.button`
  padding: 5px 10px;
  background-color: red;
  color: white;
  border: none;
  text-align: center;
  text-decoration: none;
  display: flex;
  transition-duration: 0.4s;
  font-size: 14px;
  :hover {
    background-color: lightpink;
  }
`;

export const OutlinedButton = styled.button`
  border-color: grey;
  color: black;
  text-align: center;
  height: fit-content;
  border-radius: 5px;
  text-decoration: none;
  display: inline-block;
  background-color: white;
  transition-duration: 0.4s;
  font-size: 16px;
  :hover {
    background-color: #e7e7e7;
  }
`;

export const CartButton = styled.button`
  padding: 5px 20px;
  background-color: #007500;
  color: white;
  border-radius: 8px;
  height: fit-content;
  border: none;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  transition-duration: 0.4s;
  font-size: 16px;
  :hover {
    background-color: #00d100;
  }
`;

export const BorderRight = styled.div`
  padding-right: 20px;
  border-right: 1px solid black;
`;

export const BorderAll = styled.div`
  border: 1px solid black;
  border-radius: 4px;
  padding: 10px;
`;

export const IconGreen = styled.div`
  color: green;
  display: flex;
  justify-content: center;
  font-size: 50px;
`;

export const IconRed = styled.div`
  color: red;
  display: flex;
  justify-content: center;
  font-size: 50px;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const ContainerForm = styled.div`
  margin: 0 auto;
  padding: 0 400px;

  @media (max-width: 991px) {
    padding: 0 25px;
  }
`;

export const ContainerBox = styled.div`
  margin: 0 auto;
  padding: 0 300px;

  @media (max-width: 991px) {
    padding: 0 25px;
  }
`;

export const Body = styled.div`
  font-family: "Montserrat";
  font-weight: bold;
`;

export const BtnSquare = styled.div`
  display: block;
  width: 150px;
  height: 195px;
  background-color: #ff6600;
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  // width: 150px !important;
  // max-width: 100% !important;
  // max-height: 100% !important;
  // height: 150px !important;
  // text-align: center;
  // padding: 0px;
  // font-size: 12px;
`;

export const Notification = styled.div`
  background-color: #ff6600;
  color: white;
  text-decoration: none;
  padding: 15px 26px;
  position: fixed;
  width: 100px;
  height: 100px;
  display: inline-block;
  text-align: center;
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
`;

export const Wrapper = styled.div`
  &:hover ${Notification} {
    background-color: red;
  }
`;

export const Badge = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  padding: 5px 10px;
  border-radius: 50%;
  background: red;
  color: white;
`;
