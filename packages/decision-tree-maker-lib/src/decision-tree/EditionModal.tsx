import { FC, useState } from 'react';
import { DecisionTree, DecisionTreeAttributes } from './types';

interface EditionModalProps {
  decisionTreeNode: DecisionTree;
  onCancel: () => void;
  onValidate: (updatedAttributes: DecisionTreeAttributes) => void;
}

const EditionModal: FC<EditionModalProps> = ({ decisionTreeNode, onCancel, onValidate }) => {
  const [updatedAttributes, setUpdatedAttributes] = useState<DecisionTreeAttributes>(
    decisionTreeNode.attributes!,
  );

  return (
    <div className='card border-2 border-black bg-base-100 shadow-xl absolute left-1/2 top-1/2 -translate-x-2/4 -translate-y-2/4 z-50'>
      <div className='card-body'>
        <h2 className='card-title'>Edition</h2>

        <div className='form-control w-full max-w-xs'>
          <label className='label'>
            <span className='label-text'>Title</span>
          </label>
          <input
            type='text'
            className='input input-bordered w-full max-w-xs'
            value={(updatedAttributes?.title as string) || ''}
            onChange={(evt) =>
              setUpdatedAttributes((prev) => ({ ...prev, title: evt.target.value }))
            }
          />
        </div>

        <div className='flex flex-row justify-evenly'>
          <button className='btn btn-outline' onClick={onCancel}>
            Cancel
          </button>
          <button className='btn' onClick={() => onValidate(updatedAttributes)}>
            Validate
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditionModal;
