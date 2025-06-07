export const uploadService = {
	uploadImg,
}

async function uploadImg(ev) {
	const CLOUD_NAME = 'dkrw1ueny'
	const UPLOAD_PRESET = 'my_final_proj'
	const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

	const formData = new FormData()
	
    // Building the request body
	formData.append('file', ev.target.files[0]) // Assuming ev is an event with a target that has files
	if (!formData.get('file')) {
		throw new Error('No file selected for upload')
	}
	
	// Adding the upload preset
	formData.append('upload_preset', UPLOAD_PRESET)
	// formData.append('file', file) // Optional: specify a folder in Cloudinary
	
    // Sending a post method request to Cloudinary API
	try {
		const res = await fetch(UPLOAD_URL, { method: 'POST', body: formData })
		const imgData = await res.json()
		return imgData
	} catch (err) {
		console.error(err)
		throw err
	}
}