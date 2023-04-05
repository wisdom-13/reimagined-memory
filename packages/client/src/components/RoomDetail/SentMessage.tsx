import React from "react";
import styled from "@emotion/styled";
import { MessageType } from "./MessageList";
import { useTheme } from "@emotion/react";

const Base = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-end;
  width: 100%;
`;

const SpeechBubble = styled.span<{ backgroundColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 15px 0 15px 0;
  margin-right: 0;
  margin-left: 5px;
  padding: 13px;
  font-size: 18px;
`;

const SentAt = styled.span`
  font-size: 14px;
  opacity: 0.8;
`;

interface Props extends MessageType { }

const SentMessage: React.FC<Props> = ({ content, timestamp }) => {
  const theme = useTheme();

  return (
    <Base>
      <SpeechBubble backgroundColor={theme.color.primary}>{content}</SpeechBubble>
      <SentAt>{timestamp}</SentAt>
    </Base>
  )
}

export default SentMessage;