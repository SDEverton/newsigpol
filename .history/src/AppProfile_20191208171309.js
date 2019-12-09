import React, { Component } from 'react';
import classNames from 'classnames';
import api from './service/api';
import md5 from 'md5';

export class AppProfile extends Component {

    constructor() {
        super();
        this.state = {
            expanded: false,
            img: ''
        };
        this.onClick = this.onClick.bind(this);
    }

    async componentDidMount() {
        const cpf = '92763049249';
        let senha = 'Eu81501208';
        senha = md5(senha);
        const response = await api.post('api/v1/auth/appidentidade', {
            cpf,
            senha
          });
        console.log(response.data);
        const idpessoa = await response.data.payload.idpessoa.toString();
        let person = idpessoa.split('');
        person = person.join('/');
        const url = `https://sigpol.pm.pa.gov.br/upload/pessoa/${person}/foto.jpg`;
        await this.setState({ img: url });
    }

    onClick(event) {
        this.setState({expanded: !this.state.expanded});
        event.preventDefault();
    }

    render() {
        return  (
            <div className="layout-profile">
                <div>
                    <img src={this.state.img} alt="" />
                </div>
                <button className="p-link layout-profile-link" onClick={this.onClick}>
                    <span className="username">Claire Williams</span>
                    <i className="pi pi-fw pi-cog"/>
                </button>
                <ul className={classNames({'layout-profile-expanded': this.state.expanded})}>
                    <li><button className="p-link"><i className="pi pi-fw pi-user"/><span>Account</span></button></li>
                    <li><button className="p-link"><i className="pi pi-fw pi-inbox"/><span>Notifications</span><span className="menuitem-badge">2</span></button></li>
                    <li><button className="p-link"><i className="pi pi-fw pi-power-off"/><span>Logout</span></button></li>
                </ul>
            </div>
        );
    }
}