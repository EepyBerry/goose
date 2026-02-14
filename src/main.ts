import { createApp } from "vue";
import App from "./App.vue";
import { Settings } from "luxon";
import "@/assets/sass/index.scss";

Settings.defaultLocale = "en-GB";
createApp(App).mount("#app");
