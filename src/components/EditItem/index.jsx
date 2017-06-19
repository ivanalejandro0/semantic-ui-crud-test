import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Form,
  Input,
  TextArea,
} from 'semantic-ui-react';


export default class EditItem extends React.PureComponent {

  handleSave = () => {
    const { item } = this.props;

    // TODO: use onChange props for these
    const name = this._name.inputRef.value;
    const description = this._description.inputRef.value;
    const secret = this._secret.inputRef.value;
    const data = this._data.ref.value;

    const newItem = {
      id: item.id,
      name,
      description,
      secret,
      data,
    };
    this.props.onSave(newItem);
  }

  handleDiscard = () => {
    this.props.onDiscard();
  }

  render() {
    const { item } = this.props;

    return (
      <Form>

        <Form.Field required>
          <label>Name</label>
          <Input
            ref={ ref => this._name = ref }
            defaultValue={ item.name }
            placeholder="Item's name" />
        </Form.Field>

        <Form.Field >
          <label>Description</label>
          <Input
            ref={ ref => this._description = ref }
            defaultValue={ item.description }
            placeholder='enter some info here' />
        </Form.Field>

        <Form.Field required>
          <label>Secret</label>
          <Input
            ref={ ref => this._secret = ref }
            defaultValue={ item.secret }
            type="password" placeholder='secret data'
            action={{ color: 'teal', labelPosition: 'right', icon: 'random', content: 'Generate', type: 'button' }}
          />
        </Form.Field>

        <Form.Field>
          <label>Data</label>
          <TextArea
            ref={ ref => this._data = ref }
            defaultValue={ item.data } />
        </Form.Field>

        <Button
          type="button"
          onClick={ this.handleDiscard }
          content='Discard' icon='remove' labelPosition='left' />
        <Button
          type="button"
          onClick={ this.handleSave }
          content='Save' color="green" icon='checkmark' labelPosition='right' floated="right" />

      </Form>
    );
  }
}

EditItem.propTypes = {
  item: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onDiscard: PropTypes.func.isRequired,
};
