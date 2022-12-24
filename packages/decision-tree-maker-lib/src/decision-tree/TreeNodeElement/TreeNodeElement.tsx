import { FC, useState } from 'react';
import { DecisionTree, DecisionTreeAttributes } from '../types';
import DeleteButton from './DeleteButton';
import AddButton from './AddButton';
import ChildrenPropertiesForm from './ChildrenPropertiesForm';
import NodePropertiesForm from './NodePropertiesForm';

export interface TreeNodeElementProps {
  onAddNode: (parentName: string) => void;
  onDeleteNode: (node: DecisionTree) => void;
  nodeDatum: DecisionTree;
  onNodeClick: () => void;
  isSelectedNode: boolean;
  selectedNodeStyle?: React.CSSProperties;
  onEditAttribute: (name: string, attributes: Partial<DecisionTreeAttributes>) => void;
}

const defaultSelectedNodeStyle = { border: '2px solid red' };

const TreeNodeElement: FC<TreeNodeElementProps> = ({
  nodeDatum: node,
  onNodeClick,
  onDeleteNode = () => {},
  onAddNode = () => {},
  onEditAttribute,
  isSelectedNode,
  selectedNodeStyle,
}) => {
  const height = 300;
  const width = 350;
  const x = -(width / 2);
  const y = -(height / 2);
  const [currentTab, setCurrentTab] = useState<'properties' | 'children'>('properties');

  return (
    <foreignObject
      width={width}
      height={height}
      x={x}
      y={y}
      className='border-black border-2 rounded-xl shadow bg-white'
    >
      <div
        className='absolute flex flex-col justify-between w-full h-full text-center cursor-move p-4'
        style={isSelectedNode ? selectedNodeStyle || defaultSelectedNodeStyle : {}}
        onClick={onNodeClick}
      >
        <div className='h-5/6 pb-4'>
          <div className='tabs'>
            <a
              onClick={() => setCurrentTab('properties')}
              className={`tab tab-bordered ${currentTab === 'properties' && 'tab-active'}`}
            >
              Properties
            </a>
            {node.children.length > 0 && (
              <a
                onClick={() => setCurrentTab('children')}
                className={`tab tab-bordered ${currentTab === 'children' && 'tab-active'}`}
              >
                Children
              </a>
            )}
          </div>

          {currentTab === 'properties' && (
            <NodePropertiesForm
              node={node}
              onPropertyChange={(value: string, property: string) => onEditAttribute(node.name, { [property]: value })}
            />
          )}

          {currentTab === 'children' && (
            <ChildrenPropertiesForm
              node={node}
              onAttributeChange={(value: string, index: number) => {
                onEditAttribute(node.name, {
                  dataPerChildPath: node.attributes.dataPerChildPath.map((elt, i) =>
                    index === i ? { label: value } : elt,
                  ),
                });
              }}
            />
          )}
        </div>
        <div className='flex justify-end items-center'>
          <AddButton onClick={() => onAddNode(node.name)} />
          <div>{node.parentNodeName && <DeleteButton onClick={() => onDeleteNode(node)} />}</div>
        </div>
      </div>
    </foreignObject>
  );
};

export default TreeNodeElement;
