import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { imageDb } from "../StoreImageFirebase/firebaseConfig";
const UploadQuill = ({ setContentValueProduct, setEmptyValue }) => {
  const quillRef = useRef();
  const [valueContent, setValueContent] = useState("");

  useEffect(() => {
    setContentValueProduct(valueContent);
  }, [valueContent, setContentValueProduct]);

  useEffect(() => {
    if (setEmptyValue) {
      setValueContent("");
    }
  }, [setEmptyValue]);

  const handleUploadImageContent = (fileImage) => {
    const storageRef = ref(imageDb, "images/" + fileImage.name);
    const uploadTask = uploadBytesResumable(storageRef, fileImage);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const range = quillRef.current.getEditor().getSelection(true);
          quillRef.current
            .getEditor()
            .insertEmbed(range.index, "image", downloadURL);
        });
      }
    );
  };

  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      if (input !== null && input.files !== null) {
        const file = input.files[0];
        handleUploadImageContent(file);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <div className="mt-5">
        <ReactQuill
          ref={quillRef}
          theme="snow"
          placeholder="Start writing..."
          modules={{
            toolbar: {
              container: [
                [{ header: "1" }, { header: "2" }, { font: [] }],
                [{ size: [] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [
                  { list: "ordered" },
                  { list: "bullet" },
                  { indent: "-1" },
                  { indent: "+1" },
                ],
                ["link", "image", "video"],
                ["code-block"],
                ["clean"],
              ],

              handlers: {
                image: imageHandler,
              },
            },
            clipboard: {
              matchVisual: false,
            },
          }}
          formats={[
            "header",
            "font",
            "size",
            "bold",
            "italic",
            "underline",
            "strike",
            "blockquote",
            "list",
            "bullet",
            "indent",
            "link",
            "image",
            "video",
            "code-block",
          ]}
          value={valueContent}
          onChange={setValueContent}
        />
      </div>
    </div>
  );
};

export default UploadQuill;
