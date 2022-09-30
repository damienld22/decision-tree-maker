import { FC } from 'react';
import { RawNodeDatum } from 'react-d3-tree/lib/types/common';
import styles from './style.module.css';

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
  const height = 100;
  const width = 150;
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
      +
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
        <p>{nodeDatum?.attributes?.title}</p>
        <AddButton />
      </div>
    </foreignObject>
  );
};

export default TreeNodeElement;
