import React, { useEffect, useState } from "react";
import { getApi } from "../../Api/getApi";
import Cookies from "js-cookie";
import { urlApi } from "../../Api/urlApi";
const CountOrder = ({ title }) => {
  const [dataOrders, setDataOrders] = useState();

  const accessToken = Cookies.get("accessToken");

  useEffect(() => {
    const fetchData = async () => {
      const res = await getApi(accessToken, `${urlApi}/api/orders`);
      setDataOrders(res.data.data);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  return (
    <div>
      <div className="w-[250px] h-[200px] rounded-lg bg-blue-600 relative p-2 shadow-lg">
        <h2 className="p-2 text-xl font-medium text-white text-center border-b-2">
          {title}
        </h2>
        <div className="text-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-[3rem] font-bold text-white">
          {dataOrders?.length}
        </div>
      </div>
    </div>
  );
};

export default CountOrder;
