import { createApp } from "vue";
import App from "./App.vue";
import { Settings } from "luxon";
import "./styles.css";
import "./animations.css";

Settings.defaultLocale = "en-GB";
createApp(App).mount("#app");
