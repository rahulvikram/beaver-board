import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'

// create the app and use the router
const app = createApp(App)
app.use(router)
app.mount('#app')
