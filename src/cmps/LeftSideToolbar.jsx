import React from 'react';
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { loadPlaylist } from '../store/actions/playlist.actions.js'
import { addPlaylist } from '../store/actions/playlist.actions.js';

function LeftSideToolbar() {

    const playlists = useSelector(storeState => {
        console.log('storeState:', storeState.playlistModule.playlists);
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
        addPlaylist(newPlaylist)
            .then(playlist => {
                navigate(`/playlist/${playlist._id}`)
            })
            .catch(err => {
                console.error('Error creating playlist:', err)
            })
    }


    return (
        <section className="left-side-toolbar">
            <div className="toolbar-header">
                <h4>Your Library</h4>
                <button onClick={handleCreatePlaylist}>+Create</button>
            </div>
            <div className="toolbar-playlists">
                <ul className="playlist-sideBar-list">
                    {playlists.slice(3, 8).map(playlist =>
                        <button
                            className="playlist-button"
                            >
                            <div className="playlist-item">
                                <div className='playlist-sidebar-image'>
                                    <img src={playlist.imgUrl} alt={playlist.name} />
                                </div>
                                <div className='playlist-sidebar-description'>
                                    <span className="playlist-name">{playlist.name}</span>
                                    <span>
                                        Playlist • {playlist.name !== 'Liked Songs'
                                            ? 'User user'
                                            : `${playlist?.tracks.length} ${playlist?.tracks.length === 1 ? 'song' : 'songs'}`}
                                    </span>
                                </div>
                            </div>
                        </button>
                    )}
                </ul>
            </div>
        </section>
    )

}
export { LeftSideToolbar }

