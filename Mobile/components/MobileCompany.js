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
    view: "all",
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

    let changedClientList = [...this.state.clients];
    changedClientList.forEach((el, i) => {
      if (el.id === newClient.id && JSON.stringify(el) != JSON.stringify(newClient)) {
        let changedClient = {...el};
        changedClient = newClient; 
        changedClientList[i] = changedClient;
        console.log( changedClient);
      }
    })

    this.setState({ clients: changedClient });

    // let changedArr = [];

    // for (let i = 0; i < this.state.clients.length; i++) {
    //   if (this.state.clients[i].id === newClient.id) {
    //     this.state.clients[i] = newClient;
    //   }

    //   changedArr.push(this.state.clients[i]);
    // }

    // this.setState({ clients: changedArr });
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
    this.setState({ view: "active" });
  }

  showBlockedUsers = () => {
    this.setState({ view: "blocked" });
  }

  showAllUsers = () => {
    this.setState({ view: "all" });
  }

  addNewClient = () => {
    let newUser = {};

    newUser.fam = "Фамилия";
    newUser.im = "Имя";
    newUser.otch = "Отчество";
    newUser.balance = 0;
    newUser.id = Math.ceil(Math.random() * 100);

    let newUsers = [...this.state.clients, newUser];

    this.setState({ clients: newUsers, adding: true });
  }

  render() {

    console.log("MobileCompany render");

    let usersForRendering = [];
    let allClients = [];
    let blockedClients = [];
    let activeClients = [];

    if (this.state.view === "all") {
      usersForRendering = this.state.clients.map(client => {
        return <MobileClient key={client.id} client={client} />;
      });
    }

    if (this.state.view === "active") {
      let arrayFromActiveUsers = [...this.state.clients];
      arrayFromActiveUsers.forEach((el) => {
        let user = { ...el };

        if (user.balance > 0) {
          activeClients.push(user);
        }
      })

      usersForRendering = activeClients.map(client => {      
        return <MobileClient key={client.id} client={client} />;
      });
    }

    if (this.state.view === "blocked") {
      let arrayFromBlockedUsers = [...this.state.clients];
      arrayFromBlockedUsers.forEach((el) => {
        let user = { ...el };

        if (user.balance <= 0) {
          blockedClients.push(user);
        }
      });

      usersForRendering = blockedClients.map(client => {
        return <MobileClient key={client.id} client={client} />;
      });
    }

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
            <tbody className='MobileCompanyClients'>{usersForRendering}</tbody>
          </table>
        </div>
        <input type="button" value="Добавить" onClick={this.addNewClient} />
      </div>
    );

  }

}

export default MobileCompany;
