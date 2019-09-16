import React from 'react';
import PropTypes from 'prop-types';

const isObjectLike = (obj) => Object.prototype.toString.call(obj) === '[object Object]';
const isArray = (obj) => Array.isArray(obj);
const mapValues = (obj, iteratee) => Object.entries(obj).reduce((res, [ key, value ]) => { res[key] = iteratee(value, key, obj); return res; }, {});

const cleanCommands = obj => {
  if (isObjectLike(obj)) {
    if (obj.$push) { return obj.$push; }
    return mapValues(obj, cleanCommands);
  }
  return isArray(obj) ? obj.map(cleanCommands) : obj;
};
const modifyMutation = (obj) => {
  return mapValues(obj, (value, key) => {
    if (key === '$splice') { return value; }
    if (key === '$push') { return cleanCommands(value); }
    if (key === '$set') { return value; }
    if (isObjectLike(value)) { return modifyMutation(value); }
    return { $set: value };
  });
};

const isEmpty = (obj, dummyObj) => {
  if (dummyObj === undefined) {
    return true;
  }
  if (isArray(obj) && isArray(dummyObj)) {
    return !obj.find((value, index) => !dummyObj[index] || !isEmpty(value, dummyObj[index]));
  }
  if (isObjectLike(obj) && isObjectLike(dummyObj)) {
    return !Object.entries(obj).find(([ key, value ]) => !isEmpty(value, dummyObj[key]));
  }
  return obj === dummyObj;
};

export default function EditableList(props) {
  const { data, dataSchema, setData, listItem } = props;
  const ListItem = listItem;

  const onBlur = (e, item, index) => {
    if (item !== dataSchema && isEmpty(item, dataSchema) && !e.currentTarget.contains(e.relatedTarget)) {
      setData({ '$splice': [ [ index, 1 ] ] });
    }
  };

  function setDataWithSchema(index, isDummyRow) {
    return (obj) => {
      return isDummyRow ?
        setData(modifyMutation({ '$push': [ { ...dataSchema, ...obj } ] }))
        : setData(modifyMutation({ [index]: obj }));
    };
  }

  return <div>
    { [ ...data, dataSchema ].map((item, index) => {
      return <ListItem onBlur={(e) => onBlur(e, item, index)} {...props} key={index} index={index} data={item} setData={setDataWithSchema(index, item === dataSchema)} />;
    })}
  </div>;
}

EditableList.propTypes = {
  data: PropTypes.array.isRequired,
  dataSchema: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  listItem: PropTypes.elementType.isRequired
};
