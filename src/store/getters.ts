import { TState } from "./types"

export const currentSong = (state: TState) => {
    return state.playList[state.playIndex]
}

