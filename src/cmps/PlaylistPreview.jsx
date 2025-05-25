import { Link } from 'react-router-dom'
function PlaylistPreview({ playlist }) {
    return (
        <div className="playlist-preview">
            <Link to={`/playlist/${playlist._id.$oid}`}>
            <div className="playlist-img">
                
            <img src={playlist.imgUrl} alt="" />
            </div>
            <div className="playlist-name">
          
            <span>{playlist.name}</span>
            
            </div>
            </Link>
            
        </div>
    )
}
export  { PlaylistPreview }