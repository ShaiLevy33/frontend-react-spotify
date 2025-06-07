import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import playImg from '../assets/img/play.png';
import { SongList } from "../cmps/SongList"
import { PlaylistList } from '../cmps/PlaylistList.jsx'
import { songService } from "../services/song.service.js"
import { loadSongs, removeSong } from '../store/actions/song.actions.js'
import { loadPlaylists } from '../store/actions/playlist.actions.js'
import { FastAverageColor } from 'fast-average-color'
// import { SET_SONGS, SET_FILTER_BY, UPDATE_SONG, ADD_SONG } from '../store/reducers/song.reducer.js'

var countHover = 0
function HomePage({ onTrackSelect }) {
    const [hoveredIdx, setHoveredIdx] = useState(null)
    const [avgColor, setAvgColor] = useState('#222')
    const imgRef = useRef(null)



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
    // useEffect(() => {
    //     if (playlists?.imgUrl && imgRef.current) {
    //         const fac = new FastAverageColor()
    //         fac.getColorAsync(imgRef.current)
    //             .then(color => setAvgColor(color.hex))
    //             .catch(() => setAvgColor('#222'))
    //     }
    // }, [playlists])

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

    const updateAvgColor = (imgUrl) => {
        if (!imgUrl) return setAvgColor('#222')
        const fac = new FastAverageColor()
        const img = new window.Image()
        img.crossOrigin = 'anonymous'
        img.src = imgUrl
        img.onload = () => {
            fac.getColorAsync(img)
                .then(color => setAvgColor(color.hex))
                .catch(() => setAvgColor('#222'))
        }
    }
    useEffect(() => {
        if (avgColor && countHover > 0) {
            document.documentElement.style.setProperty('--background-top-color', avgColor)
        }
        return () => {
            document.documentElement.style.setProperty('--background-top-color', 'rgba(0, 0, 0, .6)')
        }
    }, [avgColor])

    const handleMouseEnter = (idx, imgUrl) => {
        countHover++;
        setHoveredIdx(idx)
        updateAvgColor(imgUrl)
    }

    const handleMouseLeave = () => {
        setHoveredIdx(null)
        if (playlists.length > 0) {
            updateAvgColor(playlists[0].imgUrl)
        }
    }
    const handlePlayPause = (e, playlist) => {
        e.preventDefault() // Prevent navigation from Link
        e.stopPropagation() // Prevent event bubbling

        if (playlist?.tracks?.[0]) {
            onTrackSelect(playlist.tracks[0], true , playlist._id.$oid ) // Play the track
        }
    }


    return (
        <section className="home-page" >
            {/* <div>
            <LeftSideToolbar/>
            </div> */}
            <div className="home-page-header">
                <div className="home-page-header-buttons">
                    <button className="home-page-header-btn">All</button>
                    {/* <button className="home-page-header-btn">Music</button> */}
                </div>
                <div className="home-page-favorite-playlists">
                    <div className="home-page-favorite-playlists-list">
                        {playlists.slice(0, 8).map((playlist, idx) => (
                            <Link
                                key={playlist._id.$oid || playlist._id}
                                to={`/playlist/${playlist._id.$oid || playlist._id}`}
                                className="home-page-favorite-playlists-item"
                                onMouseEnter={() => handleMouseEnter(idx, playlist.imgUrl)}
                                onMouseLeave={handleMouseLeave}
                            >
                                {/* <div key={playlist._id} className="home-page-favorite-playlists-item"> */}
                                <div className="home-page-favorite-playlists-img">
                                    <img src={playlist.imgUrl} alt="" />
                                </div>
                                <div className="home-page-favorite-playlists-name">
                                    <h5>{playlist.name}</h5>
                                </div>
                                <div className="home-page-favorite-playlists-creator">
                                    <h4>{playlist.title}</h4>
                                </div>
                                {hoveredIdx === idx && (
                                    <div className="play-button-overlay">
                                        <img src={playImg} alt="play" className="play-button"
                                            onClick={(e) => handlePlayPause(e, playlist)} />
                                    </div>
                                )}
                            </Link>

                            // </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* <h4>Trending songs</h4>
            <SongList songs={songs} /> */}
            <div className="home-page-playlist-user">
                <h6>Made For</h6>
                <h4>User user</h4>
                <PlaylistList playlists={playlists} onTrackSelect={onTrackSelect}/>
            </div>
        </section >
    )
}

export { HomePage }

