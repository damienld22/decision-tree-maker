import { FC, useEffect, useState } from 'react';
import Tree from 'react-d3-tree';
import { useCenteredTree } from '../hooks/useCenteredTree';
import useDecisionTree from '../hooks/useDecisionTree';
import TreeNodeElement from './TreeNodeElement/TreeNodeElement';
import { DecisionTree } from './types';

const NODE_SIZE = 400;

export interface DecisionTreeMakerProps {
  width?: number | string;
  height?: number | string;
  onChange?: (tree: DecisionTree) => void;
  selectedNodeStyle?: React.CSSProperties;
}

const DecisionTreeMaker: FC<DecisionTreeMakerProps> = ({
  width = '100%',
  height = '100%',
  onChange = () => {},
  selectedNodeStyle,
}) => {
  const { containerRef, translate } = useCenteredTree();
  const { tree, zoom, addChild, updateNodeProperties, deleteNode } = useDecisionTree();
  const [selectedNode, setSelectedNode] = useState<DecisionTree>();

  // Call the "onChange" props when the tree is updated
  useEffect(() => {
    onChange(tree);
  }, [tree]);

  return (
    <div style={{ width, height }} ref={containerRef}>
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
        nodeSize={{ x: NODE_SIZE, y: NODE_SIZE }}
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
