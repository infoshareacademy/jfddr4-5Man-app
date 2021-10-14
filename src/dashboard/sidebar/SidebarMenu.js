import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import { getSidebarInfo } from "../contentMain/utils";
import { signOutFunc } from "../../firebase";
import { picturesToDisplay } from "../contentMain/settings/PicturePicker";
import { animateContentMain } from "../contentMain/animations";

const UserDisplay = styled.div`
  display: flex;
  align-items: center;
  margin: auto 0 20px 5px;
`;
const UserImage = styled.div`
  background-color: white;
  margin-right: 15px;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  img {
    width: 40px;
    height: 40px;
  }
`;
const UserName = styled.p`
  font-size: 25px;
  margin-bottom: 8px;
  max-width: 190px;
  letter-spacing: 1px;
`;
const Logout = styled.p`
  cursor: pointer;
`;
const SidebarWrapper = styled.aside`
  display: flex;
  flex-direction: column;
  width: 280px;
  padding: 10px 20px;
  color: ${(props) => props.theme.color};
  background-color: ${(props) => props.theme.sidebarBackground};
`;
const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 60px;
`;
const LogoImage = styled.div`
  width: 50px;
  height: 50px;
  margin-right: 10px;
  img {
    width: 50px;
    height: 50px;
  }
`;
const Logo1 = styled.h2`
  font-size: 25px;
  margin-right: 7px;
`;
const Logo2 = styled.h2`
  font-size: 25px;
  color: white;
  text-decoration: underline;
`;
const NavigationWrapper = styled.div`
  ul {
    list-style: none;
  }
`;
const NavigationItemWrapper = styled.li`
  font-size: 25px;
  border-radius: 25px;
  margin-bottom: 20px;
  letter-spacing: 2px;
  transition: background-color 0.2s ease-out;
  &:hover {
    background-color: ${(props) => props.theme.sidebarHover};
  }
  a {
    color: inherit;
    box-sizing: content-box;
    padding: 15px;
    display: flex;
    align-items: center;
  }
`;
const NavigationItemText = styled.span`
  margin-left: 20px;
`;

export function SidebarMenu(props) {
  const sidebarInfo = getSidebarInfo(props.userInfo);
  const pictures = picturesToDisplay;

  const initialActiveSetter = () => {
    if (window.location.href.includes("home")) {
      return "home";
    }
    if (window.location.href.includes("budget")) {
      return "budget";
    }
    if (window.location.href.includes("history")) {
      return "history";
    }
    if (window.location.href.includes("settings")) {
      return "settings";
    }
  };
  const [activeNav, setActiveNav] = useState(initialActiveSetter());

  return (
    <SidebarWrapper>
      <LogoWrapper>
        <LogoImage>
          <img src="../../../images/logo.png" alt=""></img>
        </LogoImage>
        <Logo1>YOUR</Logo1>
        <Logo2>MONEY</Logo2>
      </LogoWrapper>
      <NavigationWrapper>
        <ul>
          <NavigationItemWrapper
            className="navHome"
            style={activeNav === "home" ? { backgroundColor: "#5350e9" } : {}}
            onClick={() => {
              setActiveNav("home");
              activeNav !== "home" && animateContentMain();
            }}
          >
            <Link to="/main/home">
              <HomeIcon sx={{ fontSize: 40 }} />
              <NavigationItemText>Home</NavigationItemText>
            </Link>
          </NavigationItemWrapper>
          <NavigationItemWrapper
            className="navBudget"
            style={activeNav === "budget" ? { backgroundColor: "#5350e9" } : {}}
            onClick={() => {
              setActiveNav("budget");
              activeNav !== "budget" && animateContentMain();
            }}
          >
            <Link to="/main/budget">
              <AccountBalanceWalletIcon sx={{ fontSize: 40 }} />
              <NavigationItemText>Budget</NavigationItemText>
            </Link>
          </NavigationItemWrapper>
          <NavigationItemWrapper
            className="navHistory"
            style={
              activeNav === "history" ? { backgroundColor: "#5350e9" } : {}
            }
            onClick={() => {
              setActiveNav("history");
              activeNav !== "history" && animateContentMain();
            }}
          >
            <Link to="/main/history">
              <LibraryBooksIcon sx={{ fontSize: 40 }} />
              <NavigationItemText>History</NavigationItemText>
            </Link>
          </NavigationItemWrapper>
          <NavigationItemWrapper
            className="navSettings"
            style={
              activeNav === "settings" ? { backgroundColor: "#5350e9" } : {}
            }
            onClick={() => {
              setActiveNav("settings");
              activeNav !== "settings" && animateContentMain();
            }}
          >
            <Link to="/main/settings">
              <SettingsIcon sx={{ fontSize: 40 }} />
              <NavigationItemText>Settings</NavigationItemText>
            </Link>
          </NavigationItemWrapper>
        </ul>
      </NavigationWrapper>
      <UserDisplay>
        <UserImage>{pictures[sidebarInfo.picture]}</UserImage>
        <div>
          <UserName>{sidebarInfo.name}</UserName>
          <Logout
            onClick={() => {
              signOutFunc();
            }}
          >
            Logout
          </Logout>
        </div>
      </UserDisplay>
    </SidebarWrapper>
  );
}
