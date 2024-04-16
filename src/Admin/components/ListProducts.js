/* eslint-disable jsx-a11y/alt-text */
import { Box, IconButton } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import React, { useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import { dateFormat } from "./formatDate";
import { getApi } from "../../Api/getApi";
import { formatMoney } from "../../components/functicons/formatMoney";
import { deleteApi } from "../../Api/deleteApi";
import { urlApi } from "../../Api/urlApi";

const ListProducts = () => {
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
      const res = await getApi(accessToken, `${urlApi}/api/products`);
      const formatData = res.data.data;
      formatData.forEach((item) => {
        item.createdAt = dateFormat(item.createdAt);
        item.updatedAt = dateFormat(item.updatedAt);
        item.ProductPrice = formatMoney(item.ProductPrice) + " đ";
        item.ProductPriceNew = formatMoney(item.ProductPriceNew + " đ");
        item.ProductDiscount = item.ProductDiscount + " %";
      });
      setDataProducts(res.data.data);
      setRemove(false);
      setUpdate(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, remove, update]);
  const columns = useMemo(
    () => [
      {
        accessorKey: "ProductId",
        header: "ID",
        size: 50,
        enableEditing: false,
      },
      {
        accessorKey: "ProductName",
        header: "Tên sản phẩm",
        size: 120,
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
        size: 100,
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
        accessorKey: "ProductCategory",
        header: "Danh mục",
        size: 100,
        enableEditing: false,
        Cell: ({ row }) => (
          <div
            style={{
              fontSize: "14px",
              color: "gray",
              fontWeight: "bold",
            }}
          >
            {row.original.ProductCategory}
          </div>
        ),
      },
      {
        accessorKey: "ProductPrice",
        header: "Giá sản phẩm",
        size: 120,
        enableEditing: false,
        Cell: ({ row }) => (
          <div
            style={{
              fontSize: "14px",
              color: "gray",
              textAlign: "center",
              fontWeight: "bold",
              width: "70%",
            }}
          >
            {row.original.ProductPrice}
          </div>
        ),
      },
      {
        accessorKey: "ProductDiscount",
        header: "Giảm giá",
        size: 110,
        enableEditing: false,
        Cell: ({ row }) => (
          <div
            style={{
              fontSize: "14px",
              color: "gray",
              textAlign: "center",
              fontWeight: "bold",
              width: "50%",
            }}
          >
            {row.original.ProductDiscount}
          </div>
        ),
      },
      {
        accessorKey: "ProductPriceNew",
        header: "Giảm mới",
        size: 100,
        enableEditing: false,
        Cell: ({ row }) => (
          <div
            style={{
              fontSize: "14px",
              color: "gray",
              textAlign: "center",
              fontWeight: "bold",
              width: "70%",
            }}
          >
            {row.original.ProductPriceNew}
          </div>
        ),
      },
      {
        accessorKey: "ProductQuantity",
        header: "Số lượng",
        size: 100,
        enableEditing: false,
        Cell: ({ row }) => (
          <div
            style={{
              fontSize: "14px",
              color: "gray",
              textAlign: "center",
              fontWeight: "bold",
              width: "50%",
            }}
          >
            {row.original.ProductQuantity}
          </div>
        ),
      },
    ],
    []
  );

  const tableData = dataProducts ? dataProducts : [];

  return (
    <div>
      <MaterialReactTable
        columns={columns}
        data={tableData}
        layoutMode="grid"
        positionActionsColumn="last"
        initialState={{ density: "compact" }}
        displayColumnDefOptions={{
          "mrt-row-actions": {
            size: 100,
            grow: false,
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
          <Box sx={{ display: "flex", flexWrap: "nowrap" }}>
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
                deleteApi(
                  `${urlApi}/api/products/${row.original.ProductId}`,
                  setRemove
                );
              }}
            >
              <DeleteIcon />
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
  );
};

export default ListProducts;
