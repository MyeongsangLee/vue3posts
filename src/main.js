import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import funcPlugins from '@/plugins/func.js';
import objPlugins from '@/plugins/obj.js';
import person from '@/plugins/person.js';
// import focus from '@/directives/focus.js';
// import globalComponent from '@/plugins/global-components';
import globalDirectives from '@/plugins/global-directives.js';
import dayjs from './plugins/dayjs';

const app = createApp(App);
// app.directive('focus', focus);
app.use(router);
app.use(funcPlugins);
app.use(objPlugins, { name: '짐코딩' });
app.use(person, { name: '홍길동' });
app.use(dayjs);
// app.use(globalComponent);
app.use(globalDirectives);
app.mount('#app');
// createApp(App).mount('#app');

import 'bootstrap/dist/js/bootstrap.js';

console.log('MODE: ', import.meta.env.MODE);
console.log('BASE_URL: ', import.meta.env.BASE_URL);
console.log('PROD: ', import.meta.env.PROD);
console.log('DEV: ', import.meta.env.DEV);
console.log('VITE_APP_API_URL: ', import.meta.env.VITE_APP_API_URL);
