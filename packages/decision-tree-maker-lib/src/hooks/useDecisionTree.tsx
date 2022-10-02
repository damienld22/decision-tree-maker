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

function findNodeAndApplyCallbackOnIt(
  tree: DecisionTree,
  nodeName: string,
  callback: (node: DecisionTree) => void,
) {
  if (nodeName === tree.name) {
    callback(tree);
  } else {
    tree.children.forEach((subTree) => {
      findNodeAndApplyCallbackOnIt(subTree, nodeName, callback);
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
      findNodeAndApplyCallbackOnIt(updated, parentName, (node) => {
        node.children?.push({
          name: uniqid(),
          parentNodeName: parentName,
          children: [],
          attributes: { title: 'Child' },
        });
      });
      return updated;
    });
  };

  const updateNodeProperties = (nodeName?: string, newProperties?: DecisionTreeAttributes) => {
    if (!nodeName || !newProperties) {
      return;
    }

    console.log(`[decision-tree-maker] Update node properties of ${nodeName}`, newProperties);

    // Find the proper node and add a child with recursive function
    setTree((prev) => {
      const updated = { ...prev };
      findNodeAndApplyCallbackOnIt(updated, nodeName, (node) => {
        node.attributes = { ...node.attributes, ...newProperties };
      });
      return updated;
    });
  };

  const deleteNode = (toDeleteNode: DecisionTree) => {
    console.log(`[decision-tree-maker] delete current node ${toDeleteNode.name}`);

    // Find the proper node and delete it (and all children)
    setTree((prev) => {
      const updated = { ...prev };
      const callback = (node: DecisionTree) => {
        node.children = node.children.filter((child) => child.name !== toDeleteNode.name);
      };

      if (toDeleteNode.parentNodeName) {
        findNodeAndApplyCallbackOnIt(updated, toDeleteNode.parentNodeName, callback);
      } else {
        console.warn(`[decision-tree-maker] delete initial node name is not allowed`);
      }
      return updated;
    });
  };

  return {
    zoom,
    tree,
    addChild,
    updateNodeProperties,
    deleteNode,
  };
};

export default useDecisionTree;
