import { createApp } from 'vue'
import App from './App.vue'
import './assets/iconfong/iconfont.css'
import './assets/iconfong/iconfont.js'
import fileSystem from './components/index'
createApp(App).use(fileSystem).mount('#app')
