import { DecisionTreeMaker, DecisionTree } from 'decision-tree-maker-lib';

function App() {
  return (
    <DecisionTreeMaker
      width={'90vw'}
      height={'90vh'}
      selectedNodeStyle={{border: '2px solid blue'}}
      onChange={(tree: DecisionTree) => console.log('[typescript-app] onChange', tree)} />
  );
}

export default App;
