import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import EditableList from 'react-infinite-editable-list';
import update from 'immutability-helper';

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
  return <EditableList
    listItem={ListItem}
    data={data}
    dataSchema={dataSchema}
    setData={(mutation) => setData((prev) => update(prev, mutation))}
  />;
}

ReactDOM.render(<App />, document.getElementById('root'));
