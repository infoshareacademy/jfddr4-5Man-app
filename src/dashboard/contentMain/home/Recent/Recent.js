import styled from "styled-components";
import { RecentList } from "./RecentList";

const RecentWrapper = styled.div`
  width: 50%;
  height: 100%;
  min-width: 670px;
  padding: 20px;
  letter-spacing: 1px;
  background-color: ${(props) => props.theme.contentBackground};
  border-radius: 25px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const RecentTitle = styled.h1`
  font-size: 25px;
  margin-bottom: 15px;
`;

export const Recent = (props) => {
  return (
    <RecentWrapper>
      <RecentTitle>Recent</RecentTitle>
      <RecentList database={props.database}></RecentList>
    </RecentWrapper>
  );
};
