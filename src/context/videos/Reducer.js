import {
    WATCH,
    WATCHNEXT,
    UPLOADED,
    REMOVE
} from "../types";

/**
 * 
 * @param {object} state holds initial state object.
 * @param {object} action 
 * @description maintains state management of redux store.
 */
export default function reducer(state = {
    watch: null,
    watchNext: null,
    videos: []
}, action) {
    
    switch (action.type) {
        case WATCH:
            return {
                ...state,
                watch: state.videos[action.payload] || null
            }
        case WATCHNEXT:
            return {
                ...state,
                watchNext: state.videos[action.payload] || null
            }
        case UPLOADED:
            
            const alreadyUploaded = state.videos.reduce((acc,cur) => {
                 acc.push(cur.name);
                 return acc;
            },[]);
            
            const uploads = action.payload.filter(object => !alreadyUploaded.includes(object.name));

            return {
                ...state,
                videos: [...state.videos, ...uploads]
            }
        case REMOVE:
            return {
                ...state,
                videos: state.videos.filter(video => video.id !== action.payload)
            }
        default:
            return state;
    }
}