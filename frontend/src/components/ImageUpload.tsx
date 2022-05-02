import axios from 'axios'

const ImageUpload = (props: {upl: (url: string)=>void}) => {
    const upload = async (files: FileList | null) => {
        if (files === null) return

        const formData = new FormData()
        formData.append('file', files[0])

        const {data} = await axios.post('upload', formData)

        props.upl(data.url)
    }
  
    return (
    <label className="btn btn-primary">
        Uplaod<input type="file" hidden onChange={e => upload(e.target.files)}/>
    </label>    
  )
}

export default ImageUpload