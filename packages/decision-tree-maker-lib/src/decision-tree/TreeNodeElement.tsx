import { FC } from 'react';
import styles from './style.module.css';
import { FaPencilAlt, FaPlus, FaTrashAlt } from 'react-icons/fa';
import { DecisionTree } from './types';

export interface TreeNodeElementProps {
  onAddNode: (parentName: string) => void;
  onDeleteNode: (node: DecisionTree) => void;
  nodeDatum: DecisionTree;
  onNodeClick: () => void;
  onOpenEdition: (decisionTree: DecisionTree) => void;
  isSelectedNode: boolean;
  selectedNodeStyle?: React.CSSProperties;
}

const defaultSelectedNodeStyle = { border: '2px solid red' };

const TreeNodeElement: FC<TreeNodeElementProps> = ({
  nodeDatum,
  onNodeClick,
  onDeleteNode = () => {},
  onAddNode = () => {},
  onOpenEdition,
  isSelectedNode,
  selectedNodeStyle,
}) => {
  const height = 250;
  const width = 250;
  const x = -(width / 2);
  const y = -(height / 2);

  const AddButton = () => (
    <p
      onClick={(evt) => {
        evt.stopPropagation();
        onAddNode(nodeDatum.name);
      }}
      className={styles.addButton}
    >
      <FaPlus />
    </p>
  );

  const EditButton = () => (
    <p
      className={styles.editButton}
      onClick={(evt) => {
        evt.stopPropagation();
        onOpenEdition(nodeDatum as DecisionTree);
      }}
    >
      <FaPencilAlt />
    </p>
  );

  const DeleteButton = () => (
    <p
      className={styles.deleteButton}
      onClick={(evt) => {
        evt.stopPropagation();
        onDeleteNode(nodeDatum as DecisionTree);
      }}
    >
      <FaTrashAlt />
    </p>
  );

  return (
    <foreignObject width={width} height={height} x={x} y={y} className={styles.treeNodeElementContainer}>
      <div
        className={styles.treeNodeElementDiv}
        style={isSelectedNode ? selectedNodeStyle || defaultSelectedNodeStyle : {}}
        onClick={onNodeClick}
      >
        <div className={styles.topBarNode}>
          <EditButton />
          {nodeDatum.parentNodeName && <DeleteButton />}
        </div>

        <div className={styles.treeNodeElementContent}>
          <p className='font-bold'>{nodeDatum?.attributes?.title}</p>
          <p className='line-clamp-3 italic text-sm'>{nodeDatum?.attributes?.description}</p>

          {nodeDatum.attributes.dataPerChildPath.length > 0 && (
            <div>
              <p className='underline'>Data per child : </p>

              {nodeDatum.attributes.dataPerChildPath.map((child, index) => (
                <div key={index} className='flex flex-col items-start'>
                  <p className='font-bold'>Child {index + 1}</p>
                  <p>Label : {child.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.bottomBarNode}>
          <AddButton />
        </div>
      </div>
    </foreignObject>
  );
};

export default TreeNodeElement;
