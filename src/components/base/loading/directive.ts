import Loading from './loading.vue';
import { createApp } from 'vue'
import { addClass, removeClass } from '@/assets/js/dom'
const relativeCls = 'g-relative'

function createLoadingDirective(Component) {
    return {
        mounted(el, binding) {
            const app = createApp(Component)
            // loading实例
            const instance = app.mount(document.createElement('div'))
            const name = Component.name
            if (!el[name]) el[name] = {}
            el[name].instance = instance
            const title = binding.arg
            if (typeof title !== 'undefined') (instance as any).setTitle(title)
            if (binding.value) append(el)
        },
        updated(el, binding) {
            const title = binding.arg
            const name = Component.name
            if (typeof title !== 'undefined') el[name].instance.setTitle(title)
            if (binding.value !== binding.oldValue) binding.value ? append(el) : remove(el)
        }
    }
    function append(el) {
        const name = Component.name
        const style = getComputedStyle(el)
        if (['absolute', 'fixed', 'relative'].indexOf(style.position) === -1) {
            addClass(el, relativeCls)
        }
        el.appendChild(el[name].instance.$el)
    }

    function remove(el) {
        const name = Component.name
        removeClass(el, relativeCls)
        el.removeChild(el[name].instance.$el)
    }
}

const loadingDirective = createLoadingDirective(Loading)

export default loadingDirective