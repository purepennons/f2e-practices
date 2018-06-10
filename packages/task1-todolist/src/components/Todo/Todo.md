```js
initialState = {
  isDone: false,
  isImportant: false
};

<Todo
  isDone={state.isDone}
  isImportant={state.isImportant}
  desc="這是我的一個測試的代辦事項"
  onStar={e => setState(prev => ({ isImportant: !prev.isImportant }))}
  onCheck={e => setState(prev => ({ isDone: !prev.isDone }))}
/>;
```
