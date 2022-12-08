import Axios from "axios";
import React, { useState } from "react";

function ImageUploader() {
  const [media, setMedia] = useState<File[]>([]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const files = [...Object.values(target.files!)];
    setMedia([...files]);
  };

  const uploadImage = async (files: File[]) => {
    const media = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "gfzvnxon");
      formData.append("cloud_name", "dmlzx9yxe");

      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dmlzx9yxe/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        media.push(data.secure_url);
        // console.log(data.secure_url);
      } catch (err: any) {
        console.log(err);
      }
    }
    // console.log(media);
    return media;
  };
  let res = uploadImage(media);
  res.then(function (result) {});
  console.log(res);
  return (
    <div>
      <input type="file" onChange={(e) => handleChange(e)} />
      <button onClick={() => uploadImage(media)}>Upload Image</button>
    </div>
  );
}

export default ImageUploader;
