import { PLAY_MODE } from "@/store/types";
import { computed } from "vue"
import useState from "./use-state";
export default function useMode() {
    const { playMode, store } = useState()
    const modeIcon = computed(() => {
        const playModeVal = playMode.value
        return playModeVal === PLAY_MODE.sequence
            ? 'icon-sequence'
            : playModeVal === PLAY_MODE.random
                ? 'icon-random'
                : 'icon-loop'
    })
    const modeText = computed(() => {
        const playModeVal = playMode.value
        return playModeVal === PLAY_MODE.sequence
            ? '顺序播放'
            : playModeVal === PLAY_MODE.random
                ? '随机播放'
                : '单曲循环'
    })
    function changeMode() {
        const mode = (playMode.value + 1) % 3
        store.dispatch('changeMode', mode)
    }
    return {
        modeIcon,
        modeText,
        changeMode
    }
}