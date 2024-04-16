import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Input from "../../components/input/Input";
import { validateContact } from "../../Validation/validateContact";
import ButtonGlobal from "../../components/button/ButtonGlobal";
import TextareaForm from "../../components/input/Textarea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelopesBulk,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

const FormContact = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validateContact),
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

  const handleContact = (value) => {
    if (!isValid) return;
    console.log(value);
  };
  return (
    <div className="laptop:flex justify-center gap-12">
      <div className="laptop:w-[40%]">
        <form action="" onSubmit={handleSubmit(handleContact)}>
          <Input
            className="w-full"
            label="Họ Tên *"
            type="text"
            color={errors.name ? "error" : "success"}
            control={control}
            name="name"
          ></Input>
          <Input
            className="w-full"
            label="Di động"
            type="text"
            color={errors.phone ? "error" : "success"}
            control={control}
            name="phone"
          ></Input>

          <Input
            className="w-full"
            label="Email"
            type="email"
            color={errors.email ? "error" : "success"}
            control={control}
            name="email"
          ></Input>
          <Input
            className="w-full"
            label="Tiêu đề"
            type="email"
            color={errors.title ? "error" : "success"}
            control={control}
            name="title"
          ></Input>

          <TextareaForm
            className="w-full"
            type="text"
            color={errors.content ? "danger" : "success"}
            control={control}
            name="content"
            minRows={4}
            placeholder="Nội dung..."
            style={{
              border: "1px solid #C4C4C4",
              backgroundColor: "none",
              outline: "none",
            }}
          ></TextareaForm>

          <ButtonGlobal
            type="submit"
            style={{
              fontSize: "20px",
              height: "50px",
              width: "100%",
              lineHeight: "50px",
              backgroundColor: "gray",
            }}
          >
            Gửi đi
          </ButtonGlobal>
        </form>
      </div>

      <div className="text-[18px] font-medium laptop:w-[40%] laptop:mt-0 mobile:mt-10 ">
        <div className=" flex items-center gap-5">
          <div className="w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center">
            <FontAwesomeIcon icon={faLocationDot} className="text-[30px]" />
          </div>
          <span>
            Số 12 Nguyễn Văn Bảo, Phường 4, Quận Gò Vấp, Thành phố Hồ Chí Minh
          </span>
        </div>
        <div className=" flex items-center gap-5 mt-4">
          <div className="w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center">
            <FontAwesomeIcon icon={faPhone} className="text-[30px]" />
          </div>
          <span className="w-[300px]">0933024811</span>
        </div>
        <div className=" flex items-center gap-5 mt-4">
          <div className="w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center">
            <FontAwesomeIcon icon={faEnvelopesBulk} className="text-[30px]" />
          </div>
          <span className="w-[300px]">trungduong0810@gmail.com</span>
        </div>
      </div>
    </div>
  );
};

export default FormContact;
