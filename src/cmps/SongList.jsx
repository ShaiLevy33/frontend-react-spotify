import { SongPreview } from "./SongPreview.jsx"
import { Link} from 'react-router-dom'

function SongList({ songs }) {

    return (
        <ul className="song-list">
            {songs.map(song =>
                <li key={song._id}>
                    <SongPreview song={song} />
                </li>
            )}
        </ul>
    )
}
export { SongList }