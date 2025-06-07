import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IoTimeOutline } from "react-icons/io5"
import { useParams } from 'react-router-dom'
import { FaPlay } from "react-icons/fa"
import playImg from '../assets/img/play.png'
// import  pauseImg  from '../assets/img/pause.JPG'
import { SongList } from "../cmps/SongList"
import { useSelector, useDispatch } from 'react-redux'
import { loadSongs } from '../store/actions/song.actions.js'
import { playlistService } from '../services/playlist.service'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { FaRegCheckCircle } from "react-icons/fa"

const LIKED_PLAYLIST_ID = '6550b4b07618f64848894c85'

function PlaylistTrackList({ tracks, onTrackSelect }) {
    const dispatch = useDispatch()
    const [searchTerm, setSearchTerm] = useState('');
    const songs = useSelector(storeState => {
        console.log('storeState:', storeState.songModule.songs);
        return storeState.songModule.songs
    })

    console.log('songs:', songs)
    const filteredSongs = songs?.filter(song =>
        // Check if song title includes search term
        song?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const [playlist, setPlaylist] = useState(null)
    const filterBy = useSelector(storeState => storeState.songModule.filterBy)
    const params = useParams()

    const [hoveredIdx, setHoveredIdx] = useState(null);
    const [currentTrackUrl, setCurrentTrackUrl] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
    }

    useEffect(() => {
        console.log('params:', params);

        if (params.id)
            loadPlaylist()
    }, [params])

    function loadPlaylist() {
        playlistService.get(params.id)
            .then(setPlaylist)
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot load playlist')
            })
    }

    useEffect(() => {
        // setSearchParams(filterBy)
        loadSongs(filterBy)
            // .then(toys => setToys(toys))
            .catch(err => {
                console.eror('err:', err)
                showErrorMsg('Cannot load toys')
            })
    }, [filterBy])

    function addForPlaylist(song) {
        if (!playlist || !song) return

        song.addedAt = new Date().toISOString()

        const updatedPlaylist = {
            ...playlist,
            tracks: [...playlist.tracks, song]
        }

        playlistService.save(updatedPlaylist)
            .then(() => {
                setPlaylist(updatedPlaylist)
                onTrackSelect(song)
                console.log('Playlist updated successfully')
                showSuccessMsg('song added to playlist' + ' ' + playlist.title)
            })
            .catch(err => {
                console.error('Error updating playlist:', err)
                showErrorMsg('Cannot update playlist')
            })
    }
    const handlePlayPause = () => {
        if (tracks && tracks.length > 0) {
            setIsPlaying(!isPlaying)
            onTrackSelect(tracks[0], !isPlaying, playlist._id.$oid)
        }
    }
    // if (!tracks || !tracks.length) return <div>No tracks found</div>
    const handleAddToLikedSongs = async (e, track) => {
        e.stopPropagation() 

        try {
            const likedPlaylist = await playlistService.get(LIKED_PLAYLIST_ID)
            
            const updatedPlaylist = {
                ...likedPlaylist,
                tracks: [track, ...likedPlaylist.tracks]
            }

            await playlistService.save(updatedPlaylist)
            // Dispatch action to update Redux store
            dispatch({ type: 'UPDATE_PLAYLIST', playlist: updatedPlaylist })
            showSuccessMsg('Added to Liked Songs')
        } catch (err) {
            console.error('Error adding to Liked Songs:', err)
            showErrorMsg('Cannot add to Liked Songs')
        }
    }

    return (
        <div>
            <div className="playlist-track-list">

                <button onClick={handlePlayPause}>
                    <img
                        className='play-button-image'
                        src={isPlaying ? playImg : playImg}
                        alt={isPlaying ? 'pause' : 'play'}
                    />
                </button>

                <div className="track-list-header">
                    <div>#       Title</div>
                    <div>Album</div>
                    <div>Date added</div>
                    <div> </div>
                    <div><IoTimeOutline /></div>
                </div>
                <span>___________________________________________________________________________________________________________________________________________________________________</span>
                {tracks.map((track, idx) => (
                    // <div key={track.id} className="track-row" onMouseEnter={(e) => e.currentTarget.classList.add('hover')}
                    //     onMouseLeave={(e) => e.currentTarget.classList.remove('hover')}/>
                    <div className='track-row'
                        key={track.id}
                        onClick={() => onTrackSelect(track, true, playlist._id.$oid)} onMouseEnter={e => {
                            setHoveredIdx(idx);
                            e.currentTarget.classList.add('hover');
                        }}
                        onMouseLeave={e => {
                            setHoveredIdx(null);
                            e.currentTarget.classList.remove('hover');
                        }}>
                        <div className="track-title-container">
                            <div className="track-index-img">
                                {hoveredIdx === idx ? (
                                    <FaPlay className="track-play-icon" />
                                ) : (
                                    idx + 1
                                )}
                                {track.imgUrl && track.imgUrl.length > 0 && (
                                    <img src={track.imgUrl[0].url} alt={track.title} />
                                )}
                            </div>
                            <div className="track-title">
                                <span>{track.title}</span>
                                <span className="track-artists">
                                    {track.artists && track.artists.map((artist, index) => (
                                        <span key={artist.spotifyId}>
                                            <span className='artist-playlistTrack'>{artist.name}</span>
                                            {index < track.artists.length - 1 && ', '}
                                        </span>
                                    ))}
                                </span>
                            </div>
                        </div>
                        <div>
                            {track.title}
                        </div>
                        <div>
                            {formatDate(track.addedAt)}
                        </div>
                        <div className="check-icon-container">
                            {hoveredIdx === idx && (
                                <div className="icon-with-tooltip">
                                    <FaRegCheckCircle
                                        onClick={(e) => handleAddToLikedSongs(e, track)}
                                        style={{
                                            backgroundColor: '#1db954',
                                            borderRadius: '1rem',
                                            color: 'black',
                                            width: '15px',
                                            height: '15px',
                                            cursor: 'pointer'
                                        }}
                                    />
                                    <span className="tooltip">Add to Liked Songs</span>
                                </div>
                            )}
                        </div>
                        <div>
                            {Math.floor(track.formalDuration / 60000)}:{String(Math.floor((track.formalDuration % 60000) / 1000)).padStart(2, '0')}
                        </div>

                    </div>


                    // <div>
                    //     {track.title}
                    // </div>
                ))}
                <span>___________________________________________________________________________________________________________________________________________________________________</span>
                <div className='add-track'>
                    <h1>Let's find something for your playlist</h1>
                    <input type="search" placeholder="Search for tracks" value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} />
                    {/* Add search results table */}
                    {searchTerm && (
                        <table className="search-results-table">
                            <thead>
                                <tr>

                                    {/* <th>Title</th>
                    <th>Artist</th>
                    <th>Duration</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredSongs?.map((song, idx) => (
                                    <tr
                                        key={song.id}
                                        onClick={() => onTrackSelect(song, true, playlist._id.$oid)}
                                        className="search-result-row"
                                    >
                                        <td>
                                            <div className="track-title-container">
                                                <div className="track-index-img">
                                                    {hoveredIdx === idx ? (
                                                        <FaPlay className="track-play-icon" />
                                                    ) : (
                                                        idx + 1
                                                    )}
                                                    {song.imgUrl && song.imgUrl.length > 0 && (
                                                        <img src={song.imgUrl[0].url} alt={song.title} />
                                                    )}
                                                </div>
                                                <div className="track-title">
                                                    <span>{song.title}</span>
                                                    <span className="track-artists">
                                                        {song.artists && song.artists.map((artist, index) => (
                                                            <span key={artist.spotifyId}>
                                                                <span className='artist-playlistTrack'>{artist.name}</span>
                                                                {index < song.artists.length - 1 && ', '}
                                                            </span>
                                                        ))}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {song.artists?.map((artist, index) => (
                                                <span key={artist.spotifyId}>
                                                    {artist.name}
                                                    {index < song.artists.length - 1 && ', '}
                                                </span>
                                            ))}
                                        </td>
                                        <td>
                                            <button className='button-add-search-table' onClick={() => addForPlaylist(song)}>Add</button>
                                        </td>
                                    </tr>

                                ))}

                            </tbody>
                        </table>
                    )}
                </div>

            </div>
        </div>
    )
}

export { PlaylistTrackList }