import React from 'react';
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { loadPlaylist } from '../store/actions/playlist.actions.js'
import { addPlaylist, removePlaylist } from '../store/actions/playlist.actions.js'
import { Link } from 'react-router-dom'
import { FaPlay, FaPause } from 'react-icons/fa'

function LeftSideToolbar({ onTrackSelect }) {
    const [hoveredId, setHoveredId] = useState(null)
    const [playingId, setPlayingId] = useState(null)
    const playlists = useSelector(storeState => {
        console.log('storeState:', storeState.playlistModule.playlists)
        return storeState.playlistModule.playlists
    })
    const navigate = useNavigate()
    const filterByP = useSelector(storeState => storeState.playlistModule.filterBy)

    const dispatch = useDispatch()
    const location = useLocation()

    useEffect(() => {
        loadPlaylist(filterByP)

            .catch(err => {
                console.eror('err:', err)
                // showErrorMsg('Cannot load toys')
            })
    }, [filterByP])

    const handlePlaylistClick = async (playlistId) => {
        try {
            dispatch(loadPlaylist(playlistId))
            navigate(`/playlist/${playlistId}`)
        } catch (err) {
            console.error('Error loading playlist:', err)
        }
    }
    function handleCreatePlaylist() {
        const newPlaylist = {
            name: 'New Playlist',
            imgUrl: 'https://via.placeholder.com/150',
            tracks: []
        }
        // let pId = '6550be38697bb160583da4a4'
        // removePlaylist(pId)
        addPlaylist(newPlaylist)
            .then(playlist => {
                // Ensure _id is in the correct format
                navigate(`/playlist/${playlist._id.$oid}`)
            })
            .catch(err => {
                console.error('Error creating playlist:', err)
            })
    }
    const handlePlayPause = (e, playlist) => {
        e.preventDefault() // Prevent navigation from Link
        e.stopPropagation() // Prevent event bubbling

        const isCurrentlyPlaying = playingId === (playlist._id.$oid || playlist._id)
        if (playlist.tracks[0] !== null && playlist.tracks[0] !== undefined) {
            if (isCurrentlyPlaying) {
                setPlayingId(null)
                onTrackSelect(playlist.tracks[0], false, playlist._id.$oid) // Pause the track
            } else {
                setPlayingId(playlist._id.$oid || playlist._id)
                onTrackSelect(playlist.tracks[0], true, playlist._id.$oid) // Play the track
            }
        }
    }


    return (
        <section className="left-side-toolbar">
            <div className="toolbar-header">
                <h4>Your Library</h4>
                <button onClick={handleCreatePlaylist}>+Create</button>
            </div>
            <div className="toolbar-playlists">
                <ul className="playlist-sideBar-list">
                    {playlists.map(playlist =>
                        <Link
                            key={playlist._id.$oid || playlist._id}
                            to={`/playlist/${playlist._id.$oid || playlist._id}`}>
                            <div
                                className="playlist-item"
                                onMouseEnter={() => setHoveredId(playlist._id.$oid || playlist._id)}
                                onMouseLeave={() => setHoveredId(null)}
                            >
                                <div className='playlist-sidebar-image'>
                                    <img src={playlist.imgUrl} alt={playlist.name} />
                                    <div
                                        className="play-icon-overlay"
                                        onClick={(e) => handlePlayPause(e, playlist)}
                                    >
                                        {playingId === (playlist._id.$oid || playlist._id) ? (
                                            <FaPause className="play-icon" />
                                        ) : (
                                            <FaPlay className="play-icon" />
                                        )}
                                    </div>
                                </div>
                                <div className='playlist-sidebar-description'>
                                    <span className={`playlist-name ${playingId === (playlist._id.$oid || playlist._id) ? 'playing' : ''}`}>
                                        {playlist.name}
                                    </span>
                                    <span className='playlist-type'>
                                        Playlist • {playlist.name !== 'Liked Songs'
                                            ? 'User user'
                                            : `${playlist?.tracks.length} ${playlist?.tracks.length === 1 ? 'song' : 'songs'}`}
                                    </span>
                                </div>
                            </div>
                        </Link>
                        // </button>
                    )}
                </ul>
            </div>
        </section>
    )

}
export { LeftSideToolbar }

