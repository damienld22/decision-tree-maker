import { useState } from 'react';
import uniqid from 'uniqid';
import { DecisionTree } from '../decision-tree/types';

const defaultTree = {
  name: uniqid(),
  children: [],
  attributes: {
    title: 'MyDecisionTree',
  },
};

const useDecisionTree = () => {
  const [tree] = useState<DecisionTree>(defaultTree);
  const [zoom] = useState(1);

  return {
    zoom,
    tree,
  };
};

export default useDecisionTree;
