import { FC } from 'react';
import { DecisionTree } from '../types';
import TextInput from './TextInput';

interface NodePropertiesForm {
  node: DecisionTree;
  onPropertyChange: (value: string, property: string) => void;
}

const NodePropertiesForm: FC<NodePropertiesForm> = ({ node, onPropertyChange }) => (
  <div className='h-full overflow-auto' onWheelCapture={(e) => e.stopPropagation()}>
    <TextInput
      title='Title'
      value={node?.attributes?.title}
      onChange={(value: string) => onPropertyChange(value, 'title')}
    />
    <TextInput
      title='Description'
      value={node?.attributes?.description}
      onChange={(value: string) => onPropertyChange(value, 'description')}
    />
  </div>
);

export default NodePropertiesForm;
