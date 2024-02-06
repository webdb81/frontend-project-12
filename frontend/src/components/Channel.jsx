import { useDispatch } from 'react-redux';
import {
  Button, ButtonGroup, Dropdown,
} from 'react-bootstrap';
import { updateCurrentChannel } from '../slices/channelsSlice';

const Channel = ({ channelInfo, setModalInfo }) => {
  const dispatch = useDispatch();
  const { name, id, removable } = channelInfo;

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
        name,
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
            {name}
          </Button>

          <Dropdown.Toggle
            split
            variant="secondary"
            className="flex-grow-0"
            // id="dropdown-split-basic"
          />

          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => handleChannelRemove(id)}
            >
              Удалить
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => handleChannelRename(id)}
            >
              Переименовать
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
          {name}
        </Button>
      )}
    </li>
  );
};

export default Channel;
