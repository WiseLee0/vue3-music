export enum PLAY_MODE {
    'sequence',
    'random',
    'loop'
}

export type TState = {
    sequeceList: string[],
    playList: string[],
    playing: boolean,
    playMode: PLAY_MODE,
    playIndex: number,
    fullScreen: boolean
}

export type TMutations = {
    setPlayState: (state: TState, val: TState[keyof TState]) => void
    setSequeceList: (state: TState, val: TState[keyof TState]) => void
    setPlayList: (state: TState, val: TState[keyof TState]) => void
    setPlayMode: (state: TState, val: TState[keyof TState]) => void
    setPlayIndex: (state: TState, val: TState[keyof TState]) => void
    setFullScreen: (state: TState, val: TState[keyof TState]) => void
}