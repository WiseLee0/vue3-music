import Loading from './loading.vue';
import { createLikeLoadingDirective } from '@/assets/js/directive'

const loadingDirective = createLikeLoadingDirective(Loading)

export default loadingDirective