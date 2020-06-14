import React from 'react';
import '../../../assets/styles/sass/Login.scss';
import loginImg from '../../../public/img/undraw_secure_login_pdn4.svg';
import history from './history';
import config from '../../../config';

const Login = () => (
  <div className="login-container">
    <div className="content">
      <div className="image">
        <img src={loginImg} />
      </div>
    </div>
    <div className="footer">
      <button type="button"
        onClick={() => window.open(`https://github.com/login/oauth/authorize?client_id=${config.clientId}`)}
        className="btn">
            Login with Github
      </button>
    </div>
    <div className="footer">
      <button type="button" className="btn" variant="btn btn-success"
        onClick={() => history.push('/search')}>
            Login as Guest User
      </button>
    </div>
  </div>
);

export default Login;
