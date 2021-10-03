import "./sidebar.css";
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Link } from "react-router-dom";

export function SidebarMenu() {
    return (
        <div className="navigation">
            <h1 className="logo">Your <span className="logo2">Money</span></h1>
            <ul>
                <li className="list active">
                    <div>
                        <Link to="/main/home">
                            <span className="icon"><HomeIcon /></span>
                            <span className="title">Home</span>
                        </Link>
                    </div>
                </li>
                <li className="list">
                    <div>
                        <Link to="/main/budget">
                            <span className="icon"><AccountBalanceWalletIcon /></span>
                            <span className="title">Budget</span>
                        </Link>
                    </div>
                </li>
                <li className="list">
                    <div>
                        <Link to="/main/history">
                            <span className="icon"><LibraryBooksIcon /></span>
                            <span className="title">History</span>
                        </Link>
                    </div>
                </li>
                <li className="list">
                    <div>
                        <Link to="/main/settings">
                            <span className="icon"><SettingsIcon /></span>
                            <span className="title">Settings</span>
                        </Link>
                    </div>
                </li>
                <li className="list">
                    <div>
                        <Link to="/main/account">
                            <span className="icon"><AccountBoxIcon /></span>
                            <span className="title">Account</span>
                        </Link>
                    </div>
                </li>
            </ul>
        </div>
    )
}