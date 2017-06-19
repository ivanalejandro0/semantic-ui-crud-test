export function addItem(item) {
  return {
    type: "ITEM_ADD",
    item,
  };
}

export function updateItem(id, item) {
  return {
    type: "ITEM_UPDATE",
    id,
    item,
  };
}

export function filterItems(term) {
  return {
    type: "ITEMS_FILTER",
    term,
  };
}
