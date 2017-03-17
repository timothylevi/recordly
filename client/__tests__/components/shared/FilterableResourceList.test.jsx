describe('AlbumItem', () => { test('renders', () => {}) });
// import React from 'react';
// import BaseResourceList from './BaseResourceList';
// import { bindHandlers } from '../../helpers';
// import * as stateFunctions from '../../state-functions';
//
// export default class FilterableResourceList extends BaseResourceList {
//   constructor(props) {
//     super(props);
//
//     this.resourcesFilterMask = {};
//
//     this.state = { resourcesFilteredList: [] };
//     bindHandlers.call(this, ['handleFilter']);
//   }
//
//   handleFilter(event) {
//     event.preventDefault();
//
//     const mask = this.resourcesFilterMask.value;
//     this.setState(stateFunctions.markFiltered(this.state, this.resource, mask));
//   }
//
//   composeResourceFilter(disable) {
//     if (disable) return null;
//
//     function setResourcesFilterMask(resourcesFilterMask) {
//       this.resourcesFilterMask = resourcesFilterMask;
//     }
//
//     const resources = this.state.filteredResources;
//     const filteredResources = this.composeResourceList(!this.resourcesFilterMask.value, resources);
//
//     return (
//       <div className="resources-filter">
//         <input
//           type="search"
//           placeholder={`Search ${this.resource} by name or title`}
//           onChange={this.handleFilter}
//           className="resources-filter-mask"
//           ref={setResourcesFilterMask.bind(this)}
//         />
//         {filteredResources}
//       </div>
//     );
//   }
// }
