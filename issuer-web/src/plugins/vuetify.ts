import "@fortawesome/fontawesome-free/css/all.css";
import themeConfig from "themeConfig";
import Vue from "vue";
import Vuetify, { UserVuetifyPreset } from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

export default new Vuetify(themeConfig as UserVuetifyPreset);
