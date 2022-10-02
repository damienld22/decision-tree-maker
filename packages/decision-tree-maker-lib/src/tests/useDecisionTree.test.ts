import { renderHook, act } from '@testing-library/react';
import useDecisionTree from '../hooks/useDecisionTree';

describe('[useDecisionTree]', () => {
  test('By default, the hook return a proper default tree', () => {
    const { result } = renderHook(() => useDecisionTree());

    // ASSERT
    expect(typeof result.current.tree.name === 'string').toBeTruthy();
    expect(result.current.tree.children?.length).toEqual(0);
    expect(result.current.tree.attributes?.title).toEqual('MyDecisionTree');
  });

  test('When the tree has only one node, addChild give the new node under the first', () => {
    const { result } = renderHook(() => useDecisionTree());

    // ACT (Add new child to the tree)
    act(() => result.current.addChild(result.current.tree.name));

    // ASSERT
    expect(result.current.tree.children?.length).toEqual(1);
    const child = result.current.tree.children?.at(0);
    expect(typeof child?.name === 'string').toBeTruthy();
    expect(child?.parentNodeName).toEqual(result.current.tree.name);
    expect(child?.children?.length).toEqual(0);
    expect(child?.attributes?.title).toEqual('Child');
  });

  test('When I add a second child to a node with already an existing child, the node has 2 children', () => {
    const { result } = renderHook(() => useDecisionTree());

    // ARRANGE
    act(() => result.current.addChild(result.current.tree.name)); // Add the first child

    // ACT (Add the second child)
    act(() => result.current.addChild(result.current.tree.name));

    // ASSERT
    expect(result.current.tree.children?.length).toEqual(2);
    expect(result.current.tree.children?.at(0)?.attributes?.title).toEqual('Child');
    expect(result.current.tree.children?.at(0)?.parentNodeName).toEqual(result.current.tree.name);
    expect(result.current.tree.children?.at(1)?.attributes?.title).toEqual('Child');
    expect(result.current.tree.children?.at(1)?.parentNodeName).toEqual(result.current.tree.name);
  });

  test('When I add a child to a nested node, the tree is correctly updated', () => {
    const { result } = renderHook(() => useDecisionTree());

    // ARRANGE
    act(() => result.current.addChild(result.current.tree.name)); // Add the first child

    // ACT (Add the second child as child of the first child)
    act(() => result.current.addChild(result.current.tree.children?.at(0)?.name!)); // eslint-disable-line @typescript-eslint/no-non-null-asserted-optional-chain

    // ASSERT
    expect(result.current.tree.children?.length).toEqual(1);
    const subchild = result.current.tree.children?.at(0);
    expect(subchild?.children?.length).toEqual(1);
    expect(subchild?.children?.at(0)?.parentNodeName).toEqual(subchild?.name);
  });

  test('When I update the title of a node, the tree is correctly rendered', () => {
    const { result } = renderHook(() => useDecisionTree());

    // ACT
    act(() =>
      result.current.updateNodeProperties(result.current.tree.name, { title: 'UpdatedTitle' }),
    );

    // ASSERT
    expect(result.current.tree.attributes?.title).toEqual('UpdatedTitle');
  });

  test('When I update the title of a sub node, the tree is correctly rendered', () => {
    const { result } = renderHook(() => useDecisionTree());

    // ARRANGE
    act(() => result.current.addChild(result.current.tree.name)); // Add a child
    const subNode = result.current.tree.children?.at(0)!;

    // ACT
    act(() => result.current.updateNodeProperties(subNode.name, { title: 'UpdatedTitle' }));

    // ASSERT
    expect(subNode.attributes?.title).toEqual('UpdatedTitle');
  });

  test('When I delete a node, the proper tree is rendered', () => {
    const { result } = renderHook(() => useDecisionTree());

    // ARRANGE
    act(() => result.current.addChild(result.current.tree.name)); // Add a child
    expect(result.current.tree.children.length).toEqual(1);

    // ACT
    act(() => result.current.deleteNode(result.current.tree.children?.at(0)!));

    // ASSERT
    expect(result.current.tree.children.length).toEqual(0);
  });

  test('When I delete a sub sub node, the proper tree is rendered', () => {
    const { result } = renderHook(() => useDecisionTree());

    // ARRANGE
    act(() => result.current.addChild(result.current.tree.name)); // Add a child
    act(() => result.current.addChild(result.current.tree.children.at(0)!.name)); // Add the second child

    // ACT
    act(() => result.current.deleteNode(result.current.tree.children.at(0)!.children.at(0)!)); // Delete the sub sub node

    // ASSERT
    expect(result.current.tree.children.length).toEqual(1);
    expect(result.current.tree.children.at(0)!.children.length).toEqual(0);
  });

  test('When I want to delete the first node, this not work and tree keep the same', () => {
    const { result } = renderHook(() => useDecisionTree());

    // ACT
    act(() => result.current.deleteNode(result.current.tree));

    // ASSERT
    expect(result.current.tree.attributes?.title).toEqual('MyDecisionTree');
  });
});
