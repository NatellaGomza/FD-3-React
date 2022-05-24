import React from 'react';
import PropTypes from 'prop-types';

import MobileClient from './MobileClient';
import NewClient from './NewClient';

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
    newClient: [],
    adding: false,
  };


  setName1 = () => {
    this.setState({ name: 'МТС' });
  };

  setName2 = () => {
    this.setState({ name: 'Velcom' });
  };

  showActiveUsers = () => {
    let activeUsers = [];
    let arrayFromActiveUsers = this.props.clients.map((el) => {
      let user = { ...el };
      if (user.balance > 0) {
        activeUsers.push(user);
      }
    })

    this.setState({ clients: activeUsers });
  }

  showBlockedUsers = () => {
    let blockedUsers = [];
    let arrayFromBlockedUsers = this.props.clients.map((el) => {
      let user = { ...el };
      if (user.balance <= 0) {
        blockedUsers.push(user);
      }
    })

    this.setState({ clients: blockedUsers });
  }

  showAllUsers = () => {
    this.setState({ clients: this.props.clients });
  }

  addNewClient = () => {
    let newUser = {};
    newUser.id = Math.ceil(Math.random() * 100);
    newUser.fam = "Фамилия";
    newUser.im = "Имя";
    newUser.otch = "Отчество";
    newUser.balance = 0;
    let newUsers = [...this.state.newClient, newUser];

    this.setState({ newClient: newUsers, adding: true });
    console.log(newUsers);
    console.log(this.state.newClient);

  }

  render() {

    console.log("MobileCompany render");

    var clientsCode = this.state.clients.map(client => {
      let FIO = { fam: client.fam, im: client.im, otch: client.otch };
      return <MobileClient key={client.id} id={client.id} FIO={FIO} balance={client.balance} />;
    });

    var newClient = this.state.newClient.map(client => {
      let newClient = { fam: client.fam, im: client.im, otch: client.otch };
      return <NewClient key={client.id} id={client.id} FIO={newClient} balance={client.balance}/>
    })

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
            <tfoot>{newClient}</tfoot>
          </table>
        </div>
        <input type="button" value="Добавить" onClick={this.addNewClient} />
        <input type="button" className={!this.state.adding ? 'None' : 'Visible'} value="Сохранить" onClick={this.addNewClient} />
      </div>
    );

  }

}

export default MobileCompany;
