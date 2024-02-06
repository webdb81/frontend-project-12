import AddChannel from './AddChannel';
import RemoveChannel from './RemoveChannel';
import RenameChannel from './RenameChannel';

const modals = {
  adding: AddChannel,
  renaming: RenameChannel,
  removing: RemoveChannel,
};

export default (modalName) => modals[modalName];
