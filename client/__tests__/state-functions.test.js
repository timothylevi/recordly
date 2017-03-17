import * as stateFunctions from '../app/bundles/js/state-functions';

describe('setFormClose', () => {
  const expState = { form: false };

  test('sets the form property to false when not defined', () => {
    const oldState = {};
    const newState = stateFunctions.setFormClose(oldState);

    expect(newState).toMatchObject(expState);
  });

  test('sets the form property to false when false', () => {
    const oldState = { form: false };
    const newState = stateFunctions.setFormClose(oldState);

    expect(newState).toMatchObject(expState);
  });

  test('sets the form property to false when true', () => {
    const oldState = { form: true };
    const newState = stateFunctions.setFormClose(oldState);

    expect(newState).toMatchObject(expState);
  });
});

describe('setFormCloseAndData', () => {
  test('sets the form property to false and assigns data', () => {
    const data = { id: 1, name: 'Example', avatar: '/images/missin_artist.png' };

    const oldState = { id: null, name: 'Example' };
    const newState = stateFunctions.setFormCloseAndData(oldState, data);
    const expState = { form: false, id: 1, name: data.name, avatar: data.avatar };

    expect(newState).toMatchObject(expState);
    expect(newState).toMatchObject(data);
  });
});

describe('setFormOpen', () => {
  const expState = { form: true };

  test('sets the form property to true when not defined', () => {
    const oldState = {};
    const newState = stateFunctions.setFormOpen(oldState);

    expect(newState).toMatchObject(expState);
  });

  test('sets the form property to true when false', () => {
    const oldState = { form: false };
    const newState = stateFunctions.setFormOpen(oldState);

    expect(newState).toMatchObject(expState);
  });

  test('sets the form property to true when true', () => {
    const oldState = { form: true };
    const newState = stateFunctions.setFormOpen(oldState);

    expect(newState).toMatchObject(expState);
  });
});

describe('setErrorsOrData', () => {
  const oldState = { id: null, name: 'Example', avatar: 'data:image' };

  test('assigns data, sets errors, and resets avatar if errors present on data', () => {
    const data = { id: null, name: 'Example', avatar: '/path/to/image.png', errors: [{ message: 'Error' }] };
    const newState = stateFunctions.setErrorsOrData(oldState, data);
    const expState = { ...data, avatar: oldState.avatar };

    expect(newState).toMatchObject(expState);
  });
  test('assigns data if no errors present on data', () => {
    const data = { id: 1, name: 'Example', avatar: '/path/to/image.png' };
    const newState = stateFunctions.setErrorsOrData(oldState, data);
    const expState = { ...data };

    expect(newState).toMatchObject(expState);
  });
});

describe('setFormInputValue', () => {
  test('sets form field name property', () => {
    let expState = {};
    const oldState = {};

    // Handle input from 'name' form field
    expState = { name: 'E' };
    const oldTarget = { name: 'name', value: 'E' };
    const intState = stateFunctions.setFormInputValue(oldState, oldTarget);

    expect(intState).toMatchObject(expState);

    // Handle second input from 'name' form field
    expState = { name: 'Ex' };
    const intTarget = { name: 'name', value: 'Ex' };
    const newState = stateFunctions.setFormInputValue(intState, intTarget);

    expect(newState).toMatchObject(expState);

    // Handle input from 'number' form field
    expState = { name: 'Ex', number: '1' };
    const newTarget = { name: 'number', value: '1' };
    const finState = stateFunctions.setFormInputValue(newState, newTarget);

    expect(finState).toMatchObject(expState);
  });
});

describe('setNestedFormInputValue', () => {
  test('sets value of object in array from form input', () => {
    const key = 'key';

    let index = 0;
    let state = { [key]: [{}, {}] };
    let target = { name: 'track_num', value: index };
    let newState = stateFunctions.setNestedFormInputValue(state, key, index, target);
    let expState = { [key]: [{ track_num: 0 }, {}] };
    expect(newState).toMatchObject(expState);

    state = newState;
    target = { name: 'name', value: 'Example' };
    newState = stateFunctions.setNestedFormInputValue(state, key, index, target);
    expState = { [key]: [{ track_num: 0, name: 'Example' }, {}] };
    expect(newState).toMatchObject(expState);

    index += 1;
    state = newState;
    target = { name: 'track_num', value: index };
    newState = stateFunctions.setNestedFormInputValue(state, key, index, target);
    expState = { [key]: [{ track_num: 0, name: 'Example' }, { track_num: 1 }] };
    expect(newState).toMatchObject(expState);
  });
});

