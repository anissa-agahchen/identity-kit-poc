window.appConfig = {
  env: "development",
  issuer: {
    name: "Issuer Name"
  },
  authentication: {
    enabled: false,
    oidcSettings: {
      authority: "http://localhost:8180/auth/realms/identity-kit",
      clientId: "identity-kit-public",
      redirectUri: "http://localhost:4251/oidc-callback",
      redirect_uri: "http://localhost:4251/oidc-callback-error",
      responseType: "code",
      scope: "openid profile email",
      automaticSilentRenew: true,
      silentRedirectUri: "http://localhost:4251/silent-renew-oidc.html",
      post_logout_redirect_uri: "http://localhost:4251"
    }
  },
  apiServer: {
    url: "http://localhost:5000"
  },
  testLink: "https://csb-audio.pathfinder.gov.bc.ca"
};
