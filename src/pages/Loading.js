import React from 'react';
import logo from '../imagens/logo.png';
import logoDarkTheme from '../imagens/logoDarkTheme.png';
import './loading.css'
class Loading extends React.Component {
  render() {
    // const { history } = this.props;
    // const { pathname } = history.location;
    // console.log(pathname);
    return (
      <div className="carregando">
        <img  alt='logo' src={logoDarkTheme}></img>
        <div className='time'>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }
}

export default Loading;
