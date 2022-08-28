export interface DecisionTreeStep {
  name: string;
  attributes: DecisionTreeStepAttributes;
}

export interface DecisionTreeStepAttributes {
  title: string;
}

export interface DecisionTree extends DecisionTreeStep {
  children: Array<DecisionTree>
}