import React , { useState } from 'react'
import { Routes, Route } from 'react-router'
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
import { LoginSignup } from './pages/LoginSignup.jsx'
import { Login } from './pages/Login.jsx'
import { Signup } from './pages/Signup.jsx'
import { LeftSideToolbar } from './cmps/LeftSideToolbar.jsx'
import { store } from './store/store.js'



export function RootCmp() {

    // const [toolbarWidth, setToolbarWidth] = useState(250) // Initial width of the sidebar
    // const [isDragging, setIsDragging] = useState(false)

    // const handleMouseDown = () => {
    //     setIsDragging(true)
    // }

    // const handleMouseMove = (e) => {
    //     if (isDragging) {
    //         const newWidth = Math.max(50, e.clientX) // Minimum width of 50px
    //         setToolbarWidth(newWidth)
    //     }
    // }

    // const handleMouseUp = () => {
    //     setIsDragging(false)
    // }

    return (
        <div className="main-container"
        // onMouseMove={handleMouseMove}
        // onMouseUp={handleMouseUp}
        >
            <AppHeader />
            <UserMsg />
            <Provider store={store}>
                <div className="content-layout">
                    <div className="left-side-toolbar">
                    {/* //  style={{ width: `${toolbarWidth}px` }}
                    //  onMouseDown={handleMouseDown}> */}
                        <LeftSideToolbar />
                    </div>
                    <main className="main-content"
                    // style={{ flexGrow: 1 }}
                    >
                        <Routes>
                            <Route path="" element={<HomePage />} />
                            {/* <Route path="about" element={<AboutUs />}>
                        <Route path="team" element={<AboutTeam />} />
                        <Route path="vision" element={<AboutVision />} />
                    </Route> */}
                            {/* <Route path="song" element={<CarIndex />? */}
                            {/* <Route path="car" element={<CarIndex />} />
                    <Route path="car/:carId" element={<CarDetails />} />
                    <Route path="user/:id" element={<UserDetails />} />
                    <Route path="review" element={<ReviewIndex />} /> */}
                            {/* <Route path="chat" element={<ChatApp />} /> */}
                            {/* <Route path="admin" element={<AdminIndex />} />
                    <Route path="login" element={<LoginSignup />}>
                        <Route index element={<Login />} />
                        <Route path="signup" element={<Signup />} />
                    </Route> */}
                        </Routes>
                   
                        
                    </main>
                </div>
                <AppFooter></AppFooter>
            </Provider>
        </div>
    )
}


