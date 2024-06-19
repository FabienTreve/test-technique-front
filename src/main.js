import { createApp } from 'vue'
import './style.css'
import router from './router'
import App from './App.vue'
import vuetify from './vuetify'
import 'vuetify/dist/vuetify.min.css' 

createApp(App).use(router).use(vuetify).mount('#app')
