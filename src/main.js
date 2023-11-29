import {createApp} from 'vue'
import components from '@/components/UI'
import App from './App.vue'
import router from "@/router";
import VIntersection from "@/directives/vintersection";

const app = createApp(App);

components.forEach(component => {
    app.component(component.name, component);
});

app.directive('intersection', VIntersection);
app.use(router).mount('#app');