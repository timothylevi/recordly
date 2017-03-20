function setFormClose(state) {
  return { form: false };
}

function setFormCloseAndData(state, data) {
  return { ...data, form: false };
}

function setFormOpen(state) {
  return { form: true };
}

function setErrorsOrData(state, data) {
  const newState = { ...data };

  // Reset avatar to data/image because the data returned
  // may not have a saved image URI to use.
  if (state.avatar && newState.errors && newState.errors.length) {
    newState.avatar = state.avatar;
  }

  return newState;
}

function setFormInputValue(state, target) {
  return { ...state, [target.name]: target.value };
}

function setNestedFormInputValue(state, key, index, target) {
  const list = state[key];
  list[index][target.name] = target.value;

  return { [key]: list };
}

function addToList(state, key, obj) {
  const list = state[key] || [];
  list.push(obj);

  return { [key]: list };
}

function markDeleted(state, key, id) {
  function getOrMarkDeleted(obj) {
    return (obj.id === id) ?
      { ...obj, deleted: true } :
      obj;
  }

  const list = state[key] || [];
  return { [key]: list.map(getOrMarkDeleted) };
}

function markSelected(state, key, id) {
  function getOrMarkSelected(obj) {
    return (obj.id === id) ?
      { ...obj, selected: !obj.selected } :
      obj;
  }

  const list = state[key] || [];
  return { [key]: list.map(getOrMarkSelected) };
}

function markFiltered(state, key, mask) {
  const lowerMask = mask.toLowerCase();

  function getOrMarkFiltered(obj) {
    const lowerName = obj.name.toLowerCase();
    const matches = lowerName.includes(lowerMask);
    const newObj = { ...obj, filtered: matches };

    return newObj;
  }

  const list = state[key] || [];
  return { [key]: list.map(getOrMarkFiltered) };
}

function markAllDeselected(state, key) {
  function markDeselected(obj) {
    return { ...obj, selected: false };
  }

  const list = state[key] || [];
  return { [key]: list.map(markDeselected) };
}

export {
  setFormClose,
  setFormCloseAndData,
  setFormOpen,
  setErrorsOrData,
  setFormInputValue,
  setNestedFormInputValue,
  addToList,
  markDeleted,
  markSelected,
  markFiltered,
  markAllDeselected,
};
