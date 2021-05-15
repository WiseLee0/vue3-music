import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import '@/assets/scss/index.scss'
import loadingDirective from '@/components/base/loading/directive'
import noResultDirective from '@/components/base/no-result/directive'
import lazyPlugin from '@/plugin/vue3-lazy'

createApp(App)
    .use(store)
    .use(router)
    .directive('loading', loadingDirective)
    .directive('result', noResultDirective)
    .use(lazyPlugin, {
        loading: require('@/assets/img/loading.png'),
        error: require('@/assets/img/error.png')
    })
    .mount('#app')
