import { RawNodeDatum } from 'react-d3-tree/lib/types/common';

export type DecisionTreeStepAttributesKeys = 'title';

export type DecisionTreeAttributes = Record<
  DecisionTreeStepAttributesKeys,
  string | number | boolean
>;

export interface DecisionTree extends RawNodeDatum {
  attributes?: DecisionTreeAttributes;
  children: DecisionTree[];
  parentNodeName?: string;
}
