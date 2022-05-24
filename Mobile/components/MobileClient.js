import React from 'react';
import PropTypes from 'prop-types';

import './MobileClient.css';

class MobileClient extends React.PureComponent {

  static propTypes = {
    id: PropTypes.number.isRequired,
    FIO: PropTypes.shape({
      fam: PropTypes.string.isRequired,
      im: PropTypes.string.isRequired,
      otch: PropTypes.string.isRequired,
    }),
    balance: PropTypes.number.isRequired,
  };

  state = {
    FIO: this.props.FIO,
    balance: this.props.balance,
    edit: false,
    delete : false,
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
    console.log(ref);
    this.newClientBalance = ref;
  };

  setNewClientFam = (ref) => {
    console.log(ref);
    this.newClientFam = ref;
  };

  setNewClientIm = (ref) => {
    console.log(ref);
    this.newClientIm = ref;
  }

  setNewClientOtch = (ref) => {
    console.log(ref);
    this.newClientOtch = ref;
  }

  setNewClient = () => {

    let newClient = {...this.state.FIO};

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

    if (this.newClientBalance) {
      let newBalance = this.newClientBalance.value;
      this.setState({ balance: newBalance });
    }

    this.setState({ FIO: newClient, edit: false });
  };

  deleteClient = () => {
    this.setState({ delete: true });
  }

  render() {

    console.log("MobileClient id=" + this.props.id + " render");

    return (
      <tr style={{ display: this.state.delete ? 'none' : ''}}>
        <td className='MobileClientFIO'>
          <span className={this.state.edit ? 'None' : 'Visible'}>{this.state.FIO.fam}</span>
          <input className={this.state.edit ? 'Visible' : 'None'} type='text' defaultValue={this.state.FIO.fam} ref={this.setNewClientFam} name="surname"></input>
        </td>
        <td className='MobileClientFIO'>
          <span className={this.state.edit ? 'None' : 'Visible'}>{this.state.FIO.im}</span>
          <input className={this.state.edit ? 'Visible' : 'None'} type='text' defaultValue={this.state.FIO.im} ref={this.setNewClientIm} name="name"></input>
        </td>
        <td className='MobileClientFIO'>
          <span className={this.state.edit ? 'None' : 'Visible'}>{this.state.FIO.otch}</span>
          <input className={this.state.edit ? 'Visible' : 'None'} type='text' defaultValue={this.state.FIO.otch} ref={this.setNewClientOtch} name="patronymic"></input>
        </td>
        <td >
          <span className={this.state.edit ? 'None' : 'Visible'}>{this.state.balance}</span>
          <input className={this.state.edit ? 'Visible' : 'None'} type='text' defaultValue={this.state.balance} ref={this.setNewClientBalance} name="balance"></input>
        </td>
        <td style={{ backgroundColor: this.state.balance > 0 ? 'rgb(7, 243, 7)' : 'rgb(253, 98, 98)' }}>{this.state.balance > 0 ? 'active' : 'blocked'}</td>
        <td className="button">
          <input className={this.state.edit ? 'None' : 'Visible'} type="button" name="button" value="Редактировать" onClick={this.beginEditing}></input>
          <input className={this.state.edit ? 'Visible' : 'None'} type="button" name="button" value="Сохранить" onClick={this.setNewClient}></input>
        </td>
        <td className="button">
          <input type="button" name="button" value="Удалить" disabled={this.props.beginEditing === true} onClick={this.deleteClient}></input>
        </td>
      </tr>
    );
  }
}

export default MobileClient;
