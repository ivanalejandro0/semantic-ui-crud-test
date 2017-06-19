import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Input,
  List,
  Dropdown,
  Icon,
} from 'semantic-ui-react';


export default class ItemList extends React.PureComponent {

  editClicked = (event, data) => {
    this.props.onEdit(data.id);
  };

  onFilter = (event, data) => {
    const term = data.value.toLowerCase();
    this.props.onFilter(term)
  };

  onDelete = (event, data) => {
    this.props.onDelete(data.id);
  };

  render() {

    // TODO: menu dropdown hack to align left, see
    // https://github.com/Semantic-Org/Semantic-UI/issues/3645#issuecomment-279993428
    const items = this.props.items.map(item => (
      <List.Item key={item.id}>
        <List.Content floated="left"><List.Icon name='key' /></List.Content>
        <List.Content floated="left">
          <List.Header>{ item.name }</List.Header>
          <List.Description>{ item.description }</List.Description>
        </List.Content>
        <List.Content floated="right" >
          <Button
            id={item.id}
            onClick={this.editClicked}>Edit</Button>

            <Dropdown button icon="setting" className='icon'>
              <Dropdown.Menu style={{ right: 0, left: "auto" }}>
                <Dropdown.Item icon="copy" text="Copy" />
                <Dropdown.Item icon="edit" text="Edit" onClick={this.editClicked} id={item.id}/>
                <Dropdown.Item onClick={this.onDelete}>
                  <Icon name="trash" color="red" />
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

        </List.Content>
      </List.Item>
    ));

    return (
      <div>
        <Input
          onChange={this.onFilter}
          defaultValue={this.props.filter}
          placeholder='Search...' />
        <List selection divided verticalAlign='middle'>
          { items }
        </List>
      </div>
    );
  }
}

ItemList.propTypes = {
  items: PropTypes.array,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onFilter: PropTypes.func,
  filter: PropTypes.string,
};
