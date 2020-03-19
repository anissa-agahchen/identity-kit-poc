module.exports = {
  configureWebpack: config => {
    config.externals = {
      appConfig: 'appConfig',
      themeConfig: require("./public/config/vuetify.json"),
      claimConfig: require("./public/config/claim-config.json")
    };
  }
};
