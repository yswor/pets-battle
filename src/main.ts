import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './global.css'
import CModal from './components/CModal.vue'
import Drawer from './components/Drawer.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
