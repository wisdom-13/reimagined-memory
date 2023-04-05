import React from "react";
import styled from "@emotion/styled";
import { css, Global } from "@emotion/react";

const Base = styled.div``;

const Container = styled.div``;

const globalStyle = css`
  body {
    background: #abc1d1;
  }
`

const RoomDetail: React.FC = () => {
  return (
    <Base>
      <Global styles={globalStyle} />
      <Container>


      </Container>
    </Base>
  )
}

export default RoomDetail;