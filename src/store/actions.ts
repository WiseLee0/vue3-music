import { PLAY_MODE } from "./types";

export function selectPlay({ commit, state }, { list, index }) {
    commit('setPlayMode', PLAY_MODE.sequence)
    commit('setSequeceList', list)
    commit('setPlayList', list)
    commit('setPlayIndex', index)
    commit('setPlayState', true)
    commit('setFullScreen', true)
}