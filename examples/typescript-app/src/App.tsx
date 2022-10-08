import { DecisionTreeMaker, RawNodeDatum, DecisionTree } from 'decision-tree-maker-lib';
import { useState } from 'react';

function App() {
  const [selectedNode, setSelectedNode] = useState<RawNodeDatum>();

  return (
    <div>
      <div>
        <p>{`Selected node : ${selectedNode?.name || 'None'}`}</p>
      </div>
      <DecisionTreeMaker
        width={'90vw'}
          height={'90vh'}
          onSelectedNodeChanged={setSelectedNode}
          onChange={(tree: DecisionTree) => console.log('[typescript-app] onChange', tree)} />
    </div>
  );
}

export default App;
