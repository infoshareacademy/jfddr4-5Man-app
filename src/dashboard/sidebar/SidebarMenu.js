import "./sidebar.css";
import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContext";
import { getSidebarInfo } from "../contentMain/utils";
import { fetchUserInfo } from "../../firebase";
import { picturesToDisplay } from "../contentMain/settings/PicturePicker";

const UserDisplay = styled.div`
  display: flex;
  align-items: center;
  color: white;
  margin-left: 10px;
`;
const UserImage = styled.div`
  background-color: white;
  margin-right: 10px;
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
  margin-bottom: 5px;
`;
const Logout = styled.p``;

export function SidebarMenu() {
  const [userInfo, setUserInfo] = useState([]);
  const currentUser = useContext(UserContext);
  useEffect(() => {
    fetchUserInfo(currentUser, setUserInfo);
  }, [currentUser]);
  const sidebarInfo = getSidebarInfo(userInfo);
  const pictures = picturesToDisplay;

  return (
    <div className="navigation">
      <h1 className="logo">
        Your <span className="logo2">Money</span>
      </h1>
      <ul>
        <li className="list active">
          <div>
            <Link to="/main/home">
              <span className="icon">
                <HomeIcon />
              </span>
              <span className="title">Home</span>
            </Link>
          </div>
        </li>
        <li className="list">
          <div>
            <Link to="/main/budget">
              <span className="icon">
                <AccountBalanceWalletIcon />
              </span>
              <span className="title">Budget</span>
            </Link>
          </div>
        </li>
        <li className="list">
          <div>
            <Link to="/main/history">
              <span className="icon">
                <LibraryBooksIcon />
              </span>
              <span className="title">History</span>
            </Link>
          </div>
        </li>
        <li className="list">
          <div>
            <Link to="/main/settings">
              <span className="icon">
                <SettingsIcon />
              </span>
              <span className="title">Settings</span>
            </Link>
          </div>
        </li>
      </ul>
      <UserDisplay>
        <UserImage>{pictures[sidebarInfo.picture]}</UserImage>
        <div>
          <UserName>{sidebarInfo.name}</UserName>
          <Logout>Logout</Logout>
        </div>
      </UserDisplay>
    </div>
  );
}
