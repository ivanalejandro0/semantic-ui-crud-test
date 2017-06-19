import * as items from 'selectors/items';

// Same function name as on items selector file, but we encapsulate the
// knowledge about how the state is build on the root selector, as we do the
// same on the root reducer

export function getFilteredItems(state) {
  return items.getFilteredItems(state.itemsById, state.itemsFilter);
}
