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
  background1: "rgb(46,46,46)",
  background2:
    "linear-gradient(0deg, rgba(46,46,46,1) 0%, rgba(122,122,122,1) 100%)",
};
const lightTheme = {
  color: "black",
  backgroundColor: "white",
  hoverSidebarColor: "#b3b2e6",
  opaqueColor: "#b5b5b5",
  formsBackgroundColor: "white",
  formsTextColor: "black",
  navBackgroundColor: "",
  hoverCategoriesColor: "#dfdfdf",
  background1: "white",
  background2: "white",
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
  background: ${(props) => props.theme.background1};
  background: ${(props) => props.theme.background2};
`;
const ContentMainWrapper = styled.div`
  width: 100%;
  height: 100%;
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
