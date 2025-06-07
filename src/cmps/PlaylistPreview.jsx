import { Link } from 'react-router-dom'
import  playImg  from '../assets/img/play.png'
import { useState } from 'react'

function PlaylistPreview({ playlist, onTrackSelect }) {
    const [isHovered, setIsHovered] = useState(false)

        const handlePlayClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        
        if (playlist?.tracks?.[0]) {
            onTrackSelect(playlist.tracks[0], true)
        }
    }

    return (
        <div className="playlist-preview">
            <Link 
                to={`/playlist/${playlist._id.$oid}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="playlist-img">
                    <img src={playlist.imgUrl} alt="" />
                    {isHovered && (
                        <div className="play-button-container">
                            <img src={playImg} alt="play" className="play-button" 
                            onClick={handlePlayClick}/>
                        </div>
                    )}
                </div>
                <div className="playlist-name">
                    <span>{playlist.name}</span>
                </div>
            </Link>
        </div>
    )
}
export  { PlaylistPreview }