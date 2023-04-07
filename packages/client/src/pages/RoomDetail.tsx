import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { css, Global } from "@emotion/react";
import { io } from "socket.io-client";

import MessageList from "../components/RoomDetail/MessageList";
import InputChat from "../components/RoomDetail/InputChat";
import TopNavigation from "../components/RoomDetail/TopNavigation";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { fetchMyprofile } from "../apis/userApi";
import { fetchChatRoomDetail } from "../apis/roomApi";
import { fetchChatMessageList, sendChatMessage } from "../apis/chatApi";
import { IChat, IProfile, IRoom } from "../types";
import { AxiosResponse, AxiosError } from "axios";
import SentMessage from "../components/RoomDetail/SentMessage";
import ReceiveMessage from "../components/RoomDetail/ReceiveMessage";

const Base = styled.div`
  position: relative;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 64px;
  align-items: center;
  padding: 0 24px;
`;

const globalStyle = css`
  body {
    background: #abc1d1;
  }
`

const RoomDetail: React.FC = () => {
  const scrollBottomRef = useRef<HTMLLIElement>(null);
  const { roomId } = useParams<string>();

  const { data: profileData } = useQuery<AxiosResponse<IProfile>, AxiosError>(
    'fetchMyProfile',
    fetchMyprofile
  );

  const { data: chatRoomDetailData } = useQuery<AxiosResponse<IRoom>, AxiosError>(
    ['fetchChatRoomDetail', roomId],
    () => fetchChatRoomDetail(roomId as string)
  );

  const { data: chatListData } = useQuery<AxiosResponse<Array<IChat>>>(
    ['fetchChatMessageList', roomId],
    () => fetchChatMessageList(roomId as string)
  );

  const [messages, setMessages] = useState<Array<IChat>>(chatListData?.data || []);

  useEffect(() => {
    const socket = io('http://localhost:8000', { path: '/socket.io' });
    socket.emit('join', roomId);
    socket.on('chat', (newMessage: IChat) => {
      setMessages((prev) => [...prev, newMessage]);
    })
  }, [])

  const mutation = useMutation('sendChatMessage', (content: string) => sendChatMessage(roomId as string, content));

  useEffect(() => {
    scrollBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages])

  const handleSend = (content: string) => {
    if (content.length) {
      mutation.mutate(content);
    }
  }

  return (
    <Base>
      <Global styles={globalStyle} />

      {chatRoomDetailData && (
        <TopNavigation title={chatRoomDetailData?.data.user.username} />
      )}
      <Container>
        <MessageList>
          {
            messages.map(message =>
              message.senderId === profileData?.data.userId ? (
                <SentMessage
                  senderId={message.senderId}
                  content={message.content}
                  timestamp={message.createdAt}
                />
              ) : (
                <ReceiveMessage
                  receiver={message.user?.username}
                  senderId={message.senderId}
                  content={message.content}
                  timestamp={message.createdAt}
                />
              ))
          }
          <li ref={scrollBottomRef} />
        </MessageList>
        <InputChat onClick={handleSend} />
      </Container>
    </Base>
  )
}

export default RoomDetail;