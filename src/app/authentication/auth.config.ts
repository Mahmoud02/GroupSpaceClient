import {AuthConfig} from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
  // Url of the Identity Provider
  issuer: 'https://localhost:5001',
  redirectUri: window.location.origin + '/login',
  postLogoutRedirectUri: window.location.origin,
  clientId: 'groupSpaceSPA',
  responseType: 'code',
  scope: 'openid profile email offline_access roles GroupSpaceApiScope',
  strictDiscoveryDocumentValidation: false,
  showDebugInformation: true,
};
