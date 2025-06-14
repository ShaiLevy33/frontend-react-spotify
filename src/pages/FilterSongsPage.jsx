import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { playlistService } from '../services/playlist.service'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { FaRegCheckCircle } from "react-icons/fa"
import axios from 'axios'

const LIKED_PLAYLIST_ID = '6550b4b07618f64848894c85'

function FilterSongsPage({ filteredWord }) {
    const API_KEY = 'AIzaSyDRgtU5lb28WqZJpGwZyzxIDFSZ8eTLLy0'
    const dispatch = useDispatch()
    const [songs, setSongs] = useState([])

    const params = useParams()
    const [hoveredId, setHoveredId] = useState(null)


    useEffect(() => {
        console.log('params:', params)

        if (params.filter)
            filterSongs(params.filter)
    }, [params])

    async function filterSongs(filterBy) {

        const response = await axios.get(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${filterBy}&key=${API_KEY}`
        )
        setSongs(response.data.items)
    }

    const handleAddToLikedSongs = async (e, track) => {
        e.stopPropagation()

        try {
            const likedPlaylist = await playlistService.get(LIKED_PLAYLIST_ID)
            var currectTrack ={}
            currectTrack.artists = [{ name: '' }]
            currectTrack.artists[0].name = track.snippet.channelTitle
            currectTrack.title = track.snippet.title
            currectTrack.id = track.etag
            currectTrack.youtubeId = track.id.videoId
            currectTrack.imgUrl = [{ url: '' }]
            currectTrack.imgUrl[0].url = track.snippet.thumbnails.default.url

            const updatedPlaylist = {
                ...likedPlaylist,
                tracks: [currectTrack, ...likedPlaylist.tracks]
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
        <div className="filter-songs-page">
            <div className="filter-songs-header-buttons">
                <button className="filter-songs-header-btn">Songs</button>
            </div>
            <h1>Top Results</h1>
            <div className="filter-songs-list">
                {songs.map((song, idx) => (
                    <div key={song.id.videoId} className="filter-song-item"
                        onMouseEnter={() => setHoveredId(idx)}  // Change to use idx instead of song.id
                        onMouseLeave={() => setHoveredId(null)}>
                        <div className="track-title-container">
                            <div className="track-index-img">
                                <img src={song.snippet.thumbnails.default.url} alt={song.snippet.title} />
                            </div>

                            <div className="check-icon-container">
                                {hoveredId === idx && (  // Now this comparison will work correctly
                                    <div className="icon-with-tooltip">
                                        <FaRegCheckCircle
                                            onClick={(e) => handleAddToLikedSongs(e, song)}  // Also change track to song
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
                            <div className="filter-song-details">
                                <span>{song.snippet.title}</span>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

}

export { FilterSongsPage }