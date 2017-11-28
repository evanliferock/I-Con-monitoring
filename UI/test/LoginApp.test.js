import React from 'react';
import LoginApp from '../src/LoginApp';
import Game from '../src/game'
import renderer from 'react-test-renderer';

test('LoginApp matches Snapshot', () => {
  const component = renderer.create(
    <LoginApp />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Game matches Snapshot', () => {
  const component = renderer.create(
    <Game />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
