import React from "react";
import styled from "@emotion/styled";

const Base = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0 0 64px 0;
`;

interface Props {
  children: React.ReactNode
}

const FriendList: React.FC<Props> = ({ children }) => {
  return (
    <Base>
      {children}
    </Base>
  )
}

export default FriendList;