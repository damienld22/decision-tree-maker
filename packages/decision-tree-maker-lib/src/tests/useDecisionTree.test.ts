import { renderHook, act, waitFor } from '@testing-library/react';
import useDecisionTree from '../hooks/useDecisionTree';

describe('[useDecisionTree]', () => {
  test('By default, the hook return a proper default tree', () => {
    const {
      result: {
        current: { tree },
      },
    } = renderHook(() => useDecisionTree());

    // ASSERT
    expect(typeof tree.name === 'string').toBeTruthy();
    expect(tree.children?.length).toEqual(0);
    expect(tree.attributes?.title).toEqual('MyDecisionTree');
  });

  test('When the tree has only one node, addChild give the new node under the first', () => {
    const {
      result: {
        current: { tree, addChild },
      },
    } = renderHook(() => useDecisionTree());

    // ACT (Add new child to the tree)
    act(() => addChild(tree.name));

    // ASSERT
    expect(tree.children?.length).toEqual(1);
    const child = tree.children?.at(0);
    expect(typeof child?.name === 'string').toBeTruthy();
    expect(child?.children?.length).toEqual(0);
    expect(child?.attributes?.title).toEqual('Child');
  });

  test('When I add a second child to a node with already an existing child, the node has 2 children', () => {
    const {
      result: {
        current: { tree, addChild },
      },
    } = renderHook(() => useDecisionTree());

    // ARRANGE
    act(() => addChild(tree.name)); // Add the first child

    // ACT (Add the second child)
    act(() => addChild(tree.name));

    // ASSERT
    expect(tree.children?.length).toEqual(2);
    expect(tree.children?.at(0)?.attributes?.title).toEqual('Child');
    expect(tree.children?.at(1)?.attributes?.title).toEqual('Child');
  });

  test('When I add a child to a nested node, the tree is correctly updated', () => {
    const {
      result: {
        current: { tree, addChild },
      },
    } = renderHook(() => useDecisionTree());

    // ARRANGE
    act(() => addChild(tree.name)); // Add the first child

    // ACT (Add the second child as child of the first child)
    act(() => addChild(tree.children?.at(0)?.name!)); // eslint-disable-line @typescript-eslint/no-non-null-asserted-optional-chain

    // ASSERT
    expect(tree.children?.length).toEqual(1);
    const subchild = tree.children?.at(0);
    expect(subchild?.children?.length).toEqual(1);
    expect(subchild?.children?.at(0)?.attributes?.title).toEqual('Child');
  });

  test('When I update the title of a node, the tree is correctly rendered', () => {
    const {
      result: {
        current: { tree, updateNodeProperties },
      },
    } = renderHook(() => useDecisionTree());

    // ACT
    act(() => updateNodeProperties(tree.name, { title: 'UpdatedTitle' }));

    // ASSERT
    waitFor(() => expect(tree.attributes?.title).toEqual('UpdatedTitle'));
  });

  test('When I update the title of a sub node, the tree is correctly rendered', () => {
    const {
      result: {
        current: { tree, updateNodeProperties, addChild },
      },
    } = renderHook(() => useDecisionTree());

    // ARRANGE
    act(() => addChild(tree.name)); // Add a child
    const subNode = tree.children?.at(0)!;

    // ACT
    act(() => updateNodeProperties(subNode.name, { title: 'UpdatedTitle' }));

    // ASSERT
    waitFor(() => expect(subNode.attributes?.title).toEqual('UpdatedTitle'));
  });
});
