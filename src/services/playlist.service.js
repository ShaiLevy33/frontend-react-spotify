import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import stationsData from '../../src/assets/data/station.json'
import stationsHPData from '../../src/assets/data/stations-home-page.json'

import fs from 'fs'
import path from 'path'


// const PLAYLIST_KEY = 'playlistDB'
const PLAYLIST_KEY= 'stationDB'
const PLAYLIST_HP_KEY = 'stationHPDb'

// _createPlaylists()
_createPlaylists()
_createPlaylistsHomePage()

export const playlistService = {
    query,
    get,
    remove,
    save,
    getEmptyPlaylist,
    getDefaultFilter,
    getFilterFromSearchParams,
}
// For Debug (easy access from console):
window.playlistService = playlistService

function query(filterBy = {}) {
    return storageService.query(PLAYLIST_KEY)
        .then(playlists => {
            if (filterBy.name) {
                const regExp = new RegExp(filterBy.name, 'i')
                playlists = playlists.filter(playlist => regExp.test(playlist.name))
            }

            if (filterBy.maxPrice) {
                playlists = playlists.filter(playlist => playlist.price <= filterBy.maxPrice)
            }
            if (filterBy.inStock !== " " && filterBy.inStock !== undefined) {
                playlists = playlists.filter(
                    playlist =>
                        playlist.inStock === (filterBy.inStock == true))
            }
            if (filterBy.labels) {
                playlists = playlists.filter(playlist => playlist.labels === filterBy.labels)
            }

            return playlists
        })
}

function get(playlistId) {
    return storageService.get(PLAYLIST_KEY, playlistId)
        .then(playlist => {
            playlist = _setNextPrevPlaylistId(playlist)
            return playlist
        })
}

function remove(playlistId) {
    return storageService.remove(PLAYLIST_KEY, playlistId)
}

function save(playlist) {
    if (playlist._id) {
        return storageService.put(PLAYLIST_KEY, playlist)
    } else {
        return storageService.post(PLAYLIST_KEY, playlist)
    }
}

function getEmptyPlaylist(name = '', description = '' , imgUrl = '') {
    return { name, description, imgUrl }
}

function getDefaultFilter() {
    return { name: '', price: 0 }
}

function getFilterFromSearchParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        filterBy[field] = searchParams.get(field) || ''
    }
    return filterBy
}


function _createPlaylist(name, price = 250) {
    const playlist = getEmptyPlaylist(name, price)
    playlist._id = utilService.makeId()
    return playlist
}

function _setNextPrevPlaylistId(playlist) {
    return storageService.query(PLAYLIST_KEY).then((playlists) => {
        const playlistIdx = playlists.findIndex((currPlaylist) => currPlaylist._id === playlist._id)
        const nextPlaylist = playlists[playlistIdx + 1] ? playlists[playlistIdx + 1] : playlists[0]
        const prevPlaylist = playlists[playlistIdx - 1] ? playlists[playlistIdx - 1] : playlists[playlists.length - 1]
        playlist.nextPlaylistId = nextPlaylist._id
        playlist.prevPlaylistId = prevPlaylist._id
        return playlist
    })
}

function _getPlaylistCountByPriceMap(playlists) {
    const playlistCountByPriceMap = playlists.reduce((map, playlist) => {
        if (playlist.price < 120) map.slow++
        else if (playlist.price < 200) map.normal++
        else map.fast++
        return map
    }, { slow: 0, normal: 0, fast: 0 })
    return playlistCountByPriceMap
}

function _getPlaylistCountByNameMap(playlists) {
    const playlistCountByNameMap = playlists.reduce((map, playlist) => {
        if (!map[playlist.name]) map[playlist.name] = 0
        map[playlist.name]++
        return map
    }, {})
    return playlistCountByNameMap
}

function getRandomImage() {
    const imgDir = path.join(__dirname, '../assets/img')
    const files = fs.readdirSync(imgDir)
    const randomIndex = Math.floor(Math.random() * files.length)
    return `/assets/img/${files[randomIndex]}`
}



// function _createPlaylists() {

//     let playlists = utilService.loadFromStorage(PLAYLIST_KEY)
//     if (!playlists || !playlists.length) {

//         const playlists = [
//             {
//                 _id: utilService.makeId(),
//                 playlistName: 'הפלייליסט הכי גדול בישראל, עם השירים הכי חמים של היום ומחר. קאבר:תמר ריילי   ',
//                 imgUrl: 'https://i.scdn.co/image/ab67706f00000002e51235569afc9d28b2820a18',
//                 createdAt: Date.now()

//             },
//             {
//                 _id: utilService.makeId(),
//                 playlistName: 'השירים ששמעתן.ם הכי הרבה ב-2024. קאבר:אושר כהן',
//                 imgUrl: 'https://i.scdn.co/image/ab67706f000000028005fc0aa0dbcb4df92d6e67',
//                 createdAt: Date.now()

//             },
//             {
//                 _id: utilService.makeId(),
//                 playlistName: 'האמנים והאמנים ששמעתי הכי הרבה בשנת 2024. שער: עומר אדם',
//                 imgUrl: 'https://i.scdn.co/image/ab67706f000000020fcb8f95abf19b277e38f1df',
//                 createdAt: Date.now()

//             },
//             {
//                 _id: utilService.makeId(),
//                 playlistName: 'השירים הים-תיכוניים שעשו את 2024. קאבר: אודיה',
//                 imgUrl: 'https://i.scdn.co/image/ab67706f00000002d5ce536cc92933f389057438',
//                 createdAt: Date.now()

//             },
//             {
//                 _id: utilService.makeId(),
//                 playlistName: 'כל הפופ היפה והמרגש של ישראל. קאבר: ענבל ביבי ',
//                 imgUrl: 'https://i.scdn.co/image/ab67706f000000025fc85af56971b9e6f992cedb',
//                 createdAt: Date.now()

//             },
//             {
//                 _id: utilService.makeId(),
//                 playlistName: 'האמנים הגדולים של ישראל בלייב! עצמו עיניים ודמיינו שאתם שם ✨קאבר: טונה ',
//                 imgUrl: 'https://i.scdn.co/image/ab67706f00000002e869fa3fbc365893cab39e20',
//                 createdAt: Date.now()

//             }

//         ]
//         utilService.saveToStorage(PLAYLIST_KEY, playlists)
//     }
//     console.log('playlists', playlists)
// }
function _createPlaylists() {
    
    let playlists = utilService.loadFromStorage(PLAYLIST_KEY)
    if (!playlists || !playlists.length) {

         const  playlists = stationsData
        utilService.saveToStorage(PLAYLIST_KEY, playlists)
    }
    // return stations
}
function _createPlaylistsHomePage() {
    let stationsHomePage = utilService.loadFromStorage(PLAYLIST_HP_KEY) 

    if (!stationsHomePage || !stationsHomePage.length) {
         const  stationsHomePage = stationsHPData
        utilService.saveToStorage(PLAYLIST_HP_KEY, stationsHomePage)
    }
    // return stationsHomePage
}
