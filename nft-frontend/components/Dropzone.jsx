import React, { useState, useCallback } from 'react'
import Dropzone, { useDropzone } from 'react-dropzone'
export default function MyDropzone() {
    const[selectedImages, setSelectedImages] = useState([])
    const onDrop = useCallback(acceptedFiles => {
        setSelectedImages(acceptedFiles.map(file=>
            Object.assign(file,{
                preview:URL.createObjectURL(file)
            })))
    }, [])

    const {getRootProps, getInputProps} = useDropzone({onDrop})
    const selected_images = selectedImages?.map(file=>(
        <div>
            <img src={file.preview} width={500} height={500} alt="NFT"/>
        </div>
    )
        )
    return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        
            <p>Drop the files here ...</p> :
            
      </div>
      {selected_images}
      </div>
    )
  }