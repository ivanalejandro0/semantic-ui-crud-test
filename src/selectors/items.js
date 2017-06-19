export function getFilteredItems(itemsById, itemsFilter) {
  const filter = itemsFilter;

  const items = Object.keys(itemsById)
    .map(k => itemsById[k])

  if (!filter) return items;

  return items.filter(item => {
    const { name, description } = item
    return (
      name && name.toLowerCase().indexOf(filter) > -1 ||
      description && description.toLowerCase().indexOf(filter) > -1
    )
  });
}
