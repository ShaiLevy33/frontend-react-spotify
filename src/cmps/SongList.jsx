import { SongPreview } from "./SongPreview.jsx"
import { Link} from 'react-router-dom'

function SongList({ songs }) {
console.log('songs:', songs.slice(0, 5))

    return (
        <ul className="song-list">
            {songs.length>0 && songs.slice(0, 5).map((song,idx) =>
            <div key={idx}>
            <pre>{song._id.$oid}</pre>
                {/* <li key={song._id.$oid}> */}
                <li>
                    <SongPreview song={song} />
                </li>
            </div>
            )}
        </ul>
    )
}
export { SongList }