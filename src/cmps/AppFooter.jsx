import { useSelector } from 'react-redux'
import { AudioPlayer } from './AudioPlayer'

export function AppFooter() {
	// const count = useSelector(storeState => storeState.userModule.count)

	return (
		<footer className="app-footer full">
			{/* <p>Coffeerights &copy; 2024</p> */}
			{/* <p>Count: {count}</p> */}
			<div className='left-bottom-picture-artist'></div>
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