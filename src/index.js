import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Router from './router/router';
import { Button, Row } from 'antd';
import { logout } from './services/Auth'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <Row justify={"end"} style={{ paddingRight: "4%", paddingTop: "1%", paddingBottom: "1%" }}>
      {
        localStorage.getItem('id') &&
        <nav>
          <Button danger type="primary" onClick={logout}>Logout</Button>
        </nav>
      }
    </Row>
    < Router />
  </div >
);
reportWebVitals();
