/* eslint-disable jsx-a11y/alt-text */
import { Box, IconButton } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
// import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import React, { useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import { dateFormat } from "../../Admin/components/formatDate";
import { formatMoney } from "../../components/functicons/formatMoney";
import { getApi } from "../../Api/getApi";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import OrderDetails from "../../components/Modal/OrderDetails";
import Swal from "sweetalert2";
import axios from "axios";
import { reviewProduct } from "../../Redux/reviewProduct";
import { useNavigate } from "react-router-dom";
import { urlApi } from "../../Api/urlApi";
const ListOrderMy = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.userId.value);
  const [openModal, setOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 3,
  });
  const [dataOrders, setDataOrders] = useState();
  const accessToken = Cookies.get("accessToken");
  const [remove, setRemove] = useState(false);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getApi(
        accessToken,
        `${urlApi}/api/orders/${userId}`
      );
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
  }, [accessToken, remove, update, userId]);

  if (dataOrders) {
    dataOrders.forEach((item, index) => {
      item["STT"] = index + 1;
    });
  }



  const columns = useMemo(
    () => [
      {
        accessorKey: "STT",
        header: "STT",
        size: 100,
        enableEditing: false,
      },
      {
        accessorKey: "ProductName",
        header: "Tên sản phẩm",
        size: 200,
        enableEditing: false,
        Cell: ({ row }) => (
          <div
            style={{
              fontSize: "14px",
              color: "gray",
              fontWeight: "bold",
            }}
          >
            {row.original.ProductName}
          </div>
        ),
      },
      {
        accessorKey: "ProductImage",
        header: "Hình ảnh",
        size: 120,
        enableEditing: false,
        Cell: ({ row }) => (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={row.original.ProductImage}
              className="w-[100px] h-[100px] rounded-md"
            />
          </Box>
        ),
      },
      {
        accessorKey: "ProductSize",
        header: "Size",
        size: 100,
        enableEditing: false,
        Cell: ({ row }) => (
          <div
            style={{
              fontSize: "14px",
              color: "gray",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {row.original.ProductSize}
          </div>
        ),
      },
      {
        accessorKey: "ProductColor",
        header: "Màu",
        size: 100,
        enableEditing: false,
        Cell: ({ row }) => (
          <div
            style={{
              fontSize: "14px",
              color: "gray",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {row.original.ProductColor}
          </div>
        ),
      },

      {
        accessorKey: "OrderPrice",
        header: "Đơn giá",
        size: 150,
        enableEditing: false,
        Cell: ({ row }) => (
          <div
            style={{
              fontSize: "14px",
              color: "gray",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {formatMoney(row.original.OrderPrice) + " đ"}
          </div>
        ),
      },
      {
        accessorKey: "ProductQuantity",
        header: "Số lượng",
        size: 120,
        enableEditing: true,
        Cell: ({ row }) => (
          <div
            style={{
              fontSize: "14px",
              color: "gray",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {row.original.ProductQuantity}
          </div>
        ),
      },
      {
        accessorKey: "Payment",
        header: "Thanh toán",
        size: 150,
        enableEditing: false,
        Cell: ({ row }) => (
          <div
            style={{
              fontSize: "14px",
              color: "gray",
              fontWeight: "bold",
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

  const deleteApiOder = async (orderId) => {
    Swal.fire({
      html: `<h2 style="font-size:25px; font-weight: bold; color:#e1944c">Bạn muốn hủy đơn hàng?</h2>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy bỏ",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`${urlApi}/api/orders/${orderId}`);
        setRemove(true);
        Swal.fire({
          title: "Thành công",
          text: "Bạn đã hủy đơn hàng thành công",
          icon: "success",
        });
      } else {
        return;
      }
    });
  };

  const tableData = dataOrders ? dataOrders : [];
  return (
    <div>
      {dataOrders && dataOrders.length > 0 ? (
        <div>
          <MaterialReactTable
            columns={columns}
            data={tableData}
            initialState={{ density: "compact" }}
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
                {row.original.Status === 1 ? (
                  <IconButton
                    color="error"
                    onClick={() => {
                      deleteApiOder(row.original.OrderId);
                    }}
                  >
                    <button
                      className="text-[11px] bg-orange-600 p-[6px] rounded-md text-white uppercase
                  font-bold"
                    >
                      Hủy đơn
                    </button>
                  </IconButton>
                ) : (
                  ""
                )}

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

                {row.original.Status === 4 ? (
                  <IconButton
                    color="info"
                    onClick={() => {
                      const dataReviewsProduct = {
                        ProductName: row.original.ProductName,
                        ProductImage: row.original.ProductImage,
                        ProductSize: row.original.ProductSize,
                        ProductColor: row.original.ProductColor,
                      };
                      dispatch(reviewProduct(dataReviewsProduct));
                      navigate(`/reviews/product/${row.original.OrderId}`);
                    }}
                  >
                    <button
                      className="text-[11px] bg-blue-600 p-[6px] rounded-md text-white uppercase
                  font-bold"
                    >
                      Đánh giá
                    </button>
                  </IconButton>
                ) : (
                  ""
                )}
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
    </div>
  );
};

export default ListOrderMy;
