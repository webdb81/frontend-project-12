import { useLocation, Navigate } from 'react-router-dom';

const ChatRoute = ({ children }) => {
  const location = useLocation();
  const userId = JSON.parse(localStorage.getItem('userId'));

  return userId && userId.token ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

const ChatPage = () => {
  console.log('ChatPage', 6);
  return (
    <ChatRoute>
      <h1>Страница чата</h1>
    </ChatRoute>
  );
};

export default ChatPage;
