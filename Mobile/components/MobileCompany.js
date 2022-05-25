import React from 'react';
import PropTypes from 'prop-types';

import MobileClient from './MobileClient';
import { clientEvents } from './events';

import './MobileCompany.css';

class MobileCompany extends React.PureComponent {

  static propTypes = {
    name: PropTypes.string.isRequired,
    clients: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        fam: PropTypes.string.isRequired,
        im: PropTypes.string.isRequired,
        otch: PropTypes.string.isRequired,
        balance: PropTypes.number.isRequired,
      })
    ),
  };

  state = {
    name: this.props.name,
    clients: this.props.clients,
    adding: false,
  };

  componentDidMount = () => {
    clientEvents.addListener('newClienList', this.changeClient);
    clientEvents.addListener('deleteClient', this.deleteClient);
  };

  componentWillUnmount = () => {
    clientEvents.removeListener('newClienList', this.changeClient);
    clientEvents.addListener('deleteClient', this.deleteClient);
  };

  changeClient = (newClient) => {
    let changedArr = [];

    for (let i = 0; i < this.state.clients.length; i++) {
      if (this.state.clients[i].id === newClient.id) {
        this.state.clients[i] = newClient;
      }

      changedArr.push(this.state.clients[i]);
    }

    this.setState({ clients: changedArr });
  }

  deleteClient = (deletedClient) => {
    let changedArr = this.state.clients.filter(function (el) {
      return el.id !== deletedClient.id;
    });

    this.setState({ clients: changedArr });
  }

  setName1 = () => {
    this.setState({ name: 'МТС' });
  };

  setName2 = () => {
    this.setState({ name: 'Velcom' });
  };

  showActiveUsers = () => {
    let activeUsers = [];
    let arrayFromActiveUsers = this.state.clients.map((el) => {
      let user = { ...el };
      if (user.balance > 0) {
        activeUsers.push(user);
      }
    })

    this.setState({ clients: activeUsers });
  }

  showBlockedUsers = () => {
    let blockedUsers = [];
    let arrayFromBlockedUsers = this.state.clients.map((el) => {
      let user = { ...el };
      if (user.balance <= 0) {
        blockedUsers.push(user);
      }
    })

    this.setState({ clients: blockedUsers });
  }

  showAllUsers = () => {
    this.setState({ clients: this.state.clients });
  }

  addNewClient = () => {
    let newUser = {};
    newUser.id = Math.ceil(Math.random() * 100);
    newUser.fam = "Фамилия";
    newUser.im = "Имя";
    newUser.otch = "Отчество";
    newUser.balance = 0;
    let newUsers = [...this.state.clients, newUser];

    this.setState({ clients: newUsers, adding: true });
  }

  render() {

    console.log("MobileCompany render");

    var clientsCode = this.state.clients.map(client => {
      let FIO = { fam: client.fam, im: client.im, otch: client.otch, balance: client.balance, id: client.id };
      return <MobileClient key={client.id} client={FIO} />;
    });

    return (
      <div>
        <div className="MobileCompany">
          <input type="button" value="МТС" onClick={this.setName1} />
          <input type="button" value="Velcom" onClick={this.setName2} />
          <div className='MobileCompanyName'>Компания &laquo;{this.state.name}&raquo;</div>
        </div>
        <div className="Filter">
          <input type="button" value="Все" onClick={this.showAllUsers} />
          <input type="button" value="Активные" onClick={this.showActiveUsers} />
          <input type="button" value="Заблокированные" onClick={this.showBlockedUsers} />
        </div>
        <div className="ClientsHeader">
          <table className='table'>
            <thead>
              <tr className='tableHeader'>
                <td>Фамилия</td>
                <td>Имя</td>
                <td>Отчество</td>
                <td>Баланс</td>
                <td>Статус</td>
                <td className="button">Редактировать</td>
                <td className="button">Статус</td>
              </tr>
            </thead>
            <tbody className='MobileCompanyClients'>{clientsCode}</tbody>
          </table>
        </div>
        <input type="button" value="Добавить" onClick={this.addNewClient} />
      </div>
    );

  }

}

export default MobileCompany;
