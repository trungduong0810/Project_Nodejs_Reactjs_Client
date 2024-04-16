import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useController } from "react-hook-form";
import Select from "react-select";
import { getApi } from "../../Api/getApi";
import { urlApi } from "../../Api/urlApi";
const SelectForm = ({ control, ...props }) => {
  const [options, setOptions] = useState();
  const [data, setData] = useState();
  const accessToken = Cookies.get("accessToken");
  const { field } = useController({
    control,
    name: props.name,
    defaultValue: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getApi(accessToken, `${urlApi}/api/category`);
        setData(response.data.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (data) {
      const newOptions = data.map((item) => ({
        value: item.CategoryName,
        label: item.CategoryName,
      }));
      setOptions(newOptions);
    }
  }, [data]);
  return (
    <div>
      <Select options={options} {...field} {...props} />
    </div>
  );
};

export default SelectForm;
