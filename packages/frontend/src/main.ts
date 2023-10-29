import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "@/router";
import '@mdi/font/css/materialdesignicons.css'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import axios from "axios";

const vuetify = createVuetify({
    components,
    directives,
})

const app = createApp(App);

app.use(vuetify);
app.use(router);
app.mount('#app');

axios.interceptors.response.use((response) => {
    return response
}, (error) => {
    if (error.response.status === 403) {
        router.push('/login');
    }
    return Promise.reject(error)
})