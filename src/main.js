import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./HomePage.vue";

const pinia = createPinia();

createApp(App).use(pinia).mount("#app");
