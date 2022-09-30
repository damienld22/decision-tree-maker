import { DecisionTree, RawNodeDatum } from 'decision-tree-maker-lib';
import { useState } from 'react';

function App() {
  const [selectedNode, setSelectedNode] = useState<RawNodeDatum>();

  return (
    <div>
      <div>
        <p>{`Selected node : ${selectedNode?.name || 'None'}`}</p>
      </div>
      <DecisionTree width={'90vw'} height={'90vh'} onSelectedNodeChanged={setSelectedNode} />
    </div>
  );
}

export default App;
