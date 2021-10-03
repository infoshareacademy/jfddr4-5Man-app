import { ContentMain } from "./contentMain/ContentMain";
import { SidebarMenu } from "./sidebar/SidebarMenu";
import "./dashboard.css"

export function Dashboard() {
    return (
        <div className="dashboardMain">
            <SidebarMenu />
            <ContentMain />
        </div>
    )
}