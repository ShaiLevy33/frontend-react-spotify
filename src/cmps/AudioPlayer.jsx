import React, { useState, useRef, useEffect } from "react"
import { GiPreviousButton } from "react-icons/gi";
import { GiNextButton } from "react-icons/gi";
import { FaPlayCircle } from "react-icons/fa";
import { FaCirclePause } from "react-icons/fa6";
import { TiArrowShuffle } from "react-icons/ti";

function 
AudioPlayer( { src }) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)

    const audioPlayer = useRef() //reference our audio component
    const progressBar = useRef() //reference our progress bar
    const animationRef = useRef() //reference our animation

    useEffect(() => {
        // const audio = audioPlayer.current
        // const duration = audio.duration
        const seconds = Math.floor(audioPlayer.current.duration)
        setDuration(seconds)
        progressBar.current.max = seconds
        // console.log('duration', duration)
    }, [audioPlayer?.current?.loadmetadata, audioPlayer?.current?.readyState])

    const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60)
        const returendMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
        const seconds = Math.floor(secs % 60)
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
        return `${returendMinutes} : ${returnedSeconds}`
    }

    const togglePlayPause = function () {
        const prevValue = isPlaying
        setIsPlaying(!prevValue)
        if (!prevValue) {
            audioPlayer.current.play()
            animationRef.current = requestAnimationFrame(whilePlaying)
        }
        else {
            audioPlayer.current.pause()
            cancelAnimationFrame(animationRef.current)
        }
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

    return (
        <div className="audioPlayer" >
            <audio ref={audioPlayer}  src={src}/>
            {/* src="https://cdn.simplecast.com/audio/cae8b0eb-d9a9-480d-a652-0defcbe047f4/episodes/af52a99b-88c0-4638-b120-d46e142d06d3/audio/500344fb-2e2b-48af-be86-af6ac341a6da/default_tc.mp3" preload="metadata" > */}
            {/* </audio> */}
            <div className="controls">
                <button className="shuffle" ><TiArrowShuffle /></button>
                <button className="forwardBackward"><GiPreviousButton /></button>
                <button onClick={togglePlayPause} className="playPause">
                    {isPlaying ? <FaCirclePause /> : <FaPlayCircle />}
                </button>
                <button className="forwardBackward"><GiNextButton /></button>
            </div>
            <div className="current-time">
            {/* current time */}
            {calculateTime(currentTime)}

            {/* progress bar */}
            <div>  <input type="range" className="progressBar" defaultValue="0" ref={progressBar} onChange={changeRange}/></div>

            {/* duration */}
          
                {/* <input type="range" /> */}
                {(duration && !isNaN(duration)) && calculateTime(duration)}
           

            </div>

        </div>
    )


}

export { AudioPlayer }