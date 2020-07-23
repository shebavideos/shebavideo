/**
 * @description redux state interface.
 */

import { createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension"
import reducer from "./Reducer"
import {
    WATCH,
    WATCHNEXT,
    UPLOADED,
    REMOVE
} from "../types";

const store = createStore(
    reducer,
    // remove in production.
    devToolsEnhancer({
        trace: true
    })
),
    { dispatch, } = store;

/**
 * @return redux store current state.
 */
export const getState = store.getState;


/**
 * 
 * @param {number} id 
 * @description selects video with given id from redux store.
 */
export const watch = (id) => {
    dispatch({ type: WATCH, payload: id });
}

/**
 * 
 * @param {number} id 
 * @description adds video with given id to watch next queue, in redux store.
 */
export const watchNext = (id) => {
    dispatch({ type: WATCHNEXT, payload: id });
}

/**
 * 
 * @param {ArrayLike} videos 
 * @description adds video(s) uploaded to redux store.
 */
export const uploadVideos = (videos) => {
    dispatch({ type: UPLOADED, payload: videos });
}

/**
 * 
 * @param {number} id 
 * @description removes vides with given id from redux store.
 */
export const remove = (id) => {
    dispatch({ type: REMOVE, payload: id });
}

/**
 * @description wrapper of redux store.subscribe
 * @param {function} listener takes a listener function.
 * @returns  unsubscribe function.
 */
export const subscribe = listener => {
    const unsubscribe = store.subscribe(listener);
    return unsubscribe;
}

