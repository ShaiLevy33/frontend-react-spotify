import { Link } from 'react-router-dom'
function PlaylistPreview({ playlist }) {
    return (
        <article className="playlist-preview">
            <img src={playlist.imgUrl} alt="" />
            <div className="playlist-link">
            <Link>{playlist.playlistName}</Link>
            </div>
        </article>
    )
}
export  { PlaylistPreview }