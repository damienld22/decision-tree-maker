import { FC } from 'react';
import { FaPlus } from 'react-icons/fa';

interface AddButtonProps {
  onClick: () => void;
}

const AddButton: FC<AddButtonProps> = ({ onClick }) => (
  <p
    onClick={(evt) => {
      evt.stopPropagation();
      onClick();
    }}
    className='mr-4 cursor-pointer'
  >
    <FaPlus />
  </p>
);

export default AddButton;
