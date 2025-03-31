import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {LeftSideToolbar} from "../cmps/LeftSideToolbar"
import {SongList} from "../cmps/SongList"
import { songService } from "../services/song.service.js"
import { loadSongs, removeSong, saveSong } from '../store/actions/song.actions.js'
import { SET_SONGS, SET_FILTER_BY, UPDATE_SONG, ADD_SONG } from '../store/reducers/song.reducer.js'

function HomePage() {

    const songs = useSelector(storeState => {
        console.log('storeState:', storeState.songs);
        return storeState.songs
    })
    console.log('songs:', songs)

    const dispatch = useDispatch()

    return (
        <section className="home-page">
            {/* <div>
            <LeftSideToolbar/>
            </div> */}
            <h1>Trending songs</h1>
            <SongList songs={songs}/>
        </section >
    )
}

export { HomePage }

