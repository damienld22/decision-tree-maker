import { RenderCustomNodeElementFn } from "react-d3-tree/lib/types/common";
import styles from './style.module.css';

const TreeNodeElement: RenderCustomNodeElementFn = ({ nodeDatum }) => {
  const height = 200;
  const width = 300;
  const x = -150;
  const y = - (height / 6);

  return (
    <g>
      <circle r={15}></circle>
      <foreignObject width={width} height={height} x={x} y={y}>
        <div className={styles.treeNodeElementContainer}>
          <p>{nodeDatum?.attributes?.title}</p>
        </div>
      </foreignObject>
    </g>
  )
}

export default TreeNodeElement;
