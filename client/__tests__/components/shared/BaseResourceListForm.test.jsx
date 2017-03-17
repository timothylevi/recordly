describe('BaseResourceListForm', () => { test('renders', () => {}) });
// import React from 'react';
//
// export default class BaseResourceListForm extends React.Component {
//   static mergeSelected(selectedResources, resources) {
//     if (!resources) return [];
//     if (!selectedResources) return resources;
//
//     function addResourceToHash(hsh, obj) {
//       const newObj = { ...obj, selected: true };
//       const newHsh = { ...hsh, [newObj.id]: newObj };
//
//       return newHsh;
//     }
//
//     function getLatestResource(resource) {
//       return this[resource.id] ? this[resource.id] : resource;
//     }
//
//     const resourcesHash = selectedResources.reduce(addResourceToHash, {});
//     return resources.map(getLatestResource.bind(resourcesHash));
//   }
// }
