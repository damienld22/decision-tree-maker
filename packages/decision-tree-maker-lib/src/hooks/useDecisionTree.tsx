import { useState } from 'react';
import uniqid from 'uniqid';
import { DecisionTree } from '../decision-tree/types';

function getInitialTree() {
  return {
    name: uniqid(),
    children: [],
    attributes: {
      title: 'MyDecisionTree',
    },
  };
}

function findNodeAndAddNewChild(tree: DecisionTree, parentName: string): DecisionTree {
  const updatedTree = { ...tree };

  if (parentName === updatedTree.name) {
    updatedTree.children?.push({
      name: uniqid(),
      children: [],
      attributes: { title: 'Child' },
    });
  } else {
    updatedTree.children?.forEach((subTree) => findNodeAndAddNewChild(subTree, parentName));
  }

  return updatedTree;
}

const useDecisionTree = () => {
  const [tree, setTree] = useState<DecisionTree>(getInitialTree());
  const [zoom] = useState(1);

  const addChild = (parentName: string) => {
    console.log(`[decision-tree-maker] addChild to ${parentName}`);

    // Find the proper node and add a child with recursive function
    setTree((prev) => findNodeAndAddNewChild(prev, parentName));
  };

  return {
    zoom,
    tree,
    addChild,
  };
};

export default useDecisionTree;
