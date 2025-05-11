import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { showErrorMsg } from "../services/event-bus.service.js"
import { playlistService } from '../services/playlist.service'
import { PlaylistTrackList } from '../cmps/PlaylistTrackList'

function PlaylistDetails() {
    const [playlist, setPlaylist] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        console.log('params:', params);
        
        if (params.id)
            loadPlaylist()
    }, [])

    function loadPlaylist() {
        playlistService.get(params.id)
            .then(setPlaylist)
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot load playlist')
                navigate('/')
            })
    }


    const dispatch = useDispatch()

    return (
        <section className="playlist-page">
            <div className='playlist-page-header'>
                </div>
            <div className='playlist-page-header-details'>
                <div className='playlist-page-header-details-img'>
                <img src={playlist?.imgUrl} alt="" />
                </div>
                <div className='playlist-page-header-details-user'>
                    <h5>Playlist</h5>
                    <h1>{playlist?.name}</h1>
                    <h5>img userName {playlist?.tracks.length}</h5>
               </div>
           
            </div>
            <div className='playlist-page-SongList'>
                 {playlist && <PlaylistTrackList tracks={playlist.tracks} />}
            </div>
            {/* </div> */}
            {/* <h4>Trending songs</h4>
            <SongList songs={songs}/>
            <h4>תשארו מעודכנים</h4>
            <PlaylistList playlists={playlists}/> */}
        </section >
    )
}

export { PlaylistDetails }