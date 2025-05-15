import { Link } from 'react-router-dom'

function PlaylistTrackList({ tracks }) {
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
        <div className="playlist-track-list">
            <table>
                
                <thead>
                    <tr>
                        <th align='left'>#  Title</th>
                        {/* <th>Title</th> */}
                        <th align='left'>Album</th>
                        <th align='left'>Date added</th>
                        {/* <th>Artist</th> */}
                        <th align='left'>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {tracks.map((track, idx) => (
                        <tr key={track.id} className="track-row" onMouseEnter={(e) => e.currentTarget.classList.add('hover')}
                            onMouseLeave={(e) => e.currentTarget.classList.remove('hover')}>
                            {/* <td>{idx + 1}

                            </td> */}
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
                            {/* <td>
                                {track.artists && track.artists.map((artist, index) => (
                                    <span key={artist.spotifyId}>
                                        <Link to={`/artist/${artist.name}`}>{artist.name}</Link>
                                        {index < track.artists.length - 1 && ', '}
                                    </span>
                                ))}
                            </td> */}
                            <td>
                                {formatDate(track.addedAt)}
                            </td>
                            <td>{Math.floor(track.formalDuration / 60000)}:{String(Math.floor((track.formalDuration % 60000) / 1000)).padStart(2, '0')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export { PlaylistTrackList }