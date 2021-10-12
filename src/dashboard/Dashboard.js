import { ContentMain } from "./contentMain/ContentMain";
import { SidebarMenu } from "./sidebar/SidebarMenu";
import styled, { ThemeProvider } from "styled-components";
import { getNightmode } from "./contentMain/utils";
import { useContext, useEffect, useState } from "react";
import { fetchUserInfo } from "../firebase";
import { UserContext } from "../UserContext";

const darkTheme = {
  ///OLD

  backgroundColor: "#212121",

  background1: "rgb(46,46,46)",
  background2:
    "linear-gradient(0deg, rgba(46,46,46,1) 0%, rgba(122,122,122,1) 100%)",
  ///NEW
  categoriesHover: "#373737",
  navBackground: "#b5b5b5",
  opaqueBackground: "#000000",
  formsColor: "black",
  formsBackground: "#b5b5b5",
  dashboardBackground: "rgb(24, 25, 26)",
  color: "white",
  contentBackground: "#4E4E4E",
  sidebarBackground: "#4E4E4E",
  sidebarHover: "#333193",
};
const lightTheme = {
  ///OLD

  backgroundColor: "white",

  background1: "white",
  background2: "white",
  ///NEW
  categoriesHover: "#dfdfdf",
  navBackground: "",
  opaqueBackground: "#b5b5b5",
  formsColor: "black",
  formsBackground: "white",
  color: "black",
  dashboardBackground: "grey",
  contentBackground: "white",
  sidebarBackground: "white",
  sidebarHover: "#b3b2e6",
};
const DashboardWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  box-sizing: content-box;
  border-bottom: 1px solid #d0d0d0;
  border-right: 1px solid #d0d0d0;
  color: ${(props) => props.theme.color};
  background-color: ${(props) => props.theme.dashboardBackground};
`;
const ContentMainWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.dashboardBackground};
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
        <ContentMainWrapper className="contentMainWrapper">
          <ContentMain />
        </ContentMainWrapper>
      </DashboardWrapper>
    </ThemeProvider>
  );
}
