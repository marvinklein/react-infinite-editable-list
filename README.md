# react-infinite-editable-list
an editable list component for [React](https://reactjs.org/)

## Installation
Install from npm

```sh
npm install --save react-infinite-editable-list
```

## Usage
```js
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import EditableList from 'react-infinite-editable-list';

const someData = [ { someProperty: 'item one' }, { someProperty: 'item two' } ];

function ListItem({ data, setData, onBlur }) {
  const onChange = (e) => setData({ 'someProperty': e.target.value });
  return <div onBlur={onBlur}>
    <input value={data.someProperty} onChange={onChange} />
  </div>;
}

function App() {
  const [ data, setData ] = useState(someData);
  const dataSchema = { someProperty: '' };
  return <EditableList listItem={ListItem} data={data} dataSchema={dataSchema} setData={setData} />;
}

ReactDOM.render(<App />, document.getElementById('root'));
```

## Todo
- More documentation
- Host examples on Github pages
- Add additional examples: complex data structure, nested lists
- Automatically generate dataSchema based on input data
- Don't require child components to be aware of onBlur?
- Encapsulate immutability-helper for a nicer interface?
- Fix Webpack warnings
