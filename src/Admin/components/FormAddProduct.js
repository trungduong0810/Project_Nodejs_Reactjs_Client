import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../../components/input/Input";
import ButtonGlobal from "../../components/button/ButtonGlobal";
import { toast } from "react-toastify";
import { validateAddProduct } from "../../Validation/validateAddProduct";
import UploadImage from "../Upload/UploadImage";
import UploadMultipleImages from "../Upload/UploadMultipleImages";
import SelectForm from "../../components/select/SelectForm";
import CheckBoxColor from "../../components/checkBox/CheckBoxColor";
// import { colorsProduct } from "./Data/selectColorProduct";
// import { sizesProductData } from "./Data/selectSizeProduct";
import CheckBoxSize from "../../components/checkBox/checkBoxSize";
import UploadQuill from "../Upload/UploadQuill";
import slugify from "slugify";
import axios from "axios";
import Swal from "sweetalert2";
import TextareaForm from "../../components/input/Textarea";
import { sizesProductData } from "../../Data/selectSizeProduct";
import { colorsProduct } from "../../Data/selectColorProduct";
import { urlApi } from "../../Api/urlApi";

const FormAddProduct = () => {
  // todo: ========= data up api =============
  const [slug, setSlug] = useState("");
  const [productPriceNew, setProductPriceNew] = useState(0);
  const [productId, setProductId] = useState();
  const [dataProduct, setDataProduct] = useState({});
  const [colorProduct, setColorProduct] = useState({});
  const [sizesProduct, setSizeProduct] = useState({});
  const [imgPrimaryProduct, setImgPrimaryProduct] = useState("");
  const [valueDetailProduct, setValueDetailProduct] = useState("");
  const [productContentImages, setProductContentImages] = useState("");
  // todo: ================= Mặc định size và color là false =============================
  const handleDefaultSizeColor = () => {
    const initialColorProduct = {};
    colorsProduct.forEach((color) => {
      initialColorProduct[color.name] = false;
    });
    setColorProduct(initialColorProduct);
    const initialSizesProduct = {};
    sizesProductData.forEach((size) => {
      initialSizesProduct[size.size] = false;
    });
    setSizeProduct(initialSizesProduct);
  };
  useEffect(() => {
    handleDefaultSizeColor();
  }, []);

  // todo: ===================================================

  const [handleEmptyImgUpload, setHandleEmptyImgUpload] = useState(false);
  const [handleEmptyValueContent, setHandleEmptyValueContent] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validateAddProduct),
    mode: "onChange",
  });

  useEffect(() => {
    const errorKeys = Object.keys(errors);
    if (errorKeys.length > 0) {
      const firstErrorKey = errorKeys[0];
      document.getElementsByName(firstErrorKey)[0].focus();
      toast.error(errors[firstErrorKey].message, {
        pauseOnHover: false,
      });
    }
  }, [errors]);

  // todo: =============== color product =====================
  const handleCheckBoxChange = (name, isChecked) => {
    setColorProduct((prevCheckedItems) => ({
      ...prevCheckedItems,
      [name]: isChecked,
    }));
  };

  // todo: ===============size product =====================
  const handleCheckSizeProduct = (name, isChecked) => {
    setSizeProduct((prevCheckedItems) => ({
      ...prevCheckedItems,
      [name]: isChecked,
    }));
  };

  // todo: =============== submit form add product =====================
  const handleAddProduct = (value) => {
    if (!isValid) return;
    setDataProduct(value);
    const slugProduct = slugify(value.productName.toLowerCase());
    setSlug(slugProduct);
    const priceNew =
      Number(value.productPrice) -
      (Number(value.productDiscount) / 100) * Number(value.productPrice);
    setProductPriceNew(priceNew);
  };

  // todo: =============== add product api =====================
  const PostProductNew = (
    productName,
    productDesc,
    productSlug,
    productCategory,
    productPrice,
    productDiscount,
    productPriceNew,
    productQuantity,
    productImage
  ) => {
    axios
      .post(`${urlApi}/api/products`, {
        productName: productName,
        productDesc: productDesc,
        productSlug: productSlug,
        productCategory: productCategory,
        productPrice: productPrice,
        productDiscount: productDiscount,
        productPriceNew: productPriceNew,
        productQuantity: productQuantity,
        productImage: productImage,
      })
      .then(function (response) {
        console.log(response);
        if (response.data.status === "Success") {
          Swal.fire({
            title: "Thành công",
            text: "Thêm sản phẩm thành công",
            icon: "success",
          });
          setProductId(response.data.data.ProductId);
          setHandleEmptyImgUpload(true);
          setHandleEmptyValueContent(true);
        } else {
          Swal.fire({
            title: "Thất bại",
            text: "Tên sản phẩm đã tồn tại",
            icon: "error",
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // todo: =============== add color product api =====================
  const PostProductColor = (
    ProductId,
    Black,
    Blue,
    YellowEarth,
    Gray,
    Green,
    Orange,
    Pink,
    Purple,
    Red,
    White
  ) => {
    axios
      .post(`${urlApi}/api/product/color`, {
        productId: ProductId,
        colorBlack: Black,
        colorBlue: Blue,
        colorEarthYellow: YellowEarth,
        colorGray: Gray,
        colorGreen: Green,
        colorOrange: Orange,
        colorPink: Pink,
        colorPurple: Purple,
        colorRed: Red,
        colorWhite: White,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  //todo: ================ add size product api ======================
  const PostProductSize = (
    productId,
    sizeS,
    sizeM,
    sizeL,
    sizeXL,
    size2XL,
    size3XL,
    size4XL
  ) => {
    axios
      .post(`${urlApi}/api/product/size`, {
        productId: productId,
        sizeS: sizeS,
        sizeM: sizeM,
        sizeL: sizeL,
        sizeXL: sizeXL,
        size2XL: size2XL,
        size3XL: size3XL,
        size4XL: size4XL,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //todo: ================= add product content api ==================
  const PostProductContent = (productId, productImages, contentProduct) => {
    axios
      .post(`${urlApi}/api/product/details`, {
        productId: productId,
        productImages: productImages,
        contentProduct: contentProduct,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //todo: ================= handle to add product api ========================
  useEffect(() => {
    if (Object.keys(dataProduct).length > 0) {
      PostProductNew(
        dataProduct.productName.trim(),
        dataProduct.productDesc,
        slug,
        dataProduct.productCategory.value,
        dataProduct.productPrice,
        dataProduct.productDiscount,
        productPriceNew,
        dataProduct.productQuantity,
        imgPrimaryProduct
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataProduct]);

  useEffect(() => {
    if (productId) {
      PostProductSize(
        productId,
        sizesProduct.sizeS,
        sizesProduct.sizeM,
        sizesProduct.sizeL,
        sizesProduct.sizeXL,
        sizesProduct.size2XL,
        sizesProduct.size3XL,
        sizesProduct.size4XL
      );
      PostProductColor(
        productId,
        colorProduct.colorBlack,
        colorProduct.colorBlue,
        colorProduct.colorEarthYellow,
        colorProduct.colorGray,
        colorProduct.colorGreen,
        colorProduct.colorOrange,
        colorProduct.colorPink,
        colorProduct.colorPurple,
        colorProduct.colorRed,
        colorProduct.colorWhite
      );
      PostProductContent(
        productId,
        productContentImages,
        valueDetailProduct.replace(/"/g, "'")
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  //todo: ================= Reset form ========================
  useEffect(() => {
    reset({
      productName: "",
      productDesc: "",
      productPrice: "",
      productQuantity: "",
      productDiscount: "",
      productCategory: "",
    });
    handleDefaultSizeColor();
    setValueDetailProduct("");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  return (
    <form action="" onSubmit={handleSubmit(handleAddProduct)}>
      <div className="flex gap-10 w-full">
        <div className="mb-12  w-[40%]">
          <Input
            className="w-full"
            label="Tên sản phẩm"
            type="text"
            color={errors.productName ? "error" : "success"}
            control={control}
            name="productName"
          ></Input>
          <TextareaForm
            className="w-full h"
            type="text"
            color={errors.productDesc ? "danger" : "success"}
            control={control}
            name="productDesc"
            minRows={4}
            placeholder="Mô tả sản phẩm"
            style={{
              border: "1px solid #C4C4C4",
              backgroundColor: "none",
              outline: "none",
            }}
          ></TextareaForm>
          <div className="Categories mb-5">
            <SelectForm
              control={control}
              name="productCategory"
              placeholder="Danh mục sản phẩm"
            ></SelectForm>
          </div>

          <Input
            className="w-full"
            label="Giá sản phẩm vnđ"
            type="number"
            color={errors.productPrice ? "error" : "success"}
            control={control}
            name="productPrice"
          ></Input>
          <Input
            className="w-full"
            label="% giảm giá"
            type="number"
            color={errors.productDiscount ? "error" : "success"}
            control={control}
            name="productDiscount"
            InputProps={{ inputProps: { min: "0", step: "1" } }}
          ></Input>
          <Input
            className="w-full"
            label="Số lượng"
            type="number"
            color={errors.productQuantity ? "error" : "success"}
            control={control}
            name="productQuantity"
          ></Input>

          <div>
            <h2 className="text-[16px] mb-2 font-medium text-gray-500">
              Size sản phẩm:
            </h2>
            <div className="flex items-center  gap-4 flex-wrap">
              {sizesProductData.map((item, index) => (
                <CheckBoxSize
                  key={index}
                  {...item}
                  color="success"
                  className="border px-1 rounded-lg"
                  checked={sizesProduct[item.size] === item.label}
                  onChange={(isChecked) =>
                    handleCheckSizeProduct(
                      item.size,
                      isChecked ? item.label : ""
                    )
                  }
                ></CheckBoxSize>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-[16px] mb-2 mt-4 font-medium text-gray-500">
              Màu sản phẩm:
            </h2>
            <div className="flex items-center gap-4 flex-wrap">
              {colorsProduct.map((item, index) => (
                <CheckBoxColor
                  key={index}
                  {...item}
                  checked={colorProduct[item.name] || ""}
                  onChange={(isChecked) =>
                    handleCheckBoxChange(
                      item.name,
                      isChecked ? item.style.color : ""
                    )
                  }
                ></CheckBoxColor>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-5 w-[60%]">
          <UploadImage
            title="Hình ảnh sản phẩm"
            setImageValue={setImgPrimaryProduct}
            click={handleEmptyImgUpload}
          ></UploadImage>
          <UploadMultipleImages
            setUrl={setProductContentImages}
            click={handleEmptyImgUpload}
          ></UploadMultipleImages>
        </div>
      </div>
      <div className="quill">
        <UploadQuill
          setEmptyValue={handleEmptyValueContent}
          setContentValueProduct={setValueDetailProduct}
        ></UploadQuill>
      </div>

      <div className="w-full flex justify-center">
        <ButtonGlobal
          type="submit"
          style={{ fontSize: "20px", height: "50px", width: "450px" }}
          color="success"
        >
          Thêm sản phẩm
        </ButtonGlobal>
      </div>
    </form>
  );
};

export default FormAddProduct;
