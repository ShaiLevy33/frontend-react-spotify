import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {SongList} from "../cmps/SongList"
import { PlaylistList } from '../cmps/PlaylistList.jsx'
import { songService } from "../services/song.service.js"
import { loadSongs, removeSong} from '../store/actions/song.actions.js'
import { loadPlaylists} from '../store/actions/playlist.actions.js'
// import { SET_SONGS, SET_FILTER_BY, UPDATE_SONG, ADD_SONG } from '../store/reducers/song.reducer.js'

function HomePage() {

    const songs = useSelector(storeState => {
        console.log('storeState:', storeState.songModule.songs);
        return storeState.songModule.songs
    })
    console.log('songs:', songs)
    const filterBy = useSelector(storeState => storeState.songModule.filterBy)

    const playlists = useSelector(storeState => {
        console.log('storeState:', storeState.playlistModule.playlists);
        return storeState.playlistModule.playlists
    })

    const filterByP = useSelector(storeState => storeState.playlistModule.filterBy)

    const dispatch = useDispatch()

        useEffect(() => {
        // setSearchParams(filterBy)
        loadSongs(filterBy)
            // .then(toys => setToys(toys))
            .catch(err => {
                console.eror('err:', err)
                showErrorMsg('Cannot load toys')
            })
    }, [filterBy])

    useEffect(() => {
        // setSearchParams(filterBy)
        loadPlaylists(filterByP)
            // .then(toys => setToys(toys))
            .catch(err => {
                console.eror('err:', err)
                showErrorMsg('Cannot load toys')
            })
    }, [filterByP])

    return (
        <section className="home-page">
            {/* <div>
            <LeftSideToolbar/>
            </div> */}
            <h4>Trending songs</h4>
            <SongList songs={songs}/>
            <h4>תשארו מעודכנים</h4>
            <PlaylistList playlists={playlists}/>
        </section >
    )
}

export { HomePage }

