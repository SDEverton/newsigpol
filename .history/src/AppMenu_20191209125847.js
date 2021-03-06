import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class AppSubmenu extends Component {
  static defaultProps = {
    className: null,
    items: null,
    onMenuItemClick: null,
    root: false,
  };

  static propTypes = {
    className: PropTypes.string,
    items: PropTypes.array,
    onMenuItemClick: PropTypes.func,
    root: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = { activeIndex: null };
  }

  onMenuItemClick(event, item, index) {
    const { activeIndex } = this.state;
    const { onMenuItemClick } = this.props;
    // avoid processing disabled items
    if (item.disabled) {
      event.preventDefault();
      return true;
    }

    // execute command
    if (item.command) {
      item.command({ originalEvent: event, item });
    }

    if (index === activeIndex) this.setState({ activeIndex: null });
    else this.setState({ activeIndex: index });

    if (onMenuItemClick) {
      onMenuItemClick({
        originalEvent: event,
        item,
      });
    }
  }

  renderLinkContent(item) {
    const submenuIcon = item.items && (
      <i className="pi pi-fw pi-angle-down menuitem-toggle-icon" />
    );
    const badge = item.badge && (
      <span className="menuitem-badge">{item.badge}</span>
    );

    return (
      <>
        <i className={item.icon} />
        <span>{item.label}</span>
        {submenuIcon}
        {badge}
      </>
    );
  }

  renderLink(item, i) {
    const content = this.renderLinkContent(item);

    if (item.to) {
      return (
        <NavLink
          activeClassName="active-route"
          to={item.to}
          onClick={e => this.onMenuItemClick(e, item, i)}
          exact
          target={item.target}
        >
          {content}
        </NavLink>
      );
    }

    return (
      <a
        href={item.url}
        onClick={e => this.onMenuItemClick(e, item, i)}
        target={item.target}
      >
        {content}
      </a>
    );
  }

  render() {
    const { items, root, onMenuItemClick, className } = this.props;
    const { activeIndex } = this.state;
    const itens =
      items &&
      items.map((item, i) => {
        const active = activeIndex === i;
        const styleClass = classNames(item.badgeStyleClass, {
          'active-menuitem': active && !item.to,
        });

        return (
          <li className={styleClass} key={i}>
            {item.items && root === true && <div className="arrow" />}
            {this.renderLink(item, i)}
            <AppSubmenu items={item.items} onMenuItemClick={onMenuItemClick} />
          </li>
        );
      });

    return itens ? <ul className={className}>{itens}</ul> : null;
  }
}

export class AppMenu extends Component {
  static defaultProps = {
    model: null,
    onMenuItemClick: null,
  };

  static propTypes = {
    model: PropTypes.array,
    onMenuItemClick: PropTypes.func,
  };

  render() {
    const { model, onMenuItemClick } = this.props;
    return (
      <div className="layout-menu-container">
        <AppSubmenu
          items={model}
          className="layout-menu"
          onMenuItemClick={onMenuItemClick}
          root
        />
      </div>
    );
  }
}
