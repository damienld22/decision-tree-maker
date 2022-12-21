import { FC, useState } from 'react';
import { FaPlus, FaTrashAlt } from 'react-icons/fa';
import TextInput from './TextInput';
import { DecisionTree, DecisionTreeAttributes } from './types';

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
  nodeDatum,
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

  const AddButton = () => (
    <p
      onClick={(evt) => {
        evt.stopPropagation();
        onAddNode(nodeDatum.name);
      }}
      className='mr-4 cursor-pointer'
    >
      <FaPlus />
    </p>
  );

  const DeleteButton = () => (
    <p
      className='mr-4 cursor-pointer'
      onClick={(evt) => {
        evt.stopPropagation();
        onDeleteNode(nodeDatum as DecisionTree);
      }}
    >
      <FaTrashAlt />
    </p>
  );

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
            {nodeDatum.children.length > 0 && (
              <a
                onClick={() => setCurrentTab('children')}
                className={`tab tab-bordered ${currentTab === 'children' && 'tab-active'}`}
              >
                Children
              </a>
            )}
          </div>

          {currentTab === 'properties' && (
            <div className='h-full overflow-auto' onWheelCapture={(e) => e.stopPropagation()}>
              <TextInput
                title='Title'
                value={nodeDatum?.attributes?.title}
                onChange={(value: string) => onEditAttribute(nodeDatum.name, { title: value })}
              />
              <TextInput
                title='Description'
                value={nodeDatum?.attributes?.description}
                onChange={(value: string) => onEditAttribute(nodeDatum.name, { description: value })}
              />
            </div>
          )}

          {currentTab === 'children' && (
            <div className='h-full overflow-auto' onWheelCapture={(e) => e.stopPropagation()}>
              {nodeDatum.attributes.dataPerChildPath.length > 0 && (
                <>
                  {nodeDatum.attributes.dataPerChildPath.map((child, index) => (
                    <div key={index} className='flex flex-col items-start'>
                      <p className='font-bold'>Child {index + 1}</p>
                      <TextInput
                        title='Label'
                        value={child.label}
                        onChange={(value: string) =>
                          onEditAttribute(nodeDatum.name, {
                            dataPerChildPath: nodeDatum.attributes.dataPerChildPath.map((elt, i) =>
                              index === i ? { label: value } : elt,
                            ),
                          })
                        }
                      />
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
        <div className='flex justify-end items-center'>
          <AddButton />
          <div>{nodeDatum.parentNodeName && <DeleteButton />}</div>
        </div>
      </div>
    </foreignObject>
  );
};

export default TreeNodeElement;
