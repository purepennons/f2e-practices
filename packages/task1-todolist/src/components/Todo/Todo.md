```js
initialState = {
  isDone: false,
  isImportant: false
};

<Todo
  isDone={state.isDone}
  isImportant={state.isImportant}
  onStar={e => setState(prev => ({ isImportant: !prev.isImportant }))}
  onCheck={e => setState(prev => ({ isDone: !prev.isDone }))}
/>;
```
