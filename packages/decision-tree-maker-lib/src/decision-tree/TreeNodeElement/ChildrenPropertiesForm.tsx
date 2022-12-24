import { FC } from 'react';
import { DecisionTree } from '../types';
import TextInput from './TextInput';

interface ChildrenPropertiesFormProps {
  node: DecisionTree;
  onAttributeChange: (value: string, index: number) => void;
}

const ChildrenPropertiesForm: FC<ChildrenPropertiesFormProps> = ({ node, onAttributeChange }) => (
  <div className='h-full overflow-auto' onWheelCapture={(e) => e.stopPropagation()}>
    {node.attributes.dataPerChildPath.length > 0 && (
      <>
        {node.attributes.dataPerChildPath.map((child, index) => (
          <div key={index} className='flex flex-col items-start'>
            <p className='font-bold'>Child {index + 1}</p>
            <TextInput title='Label' value={child.label} onChange={(value) => onAttributeChange(value, index)} />
          </div>
        ))}
      </>
    )}
  </div>
);

export default ChildrenPropertiesForm;
