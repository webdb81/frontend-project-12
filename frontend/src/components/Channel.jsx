import { useDispatch } from 'react-redux';
import {
  Button, ButtonGroup, Dropdown,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { updateCurrentChannel } from '../slices/channelsSlice';
import filterWords from '../profanity';

const Channel = ({ channelInfo, setModalInfo }) => {
  const dispatch = useDispatch();
  const { name, id, removable } = channelInfo;
  const { t } = useTranslation();

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
            variant="secondary"
            className="w-100 rounded-0 text-start btn"
            onClick={() => dispatch(updateCurrentChannel({ id }))}
          >
            <span className="me-1">#</span>
            {filteredChannelName}
          </Button>

          <Dropdown.Toggle
            split
            variant="secondary"
            className="flex-grow-0"
          />

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
          variant="secondary"
          className="w-100 rounded-0 text-start btn"
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
