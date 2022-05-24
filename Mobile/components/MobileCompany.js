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
  };

  setName1 = () => {
    this.setState({ name: 'МТС' });
  };

  setName2 = () => {
    this.setState({ name: 'Velcom' });
  };

  setBalance = (clientId, newBalance) => {
    let changed = false;
    let newClients = [...this.state.clients]; // копия самого массива клиентов
    newClients.forEach((c, i) => {
      if (c.id == clientId && c.balance != newBalance) {
        let newClient = { ...c }; // копия хэша изменившегося клиента
        newClient.balance = newBalance;
        newClients[i] = newClient;
        changed = true;
      }
    });
    if (changed)
      this.setState({ clients: newClients });
  };

  setBalance1 = () => {
    this.setBalance(105, 230);
  };

  setBalance2 = () => {
    this.setBalance(105, 250);
  };

  render() {

    console.log("MobileCompany render");

    var clientsCode = this.state.clients.map(client => {
      let FIO = { fam: client.fam, im: client.im, otch: client.otch };
      return <MobileClient key={client.id} id={client.id} FIO={FIO} balance={client.balance} />;
    }
    );

    return (
      <div>
        <div className="MobileCompany">
          <input type="button" value="МТС" onClick={this.setName1} />
          <input type="button" value="Velcom" onClick={this.setName2} />
          <div className='MobileCompanyName'>Компания &laquo;{this.state.name}&raquo;</div>
        </div>
        <div className="Filter">
          <input type="button" value="Все" onClick={this.setName1} />
          <input type="button" value="Активные" onClick={this.setName2} />
          <input type="button" value="Заблокированные" onClick={this.setName1} />
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
        <input type="button" value="Добавить" onClick={this.setBalance1} />
      </div>
    );

  }

}

export default MobileCompany;
