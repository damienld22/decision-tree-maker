import { DecisionTreeMaker, DecisionTree } from 'decision-tree-maker';

function App() {
  return (
    <div style={{border: '1px solid', width: '90vw', height: '90vh'}}>
      <DecisionTreeMaker
        selectedNodeStyle={{border: '2px solid blue'}}
        onChange={(tree: DecisionTree) => console.log('[typescript-app] onChange', tree)} />

    </div>
  );
}

export default App;
