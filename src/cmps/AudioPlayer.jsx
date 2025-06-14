import { useRef, useEffect } from "react"
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import YouTube from 'react-youtube'
import { GiPreviousButton } from "react-icons/gi"
import { GiNextButton } from "react-icons/gi"
import { FaPlayCircle } from "react-icons/fa"
import { FaCirclePause } from "react-icons/fa6"
import { TiArrowShuffle } from "react-icons/ti"
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa"


function AudioPlayer({ src }) {
  const videoId = src || ''  
  const [isPlaying, setIsPlaying] = useState(!!src)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  const [player, setPlayer] = useState(null)
  const playerRef = useRef(null)

  const [volume, setVolume] = useState(100)
  const [isMuted, setIsMuted] = useState(false)
  


  const onReady = (event) => {
         playerRef.current = event.target
        setDuration(event.target.getDuration())
        // Auto-play and set state when component loads with src
        if (src) {
            setIsPlaying(true)
            event.target.playVideo()
        }
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume)
      setIsMuted(newVolume === 0)
    }
  }

  const toggleMute = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.setVolume(volume)
        setIsMuted(false)
      } else {
        playerRef.current.setVolume(0)
        setIsMuted(true)
      }
    }
  }


  const handleSeek = (e) => {
    const clickPosition = e.nativeEvent.offsetX
    const sliderWidth = e.target.clientWidth
    const percentage = (clickPosition / sliderWidth)
    const newTime = percentage * duration

    setCurrentTime(newTime)
    if (playerRef.current) {
      playerRef.current.seekTo(newTime, true)
    }
  }

  const togglePlay = () => {
    if (!playerRef.current) return
    if (isPlaying) {
      playerRef.current.pauseVideo()
    } else {
      playerRef.current.playVideo()
    }
    setIsPlaying(!isPlaying)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current && isPlaying) {
        setCurrentTime(playerRef.current.getCurrentTime())
      }
    }, 500)
    return () => clearInterval(interval)
  }, [isPlaying])


  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }


  const audioPlayer = useRef() //reference our audio component
  const progressBar = useRef() //reference our progress bar
  const animationRef = useRef() //reference our animation
  const audioURL = `https://www.youtube.com/watch?v=${videoId}` // YouTube video URL

    const opts = {
        height: '0',
        width: '0',
        playerVars: {
            autoplay: src ? 1 : 0,
        },
    }


  function parse_str(str) {
    return str.split('&').reduce(function (params, param) {
      var paramSplit = param.split('=').map(function (value) {
        return decodeURIComponent(value.replace('+', ' '))
      })
      params[paramSplit[0]] = paramSplit[1]
      return params
    }, {})
  }

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60)
    const returendMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
    const seconds = Math.floor(secs % 60)
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
    return `${returendMinutes} : ${returnedSeconds}`
  }


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
  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value)
    setCurrentTime(newTime)
    if (playerRef.current) {
      playerRef.current.seekTo(newTime, true)
    }
  }

  return (
    <div className="audioPlayer" >
      <div className="audio-player-container">
        {videoId ? (
          <YouTube videoId={videoId} opts={opts} onReady={onReady} />
        ) : (
          <div>No track selected</div>
        )}

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
              // onChange={handleSeek}
              onChange={handleProgressChange}
              step="0.1"
              style={{ '--seek-before-width': `${(currentTime / duration) * 100}%` }}
              className="progress-slider"
            />
          </div>
          {/* duration */}

          {/* <input type="range" /> */}
          {(duration && !isNaN(duration)) && calculateTime(duration)}


        </div>
      </div>
      <div className="volume-controls">
        <button onClick={toggleMute} className="mute-btn">
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          className="volume-slider"
          style={{ '--volume-before-width': `${volume}%` }}
        />
      </div>
    </div>
  )


}

export { AudioPlayer }