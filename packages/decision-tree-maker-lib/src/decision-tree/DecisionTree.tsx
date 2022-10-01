import { FC, useEffect, useState } from 'react';
import Tree from 'react-d3-tree';
import { RawNodeDatum } from 'react-d3-tree/lib/types/common';
import { useCenteredTree } from '../hooks/useCenteredTree';
import useDecisionTree from '../hooks/useDecisionTree';
import TreeNodeElement from './TreeNodeElement';
import { DecisionTree } from './types';

export interface DecisionTreeProps {
  width?: number | string;
  height?: number | string;
  onSelectedNodeChanged?: (node?: RawNodeDatum) => void;
}

const DecisionTree: FC<DecisionTreeProps> = ({
  width = 500,
  height = 500,
  onSelectedNodeChanged = () => {},
}) => {
  const { containerRef, translate } = useCenteredTree();
  const nodeSize = 400;
  const { tree, zoom, addChild } = useDecisionTree();
  const [selectedNode, setSelectedNode] = useState<RawNodeDatum>();

  useEffect(() => {
    onSelectedNodeChanged(selectedNode);
  }, [selectedNode]);

  return (
    <div style={{ width, height, border: '1px solid' }} ref={containerRef}>
      <Tree
        zoom={zoom}
        data={tree as any} // eslint-disable-line @typescript-eslint/no-explicit-any
        translate={translate}
        renderCustomNodeElement={(props) => (
          <TreeNodeElement {...(props as any)} onAddNode={addChild} />
        )}
        nodeSize={{ x: nodeSize, y: nodeSize }}
        orientation='vertical'
        collapsible={false}
        onNodeClick={({ data }) => {
          console.log('[decision-tree-maker] OnNodeClick', data);
          setSelectedNode(data);
        }}
      />
    </div>
  );
};

export { RawNodeDatum };
export default DecisionTree;
