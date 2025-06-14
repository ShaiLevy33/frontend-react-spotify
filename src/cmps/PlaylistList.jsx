import { PlaylistPreview } from "./PlaylistPreview.jsx"
import { Link} from 'react-router-dom'

function PlaylistList({ playlists } , { onTrackSelect }) {
    

    return (
        <ul className="playlist-list">
            {playlists.slice(0, 5).map(playlist =>
                <li key={playlist._id.$oid}>
                    <PlaylistPreview playlist={playlist} onTrackSelect={onTrackSelect} />
                </li>
            )}
        </ul>
    )
}
export { PlaylistList }