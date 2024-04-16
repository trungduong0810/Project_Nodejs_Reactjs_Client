import React, { useEffect, useState } from "react";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { v4 as uuIdv4 } from "uuid";

import { imageDb } from "../StoreImageFirebase/firebaseConfig";
import Loading from "../../components/Loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRetro, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const UploadImageReviewsProduct = ({ setUrl, click }) => {
  const [progressPercent, setProgressPercent] = useState(0);
  const [arrayImages, setArrayImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    if (click) {
      setImageUrls([]);
      setProgressPercent(0);
    }
  }, [click]);

  useEffect(() => {
    setUrl(imageUrls);
  }, [imageUrls, setUrl]);

  const handleUploadFile = (e) => {
    const fileImages = Array.from(e.target.files);
    if (!fileImages) return;
    setArrayImages(fileImages);
    if (fileImages) {
      fileImages.forEach((item) => {
        const extension = item.name.split(".").pop();
        const uniqueFilename = `${uuIdv4()}.${extension}`;
        const storageRef = ref(imageDb, "productImages/" + uniqueFilename);
        const uploadTask = uploadBytesResumable(storageRef, item);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgressPercent(progress);
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImageUrls((prevDownloadURLs) => [
                ...prevDownloadURLs,
                downloadURL,
              ]);
            });
          }
        );
      });
    }
  };

  const handleDeleteImageUpload = (e) => {
    const imageUrl = e.currentTarget.getAttribute("data-url");
    const folderFirebase = decodeURIComponent(
      imageUrl.split("/").pop().split("?")[0]
    );
    const fileName = folderFirebase.substring(
      folderFirebase.lastIndexOf("/") + 1
    );
    const desertRef = ref(imageDb, `productImages/${fileName}`);
    deleteObject(desertRef).then(() => {
      toast.success("Delete file success", {
        pauseOnHover: false,
      });
      setImageUrls((prevImageUrls) =>
        prevImageUrls.filter((url) => url !== imageUrl)
      );
      setProgressPercent(0);
    });
  };

  return (
    <div className="laptop:w-[90%]">
      <div className="relative rounded-md border-2 border-gray-500  w-[40%] mx-auto flex items-center justify-center group mb-6">
        <div>
          <div className="text-center font-semibold">
            <div className="flex flex-col gap-1 p-2">
              <FontAwesomeIcon
                icon={faCameraRetro}
                className="text-[30px]  text-teal-600"
              />
              <h2 className="text-gray-500 text-[18px]">Hình ảnh chi tiết</h2>
            </div>
          </div>
          <input
            type="file"
            multiple
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleUploadFile}
          />
          {arrayImages.length !== 0 &&
            progressPercent !== 0 &&
            progressPercent !== 100 && (
              <>
                <div className="absolute inset-0 bg-black opacity-[0.6]"></div>
                <Loading className="w-[30px] h-[30px]"></Loading>
              </>
            )}
        </div>
      </div>

      <div className="flex items-center justify-center gap-5 flex-wrap">
        {imageUrls.length > 0 &&
          imageUrls.map((item, index) => (
            <div
              key={index}
              className="relative w-[150px] h-[100px] group rounded-lg overflow-hidden shadow-lg cursor-pointer "
            >
              <img src={item} alt="" className="w-full h-full object-cover" />
              <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <FontAwesomeIcon
                  icon={faTrashCan}
                  onClick={handleDeleteImageUpload}
                  data-url={item}
                  className="text-lg bg-white p-2 text-red-500 rounded-full hover:text-red-700 hover:bg-gray-200 transition-all"
                />
              </div>
              <div className="absolute inset-0  group-hover:bg-black opacity-[0.6] transition-all z-10"></div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UploadImageReviewsProduct;
