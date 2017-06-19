import { combineReducers } from 'redux'
import itemsById from 'reducers/items'
import { itemsFilter } from 'reducers/items'

const reducers = combineReducers({
  itemsById,
  itemsFilter,
})

export default reducers
