import { legacy_createStore as createStore, combineReducers } from 'redux' 
// *for more then one reducer
import { applyMiddleware, compose } from 'redux'
// import { configureStore } from '@reduxjs/toolkit'
// import { createStore, applyMiddleware, compose}
// from 'redux'


import { songReducer } from './reducers/song.reducer'
import { playlistReducer } from './reducers/playlist.reducer'
import { userReducer } from './reducers/user.reducer'
// import { reviewReducer } from './reducers/review.reducer'
// import { systemReducer } from './reducers/system.reducer'

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// export const store = createStore(songReducer, composeEnhancers())


// window.gStore = store

// store.subscribe(() => {
//     console.log('Current State is:', store.getState())
// })

// const rootReducer = combineReducers({
//     songModule: songReducer,
//     userModule: userReducer,
//     // systemModule: systemReducer,
//     // reviewModule: reviewReducer,
// })


// const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
// export const store = createStore(rootReducer, middleware)

// For debug:
// store.subscribe(() => {
//     console.log('**** Store state changed: ****')
//     console.log('storeState:\n', store.getState())
//     console.log('*******************************')
// })

const rootReducer = combineReducers({
    songModule: songReducer,
    playlistModule: playlistReducer,
    userModule: userReducer
    // appModule: appReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, composeEnhancers())

//* For debugging
window.gStore = store