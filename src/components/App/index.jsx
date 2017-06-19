import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { filterItems } from 'actions/items';
import { updateItem } from 'actions/items';
import { getFilteredItems } from 'selectors';

import {
  Container,
  Header,
  Modal,
} from 'semantic-ui-react';

import ItemList from 'components/ItemList';
import EditItem from 'components/EditItem';


const ConfirmDelete = (props) => (
  <Modal
    header='Delete Item'
    content='Are you sure you want to delete this item'
    open={props.open}
    onClose={props.onClose}
    actions={[
      { key: 'no', content: 'No', triggerClose: true },
      { key: 'yes', content: 'Yes', color: 'red', triggerClose: true },
    ]}
  />
)


class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      editingItem: null,
      modalOpen: false,
    };

    this.getListing = this.getListing.bind(this);
    this.getEditing = this.getEditing.bind(this);
  }

  editItem = itemId => {
    this.setState({ editingItem: itemId })
  };

  updateFilter = term => {
    this.props.dispatch(filterItems(term));
  };

  onSaveItem = data => {
    this.props.dispatch(updateItem(data.id, data));
    this.setState({ editingItem: null });
  };

  onDiscardEdit = () => {
    this.setState({ editingItem: null });
  };

  deleteItem = itemId => {
    this.setState({ modalOpen: true });
  };

  getListing() {
    const { items } = this.props;

    return (
      <Container>
        <Header>Items</Header>
        <ItemList
          items={items}
          onFilter={this.updateFilter}
          filter={this.props.itemsFilter}
          onEdit={this.editItem}
          onDelete={this.deleteItem}
        />
      </Container>
    );
  }

  getEditing() {
    const item = this.props.itemsById[this.state.editingItem];
    return (
      <Container>
        <Header>
          Editing item: { this.state.editingItem }
        </Header>
        <EditItem
          item={ item }
          onSave={ this.onSaveItem }
          onDiscard={ this.onDiscardEdit }
        />
      </Container>
    );
  }

  render() {
    let content;
    if (this.state.editingItem) {
      content = this.getEditing();
    } else {
      content = this.getListing();
    }

    return (
      <div style={{ paddingTop: '50px' }}>
        { content }
        <ConfirmDelete
          open={ this.state.modalOpen }
          onClose={ () => this.setState({ modalOpen: false }) }
        />
      </div>
    );
  }
}

App.propTypes = {
  // injected by connect
  dispatch: PropTypes.func,

  // from state
  itemsById: PropTypes.object,
  itemsFilter: PropTypes.string,

  // from state + selector
  items: PropTypes.array,
};


function mapStateToProps(state) {
  return {
    items: getFilteredItems(state),
    itemsById: state.itemsById,
    itemsFilter: state.itemsFilter,
  };
}

export default connect(mapStateToProps)(App);
