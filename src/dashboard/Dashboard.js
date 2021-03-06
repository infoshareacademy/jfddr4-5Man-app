import { ContentMain } from "./contentMain/ContentMain";
import { SidebarMenu } from "./sidebar/SidebarMenu";
import styled, { ThemeProvider } from "styled-components";
import { getNightmode } from "./contentMain/utils";
import { useContext, useEffect, useState } from "react";
import { fetchUserInfo } from "../firebase";
import { UserContext } from "../UserContext";

const darkTheme = {
  ///NEW
  categoriesHover: "#5350E9",
  navBackground: "#b5b5b5",
  opaqueBackground: "#000000",
  formsColor: "black",
  formsBackground: "#b5b5b5",
  dashboardBackground: "rgb(24, 25, 26)",
  color: "white",
  contentBackground: "#4E4E4E",
  sidebarBackground: "#4E4E4E",
  sidebarHover: "#333193",
  colorLogo: "white"
};
const lightTheme = {
  ///NEW
  categoriesHover: "#5350E9",
  navBackground: "",
  opaqueBackground: "#b5b5b5",
  formsColor: "black",
  formsBackground: "white",
  color: "black",
  dashboardBackground: "grey",
  contentBackground: "white",
  sidebarBackground: "white",
  sidebarHover: "#b3b2e6",
  colorLogo: "#5350E9"
};
const DashboardWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  box-sizing: content-box;
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
      {userInfo.length !== 0 && (
        <DashboardWrapper>
          <SidebarMenu userInfo={userInfo} />
          <ContentMainWrapper className="contentMainWrapper">
            <ContentMain nightmode={nightmode} />
          </ContentMainWrapper>
        </DashboardWrapper>
      )}
    </ThemeProvider>
  );
}
