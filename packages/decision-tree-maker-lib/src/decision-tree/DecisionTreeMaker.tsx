import { FC, useEffect, useState } from 'react';
import Tree from 'react-d3-tree';
import { useCenteredTree } from '../hooks/useCenteredTree';
import useDecisionTree from '../hooks/useDecisionTree';
import TreeNodeElement from './TreeNodeElement';
import { DecisionTree } from './types';

export interface DecisionTreeMakerProps {
  width?: number | string;
  height?: number | string;
  onChange?: (tree: DecisionTree) => void;
  selectedNodeStyle?: React.CSSProperties;
}

const DecisionTreeMaker: FC<DecisionTreeMakerProps> = ({
  width = 500,
  height = 500,
  onChange = () => {},
  selectedNodeStyle,
}) => {
  const { containerRef, translate } = useCenteredTree();
  const nodeSize = 400;
  const { tree, zoom, addChild, updateNodeProperties, deleteNode } = useDecisionTree();
  const [selectedNode, setSelectedNode] = useState<DecisionTree>();

  useEffect(() => {
    onChange(tree);
  }, [tree]);

  return (
    <div style={{ width, height, border: '1px solid' }} ref={containerRef}>
      <Tree
        zoom={zoom}
        data={tree as any} // eslint-disable-line @typescript-eslint/no-explicit-any
        translate={translate}
        renderCustomNodeElement={(props) => (
          <TreeNodeElement
            {...(props as any)} // eslint-disable-line @typescript-eslint/no-explicit-any
            onAddNode={addChild}
            onDeleteNode={deleteNode}
            selectedNodeStyle={selectedNodeStyle}
            isSelectedNode={props.nodeDatum.name === selectedNode?.name} // eslint-disable-line react/prop-types
            onEditAttribute={updateNodeProperties}
          />
        )}
        nodeSize={{ x: nodeSize, y: nodeSize }}
        orientation='vertical'
        collapsible={false}
        onNodeClick={({ data }) => {
          console.log('[decision-tree-maker] OnNodeClick', data);
          setSelectedNode(data as unknown as DecisionTree);
        }}
      />
    </div>
  );
};

export default DecisionTreeMaker;
