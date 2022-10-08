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
}

const TreeNodeElement: FC<TreeNodeElementProps> = ({
  nodeDatum,
  onNodeClick,
  onDeleteNode = () => {},
  onAddNode = () => {},
  onOpenEdition,
}) => {
  const height = 120;
  const width = 200;
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
      <div className={styles.treeNodeElementDiv} onClick={onNodeClick}>
        <div className={styles.topBarNode}>
          <EditButton />
          {nodeDatum.parentNodeName && <DeleteButton />}
        </div>
        <p>{nodeDatum?.attributes?.title}</p>
        <div className={styles.bottomBarNode}>
          <AddButton />
        </div>
      </div>
    </foreignObject>
  );
};

export default TreeNodeElement;
