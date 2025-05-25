import { useSelector , useDispatch} from 'react-redux'
import { AudioPlayer } from './AudioPlayer'
import { Link } from 'react-router-dom'

export function AppFooter({ currentTrack}) {
	// const count = useSelector(storeState => storeState.userModule.count)
  const dispatch = useDispatch()
	return (
		<footer className="app-footer full">
			{/* <p>Coffeerights &copy; 2024</p> */}x	
			{/* <p>Count: {count}</p> */}
			<div className='left-bottom-picture-artist'>
				    {currentTrack?.imgUrl && currentTrack.imgUrl[0]?.url && currentTrack && (
        <img key={currentTrack.id} src={currentTrack.imgUrl[0].url} alt="artist" />
    )}
				{/* <div className='left-bottom-picture-artist-text'> */}
				<div className="artist-info">
				<div className="song-link">
					<Link>Artist Name</Link>
					</div>
					<div className='artists-link'>
                      {/* {song.artists.map((artist, idx) => (
                    <span key={artist}>
                        <Link to={`/artist/${artist}`}>{artist}</Link>
                        {idx < song.artists.length - 1 && ', '}
                    </span>
                ))} */}
				<Link>Artist Name</Link>
            </div>
			</div>
					{/* <Link>Song Name</Link> */}
				{/* </div> */}
			</div>
			<div className='middle-bottom-audio-player'>
				<AudioPlayer src={currentTrack ? currentTrack.youtubeId : undefined}></AudioPlayer>
			</div>
			<div className='right-bottom-volume'></div>
            
            {/* {import.meta.env.VITE_LOCAL ? 
                <span className="local-services">Local Services</span> : 
                <span className="remote-services">Remote Services</span>} */}
		</footer>
	)
}