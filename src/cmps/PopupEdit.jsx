import { RiMusic2Line } from "react-icons/ri";
import { RxPencil1 } from "react-icons/rx";
import { useState, useRef, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { playlistService } from "../services/playlist.service"; 
import { updatePlaylist } from "../store/actions/playlist.actions.js"
import { useDispatch} from 'react-redux'

export function PopupEdit({ isOpen, onClose }) {
    const [playlist, setPlaylist] = useState(null)
    const [isBtnHovered, setIsBtnHovered] = useState(false)
    const [previewImg, setPreviewImg] = useState(null)
    const fileInputRef = useRef(null)
    // const [inputPlaylist, setInputPlaylist] = useState(playlist)
    const params = useParams()


    // const [playlistToEdit, setPlaylistToEdit] = useState(playlist);
    const [PlaylistToEdit, setPlaylistToEdit] = useState(playlistService.getEmptyPlaylist(''))
    // const [playlistId] = useState(playlist._id.$oid)
    const dispatch = useDispatch()
    
//     useEffect(() => {
//   setInputPlaylist(playlist)
// }, [playlist]);
    useEffect(() => {
        console.log('params:', params);

        if (params.id)
            loadPlaylist()
    }, [])

 const handleChange = (e) => {
//   const { name, value } = event.target;
//   setInputPlaylist(prev => ({
//     ...prev,
//     [name]: value
//   }));
    const { name, value } = e.target;
    setPlaylistToEdit(prevData => ({ ...prevData, [name]: value }))
};
    function loadPlaylist() {
        playlistService.get(params.id)
            .then(setPlaylist)
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot load playlist')
                navigate('/')
            })
    }

    if (!isOpen) return null;

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setPreviewImg(imageUrl);
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
            // _id.$oid: playlistId,
            imgUrl: previewImg || playlist.imgUrl,
            name: playlist?.name,
            description: playlist?.description
        };
        updatePlaylist(updatedPlaylist, playlist._id.$oid)
            .then(() => {
                onClose();
                // Optionally: show success message or refresh data
            })
            .catch(err => {
                console.error('Error updating playlist:', err)
                // Optionally: show error message
            });
    }

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
                            ) : previewImg ? (
                                <img 
                                    src={previewImg}
                                    alt="playlist"
                                />
                            ) : playlist.imgUrl ? (
                                <img 
                                    src={playlist.imgUrl}
                                    alt="playlist"
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
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="popup-edit-playlist-details">
                        {playlist && (
                            <>
                                <div className="form_input_container">
                                    <input
                                        id="name"
                                        type="text"
                                        value={playlist?.name || ""}
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
                                        value={playlist?.description || ""}
                                        onChange={handleChange}
                                        className="form_input"
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