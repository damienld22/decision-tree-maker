import { RenderCustomNodeElementFn } from "react-d3-tree/lib/types/common";
import styles from './style.module.css';

const TreeNodeElement: RenderCustomNodeElementFn = ({ nodeDatum }) => {
  const height = 100;
  const width = 150;
  const x = - (width / 2);
  const y = - (height / 2);

  return (
    <foreignObject width={width} height={height} x={x} y={y} className={styles.treeNodeElementContainer}>
      <div className={styles.treeNodeElementDiv}>
        <p>{nodeDatum?.attributes?.title}</p>
      </div>
    </foreignObject>
  )
}

export default TreeNodeElement;
