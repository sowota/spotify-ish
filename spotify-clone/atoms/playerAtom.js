import { atom } from 'recoil'


export const isPlayingState = atom({
    key: 'isPlayingState',
    default: false
})

export const currentTrackIdState = atom({
    key: 'currentTrackIdState',
    default: null
})


export const albumIdState = atom({
    key: 'albumIdState',
    default:null,
})

export const albumState = atom({
    key:'albumState',
    default: null,
})