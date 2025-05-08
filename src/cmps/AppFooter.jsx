import { useSelector } from 'react-redux'
import { AudioPlayer } from './AudioPlayer'
import { Link } from 'react-router-dom'

export function AppFooter() {
	// const count = useSelector(storeState => storeState.userModule.count)

	return (
		<footer className="app-footer full">
			{/* <p>Coffeerights &copy; 2024</p> */}
			{/* <p>Count: {count}</p> */}
			<div className='left-bottom-picture-artist'>
				<img src="https://i.scdn.co/image/ab67616d00001e02442df3fedce56042a4140361" alt="artist" />
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
				<AudioPlayer></AudioPlayer>
			</div>
			<div className='right-bottom-volume'></div>
            
            {/* {import.meta.env.VITE_LOCAL ? 
                <span className="local-services">Local Services</span> : 
                <span className="remote-services">Remote Services</span>} */}
		</footer>
	)
}