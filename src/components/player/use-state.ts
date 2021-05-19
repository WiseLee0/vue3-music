import { computed } from "vue"
import { useStore } from "vuex";
import type { TState } from "@/store/types";
export default function useState() {
    const store = useStore<TState>();
    const playList = computed(() => store.state.playList);
    const currentSong = computed(() => store.getters.currentSong || {})
    const playIcon = computed(() => {
        return store.state.playing ? 'icon-pause' : 'icon-play'
    })
    const playIndex = computed(() => store.state.playIndex)
    const playing = computed(() => store.state.playing)
    const playMode = computed(() => store.state.playMode)
    const fullScreen = computed(() => store.state.fullScreen)
    const sequeceList = computed(() => store.state.sequeceList)
    return {
        playList,
        currentSong,
        playIcon,
        playing,
        playIndex,
        playMode,
        fullScreen,
        sequeceList,
        store,
    }
}