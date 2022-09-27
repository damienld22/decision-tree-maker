import { DecisionTree, RawNodeDatum } from 'decision-tree-maker-lib';
import { useState } from 'react';

function App() {
  const [selectedNode, setSelectedNode] = useState<RawNodeDatum>();

  return (
    <div>
      <div>
        <p>{`Selected node : ${selectedNode?.name || 'None'}`}</p>
      </div>
      <DecisionTree onSelectedNodeChanged={setSelectedNode} />
    </div>
  );
}

export default App;
