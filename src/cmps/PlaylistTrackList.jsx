import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoTimeOutline } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";
import playImg from '../assets/img/play.png';


function PlaylistTrackList({ tracks , onTrackSelect}) {
    const [hoveredIdx, setHoveredIdx] = useState(null);
    const [currentTrackUrl, setCurrentTrackUrl] = useState(null);
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
    }
    if (!tracks || !tracks.length) return <div>No tracks found</div>

    return (
        <div>
        <div className="playlist-track-list">
            
               <button >    
            <img className='play-button-image' src={playImg} alt="play" />
        </button>

            <div className="track-list-header">
                <div>#       Title</div>
                <div>Album</div>
                <div>Date added</div>
                <div><IoTimeOutline/></div>
            </div>
            <span>___________________________________________________________________________________________________________________________________________________________________</span>
            {tracks.map((track, idx) => (
                // <div key={track.id} className="track-row" onMouseEnter={(e) => e.currentTarget.classList.add('hover')}
                //     onMouseLeave={(e) => e.currentTarget.classList.remove('hover')}/>
                <div className='track-row' 
                      key={track.id}
                       onClick={() => onTrackSelect(track)} onMouseEnter={e => {
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
                  <div>
                    {Math.floor(track.formalDuration / 60000)}:{String(Math.floor((track.formalDuration % 60000) / 1000)).padStart(2, '0')}
                  </div>

                </div>

                // <div>
                //     {track.title}
                // </div>
            ))}

            {/* <table>
                
                <thead>
                    <tr>
                        <th align='left'>#  Title</th>
                     
                        <th align='left'>Album</th>
                        <th align='left'>Date added</th>
                        <th align='left'>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {tracks.map((track, idx) => (
                        <tr key={track.id} className="track-row" onMouseEnter={(e) => e.currentTarget.classList.add('hover')}
                            onMouseLeave={(e) => e.currentTarget.classList.remove('hover')}>

                            <td>
                                
                                <div className="track-info">
                                    {idx + 1}
                                    {track.imgUrl && track.imgUrl.length > 0 && (
                                        <img src={track.imgUrl[0].url} alt={track.title} />
                                    )}
                                    <div className="track-title">
                                    <span>{track.title}</span>
                                    <span className="track-artists">
                                        {track.artists && track.artists.map((artist, index) => (
                                            <span key={artist.spotifyId}>
                                                <Link to={`/artist/${artist.name}`}>{artist.name}</Link>
                                                {index < track.artists.length - 1 && ', '}
                                            </span>
                                        ))}
                                        </span>
                                        </div>
                                </div>
                            </td>
                            <td>
                                {track.title}
                            </td>

                            <td>
                                {formatDate(track.addedAt)}
                            </td>
                            <td>{Math.floor(track.formalDuration / 60000)}:{String(Math.floor((track.formalDuration % 60000) / 1000)).padStart(2, '0')}</td>
                        </tr>
                    ))}
                </tbody>
            </table> */}
        </div>
        </div>
    )
}

export { PlaylistTrackList }