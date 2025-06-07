import React, { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router'
import { Provider } from 'react-redux'
import { HomePage } from './pages/HomePage'
// import { AboutUs, AboutTeam, AboutVision } from './pages/AboutUs'
// import { CarIndex } from './pages/CarIndex.jsx'
// import { ReviewIndex } from './pages/ReviewIndex.jsx'
// import { ChatApp } from './pages/Chat.jsx'
import { AdminIndex } from './pages/AdminIndex.jsx'

// import { CarDetails } from './pages/CarDetails'
// import { UserDetails } from './pages/UserDetails'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { UserMsg } from './cmps/UserMsg.jsx'
import { PlaylistDetails } from './pages/PlaylistDetails.jsx'
import { LoginSignup } from './pages/LoginSignup.jsx'
import { Login } from './pages/Login.jsx'
import { Signup } from './pages/Signup.jsx'
import { LeftSideToolbar } from './cmps/LeftSideToolbar.jsx'
import { store } from './store/store.js'

export function RootCmp() {

    const location = useLocation()
    const [currentTrack, setCurrentTrack] = useState(null)
    const [playOrPause, setPlayOrPause] = useState(false)
    const [playlistId, setPlaylistId] = useState(null)
    const showRegularPage = location.pathname !== '/login'
    // const [tracks, setTracks] = useState([])

    function handleTrackUpdate(newTrack, playPause , playlistId) {
        // setTracks(prevTracks => [...prevTracks, newTrack])
        setCurrentTrack(newTrack ) 
        setPlaylistId(playlistId)
        if (playPause !== undefined) {
            setPlayOrPause(playPause)
        }
        else {
            setPlayOrPause(true)
        }
    }

    return (
        <div className="main-container" >
            <AppHeader />
            <UserMsg />
            <Provider store={store}>
                <div className="content-layout">
                    <div className="left-side-toolbar">
                        {/* //  style={{ width: `${toolbarWidth}px` }}
                    //  onMouseDown={handleMouseDown}> */}
                        <LeftSideToolbar onTrackSelect={handleTrackUpdate} />
                    </div>
                    <main className="main-content"
                    // style={{ flexGrow: 1 }}
                    >
                        <Routes>
                            {/* <Route path="" element={<HomePage />} /> */}
                            <Route path="/" element={<HomePage onTrackSelect={handleTrackUpdate} />} />
                            <Route path='/login' element={<Login />} />
                            <Route path="/playlist/:id" element={
                                <PlaylistDetails onTrackSelect={handleTrackUpdate} />} />
                        </Routes>
                    </main>
                </div>
                <AppFooter currentTrack={currentTrack} playlistId={playlistId}/>
            </Provider>
        </div>
    )
}


