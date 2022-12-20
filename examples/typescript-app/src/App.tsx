import { DecisionTreeMaker, DecisionTree } from 'decision-tree-maker-lib';
import { useState } from 'react';

function App() {
  const [selectedNode, setSelectedNode] = useState<DecisionTree>();

  return (
    <div>
      <div>
        <p>{`Selected node : ${selectedNode?.name || 'None'}`}</p>

        <button style={{display: 'block'}} type='button' onClick={() => {}}>Delete selected node</button>
        <button style={{display: 'block'}} type='button' onClick={() => {}}>Edit selected node</button>
        <button style={{display: 'block'}} type='button' onClick={() => {}}>Add node below selected node</button>
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
