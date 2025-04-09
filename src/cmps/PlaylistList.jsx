import { PlaylistPreview } from "./PlaylistPreview.jsx"
import { Link} from 'react-router-dom'

function PlaylistList({ playlists }) {

    return (
        <ul className="playlist-list">
            {playlists.map(playlist =>
                <li key={playlist._id}>
                    <PlaylistPreview playlist={playlist} />
                </li>
            )}
        </ul>
    )
}
export { PlaylistList }