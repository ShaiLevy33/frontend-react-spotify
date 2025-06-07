import { RiMusic2Line } from "react-icons/ri"
import { RxPencil1 } from "react-icons/rx"
import { useState, useRef, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { playlistService } from "../services/playlist.service"
import { updatePlaylist } from "../store/actions/playlist.actions.js"
import { useDispatch } from 'react-redux'
import { uploadService } from "../services/upload.service.js"

export function PopupEdit({ isOpen, onClose ,playlist, onUpdate }) {
    // const [playlist, setPlaylist] = useState(null)
    // const [playlistToEdit, setPlaylistToEdit] = useState(null)
    const [isBtnHovered, setIsBtnHovered] = useState(false)
    // const [previewImg, setPreviewImg] = useState(null)
    const fileInputRef = useRef(null)
    // const [inputPlaylist, setInputPlaylist] = useState(playlist)
    const params = useParams()


    // const [playlistToEdit, setPlaylistToEdit] = useState(playlist);
    const [PlaylistToEdit, setPlaylistToEdit] = useState(playlistService.getEmptyPlaylist())
    // const [playlistId] = useState(playlist._id.$oid)
    const dispatch = useDispatch()

    //     useEffect(() => {
    //   setInputPlaylist(playlist)
    // }, [playlist]);
    useEffect(() => {
        console.log('params:', params);

        if (params.id)
            loadPlaylist()
    }, [params.id])

    function handleChange({ target }) {
        //   const { name, value } = event.target;
        //   setInputPlaylist(prev => ({
        //     ...prev,
        //     [name]: value
        //   }));
        let targetName = target.name
        if (targetName === '') {
            targetName = 'imgUrl'
        }
        const field = targetName
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break
            case 'file':
                value = uploadImg(target.value)
                break

            default:
                break
        }
        setPlaylistToEdit(prevData => ({ ...prevData, [field]: value }))
    };
    function loadPlaylist() {
        playlistService.get(params.id)
            .then(setPlaylistToEdit)
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot load playlist')
                navigate('/')
            })
    }
    useEffect(() => {
         if (playlist) {
        setPlaylistToEdit(playlist)
         }
    }, [playlist])

    if (!isOpen) return null;

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    };

    async function uploadImg(file) {
        try {
            const imageUrl = await uploadService.uploadImg(file)
            return imageUrl
        } catch (err) {
            console.error('Error uploading image:', err)
            // Optionally: handle error, e.g., show a message to the user
        }
    }
    const handleFileChange = async (e) => {
        e.preventDefault()
        const file = e;
        if (file) {
            const imageUrl = await uploadImg(file)
            const field = e.target.name || 'imgUrl'
            setPlaylistToEdit(prevData => ({ ...prevData, [field]: imageUrl.url }))
        }
        // Optionally: handle upload logic here
        console.log('Selected file:', file);
    }

    //     function handleChange({ target }) {
    //     let { value, type, name: field } = target
    //     value = type === 'number' ? +value : value
    //     setPlaylistToEdit(prev => ({ ...prev, [field]: value }));
    // }
    function handleSave() {
        const updatedPlaylist = {
            ...playlist,
            ...PlaylistToEdit,
            imgUrl: PlaylistToEdit.imgUrl,
            name: PlaylistToEdit?.name,
            description: PlaylistToEdit?.description
        };
        updatePlaylist(updatedPlaylist, updatedPlaylist._id.$oid)
            .then(() => {
                            dispatch({ 
                type: 'UPDATE_PLAYLIST', 
                playlist: updatedPlaylist 
            })
                   onUpdate(updatedPlaylist)
                onClose()
                // window.location.reload()
                // Optionally: show success message or refresh data
            })
            .catch(err => {
                console.error('Error updating playlist:', err)
                // Optionally: show error message
            });
    }

    const { name, description, imgUrl } = PlaylistToEdit

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <button className="popup-close-button" onClick={onClose}>
                    &times;
                </button>
                <div className='popUpEdit'></div>
                <h2>
                    Edit details
                </h2>
                <div className='popup-edit-playlist'>
                    <div className="popup-edit-playlist-img">
                        <button
                            className="popup-edit-btn"
                            onMouseEnter={() => setIsBtnHovered(true)}
                            onMouseLeave={() => setIsBtnHovered(false)}
                            onClick={handleButtonClick}
                        >
                            {isBtnHovered ? (
                                <RxPencil1 />
                            ) 
                            // : previewImg ? (
                            //     <img
                            //         src={previewImg}
                            //         alt="playlist"
                            //         name="imgUrl"
                            //         id="imgUrl"
                            //     />
                            // ) 
                            : PlaylistToEdit.imgUrl ? (
                                <img
                                    src={imgUrl}
                                    alt="playlist"
                                    name="imgUrl"
                                    id="imgUrl2"
                                />
                            ) : (
                                <RiMusic2Line />
                            )}
                            {isBtnHovered ? <h6>Choose photo</h6> : <h1></h1>}
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            accept="img/*"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="popup-edit-playlist-details">
                        {PlaylistToEdit && (
                            <>
                                <div className="form_input_container">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={name}
                                        onChange={handleChange}
                                        className="form_input"
                                        placeholder="Enter playlist name"
                                    />
                                    <label htmlFor="name" className="form_label">
                                        Name
                                    </label>
                                </div>
                                <div className="form_input_container">
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={description}
                                        onChange={handleChange}
                                        className="form_textarea"
                                        placeholder="Enter playlist description"
                                        rows="4"
                                    ></textarea>
                                    <label htmlFor="description" className="form_label">
                                        Description
                                    </label>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className="save-button-edit">
                    <button className="save-button" onClick={handleSave}>Save</button>
                </div>
                <p>By proceeding, you agree to give VibeStream access to the image you choose to upload.<br />
                    Please make sure you have the right to upload the image.</p>
            </div>
        </div>
    );
}

// export {PopupEdit};