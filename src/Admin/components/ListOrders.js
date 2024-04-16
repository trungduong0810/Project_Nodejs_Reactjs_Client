/* eslint-disable jsx-a11y/alt-text */
import { Box, IconButton } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import React, { useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import { dateFormat } from "../../Admin/components/formatDate";
import { formatMoney } from "../../components/functicons/formatMoney";
import { getApi } from "../../Api/getApi";
import OrderDetails from "../../components/Modal/OrderDetails";
import ModalUpdateOrder from "../../components/Modal/ModalUpdateOrder";
import { urlApi } from "../../Api/urlApi";

const ListOrders = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const [orderId, setOrderId] = useState();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [dataOrders, setDataOrders] = useState();
  const accessToken = Cookies.get("accessToken");
  const [remove, setRemove] = useState(false);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getApi(accessToken, `${urlApi}/api/orders`);
      const formatData = res.data.data;
      formatData.forEach((item) => {
        item.createdAt = dateFormat(item.createdAt);
        item.updatedAt = dateFormat(item.updatedAt);
        // item.ProductPrice = formatMoney(item.ProductPrice);
      });
      setDataOrders(res.data.data);
      setRemove(false);
      setUpdate(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, remove, update]);

  if (dataOrders) {
    dataOrders.forEach((item, index) => {
      item["STT"] = index + 1;
    });
  }

  console.log(dataOrders);
  const columns = useMemo(
    () => [
      {
        accessorKey: "OrderId",
        header: "Mã đơn",
        size: 130,
        enableEditing: false,
        Cell: ({ row }) => (
          <div
            style={{
              fontSize: "14px",
              color: "gray",
              fontWeight: "500",
            }}
          >
            {row.original.OrderId}
          </div>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Ngày đặt",
        size: 170,
        enableEditing: false,
        Cell: ({ row }) => (
          <div
            style={{
              fontSize: "14px",
              color: "gray",
              fontWeight: "500",
            }}
          >
            {row.original.createdAt}
          </div>
        ),
      },

      {
        accessorKey: "Name",
        header: "Khách hàng",
        size: 180,
        enableEditing: false,
        Cell: ({ row }) => (
          <div
            style={{
              fontSize: "14px",
              color: "gray",
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            {row.original.Name}
          </div>
        ),
      },
      {
        accessorKey: "OrderPrice",
        header: "Tổng tiền",
        size: 150,
        enableEditing: false,
        Cell: ({ row }) => (
          <div
            style={{
              fontSize: "14px",
              color: "gray",
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            {formatMoney(row.original.OrderPrice) + " đ"}
          </div>
        ),
      },
      {
        accessorKey: "Status",
        header: "Trạng thái",
        size: 200,
        enableEditing: true,
        Cell: ({ row }) => (
          <div
            style={{
              fontSize: "14px",
              color: "gray",
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            {/* {row.original.Status} */}
            {row.original.Status === 1 ? (
              <span className="bg-orange-400 py-2 px-3 rounded-md text-white">
                Chờ xác nhận
              </span>
            ) : row.original.Status === 2 ? (
              <span className="bg-red-500 py-2 px-3 rounded-md text-white">
                Chuẩn bị đơn hàng
              </span>
            ) : row.original.Status === 3 ? (
              <span className="bg-blue-600 py-2 px-3 rounded-md text-white">
                Đang giao hàng
              </span>
            ) : row.original.Status === 4 ? (
              <span className="bg-green-600 py-2 px-3 rounded-md text-white">
                Giao hàng thành công
              </span>
            ) : (
              ""
            )}
          </div>
        ),
      },
      {
        accessorKey: "Payment",
        header: "Thanh toán",
        size: 180,
        enableEditing: false,
        Cell: ({ row }) => (
          <div
            style={{
              fontSize: "14px",
              color: "gray",
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            {row.original.Payment}
          </div>
        ),
      },
    ],
    []
  );
  const tableData = dataOrders ? dataOrders : [];
  return (
    <div>
      {dataOrders && dataOrders.length > 0 ? (
        <div>
          <MaterialReactTable
            columns={columns}
            data={tableData}
            initialState={{ density: "comfortable" }}
            layoutMode="grid"
            positionActionsColumn="last"
            displayColumnDefOptions={{
              "mrt-row-actions": {
                size: 150,
                grow: true,
                header: "Hành động",
              },
            }}
            enableEditing={true}
            editDisplayMode="modal"
            enableRowActions
            renderRowActions={({ row, table }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconButton
                  color="error"
                  onClick={() => {
                    setOpenModalUpdate(true);
                    setOrderId(row.original.OrderId);
                  }}
                >
                  <button
                    className="text-[11px] bg-blue-700 p-[6px] rounded-md text-white uppercase
                  font-bold"
                  >
                    Cập nhật
                  </button>
                </IconButton>

                <IconButton
                  color="success"
                  onClick={() => {
                    setOpenModal(true);
                    const dataOrderDetails = {
                      orderId: row.original.OrderId,
                      Name: row.original.Name,
                      Email: row.original.Email,
                      ProductName: row.original.ProductName,
                      ProductImage: row.original.ProductImage,
                      ProductSize: row.original.ProductSize,
                      ProductColor: row.original.ProductColor,
                      ProductQuantity: row.original.ProductQuantity,
                      OrderPrice: formatMoney(row.original.OrderPrice),
                      Phone: row.original.Phone,
                      Payment: row.original.Payment,
                      createdAt: row.original.createdAt,
                      Address: row.original.Address,
                      Status: row.original.Status,
                    };
                    setDataModal(dataOrderDetails);
                  }}
                >
                  <button
                    className="text-[11px] bg-green-600 p-[6px] rounded-md text-white uppercase
                  font-bold"
                  >
                    Chi tiết
                  </button>
                </IconButton>
              </Box>
            )}
            paginationDisplayMode="pages"
            muiPaginationProps={{
              showRowsPerPage: false,
              shape: "rounded",
            }}
            onPaginationChange={setPagination}
            state={{ pagination }}
          />
        </div>
      ) : (
        <div className="flex items-center justify-center mt-12">
          <img src="https://salanest.com/img/empty-cart.webp" alt="" />
        </div>
      )}
      <OrderDetails
        openModal={openModal}
        setOpenModal={setOpenModal}
        data={dataModal}
      ></OrderDetails>
      <ModalUpdateOrder
        orderId={orderId}
        openModal={openModalUpdate}
        setOpenModal={setOpenModalUpdate}
        setUpdate={setUpdate}
      ></ModalUpdateOrder>
    </div>
  );
};

export default ListOrders;
