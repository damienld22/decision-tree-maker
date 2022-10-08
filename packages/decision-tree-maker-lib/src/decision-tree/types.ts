import { RawNodeDatum } from 'react-d3-tree/lib/types/common';

export type DecisionTreeAttributes = {
  title: string;
  description?: string;
};

export interface DecisionTree extends RawNodeDatum {
  attributes?: DecisionTreeAttributes;
  children: DecisionTree[];
  parentNodeName?: string;
}