describe('addToList', () => {
  const key = 'key';
  const obj = { id: null, name: 'Example' };

  test('adds an object to a new list', () => {
    const oldState = {};
    const newState = stateFunctions.addToList(oldState, key, obj);
    const expState = { [key]: [obj] };

    expect(newState).toMatchObject(expState);
  });
  test('adds an object to an empty list', () => {
    const oldState = { [key]: [] };
    const newState = stateFunctions.addToList(oldState, key, obj);
    const expState = { [key]: [obj] };

    expect(newState).toMatchObject(expState);
  });
});

describe('markDeleted', () => {
  let id = 1;
  const key = 'key';
  const oldState = { [key]: [{ id }] };
  test('sets an object in a list with passed id deleted', () => {
    const newState = stateFunctions.markDeleted(oldState, key, id);
    const expState = { [key]: [{ id, deleted: true }] };

    expect(newState).toMatchObject(expState);
  });
  test('only sets objects where ids match', () => {
    id += 1;
    const newState = stateFunctions.markDeleted(oldState, key, id);

    expect(newState).toMatchObject(oldState);
  });
});

describe('markSelected', () => {
  const key = 'key';
  const id = 1;
  const oldState = { [key]: [{ id }] };
  let newState;
  let expState;

  test('sets new object as selected', () => {
    newState = stateFunctions.markSelected(oldState, key, id);
    expState = { [key]: [{ id, selected: true }] };

    expect(newState).toMatchObject(expState);
  });
  test('sets previously selected object as unselected', () => {
    newState = stateFunctions.markSelected(newState, key, id);
    expState = { [key]: [{ id, selected: false }] };

    expect(newState).toMatchObject(expState);
  });
  test('sets previously unselected object as selected', () => {
    newState = stateFunctions.markSelected(newState, key, id);
    expState = { [key]: [{ id, selected: true }] };

    expect(newState).toMatchObject(expState);
  });
});

describe('markFiltered', () => {
  test('sets objects which have names that include the filter mask', () => {
    const key = 'key';
    const oldState = {
      [key]: [
        { name: 'Example' },
        { name: 'User Ex' },
        { name: 'Example Us' },
      ],
    };

    let mask = '';
    let newState = stateFunctions.markFiltered(oldState, key, mask);
    let expState = {
      [key]: [
        { name: 'Example', filtered: true },
        { name: 'User Ex', filtered: true },
        { name: 'Example Us', filtered: true },
      ],
    };

    expect(newState).toMatchObject(expState);

    mask = 'Ex';
    newState = stateFunctions.markFiltered(oldState, key, mask);
    expState = {
      [key]: [
        { name: 'Example', filtered: true },
        { name: 'User Ex', filtered: true },
        { name: 'Example Us', filtered: true },
      ],
    };

    expect(newState).toMatchObject(expState);

    mask = 'User';
    newState = stateFunctions.markFiltered(oldState, key, mask);
    expState = {
      [key]: [
        { name: 'Example', filtered: false },
        { name: 'User Ex', filtered: true },
        { name: 'Example Us', filtered: false },
      ],
    };

    expect(newState).toMatchObject(expState);

    mask = 'User Example';
    newState = stateFunctions.markFiltered(oldState, key, mask);
    expState = {
      [key]: [
        { name: 'Example', filtered: false },
        { name: 'User Ex', filtered: false },
        { name: 'Example Us', filtered: false },
      ],
    };

    expect(newState).toMatchObject(expState);
  });
});

describe('markAllDeselected', () => {
  test('sets each object in a list as deselected', () => {
    const key = 'key';
    const oldState = {
      [key]: [
        {},
        { selected: false },
        { selected: true },
      ],
    };
    const newState = stateFunctions.markAllDeselected(oldState, key);
    const expState = {
      [key]: [
        { selected: false },
        { selected: false },
        { selected: false },
      ],
    };

    expect(newState).toMatchObject(expState);
  });
});
