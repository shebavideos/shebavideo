import {
    WATCH
} from "../types";
 import {
     getState
 } from "../videos/State";

/**
 * 
 * @param {object} state holds initial state object.
 * @param {object} action 
 * @description maintains state management of redux store.
 */
export default function reducer(state = {
    watch: null
}, action) {

    switch (action.type) {

        case WATCH:
            let playlist = getState();
            let index = playlist.videos.findIndex(element => element.id === action.payload);

            return {
                ...state,
                watch: playlist.videos[index] || null
            }

        default:

            return state;
    }
}