import { RawNodeDatum } from 'react-d3-tree/lib/types/common';

export type DecisionTreeStepAttributesKeys = 'title';

export interface DecisionTree extends RawNodeDatum {
  attributes?: Record<DecisionTreeStepAttributesKeys, string | number | boolean>;
}
