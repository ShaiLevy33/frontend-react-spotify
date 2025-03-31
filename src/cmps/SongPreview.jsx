import { Link } from 'react-router-dom'
function SongPreview({ song }) {
    return (
        <article className="song-preview">
            <img src={song.imgUrl} alt="" />
            <div className="song-link">
            <Link>{song.songName}</Link>
            </div>
            <div className='artists-link'>
            {song.artists.map((artist, idx) => (
                    <span key={artist}>
                        <Link to={`/artist/${artist}`}>{artist}</Link>
                        {idx < song.artists.length - 1 && ', '}
                    </span>
                ))}
            </div>
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