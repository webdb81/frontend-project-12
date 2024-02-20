import { useDispatch } from 'react-redux';
import {
  Button, ButtonGroup, Dropdown,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { updateCurrentChannel } from '../slices/channelsSlice';
import filterWords from '../profanity';

const Channel = ({ channelInfo, setModalInfo, isCurrent }) => {
  const dispatch = useDispatch();
  const { name, id, removable } = channelInfo;
  const { t } = useTranslation();

  const variant = isCurrent ? 'secondary' : null;

  const filteredChannelName = filterWords(name);

  const handleChannelRemove = () => {
    setModalInfo({
      type: 'removing',
      item: {
        name,
        id,
      },
    });
  };
  const handleChannelRename = () => {
    setModalInfo({
      type: 'renaming',
      item: {
        name: filteredChannelName,
        id,
      },
    });
  };

  return (
    <li
      key={id}
      className="nav-item w-100"
    >
      {removable ? (
        <Dropdown as={ButtonGroup} className="d-flex btn-group">
          <Button
            type="button"
            variant={variant}
            className="w-100 rounded-0 text-start text-truncate"
            onClick={() => dispatch(updateCurrentChannel({ id }))}
          >
            <span className="me-1">#</span>
            {filteredChannelName}
          </Button>

          <Dropdown.Toggle
            split
            variant={variant}
            className="flex-grow-0"
          >
            <span className="visually-hidden">{t('chatPage.channelManagement')}</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => handleChannelRemove(id)}
            >
              {t('modals.removeChannel.event')}
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => handleChannelRename(id)}
            >
              {t('modals.renameChannel.title')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Button
          type="button"
          variant={variant}
          className="w-100 rounded-0 text-start"
          onClick={() => dispatch(updateCurrentChannel({ id }))}
        >
          <span className="me-1">#</span>
          {filteredChannelName}
        </Button>
      )}
    </li>
  );
};

export default Channel;
