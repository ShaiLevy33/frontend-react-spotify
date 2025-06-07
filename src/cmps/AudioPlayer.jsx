import { useRef, useEffect } from "react"
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import YouTube from 'react-youtube';
import { GiPreviousButton } from "react-icons/gi"
import { GiNextButton } from "react-icons/gi"
import { FaPlayCircle } from "react-icons/fa"
import { FaCirclePause } from "react-icons/fa6"
import { TiArrowShuffle } from "react-icons/ti"

function AudioPlayer({ src }) {
    const videoId = src || ''  // Use optional chaining and provide default empty string
    const [isPlaying, setIsPlaying] = useState(false)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)

    const [player, setPlayer] = useState(null);
    const playerRef = useRef(null);

    const onReady = (event) => {
       playerRef.current = event.target;
       setDuration(event.target.getDuration());
        setIsPlaying(true);
        event.target.playVideo();
    };

    // const togglePlayPause = () => {
    // const prevValue = isPlaying;
    //     setIsPlaying(!prevValue);
    //     if (!prevValue) {
    //         player?.playVideo();
    //     } else {
    //         player?.pauseVideo();
    //     }
    // };

    const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current && isPlaying) {
        setCurrentTime(playerRef.current.getCurrentTime());
      }
    }, 500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    playerRef.current.seekTo(time, true);
    setCurrentTime(time);
  };

const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

    //       const [videos, setVideos] = useState([])
    //   const API_KEY = 'AIzaSyDRgtU5lb28WqZJpGwZyzxIDFSZ8eTLLy0'

    const audioPlayer = useRef() //reference our audio component
    const progressBar = useRef() //reference our progress bar
    const animationRef = useRef() //reference our animation
    const audioURL = `https://www.youtube.com/watch?v=${videoId}`; // YouTube video URL

const opts = {
    height: '0', // הסתרת הווידאו
    width: '0',
    playerVars: {
      autoplay: 0,
    },
  };
    // Fetch video info (using a proxy to avoid CORS errors)
    // fetch('https://cors-anywhere.herokuapp.com/' + "https://www.youtube.com/get_video_info?video_id=" + videoId).then(response => {
    //   if (response.ok) {
    //     response.text().then(ytData => {

    //       // parse response to find audio info
    //       var ytData = parse_str(ytData);
    //       var getAdaptiveFormats = JSON.parse(ytData.player_response).streamingData.adaptiveFormats;
    //       var findAudioInfo = getAdaptiveFormats.findIndex(obj => obj.audioQuality);

    //       // get the URL for the audio file
    //       const audioURL = getAdaptiveFormats[findAudioInfo].url;

    //       // update the <audio> element src
    //     //   var youtubeAudio = document.getElementById('youtube');
    //     //   youtubeAudio.src = audioURL;

    //     });
    //   }
    // });

    //   useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         const response = await axios.get(
    //           `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=react&key=${API_KEY}`
    //         );
    //         setVideos(response.data.items);
    //       } catch (error) {
    //         console.error('Error fetching data:', error);
    //       }
    //     };

    //     fetchData();
    //   }, []);


    function parse_str(str) {
        return str.split('&').reduce(function (params, param) {
            var paramSplit = param.split('=').map(function (value) {
                return decodeURIComponent(value.replace('+', ' '));
            });
            params[paramSplit[0]] = paramSplit[1];
            return params;
        }, {});
    }

    // useEffect(() => {
    //     // const audio = audioPlayer.current
    //     // const duration = audio.duration
    //     const seconds = Math.floor(audioPlayer.current.duration)
    //     setDuration(seconds)
    //     progressBar.current.max = seconds
    //     // console.log('duration', duration)
    // }, [audioPlayer?.current?.loadmetadata, audioPlayer?.current?.readyState])

    const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60)
        const returendMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
        const seconds = Math.floor(secs % 60)
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
        return `${returendMinutes} : ${returnedSeconds}`
    }

    // const togglePlayPause = function () {
    //     const prevValue = isPlaying
    //     setIsPlaying(!prevValue)
    //     if (!prevValue) {
    //         audioPlayer.current.play()
    //         animationRef.current = requestAnimationFrame(whilePlaying)
    //     }
    //     else {
    //         audioPlayer.current.pause()
    //         cancelAnimationFrame(animationRef.current)
    //     }
    // }

    function changeRange() {
        audioPlayer.current.currentTime = progressBar.current.value
        progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
        setCurrentTime(progressBar.current.value)
    }

    function whilePlaying() {
        progressBar.current.value = audioPlayer.current.currentTime
        progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
        setCurrentTime(progressBar.current.value)
        animationRef.current = requestAnimationFrame(whilePlaying)
    }

    return (
        <div className="audioPlayer" >
            {/* <audio ref={audioPlayer}
                src={audioURL} /> */}
            {videoId ? (
                <YouTube videoId={videoId} opts={opts} onReady={onReady} />
            ) : (
                <div>No track selected</div>
            )}
            {/* // src="https://cdn.simplecast.com/audio/cae8b0eb-d9a9-480d-a652-0defcbe047f4/episodes/af52a99b-88c0-4638-b120-d46e142d06d3/audio/500344fb-2e2b-48af-be86-af6ac341a6da/default_tc.mp3" preload="metadata" >
            // </audio> */}
            <div className="controls">
                <button className="shuffle" ><TiArrowShuffle /></button>
                <button className="forwardBackward"><GiPreviousButton /></button>
                <button id="playPauseButton" onClick={togglePlay} className="playPause">
                    {isPlaying ? <FaCirclePause /> : <FaPlayCircle />}
                </button>
                <button className="forwardBackward"><GiNextButton /></button>
            </div>
            <div className="current-time">
                {/* current time */}
                <span>{formatTime(currentTime)}</span>

                {/* progress bar */}
                <div>  
                    {/* <input type="range" className="progressBar" defaultValue="0" ref={progressBar} onChange={changeRange} /></div> */}
<input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          step="0.1"
          onChange={handleSeek}
          className="w-full"
        />
        </div>
                {/* duration */}

                {/* <input type="range" /> */}
                {(duration && !isNaN(duration)) && calculateTime(duration)}


            </div>

        </div>
    )


}

export { AudioPlayer }