import { FC } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

interface DeleteButtonProps {
  onClick: () => void;
}

const DeleteButton: FC<DeleteButtonProps> = ({ onClick }) => (
  <p
    className='mr-4 cursor-pointer'
    onClick={(evt) => {
      evt.stopPropagation();
      onClick();
    }}
  >
    <FaTrashAlt />
  </p>
);

export default DeleteButton;
