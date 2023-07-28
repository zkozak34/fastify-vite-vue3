import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

const app = createApp(App);

export default function createInstance() {
  return app;
}
