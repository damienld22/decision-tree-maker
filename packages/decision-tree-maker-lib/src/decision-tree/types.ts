export type DecisionTreeAttributes = {
  title: string;
  description?: string;
  dataPerChildPath: DataChildPath[];
};

export type DataChildPath = {
  label: string;
};

export type DecisionTree = {
  name: string;
  attributes: DecisionTreeAttributes;
  children: DecisionTree[];
  parentNodeName?: string;
};
