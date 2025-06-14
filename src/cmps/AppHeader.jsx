import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import {  useRef } from 'react'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'
import { PageIcon } from '../../public/img/PageIcon.jsx'
import { HomePageIcon } from '../../public/img/HomePageIcon.jsx'
import { IoIosSearch } from "react-icons/io"
import { useState } from 'react'
import userImage from '../assets/img/profile-whiteBG.svg'

export function AppHeader({ onSearch }) {
	// const user = useSelector(storeState => storeState.userModule.user) // 
	const navigate = useNavigate()
	const [searchValue, setSearchValue] = useState('')
    const timeoutId = useRef(null)

	const handleLogin = () => {
		navigate('/login')
	}
	const handleNavHome = () => {
		navigate('/')
	}

    const handleInputChange = (e) => {
        const value = e.target.value
        setSearchValue(value)

        // Clear previous timeout
        if (timeoutId.current) {
            clearTimeout(timeoutId.current)
        }

        // Set new timeout
        timeoutId.current = setTimeout(() => {
            onSearch(value)
            if (value) {
                navigate(`/search/${value}`)
            } else {
                navigate('/')
            }
        }, 500) // 500ms = 0.5 seconds
    }

	async function onLogout() {
		try {
			await logout()
			navigate('/')
			showSuccessMsg(`Bye now`)
		} catch (err) {
			showErrorMsg('Cannot logout')
		}
	}

	return (
		<header className="app-header full">
			<div className='logo'>
				<button onClick={handleNavHome} className='home-btn'>
					<PageIcon color="white" />
				</button>
			</div>
			<span className='space' />
			<button onClick={handleNavHome} className='home-btn-symbol'>
				<div className="icon-with-tooltip">
					<HomePageIcon color="white" />
					<span className="tooltip">Home</span>
				</div>
			</button>
			<span className='space-home' />
			{/* add css for input in app-header */}
			<div className="search-input">
				<div className="icon-wrap">
					<IoIosSearch />
				</div>
				<input
					type="text"
					value={searchValue}
					placeholder="What do you want to listen to?"
					onChange={handleInputChange}
				/>
			</div>
			<span className='space-login' />

			<div className='playlist-header-details'>
				<button className='home-btn-symbol'>
					<div className="icon-with-tooltip">
					<img src={userImage} alt="" />
					<span className="tooltip">User user</span>
					</div>
				</button>
			</div>
		</header>
	)
}
