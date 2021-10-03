import styled from "styled-components";
import { RecentList } from "./RecentList";

const RecentWrapper = styled.div`
  width: 50%;
  height: 100%;
  border-right: 1px solid #d0d0d0;
  min-width: 670px;
  overflow-y: scroll;
  padding: 20px;
  ::-webkit-scrollbar {
    width: 15px;
  }
  ::-webkit-scrollbar-track {
    background: #b49600;
  }
  ::-webkit-scrollbar-thumb {
    background: #ffd600;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #ffd500a2;
  }
`;

const RecentTitle = styled.h1`
  font-size: 30px;
  margin-bottom: 20px;
`;

export const Recent = (props) => {
  return (
    <RecentWrapper>
      <RecentTitle>Recent</RecentTitle>
      <RecentList database={props.database}></RecentList>
    </RecentWrapper>
  );
};
