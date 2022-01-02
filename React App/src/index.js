// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import authentication from '@kdpw/msal-b2c-react';
import App from './App';

authentication.initialize({
    instance: 'https://<TENANT NAME>.b2clogin.com/tfp/', 
    tenant: '<TENANT NAME>.onmicrosoft.com',
    signInPolicy: '<USER FLOW NAME>',
    applicationId: '<REGISTERED APP ID>',
    cacheLocation: 'sessionStorage',
    scopes: ['profile', 'openid'],
    redirectUri: '<REDIRECT URI>',
    validateAuthority: false
});

authentication.run(() => {
    ReactDOM.render(<App />, document.getElementById('root'));
});