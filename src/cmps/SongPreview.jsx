import { Link } from 'react-router-dom'
function SongPreview({ song }) {
    return (
        <article className="song-preview">
            {song.imgUrl && song.imgUrl.length > 0 && (
                <img src={song.imgUrl[0].url} alt={song.title || ''} />
            )}
            <div className="song-link">
            <Link>{song.title}</Link>
            </div>
            {song.artists && song.artists.length > 0 && (
            <div className='artists-link'>
            {song.artists.map((artist, idx) => (
                    <span key={artist}>
                        <Link to={`/artist/${artist.name}`}>{artist.name}</Link>
                        {idx < song.artists.length - 1 && ', '}
                    </span>
                ))}
            </div>
             )}
        </article>
    )
}
export  { SongPreview }
// export function SongPreview({ song }) {
//     return <article className="preview">
//         <header>
//             <Link to={`/song/${song._id}`}>{song.vendor}</Link>
//         </header>

//         <p>Speed: <span>{song.speed.toLocaleString()} Km/h</span></p>
//         {song.owner && <p>Owner: <span>{song.owner.fullname}</span></p>}
        
//     </article>
// }