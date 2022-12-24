import { FC, useState } from 'react';
import { FaPencilAlt, FaCheck } from 'react-icons/fa';

interface TextInputProps {
  title: string;
  value?: string;
  onChange: (value: string) => void;
}

const TextInput: FC<TextInputProps> = ({ title, value, onChange }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [currentValue, setCurrentValue] = useState(value || '');

  return (
    <div className='flex flex-row items-center my-6'>
      <div className='form-control w-full max-w-xs'>
        <label className='label'>
          <span className='label-text'>{title}</span>
          <div className='label-text-alt cursor-pointer'>
            {isDisabled ? (
              <FaPencilAlt onClick={() => setIsDisabled(false)} />
            ) : (
              <FaCheck
                onClick={() => {
                  setIsDisabled(true);
                  onChange(currentValue);
                }}
              />
            )}
          </div>
        </label>
        <input
          onChange={(evt) => setCurrentValue(evt?.target?.value)}
          type='text'
          value={currentValue}
          className='input input-bordered w-full max-w-xs'
          disabled={isDisabled}
        />
      </div>
    </div>
  );
};

export default TextInput;
