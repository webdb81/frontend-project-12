import { useContext } from 'react';

import { ChatContext } from '../contexts/ChatContext.jsx';

const useChat = () => useContext(ChatContext);

export default useChat;
