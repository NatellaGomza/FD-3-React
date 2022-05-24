import React from 'react';
import PropTypes from 'prop-types';

import MobileClient from './MobileClient';

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

    // let newUser = {};
    // newUser.id = Math.random*100;
    // newUser.fam = "Фамилия";
    // newUser.im = "Имя";
    // newUser.otch = "Отчество";
    // newUser.balanse = "Баланс";

    // let activeUsers = [...this.props.clients, newUser];

    // this.setState({clients:activeUsers});
    // console.log(this.state.clients);

    this.setState({adding:true});

  }

  render() {

    console.log("MobileCompany render");

    var clientsCode = this.state.clients.map(client => {
      let FIO = { fam: client.fam, im: client.im, otch: client.otch };
      return <MobileClient key={client.id} id={client.id} FIO={FIO} balance={client.balance} />;
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
            <tfoot>
              <tr className={!this.state.adding ? 'None' : ''} >
                <td>
                  <input type='text' name="surname" defaultValue="Фамилия"></input>
                </td>
                <td>
                  <input type='text' name="name" defaultValue="Имя"></input>
                </td>
                <td>
                  <input type='text' name="patronymic" defaultValue="Отчество"></input>
                </td>
                <td>
                  <input type='text' name="balance" defaultValue="Баланс"></input>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <input type="button" value="Добавить" onClick={this.addNewClient} />
        <input type="button" className={!this.state.adding ? 'None' : 'Visible'} value="Сохранить" onClick={this.addNewClient} />
      </div>
    );

  }

}

export default MobileCompany;
