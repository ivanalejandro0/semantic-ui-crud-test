let mockState = {
  1: { id: 1,
    name: "my-name@gmail.com",
    description: "some gmail data" },
  2: { id: 2,
    name: "Facebook",
    description: "social info secrets" },
  3: { id: 3,
    name: "Some site",
    description: "what this site is about" },
  4: { id: 4,
    name: "Bank account",
    description: "" },
  5: { id: 5,
    name: "Office alarm code",
    description: "", secret: '123456' },
  6: { id: 6,
    name: "secret recipee",
    description: '', data: "nutella + ice cream" },
};

const companies = ["Adobe", "Airbnb", "Alphabet", "Amazon", "Apple", "BlackRock", "CBRE", "Capital One", "Comcast NBCUniversal", "Dell Technologies", "Facebook", "JLL", "JPMorgan Chase & Co.", "McKinsey & Co.", "Netflix", "Salesforce", "Stryker", "Stryker", "Tesla", "Time Warner", "Twitter", "Uber", "Under Armour", "Visa", "Walt Disney Company", "Workday"];
for (let i = 7; i<50; i++) {
  mockState[i] = {
    id: i,
    name: companies[Math.floor(Math.random()*companies.length)],
    description: companies[Math.floor(Math.random()*companies.length)],
  }
}


const initialState = mockState;

function addItem(state, action) {
  const item = {
    id: action.id,
    text: action.text,
  };

  return {
    ...state,
    item,
  };
}

function removeItem(state, action) {
  const newState = { ...state };
  delete newState[action.id];

  return newState;
}

function updateItem(state, action) {
  const newState = { ...state };
  newState[action.id] = action.item;

  return newState;
}


function itemsById(state = initialState, action) {
  switch (action.type) {
    case 'ITEM_ADD': return addItem(state, action);
    case 'ITEM_UPDATE': return updateItem(state, action);
    case 'ITEM_REMOVE': return removeItem(state, action);
    default: return state
  }
}


export function itemsFilter(state = "", action) {
  switch (action.type) {
    case 'ITEMS_FILTER': return action.term;
    default: return state
  }
}

export default itemsById;
