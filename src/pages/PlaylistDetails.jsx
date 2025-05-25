import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { showErrorMsg } from "../services/event-bus.service.js"
import { playlistService } from '../services/playlist.service'
import { PlaylistTrackList } from '../cmps/PlaylistTrackList'
import { AppFooter } from '../cmps/AppFooter'
import { FastAverageColor } from 'fast-average-color'
import { AudioPlayer } from '../cmps/AudioPlayer'
import { PopupEdit } from '../cmps/PopupEdit'


function PlaylistDetails() {

    const [playlist, setPlaylist] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [avgColor, setAvgColor] = useState('#222')
    const params = useParams()
    const navigate = useNavigate()
    const imgRef = useRef(null)
    const [currentTrackUrl, setCurrentTrackUrl] = useState(null)
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);
    useEffect(() => {
        console.log('params:', params);

        if (params.id)
            loadPlaylist()
    }, [])

    useEffect(() => {
        if (playlist?.imgUrl && imgRef.current) {
            const fac = new FastAverageColor()
            fac.getColorAsync(imgRef.current)
                .then(color => setAvgColor(color.hex))
                .catch(() => setAvgColor('#222'))
        }
    }, [playlist])

    function loadPlaylist() {
        playlistService.get(params.id)
            .then(setPlaylist)
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot load playlist')
                navigate('/')
            })
    }

    useEffect(() => {
        if (avgColor) {
            document.documentElement.style.setProperty('--background-top-color', avgColor)
            document.documentElement.style.setProperty('--scrollbar-color', ' #888' + avgColor)
        }
        return () => {
            document.documentElement.style.setProperty('--background-top-color', 'rgba(0, 0, 0, .6)')
            // document.documentElement.style.setProperty('--scrollbar-color', ' transprent' + ' #222')
        }
    }, [avgColor])


    const dispatch = useDispatch()

    return (
        <section className="playlist-page">
            <div className='playlist-page-details'>
                <div className='playlist-page-header-details'>
                    <div className='playlist-page-header-details-img'>
                        <img ref={imgRef}
                            src={playlist?.imgUrl}
                            alt=""
                            crossOrigin="anonymous"
                            style={{ display: 'block' }} />
                    </div>
                    <div className='playlist-page-header-details-user'>
                        <div className='playlist-page-header-details-playlist'>
                            <h5>Playlist</h5>
                        </div>
                        <button onClick={openPopup} className='playlist-page-header-details-edit-btn'>
                            <h1>{playlist?.name}</h1>
                        </button>
                        <PopupEdit isOpen={isPopupOpen} onClose={closePopup} playlist={playlist}>

                            {/* Add more content as needed */}
                        </PopupEdit>
                        <h5>{playlist?.description}</h5>
                        <div className='playlist-header-details'>
                            <img src='https://cdn-icons-png.flaticon.com/512/1077/1077012.png' alt="" />

                            <h5>userName</h5>
                            <span> • </span>
                            <span>{playlist?.tracks.length} songs</span>
                        </div>
                    </div>

                </div>
                <div className='playlist-page-SongList'>
                    {playlist && <PlaylistTrackList tracks={playlist.tracks} onTrackSelect={setCurrentTrack} />}
                    <AppFooter currentTrack={currentTrack} />
                </div>
                {/* </div> */}
                {/* <h4>Trending songs</h4>
            <SongList songs={songs}/>
            <h4>תשארו מעודכנים</h4>
            <PlaylistList playlists={playlists}/> */}
            </div>
        </section >
    )
}

export { PlaylistDetails }