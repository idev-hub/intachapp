import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAxios from 'vue-axios'
import * as axios from 'axios'
import bridge from '@vkontakte/vk-bridge'

const Vue = createApp(App)

bridge.send("VKWebAppInit", {}).catch(console.error)
bridge.send('VKWebAppGetEmail')
    .then(data => {
        console.log(data.email)
    })
    .catch(console.error)

Vue.use(store).use(router).use(VueAxios, axios).mount('#app')
