import { createApp } from "vue";
import App from "./App.vue";
import "./styles.css";
import { Settings } from "luxon";

Settings.defaultLocale = "en-GB";
createApp(App).mount("#app");
