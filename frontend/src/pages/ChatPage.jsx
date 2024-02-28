import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import {
  Container, Row, Col, Form, Spinner,
} from 'react-bootstrap';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { animateScroll } from 'react-scroll';
import { useGetChannelsQuery } from '../api/channelsApi';
import {
  useGetMessagesQuery,
  useSendMessageMutation,
} from '../api/messagesApi';

import { addMessages } from '../slices/messagesSlice';
import { addChannels } from '../slices/channelsSlice';
import { toastErrors } from '../toasts';
import filterWords from '../profanity';
import getModal from '../components/ModalsChannel/index';
import Channel from '../components/Channel';

const ChatPage = () => {
  const { token, username } = JSON.parse(localStorage.getItem('userId'));
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const messages = useSelector((state) => state.messages.data);
  const channels = useSelector((state) => state.channels.data);
  const selectedChannel = useSelector((state) => state.channels.currentChannel);

  const [sendMessage] = useSendMessageMutation();

  const [modalInfo, setModalInfo] = useState({ type: null, item: null });
  const hideModal = () => setModalInfo({ type: null, item: null });

  const handleChannelAdding = () => {
    setModalInfo({ type: 'adding' });
  };

  const handleMessageSending = (values, { resetForm }) => {
    sendMessage({
      token,
      body: filterWords(values.message),
      channelId: selectedChannel,
      username,
    })
      .then(() => resetForm())
      .catch((err) => console.log(err.message));
  };

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: handleMessageSending,
  });

  const renderModal = () => {
    if (!modalInfo.type) return null;

    const Modal = getModal(modalInfo.type);

    return (
      <Modal
        handleClose={hideModal}
        modalInfo={modalInfo.item}
        channels={channels.map((e) => e.name)}
      />
    );
  };

  const inputRef = useRef(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const lastChannelId = channels.at(-1)?.id;
    const defaultChannelId = channels[0]?.id;

    if (selectedChannel === defaultChannelId) {
      animateScroll.scrollToTop({ containerId: 'channels-list', delay: 0, duration: 0 });
    }
    if (selectedChannel === lastChannelId) {
      animateScroll.scrollToBottom({ containerId: 'channels-list', delay: 0, duration: 0 });
    }
  }, [channels, selectedChannel]);

  useEffect(() => {
    animateScroll.scrollToBottom({ containerId: 'messages-list', delay: 0, duration: 0 });
  }, [messages.length]);

  const currentChannelId = (channelsList) => {
    const activeChannel = channelsList.find((channel) => channel.id === selectedChannel);
    return activeChannel ? activeChannel.name : t('errors.channelNotFound');
  };

  const {
    data: messagesData,
    error: messagesError,
    isLoading: isMessageLoading,
  } = useGetMessagesQuery(token);

  const {
    data: channelsData,
    error: channelsError,
    isLoading: isChannelLoading,
  } = useGetChannelsQuery(token);

  useEffect(() => {
    if (isChannelLoading || isMessageLoading) {
      return;
    }
    if (channelsError || messagesError) {
      console.log('error');
      toastErrors(t('toast.error.network'));
      return;
    }
    dispatch(addMessages(messagesData));
    dispatch(addChannels(channelsData));
  }, [
    messagesData,
    channelsData,
    isChannelLoading,
    isMessageLoading,
    messagesError,
    channelsError,
    dispatch,
    t,
  ]);

  return isMessageLoading
      || isChannelLoading
      || channelsError
      || messagesError ? (
        <div className="h-100 d-flex justify-content-center align-items-center">
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">{t('loading')}</span>
          </Spinner>
        </div>
    ) : (
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">

          <Col className="col-4 col-md-2 border-end p-0 h-100">
            <div className="d-flex flex-column h-100">
              <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                <p className="m-0">
                  <b>{t('chatPage.channelsTitle')}</b>
                </p>
                <button
                  type="button"
                  className="p-0 text-primary btn btn-group-vertical"
                  onClick={handleChannelAdding}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    width="20"
                    height="20"
                    fill="currentColor"
                  >
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                  </svg>
                  <span className="visually-hidden">{t('chatPage.plus')}</span>
                </button>
              </div>

              <ul
                id="channels-list"
                className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
              >
                {channels.map((channelInfo) => (
                  <Channel
                    key={channelInfo.id}
                    isCurrent={channelInfo.id === selectedChannel}
                    channelInfo={channelInfo}
                    setModalInfo={setModalInfo}
                  />
                ))}
              </ul>
            </div>
          </Col>

          <Col className="p-0 h-100">
            <div className="d-flex flex-column h-100">
              <div className="bg-light mb-4 p-3 shadow-sm small">
                <p className="m-0">
                  <b>
                    #
                    {' '}
                    {filterWords(currentChannelId(channels))}
                  </b>
                </p>
                <span className="text-muted">
                  {t('chatPage.messagesNumber.msg', {
                    count: messages.filter(
                      (e) => e.channelId === selectedChannel,
                    ).length,
                  })}
                </span>
              </div>
              <div
                id="messages-list"
                className="chat-messages overflow-auto px-5 "
              >
                {messages
                  .filter((e) => e.channelId === selectedChannel)
                  .map(({ username: messageAuthor, body, id }) => (
                    <div className="text-break mb-2" key={id}>
                      <b>{`${messageAuthor}: `}</b>
                      {body}
                    </div>
                  ))}
              </div>
              <div className="mt-auto px-5 py-3">
                <Form
                  onSubmit={formik.handleSubmit}
                  className="py-1 border rounded-2"
                  noValidate
                >
                  <Form.Group className="input-group has-validation">
                    <Form.Control
                      ref={inputRef}
                      name="message"
                      placeholder={t('chatPage.messageInput')}
                      aria-label={t('chatPage.messageNew')}
                      className="border-0 p-0 ps-2"
                      value={formik.values.message}
                      onChange={formik.handleChange}
                    />
                    <button
                      type="submit"
                      className="btn btn-group-vertical"
                      disabled={!formik.values.message}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        width="20"
                        height="20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                        />
                      </svg>
                      <span className="visually-hidden">{t('modals.submitButton')}</span>
                    </button>
                  </Form.Group>
                </Form>
              </div>
            </div>
          </Col>

          {renderModal({ modalInfo })}
        </Row>
      </Container>
    );
};

export default ChatPage;
