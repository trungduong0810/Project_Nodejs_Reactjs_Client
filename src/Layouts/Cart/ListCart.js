/* eslint-disable jsx-a11y/alt-text */
import { Box, IconButton } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import React, { useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import { dateFormat } from "../../Admin/components/formatDate";
import {
  formatMoney,
  formatMoneyCart,
} from "../../components/functicons/formatMoney";
import { getApi } from "../../Api/getApi";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { cartBuyNow } from "../../Redux/cartBuyNow";
import { useNavigate } from "react-router-dom";
import { urlApi } from "../../Api/urlApi";
const ListCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.userId.value);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 3,
  });
  const [dataProducts, setDataProducts] = useState();
  const accessToken = Cookies.get("accessToken");
  const [remove, setRemove] = useState(false);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getApi(
        accessToken,
        `${urlApi}/api/carts/${userId}`
      );
      const formatData = res.data.data;
      formatData.forEach((item) => {
        item.createdAt = dateFormat(item.createdAt);
        item.updatedAt = dateFormat(item.updatedAt);
        item.ProductPrice = formatMoney(item.ProductPrice);
      });
      setDataProducts(res.data.data);
      setRemove(false);
      setUpdate(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, remove, update, userId]);

  if (dataProducts) {
    dataProducts.forEach((item, index) => {
      item["STT"] = index + 1;
      item["totalPrice"] = formatMoneyCart(item.ProductPrice) * item.Quantity;
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
        size: 250,
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
        accessorKey: "Size",
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
            {row.original.Size}
          </div>
        ),
      },
      {
        accessorKey: "Color",
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
            {row.original.Color}
          </div>
        ),
      },

      {
        accessorKey: "ProductPrice",
        header: "Giá sản phẩm",
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
            {formatMoney(row.original.ProductPrice) + " đ"}
          </div>
        ),
      },
      {
        accessorKey: "Quantity",
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
            {row.original.Quantity}
          </div>
        ),
      },
      {
        accessorKey: "totalPrice",
        header: "Thành tiền",
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
            {formatMoney(row.original.totalPrice) + " đ"}
          </div>
        ),
      },
    ],
    []
  );

  const deleteApiCart = async (userId, productId, cartId) => {
    Swal.fire({
      html: `<h2 style="font-size:25px; font-weight: bold; color:#e1944c">Xóa sản phẩm trong giỏ hàng?</h2>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy bỏ",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`${urlApi}/api/carts/${userId}`, {
          data: {
            productId: productId,
            cartId: cartId,
          },
        });
        setRemove(true);
        Swal.fire({
          title: "Thành công",
          text: "Bạn đã sản phẩm thành công",
          icon: "success",
        });
      } else {
        return;
      }
    });
  };

  const tableData = dataProducts ? dataProducts : [];
  return (
    <div>
      {dataProducts && dataProducts.length > 0 ? (
        <div>
          <MaterialReactTable
            columns={columns}
            data={tableData}
            initialState={{ density: "compact" }}
            layoutMode="grid"
            positionActionsColumn="last"
            displayColumnDefOptions={{
              "mrt-row-actions": {
                size: 200,
                grow: true,
                header: "Hành động",
              },
            }}
            enableEditing={true}
            editDisplayMode="modal"
            onEditingRowSave={({ table, values }) => {
              //   const CategoryId = values.CategoryId;
              //   const CategoryName = values.CategoryName;
              //   updateApi(
              //     `http://localhost:5000/api/category/${CategoryId}`,
              //     {
              //       categoryName: CategoryName,
              //     },
              //     setUpdate
              //   );
              table.setEditingRow(null);
            }}
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
                  color="success"
                  onClick={() => {
                    table.setEditingRow(row);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => {
                    deleteApiCart(
                      userId,
                      row.original.ProductId,
                      row.original.CartId
                    );
                  }}
                >
                  <DeleteIcon />
                </IconButton>

                <IconButton
                  color="error"
                  onClick={() => {
                    const dataByNow = {
                      ProductId: row.original.ProductId,
                      CartId: row.original.CartId,
                      ProductName: row.original.ProductName,
                      ProductImage: row.original.ProductImage,
                      ProductSize: row.original.Size,
                      ProductColor: row.original.Color,
                      ProductQuantity: row.original.Quantity,
                      ProductTotalPrice: row.original.totalPrice,
                    };
                    dispatch(cartBuyNow(dataByNow));
                    navigate("/payment");
                  }}
                >
                  <button
                    className="text-[11px] bg-orange-600 p-[6px] rounded-md text-white uppercase
                  font-bold"
                  >
                    Mua ngay
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
    </div>
  );
};

export default ListCart;
