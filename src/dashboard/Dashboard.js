import { ContentMain } from "./contentMain/ContentMain";
import { SidebarMenu } from "./sidebar/SidebarMenu";
import styled, { ThemeProvider } from "styled-components";
import { getNightmode } from "./contentMain/utils";
import { useContext, useEffect, useState } from "react";
import { fetchUserInfo } from "../firebase";
import { UserContext } from "../UserContext";

const darkTheme = {
  color: "white",
  backgroundColor: "#212121",
  hoverSidebarColor: "#333193",
  opaqueColor: "#000000",
  formsBackgroundColor: "#b5b5b5",
  formsTextColor: "black",
  navBackgroundColor: "#b5b5b5",
  hoverCategoriesColor: "#373737",
};
const lightTheme = {
  color: "black",
  backgroundColor: "white",
  hoverSidebarColor: "#b3b2e6",
  opaqueColor: "#b5b5b5",
  formsBackgroundColor: "white",
  formsTextColor: "black",
  navBackgroundColor: "white",
  hoverCategoriesColor: "#dfdfdf",
};

const DashboardWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;
  box-sizing: content-box;
  border-bottom: 1px solid #d0d0d0;
  border-right: 1px solid #d0d0d0;
  max-height: 1080px;
  max-width: 1920px;
  min-height: 950px;
  color: ${(props) => props.theme.color};
  background-color: ${(props) => props.theme.backgroundColor};
`;

export function Dashboard() {
  const [userInfo, setUserInfo] = useState([]);
  const currentUser = useContext(UserContext);
  useEffect(() => {
    fetchUserInfo(currentUser, setUserInfo);
  }, [currentUser]);
  const nightmode = getNightmode(userInfo);

  return (
    <ThemeProvider theme={nightmode === "true" ? darkTheme : lightTheme}>
      <DashboardWrapper>
        <SidebarMenu userInfo={userInfo} />
        <ContentMain />
      </DashboardWrapper>
    </ThemeProvider>
  );
}
