function setFormClose() {
  return { form: false };
}

function setFormCloseAndData(state, data) {
  return { ...data, form: false };
}

function setFormOpen() {
  return { form: true };
}

function setErrors(state, data) {
  // Reset avatar to data/image because the data returned
  // may not have a saved image URI to use.
  const hasAvatar = state.avatar;
  const newState = { ...data };

  if (hasAvatar) newState.avatar = state.avatar;

  return newState;
}

function setData(state, data) {
  return { ...data };
}

function setFormInputValue(state, target) {
  return { [target.name]: target.value };
}

function setNestedFormInputValue(state, key, index, target) {
  const list = state[key];
  list[index][target.name] = target.value;

  return { [key]: list };
}

function setFormFileValue(state, name, result) {
  return { [name]: result };
}

function addToList(state, key, obj) {
  const list = state[key];
  list.push(obj);

  return { [key]: list };
}

function markDeleted(state, key, id) {
  function getOrMarkDeleted(obj) {
    return (obj.id === id) ?
      { ...obj, deleted: true } :
      obj;
  }

  const list = state[key].map(getOrMarkDeleted);
  return { [key]: list };
}

function markSelected(state, key, id) {
  function getOrMarkSelected(obj) {
    return (obj.id === id) ?
      { ...obj, selected: !obj.selected } :
      obj;
  }

  const list = state[key].map(getOrMarkSelected);
  return { [key]: list };
}

function markFiltered(state, key, mask) {
  const lowerMask = mask.toLowerCase();

  function getOrMarkFiltered(obj) {
    const newObj = { ...obj };
    const lowerName = obj.name.toLowerCase();
    const matches = lowerName.includes(lowerMask);

    if (matches) newObj.filtered = true;

    return newObj;
  }

  const list = state[key].map(getOrMarkFiltered);
  return { filteredResources: list };
}

function markAllDeselected(state, key) {
  function markDeselected(obj) {
    return { ...obj, selected: false };
  }

  const list = state[key].map(markDeselected);
  return { [key]: list };
}

export {
  setFormClose,
  setFormCloseAndData,
  setFormOpen,
  setErrors,
  setData,
  setFormInputValue,
  setNestedFormInputValue,
  setFormFileValue,
  addToList,
  markDeleted,
  markSelected,
  markFiltered,
  markAllDeselected,
};
