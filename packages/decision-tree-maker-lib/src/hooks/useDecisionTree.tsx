import { useState } from 'react';
import uniqid from 'uniqid';
import { DecisionTree, DecisionTreeAttributes } from '../decision-tree/types';

function getInitialTree() {
  return {
    name: uniqid(),
    children: [],
    attributes: {
      title: 'MyDecisionTree',
    },
  };
}

function findNodeAndApplyCallbackOnNode(
  tree: DecisionTree,
  parentName: string,
  callback: (node: DecisionTree) => void,
) {
  if (parentName === tree.name) {
    callback(tree);
  } else {
    tree.children.forEach((subTree) => {
      findNodeAndApplyCallbackOnNode(subTree, parentName, callback);
    });
  }
}

const useDecisionTree = () => {
  const [tree, setTree] = useState<DecisionTree>(getInitialTree());
  const [zoom] = useState(1);

  const addChild = (parentName: string) => {
    console.log(`[decision-tree-maker] addChild to ${parentName}`);

    // Find the proper node and add a child with recursive function
    setTree((prev) => {
      const updated = { ...prev };
      findNodeAndApplyCallbackOnNode(updated, parentName, (node) => {
        node.children?.push({
          name: uniqid(),
          children: [],
          attributes: { title: 'Child' },
        });
      });
      return updated;
    });
  };

  const updateNodeProperties = (parentName?: string, newProperties?: DecisionTreeAttributes) => {
    if (!parentName || !newProperties) {
      return;
    }

    console.log(`[decision-tree-maker] Update node properties of ${parentName}`, newProperties);

    // Find the proper node and add a child with recursive function
    setTree((prev) => {
      const updated = { ...prev };
      findNodeAndApplyCallbackOnNode(updated, parentName, (node) => {
        node.attributes = { ...node.attributes, ...newProperties };
      });
      return updated;
    });
  };

  return {
    zoom,
    tree,
    addChild,
    updateNodeProperties,
  };
};

export default useDecisionTree;
