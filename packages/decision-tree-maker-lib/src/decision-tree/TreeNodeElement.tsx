import { FC } from 'react';
import { RawNodeDatum } from 'react-d3-tree/lib/types/common';
import styles from './style.module.css';
import { FaPencilAlt, FaPlus } from 'react-icons/fa';

export interface TreeNodeElementProps {
  onAddNode: (parentName: string) => void;
  nodeDatum: RawNodeDatum;
  onNodeClick: () => void;
}

const TreeNodeElement: FC<TreeNodeElementProps> = ({
  nodeDatum,
  onNodeClick,
  onAddNode = () => {},
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
    <p className={styles.editButton}>
      <FaPencilAlt />
    </p>
  );

  return (
    <foreignObject
      width={width}
      height={height}
      x={x}
      y={y}
      className={styles.treeNodeElementContainer}
    >
      <div className={styles.treeNodeElementDiv} onClick={onNodeClick}>
        <div className={styles.topBarNode}>
          <EditButton />
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
