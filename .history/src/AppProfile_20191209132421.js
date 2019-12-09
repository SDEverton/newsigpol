import React, { Component } from 'react';
import classNames from 'classnames';
import md5 from 'md5';
import api from './service/api';

export class AppProfile extends Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
      img: '',
      data: '',
      graduacao: '',
    };
    this.onClick = this.onClick.bind(this);
  }

  async componentDidMount() {
    const cpf = '';
    let senha = '';
    senha = md5(senha);
    const response = await api.post('api/v1/auth/appidentidade', {
      cpf,
      senha,
    });
    console.log(response.data);
    const idpessoa = await response.data.payload.idpessoa.toString();
    let person = idpessoa.split('');
    person = person.join('/');
    const url = `https://sigpol.pm.pa.gov.br/upload/pessoa/${person}/foto.jpg`;
    await this.setState({
      img: url,
      data: response.data.payload,
      graduacao: response.data.payload.Graduacao.graduacao,
    });
  }

  onClick(event) {
    const { expanded } = this.state;
    this.setState({ expanded: !expanded });
    event.preventDefault();
  }

  render() {
    const { data, graduacao, img, expanded } = this.state;
    return (
      <div className="layout-profile">
        <div>
          <img src={img} alt="" />
        </div>
        <button className="p-link layout-profile-link" onClick={this.onClick}>
          <span className="username">
            {graduacao} {data.nome_guerra}
          </span>
          <i className="pi pi-fw pi-cog" />
        </button>
        <ul
          className={classNames({
            'layout-profile-expanded': expanded,
          })}
        >
          <li>
            <button className="p-link">
              <i className="pi pi-fw pi-user" />
              <span>Account</span>
            </button>
          </li>
          <li>
            <button className="p-link">
              <i className="pi pi-fw pi-inbox" />
              <span>Notifications</span>
              <span className="menuitem-badge">2</span>
            </button>
          </li>
          <li>
            <button className="p-link">
              <i className="pi pi-fw pi-power-off" />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    );
  }
}
