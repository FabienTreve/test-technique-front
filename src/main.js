import { createApp } from 'vue'
import './style.css'
import router from './router'
import store from './store'
import App from './App.vue'
import vuetify from './vuetify'
import 'vuetify/dist/vuetify.min.css' 

createApp(App).use(store).use(router).use(vuetify).mount('#app')
