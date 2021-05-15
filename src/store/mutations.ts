import { PLAY_MODE, TState, TMutations } from "./types"

const mutations: TMutations = {
    setPlayState(state: TState, playing: TState['playing']) {
        state.playing = playing
    },
    setSequeceList(state: TState, list: TState['sequeceList']) {
        state.sequeceList = list
    },
    setPlayList(state: TState, list: TState['playList']) {
        state.playList = list
    },
    setPlayMode(state: TState, mode: TState['playMode']) {
        state.playMode = mode
    },
    setPlayIndex(state: TState, index: TState['playIndex']) {
        state.playIndex = index
    },
    setFullScreen(state: TState, fullScreen: TState['fullScreen']) {
        state.fullScreen = fullScreen
    }
}

export default mutations