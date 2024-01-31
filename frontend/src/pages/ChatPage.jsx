import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '../hooks/useAuth.jsx';
import { fetchContent } from '../slices/channelsSlice.js';
import ChannelsList from '../components/ChannelsList.jsx';
import {
  getCurrentChannelId,
  getMessages,
  getChannels,
} from '../utils/getters.js';

const ChatPage = () => {
  const auth = useAuth();
  const header = auth.getAuthHeader();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContent(header));
  }, [dispatch, header]);

  const messages = useSelector(getMessages);
  const channels = useSelector(getChannels);
  const channelId = useSelector(getCurrentChannelId);
  const currentChannel = Object.values(channels.entities).find(
    ({ id }) => id === channelId,
  );
  const currentChannelMessages = Object.values(messages.entities).filter(
    (msg) => msg.channelId === channelId,
  );

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <ChannelsList />

        <Col className="p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                <b>{`# ${currentChannel?.name}`}</b>
              </p>
              <span className="text-muted">{`${currentChannelMessages.length} message`}</span>
            </div>

            <div id="messages-box" className="chat-messages overflow-auto px-5">
              {currentChannelMessages.map((message) => (
                <div key={message.id} className="text-break mb-2">
                  <b>{message.username}</b>
                  {': '}
                  {message.body}
                </div>
              ))}
            </div>
          </div>
        </Col>

      </Row>
    </Container>
  );
};

export default ChatPage;
