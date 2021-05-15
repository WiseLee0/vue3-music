import { PLAY_MODE, TState } from "./types";

const state: TState = {
    sequeceList: [],
    playList: [],
    playing: false,
    playMode: PLAY_MODE.sequence,
    playIndex: 0,
    fullScreen: false
}
export default state