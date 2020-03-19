declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare module "*.json" {
  const value: { [key: string]: any };
  export default value;
}

declare module "vue-qrcode" {
  const qrcode: any;
  export default qrcode;
}

declare module "vuex-oidc";

declare module "appConfig" {
  import { AppConfig } from "@/models/appConfig";
  const config: any;
  export default config;
}

declare module "themeConfig" {
  import { UserVuetifyPreset } from "vuetify";
  const themeConfig: UserVuetifyPreset;
  export default themeConfig;
}

declare module "claimConfig" {
  const claimConfig: any;
  export default claimConfig;
}
