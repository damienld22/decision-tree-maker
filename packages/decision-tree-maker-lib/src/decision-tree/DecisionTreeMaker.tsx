import { FC, useEffect, useState } from 'react';
import Tree from 'react-d3-tree';
import { RawNodeDatum } from 'react-d3-tree/lib/types/common';
import { useCenteredTree } from '../hooks/useCenteredTree';
import useDecisionTree from '../hooks/useDecisionTree';
import EditionModal from './EditionModal';
import TreeNodeElement from './TreeNodeElement';
import { DecisionTree, DecisionTreeAttributes } from './types';

export interface DecisionTreeMakerProps {
  width?: number | string;
  height?: number | string;
  onSelectedNodeChanged?: (node?: RawNodeDatum) => void;
  onChange?: (tree: DecisionTree) => void;
}

const DecisionTreeMaker: FC<DecisionTreeMakerProps> = ({
  width = 500,
  height = 500,
  onSelectedNodeChanged = () => {},
  onChange = () => {},
}) => {
  const { containerRef, translate } = useCenteredTree();
  const nodeSize = 400;
  const { tree, zoom, addChild, updateNodeProperties, deleteNode } = useDecisionTree();
  const [toEditNode, setToEditNode] = useState<DecisionTree | null>(null);
  const [selectedNode, setSelectedNode] = useState<RawNodeDatum>();

  useEffect(() => {
    onSelectedNodeChanged(selectedNode);
  }, [selectedNode]);

  const onValidateEdition = (updatedAttributes: DecisionTreeAttributes) => {
    updateNodeProperties(toEditNode?.name, updatedAttributes);
    setToEditNode(null);
  };

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
            onOpenEdition={setToEditNode}
            onDeleteNode={deleteNode}
          />
        )}
        nodeSize={{ x: nodeSize, y: nodeSize }}
        orientation='vertical'
        collapsible={false}
        onNodeClick={({ data }) => {
          console.log('[decision-tree-maker] OnNodeClick', data);
          setSelectedNode(data);
        }}
      />

      {toEditNode && (
        <EditionModal
          decisionTreeNode={toEditNode}
          onCancel={() => setToEditNode(null)}
          onValidate={onValidateEdition}
        />
      )}
    </div>
  );
};

export { RawNodeDatum };
export default DecisionTreeMaker;
