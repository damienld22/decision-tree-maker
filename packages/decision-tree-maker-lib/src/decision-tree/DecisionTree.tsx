import { FC, useState } from 'react';
import Tree from 'react-d3-tree';
import { RawNodeDatum, RenderCustomNodeElementFn } from 'react-d3-tree/lib/types/common';
import uniqid from 'uniqid';
import { useCenteredTree } from '../hooks/useCenteredTree';
import TreeNodeElement from './TreeNodeElement';
import { DecisionTree } from './types';

export interface DecisionTreeProps {
  width?: number | string;
  height?: number | string;
}

const DecisionTree: FC<DecisionTreeProps> = ({ width = 500, height = 500 }) => {
  const { containerRef, translate } = useCenteredTree();
  const nodeSize = 400;
  const [zoom] = useState<number>(1);
  const [tree] = useState<RawNodeDatum>({
    name: uniqid(),
    children: [],
    attributes: {
      title: 'MyDecisionTree',
    },
  });

  return (
    <div style={{ width, height, border: '1px solid' }} ref={containerRef}>
      <Tree
        zoom={zoom}
        data={tree}
        translate={translate}
        renderCustomNodeElement={TreeNodeElement as RenderCustomNodeElementFn}
        nodeSize={{ x: nodeSize, y: nodeSize }}
        orientation='vertical'
        collapsible={false}
      />
    </div>
  );
};

export default DecisionTree;
