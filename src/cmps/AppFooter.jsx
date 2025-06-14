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


	useEffect(() => {
		const fetchData = async () => {
			if (!currentTrack?.title)
				//  || !playlist) 
				return
			try {
				const response = await axios.get(
					`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${songQuery}&key=${API_KEY}`
				)
				setAudio(response.data.items[0].id.videoId)
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
		}
		updatePlaylist(updatedPlaylist, updatedPlaylist._id.$oid)
			.then(() => {
				console.log('Playlist updated successfully')
			})
			.catch(err => {
				console.error('Error updating playlist:', err)
			})
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
						<span>{currentTrack?.title ? currentTrack.title : ''}</span>
					</div>
					<div className='artists-link'>
						{currentTrack?.artists?.map((artist, idx) => (
							<span key={artist.spotifyId || idx}>
								<Link to={`/artist/${artist.spotifyId}`}>
									{artist.name}
								</Link>
								{idx < currentTrack.artists.length - 1 && ', '}
							</span>
						))}
					</div>
					
				</div>
				{/* <Link>Song Name</Link> */}
				{/* </div> */}
			</div>
			<div className='middle-right-bottom-audio-player'>
				<AudioPlayer src={audio ? audio : undefined}></AudioPlayer>
			</div>
			{/* <div className='right-bottom-volume'></div> */}

		</footer>
	)
}