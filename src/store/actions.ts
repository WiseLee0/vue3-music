import { shuffle } from "@/assets/js/utils";
import { PLAY_MODE } from "./types";
export function selectPlay({ commit }, { list, index }) {
    commit('setPlayMode', PLAY_MODE.sequence)
    commit('setSequeceList', list)
    commit('setPlayList', list)
    commit('setPlayIndex', index)
    commit('setPlayState', true)
    commit('setFullScreen', true)
}

export function randomPlay({ commit }, list) {
    commit('setPlayMode', PLAY_MODE.random)
    commit('setSequeceList', list)
    const randomList = shuffle(list)
    commit('setPlayList', randomList)
    commit('setPlayIndex', 0)
    commit('setPlayState', true)
    commit('setFullScreen', true)
}
