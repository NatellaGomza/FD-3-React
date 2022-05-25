import React from 'react';
import PropTypes from 'prop-types';

import './MobileClient.css';
import { clientEvents } from './events';

class MobileClient extends React.PureComponent {

  static propTypes = {

    client: PropTypes.shape({
      fam: PropTypes.string.isRequired,
      im: PropTypes.string.isRequired,
      otch: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
    }),

  };

  state = {
    edit: false,
    delete: false,
  };

  componentWillReceiveProps = (newProps) => {
    this.setState({ FIO: newProps.FIO, balance: newProps.balance });
  };

  beginEditing = () => {
    this.setState({ edit: true });
  }

  newClientFam = null;
  newClientIm = null;
  newClientOtch = null;
  newClientBalance = null;

  setNewClientBalance = (ref) => {
    this.newClientBalance = ref;
  };

  setNewClientFam = (ref) => {
    this.newClientFam = ref;
  };

  setNewClientIm = (ref) => {
    this.newClientIm = ref;
  }

  setNewClientOtch = (ref) => {
    this.newClientOtch = ref;
  }

  changeClient = () => {
    let newClient = { ...this.props.client };

    if (this.newClientBalance) {
      let newBalance = this.newClientBalance.value;
      newClient.balance = +newBalance;
    }

    if (this.newClientFam) {
      let newFam = this.newClientFam.value;
      newClient.fam = newFam;
    }

    if (this.newClientIm) {
      let newIm = this.newClientIm.value;
      newClient.im = newIm;
    }

    if (this.newClientOtch) {
      let newOtch = this.newClientOtch.value;
      newClient.otch = newOtch;
    }

    this.setState({ edit: false });
    clientEvents.emit('newClienList', newClient);
  };

// должны ли функции называться одинаково у родителя и ребенка?
  deleteClient = () => {
    
    let deletedClient = this.props.client;
    console.log(deletedClient);
    clientEvents.emit('deleteClient', deletedClient);
  }

  render() {

    console.log("MobileClient id=" + this.props.id + " render");

    return (
      <tr style={{ display: this.state.delete ? 'none' : '' }}>
        <td className='MobileClientFIO'>
          <span className={this.state.edit ? 'None' : 'Visible'}>{this.props.client.fam}</span>
          <input className={this.state.edit ? 'Visible' : 'None'} type='text' defaultValue={this.props.client.fam} ref={this.setNewClientFam} name="surname"></input>
        </td>
        <td className='MobileClientFIO'>
          <span className={this.state.edit ? 'None' : 'Visible'}>{this.props.client.im}</span>
          <input className={this.state.edit ? 'Visible' : 'None'} type='text' defaultValue={this.props.client.im} ref={this.setNewClientIm} name="name"></input>
        </td>
        <td className='MobileClientFIO'>
          <span className={this.state.edit ? 'None' : 'Visible'}>{this.props.client.otch}</span>
          <input className={this.state.edit ? 'Visible' : 'None'} type='text' defaultValue={this.props.client.otch} ref={this.setNewClientOtch} name="patronymic"></input>
        </td>
        <td >
          <span className={this.state.edit ? 'None' : 'Visible'}>{this.props.client.balance}</span>
          <input className={this.state.edit ? 'Visible' : 'None'} type='text' defaultValue={this.props.client.balance} ref={this.setNewClientBalance} name="balance"></input>
        </td>
        <td style={{ backgroundColor: this.props.client.balance > 0 ? 'rgb(7, 243, 7)' : 'rgb(253, 98, 98)' }}>{this.props.client.balance > 0 ? 'active' : 'blocked'}</td>
        <td className="button">
          <input className={this.state.edit ? 'None' : 'Visible'} type="button" name="button" value="Редактировать" onClick={this.beginEditing}></input>
          <input className={this.state.edit ? 'Visible' : 'None'} type="button" name="button" value="Сохранить" onClick={this.changeClient}></input>
        </td>
        <td className="button">
          <input type="button" name="button" value="Удалить" disabled={this.props.beginEditing === true} onClick={this.deleteClient}></input>
        </td>
      </tr>
    );
  }
}

export default MobileClient;
