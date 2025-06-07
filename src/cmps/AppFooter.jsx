import { useSelector, useDispatch } from 'react-redux'
import { useState, useRef, useEffect } from "react"
import { loadPlaylist, updatePlaylist } from "../store/actions/playlist.actions.js"
import { AudioPlayer } from './AudioPlayer'
import { playlistService } from '../services/playlist.service'
import { Link } from 'react-router-dom'
import axios from 'axios'

export function AppFooter({ currentTrack, playlistId }) {
	// const count = useSelector(storeState => storeState.userModule.count)

	const [audio, setAudio] = useState([])
	const [playlist, setPlaylist] = useState(null)
	const [isPlaylistLoaded, setIsPlaylistLoaded] = useState(false)
	const API_KEY = 'AIzaSyDRgtU5lb28WqZJpGwZyzxIDFSZ8eTLLy0'
	const dispatch = useDispatch()
	const songName = currentTrack?.title || 'Unknown Song'
	const songQuery = encodeURIComponent(songName)

	// const loadPlaylistData = async (id) => {
	// 	try {
	// 		const loadedPlaylist = await playlistService.get(id)
	// 		dispatch({ type: 'SET_PLAYLIST', playlist: loadedPlaylist })
	// 		setPlaylist(loadedPlaylist)
	// 		setIsPlaylistLoaded(true)
	// 	} catch (err) {
	// 		console.error('Error loading playlist:', err)
	// 	}
	// }

	// useEffect(() => {
	// 	if (playlistId) {
	// 		loadPlaylistData(playlistId)
	// 	}
	// }, [playlistId])

	useEffect(() => {
		const fetchData = async () => {
			if (!currentTrack?.title)
				//  || !playlist) 
				 return
			try {
				// if (playlist.trackIdYoutube) {
				// 	setAudio(playlist.trackIdYoutube)
				// 	return
				// }
				// }
				const response = await axios.get(
					`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${songQuery}&key=${API_KEY}`
				)

				setAudio(response.data.items[0].id.videoId)
				// handleSave(playlist, currentTrack, response.data.items[0].id.videoId)

				// response.data.items[0].id.videoId
			} catch (error) {
				console.error('Error fetching data:', error)
			}
		}

		fetchData()
	}, [currentTrack, songQuery, playlist])


	const findTrackIndex = (playlist, currentTrack) => {
		if (!playlist?.tracks || !currentTrack) return -1
		return playlist.tracks.findIndex(track => track.id === currentTrack.id)
	}

	function handleSave(playlist, currentTrack, trackIdYoutube) {
		const trackIndex = findTrackIndex(playlist, currentTrack)
		playlist.tracks[trackIndex].trackIdYoutube = trackIdYoutube
		const updatedPlaylist = {
			...playlist,
			...PlaylistToEdit,
			tracks: playlist.tracks
		};
		updatePlaylist(updatedPlaylist, updatedPlaylist._id.$oid)
			.then(() => {
				console.log('Playlist updated successfully');
				// onClose();
				// window.location.reload()
				// Optionally: show success message or refresh data
			})
			.catch(err => {
				console.error('Error updating playlist:', err)
				// Optionally: show error message
			});
	}
	return (
		<footer className="app-footer full">
			{/* <p>Coffeerights &copy; 2024</p> */}
			{/* <p>Count: {count}</p> */}
			<div className='left-bottom-picture-artist'>
				{currentTrack?.imgUrl && currentTrack.imgUrl[0]?.url && currentTrack && (
					<img key={currentTrack.id} src={currentTrack.imgUrl[0].url} alt="artist" />
				)}
				{/* <div className='left-bottom-picture-artist-text'> */}
				<div className="artist-info">
					<div className="song-link">
						{/* <Link>Artist Name</Link> */}
					</div>
					<div className='artists-link'>
						{currentTrack?.artists?.map((artist, idx) => (
							<span key={artist}>
								<Link ></Link>
								{idx < currentTrack.artists.length - 1 && ', '}
							</span>
						))}
						{/* <Link>Artist Name</Link> */}
					</div>
				</div>
				{/* <Link>Song Name</Link> */}
				{/* </div> */}
			</div>
			<div className='middle-bottom-audio-player'>
				<AudioPlayer src={audio ? audio : undefined}></AudioPlayer>
			</div>
			<div className='right-bottom-volume'></div>

			{/* {import.meta.env.VITE_LOCAL ? 
                <span className="local-services">Local Services</span> : 
                <span className="remote-services">Remote Services</span>} */}
		</footer>
	)
}