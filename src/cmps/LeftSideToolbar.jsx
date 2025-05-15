import React from 'react';
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate , useLocation  } from 'react-router-dom'
import { loadPlaylist } from '../store/actions/playlist.actions.js'

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
            await dispatch(loadPlaylist(playlistId))
            navigate(`/playlist/${playlistId}`)
        } catch (err) {
            console.error('Error loading playlist:', err)
            // showErrorMsg('Cannot load playlist')
        }
    }

    return (
        <section className="left-side-toolbar">
            <div className="toolbar-header">
                <h4>Your Library</h4>
                <button>+Create</button>
            </div>
            <div className="toolbar-playlists">
                <ul className="playlist-sideBar-list">
                    {playlists.slice(3, 8).map(playlist =>
                        <button
                            key={playlist._id.$oid}
                            className="playlist-button"
                            onClick={() => handlePlaylistClick(playlist._id.$oid)}>
                            <div className="playlist-item">
                                <img src={playlist.imgUrl} alt={playlist.name} />
                                <span className="playlist-name">{playlist.name}</span>
                            </div>
                        </button>
                    )}
                </ul>
            </div>
        </section>
    )

}
export { LeftSideToolbar }

