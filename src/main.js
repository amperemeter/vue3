import {createApp} from 'vue'
import components from '@/components/UI'
import directives from '@/directives'
import App from './App.vue'
import router from "@/router";
import store from "@/store";

const app = createApp(App);

components.forEach(component => {
  app.component(component.name, component);
});

directives.forEach(directive => {
  app.directive(directive.name, directive);
});

app
  .use(store)
  .use(router)
  .mount('#app');