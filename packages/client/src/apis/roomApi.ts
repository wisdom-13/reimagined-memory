import axiosInstance from ".";

export interface MakeChatRoomRequest {
  opponentId: string;
}

export function fetchChatRoomList() {
  return axiosInstance.get('/rooms');
}

export function fetchChatRoomDetail(roomId: string) {
  return axiosInstance.get(`/rooms/${roomId}`);
}

export function makeChatRoom(body: MakeChatRoomRequest) {
  return axiosInstance.post('/rooms', body);
}