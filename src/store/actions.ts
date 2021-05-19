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

export function changeMode({ commit, state, getters }, mode) {
    const currentId = getters.currentSong.mid
    if (mode === PLAY_MODE.random) {
        commit('setPlayList', shuffle(state.sequeceList))
    } else {
        commit('setPlayList', state.sequeceList)
    }
    const index = state.playList.findIndex((song) => {
        return song.mid === currentId
    })

    commit('setPlayIndex', index)
    commit('setPlayMode', mode)
}

export function removeSong({ commit, state }, song) {
    const sequeceList = state.sequeceList.slice()
    const playList = state.playList.slice()

    const sequenceIndex = findIndex(sequeceList, song)
    const index = findIndex(playList, song)
    if (sequenceIndex < 0 || index < 0) return
    sequeceList.splice(sequenceIndex, 1)
    playList.splice(index, 1)
    let playIndex = state.playIndex
    if (index < playIndex || playIndex === playList.length) playIndex--

    commit('setSequeceList', sequeceList)
    commit('setPlayList', playList)
    commit('setPlayIndex', playIndex)
    if (!playList.length) commit('setPlayState', false)
}

export function clearSongList({ commit }) {
    commit('setSequeceList', [])
    commit('setPlayList', [])
    commit('sePlayIndex', 0)
    commit('setPlayState', false)
}


function findIndex(list, song) {
    return list.findIndex((item) => {
        return item.mid === song.mid
    })
}
