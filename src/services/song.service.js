import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { songsData } from '../../src/assets/data/track.json'

import fs from 'fs'
import path from 'path'


const SONG_KEY = 'songDB'
const SONGNEW_KEY = 'newsongDB' // from 09/05/2025
_createSongs()
_createSongsNew()

export const songService = {
    query,
    get,
    remove,
    save,
    getEmptySong,
    getDefaultFilter,
    getFilterFromSearchParams,
}
// For Debug (easy access from console):
window.songService = songService

function query(filterBy = {}) {
    return storageService.query(SONG_KEY)
        .then(songs => {
            if (filterBy.name) {
                const regExp = new RegExp(filterBy.name, 'i')
                songs = songs.filter(song => regExp.test(song.name))
            }

            if (filterBy.maxPrice) {
                songs = songs.filter(song => song.price <= filterBy.maxPrice)
            }
            if (filterBy.inStock !== " " && filterBy.inStock !== undefined) {
                songs = songs.filter(
                    song =>
                        song.inStock === (filterBy.inStock == true))
            }
            if (filterBy.labels) {
                songs = songs.filter(song => song.labels === filterBy.labels)
            }

            return songs
        })
}

function get(songId) {
    return storageService.get(SONG_KEY, songId)
        .then(song => {
            song = _setNextPrevSongId(song)
            return song
        })
}

function remove(songId) {
    return storageService.remove(SONG_KEY, songId)
}

function save(song) {
    if (song._id) {
        return storageService.put(SONG_KEY, song)
    } else {
        return storageService.post(SONG_KEY, song)
    }
}

function getEmptySong(name = '', price = '') {
    return { name, price }
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


function _createSong(name, price = 250) {
    const song = getEmptySong(name, price)
    song._id = utilService.makeId()
    return song
}

function _setNextPrevSongId(song) {
    return storageService.query(SONG_KEY).then((songs) => {
        const songIdx = songs.findIndex((currSong) => currSong._id === song._id)
        const nextSong = songs[songIdx + 1] ? songs[songIdx + 1] : songs[0]
        const prevSong = songs[songIdx - 1] ? songs[songIdx - 1] : songs[songs.length - 1]
        song.nextSongId = nextSong._id
        song.prevSongId = prevSong._id
        return song
    })
}

function _getSongCountByPriceMap(songs) {
    const songCountByPriceMap = songs.reduce((map, song) => {
        if (song.price < 120) map.slow++
        else if (song.price < 200) map.normal++
        else map.fast++
        return map
    }, { slow: 0, normal: 0, fast: 0 })
    return songCountByPriceMap
}

function _getSongCountByNameMap(songs) {
    const songCountByNameMap = songs.reduce((map, song) => {
        if (!map[song.name]) map[song.name] = 0
        map[song.name]++
        return map
    }, {})
    return songCountByNameMap
}

function getRandomImage() {
    const imgDir = path.join(__dirname, '../assets/img')
    const files = fs.readdirSync(imgDir)
    const randomIndex = Math.floor(Math.random() * files.length)
    return `/assets/img/${files[randomIndex]}`
}

function _createSongs() {

    let songs = utilService.loadFromStorage(SONG_KEY)
    if (!songs || !songs.length) {
        const songNames = ['רשימת קניות', 'החדר מסתובב', 'חולמת', 'פרש בודד', 'Anxiety', 'Puzzle',
            'Outdoor', 'Battery Powered']
        const songsImages = ['Dinosaur.jpg', 'Jeep.jpg', 'Mouse.avif', 'Teady Bear.jpg',
            'Telephone.jpg', 'Tracktor.jpg']

        const songs = [
            {
                _id: utilService.makeId(),
                songName: 'רשימת קניות',
                imgUrl: 'https://i.scdn.co/image/ab67616d00001e02442df3fedce56042a4140361',
                artists: ['STILLA', 'Ness', 'Odeya'],
                createdAt: Date.now()

            },
            {
                _id: utilService.makeId(),
                songName: 'Show Me Love',
                imgUrl: 'https://i.scdn.co/image/ab67616d00001e029263dc4504ccf1b02899d9ae',
                artists: ['WizTheMc', 'bees & honey'],
                createdAt: Date.now()

            },
            {
                _id: utilService.makeId(),
                songName: 'פרפרים',
                imgUrl: 'https://i.scdn.co/image/ab67616d00001e02acea0a8cdfae26691efac36e',
                artists: ['Odeya'],
                createdAt: Date.now()

            },
            {
                _id: utilService.makeId(),
                songName: 'twilight zone',
                imgUrl: 'https://i.scdn.co/image/ab67616d00001e022ec9889c4127d1b6a30d9887',
                artists: ['Ariana Grande'],
                createdAt: Date.now()

            },
            {
                _id: utilService.makeId(),
                songName: 'Anxiety',
                imgUrl: 'https://i.scdn.co/image/ab67616d00001e02ea29212b801087f18319c187',
                artists: ['Doechii'],
                createdAt: Date.now()

            },
            {
                _id: utilService.makeId(),
                songName: 'חולון פריז',
                imgUrl: 'https://i.scdn.co/image/ab67616d00001e028192406c0357a64412782d19',
                artists: ['Gal Adam'],
                createdAt: Date.now()

            }

        ]
        utilService.saveToStorage(SONG_KEY, songs)
    }
    console.log('songs', songs)
}
function _createSongsNew() {

    let songs = utilService.loadFromStorage(SONGNEW_KEY) || []

    if (!songs || !songs.length) {
        songs = songsData
        utilService.saveToStorage(SONGNEW_KEY, songs)
    }
    return songs
}