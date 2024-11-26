import React, { useState, useEffect, useRef } from 'react';
import '../styles/StreamView.css';

interface StreamViewProps {
  isStreaming: boolean;
  spicyLevel: number;
  onDonation: (amount: number) => void;
}

interface ChatMessage {
  id: number;
  username: string;
  message: string;
  type: 'normal' | 'donation' | 'reaction';
}

const VIEWER_INCREASE_RATE = 1.2;
const BASE_DONATION_CHANCE = 0.1;

const StreamView: React.FC<StreamViewProps> = ({ isStreaming, spicyLevel, onDonation }) => {
  const [viewers, setViewers] = useState(100);
  const [likes, setLikes] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);
  const messageIdRef = useRef(0);

  const usernames = [
    '마라탕러버', '매운맛천재', '먹방최고', '맛있겠다', 
    '마라마라', '먹방왕', '맵찔이', '먹방홀릭'
  ];

  const reactions = [
    '와 대박!', '맛있겠다ㅠㅠ', '매워보여요!!', 
    '레전드입니다', '이게 먹방이지', '너무 맛있어 보여요'
  ];

  const addMessage = (message: Omit<ChatMessage, 'id'>) => {
    const newMessage = { ...message, id: messageIdRef.current++ };
    setMessages(prev => [...prev.slice(-50), newMessage]); // Keep last 50 messages
  };

  useEffect(() => {
    if (!isStreaming) {
      setViewers(100);
      setLikes(0);
      setMessages([]);
      return;
    }

    // 시청자 수 증가
    const viewerInterval = setInterval(() => {
      setViewers(prev => Math.floor(prev * VIEWER_INCREASE_RATE));
    }, 3000);

    // 채팅 메시지 생성
    const chatInterval = setInterval(() => {
      const username = usernames[Math.floor(Math.random() * usernames.length)];
      const reaction = reactions[Math.floor(Math.random() * reactions.length)];
      
      // 기부 확률 계산
      if (Math.random() < BASE_DONATION_CHANCE * (spicyLevel / 2)) {
        const donationAmount = Math.floor(Math.random() * 5 + 1) * 100;
        addMessage({
          username,
          message: `${donationAmount}원 후원합니다! 응원해요!`,
          type: 'donation'
        });
        onDonation(donationAmount);
      } else {
        addMessage({
          username,
          message: reaction,
          type: 'normal'
        });
      }

      // 좋아요 증가
      if (Math.random() < 0.3) {
        setLikes(prev => prev + Math.floor(Math.random() * 3 + 1));
      }
    }, 1000);

    return () => {
      clearInterval(viewerInterval);
      clearInterval(chatInterval);
    };
  }, [isStreaming, spicyLevel, onDonation]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="stream-view">
      <div className="stream-stats">
        <div className="viewer-count">👥 {viewers.toLocaleString()}</div>
        <div className="like-count">❤️ {likes.toLocaleString()}</div>
      </div>
      <div className="chat-container" ref={chatRef}>
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`chat-message ${message.type}`}
          >
            <span className="username">{message.username}</span>
            <span className="message">{message.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StreamView;
