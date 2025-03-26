import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'
import { PageIcon } from '../../public/img/PageIcon.jsx'
import { HomePageIcon } from '../../public/img/HomePageIcon.jsx'

export function AppHeader() {
	const user = useSelector(storeState => storeState.userModule.user)
	const navigate = useNavigate()

	async function onLogout() {
		try {
			await logout()
			navigate('/')
			showSuccessMsg(`Bye now`)
		} catch (err) {
			showErrorMsg('Cannot logout')
		}
	}
	function SearchInput({ children , placeholder, type}) {
		return(
			<div className="search-input">
				<div>{children}</div>
				<input type={type} placeholder={placeholder}/>
				{/* <button>Search</button> */}
			</div>
		)
	}

	return (
		<header className="app-header full">
			<PageIcon color="white" />
			<HomePageIcon color="white" />
			<div>
				<SearchInput placeholder="Search" type="text">
					
					</SearchInput>
			</div>
			<button className="menu-btn">Premuim</button>
			<button className="menu-btn">Support</button>
			<button className="menu-btn">Download</button>
			<button className="menu-btn">Install App</button>
			<button className="menu-btn">Sign up</button>
			<button className="menu-btn">Log in</button>

			<nav>
				{/* <NavLink to="/" className="logo">
					E2E Demo
				</NavLink> */}
				{/* <NavLink to="about">About</NavLink> */}
				{/* <NavLink to="car">Cars</NavLink> */}
				{/* <NavLink to="chat">Chat</NavLink> */}
				{/* <NavLink to="review">Review</NavLink> */}

                {user?.isAdmin && <NavLink to="/admin">Admin</NavLink>}

				{!user && <NavLink to="login" className="login-link">Login</NavLink>}
				{user && (
					<div className="user-info">
						<Link to={`user/${user._id}`}>
							{/* {user.imgUrl && <img src={user.imgUrl} />} */}
							{user.fullname}
						</Link>
						{/* <span className="score">{user.score?.toLocaleString()}</span> */}
						<button onClick={onLogout}>logout</button>
					</div>
				)}
			</nav>
		</header>
	)
}
