// import { Link } from 'react-router-dom'
function SongPreview({ song }) {
    return (
        <article className="song-preview">
            <img src={song.imgUrl} alt="" />
            <h2>{song.songName}</h2>
            <h4>{song.artists}</h4>
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