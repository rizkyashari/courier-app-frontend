import styled from "styled-components";

export const Nav = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 25px 0;
  @media (max-width: 991px) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

export const NavMenuLeft = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  align-items: center;
  @media (max-width: 991px) {
    flex-direction: row;
    margin-top: 10px;
    justify-content: center;
    align-items: center;
  }
`;

export const NavMenuRight = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  align-items: center;
  @media (max-width: 991px) {
    flex-direction: column;
    margin-top: 10px;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

export const NavLogoImg = styled.img`
  max-width: 50px;
`;

export const NavTitle = styled.h3`
  margin: 0 10px;
`;

export const NavLinkButton = styled.button`
  border: 0px;
  background-color: white;
  margin: 0 10px;
  font-size: medium;
  :hover {
    color: blue;
  }
  @media (max-width: 991px) {
    margin: 10px 10px;
    font-size: x-large;
  }
`;

export const ResponsiveNavButton = styled.button`
  border-color: black;
  color: black;
  text-align: center;
  height: fit-content;
  border-radius: 5px;
  text-decoration: none;
  display: none;
  background-color: white;
  transition-duration: 0.4s;
  font-size: 16px;
  :hover {
    background-color: #e7e7e7;
  }

  @media (max-width: 991px) {
    display: flex;
  }
`;
