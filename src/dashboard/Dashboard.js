import { ContentMain } from "./contentMain/ContentMain";
import { SidebarMenu } from "./sidebar/SidebarMenu";
import styled from "styled-components";
import { getDashboardInfo } from "./contentMain/utils";
import { useContext, useEffect, useState } from "react";
import { fetchUserInfo } from "../firebase";
import { UserContext } from "../UserContext";

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
`;

export function Dashboard() {
  const [userInfo, setUserInfo] = useState([]);
  const currentUser = useContext(UserContext);
  useEffect(() => {
    fetchUserInfo(currentUser, setUserInfo);
  }, [currentUser]);
  const dashboardInfo = getDashboardInfo(userInfo);

  return (
    <DashboardWrapper
      style={
        dashboardInfo === "true"
          ? { backgroundColor: "#212121" }
          : { backgroundColor: "white" }
      }
    >
      <SidebarMenu />
      <ContentMain />
    </DashboardWrapper>
  );
}
