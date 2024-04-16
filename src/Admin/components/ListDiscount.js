/* eslint-disable jsx-a11y/alt-text */
import { Box, IconButton } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import React, { useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import { dateFormat } from "./formatDate";
import { getApi } from "../../Api/getApi";
import { toast } from "react-toastify";
import { formatMoney } from "../../components/functicons/formatMoney";
import { deleteApi } from "../../Api/deleteApi";
import { updateApi } from "../../Api/updateApi";
import { urlApi } from "../../Api/urlApi";

const ListDiscount = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 3,
  });
  const [dataDiscount, setDataDiscount] = useState();
  const accessToken = Cookies.get("accessToken");
  const [remove, setRemove] = useState(false);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getApi(accessToken, `${urlApi}/api/discount`);
      setDataDiscount(res.data.discounts);
      setRemove(false);
      setUpdate(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, remove, update]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "DiscountId",
        header: "ID",
        size: 100,
        enableEditing: false,
      },
      {
        accessorKey: "DiscountPercent",
        header: "Phầm trăm",
        size: 120,
        enableEditing: true,
        Cell: ({ row }) => (
          <div
            style={{
              fontSize: "14px",
              color: "gray",
              fontWeight: "bold",
            }}
          >
            {row.original.DiscountPercent + "%"}
          </div>
        ),
      },
      {
        accessorKey: "TotalOrderPriceLarger",
        header: "Tổng giá trị đơn hàng trên",
        size: 180,
        enableEditing: true,
        Cell: ({ row }) => (
          <div
            style={{
              fontSize: "14px",
              color: "gray",
              fontWeight: "bold",
            }}
          >
            {formatMoney(row.original.TotalOrderPriceLarger) + " đ"}
          </div>
        ),
      },

      {
        accessorKey: "DiscountCode",
        header: "Mã giảm giá",
        size: 120,
        enableEditing: true,

        Cell: ({ row }) => (
          <div
            style={{
              fontSize: "14px",
              color: "gray",
              fontWeight: "bold",
            }}
          >
            {row.original.DiscountCode}
          </div>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Ngày bắt đầu",
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
            {dateFormat(row.original.createdAt).substring(
              0,
              dateFormat(row.original.createdAt).indexOf(" ")
            )}
          </div>
        ),
      },
    ],
    []
  );

  const tableData = dataDiscount ? dataDiscount : [];

  return (
    <div>
      <MaterialReactTable
        columns={columns}
        data={tableData}
        layoutMode="grid"
        positionActionsColumn="last"
        initialState={{ density: "comfortable" }}
        displayColumnDefOptions={{
          "mrt-row-actions": {
            size: 170,
            grow: false,
            header: "Hành động",
          },
        }}
        enableEditing={true}
        editDisplayMode="modal"
        onEditingRowSave={({ table, values }) => {
          const discountId = values.DiscountId;
          const DiscountPercent = values.DiscountPercent;
          const TotalOrderPriceLarger = values.TotalOrderPriceLarger;
          const DiscountCode = values.DiscountCode;
          if (
            isNaN(DiscountPercent) ||
            DiscountPercent < 0 ||
            DiscountPercent > 100
          ) {
            toast.error("Phần trăm giảm giá không hợp lệ", {
              pauseOnHover: false,
            });
            return;
          }

          if (isNaN(TotalOrderPriceLarger) || TotalOrderPriceLarger < 0) {
            toast.error("Giá trị phải là số và lớn hơn 0", {
              pauseOnHover: false,
            });
            return;
          }
          updateApi(
            `${urlApi}/api/discount/${discountId}`,
            {
              DiscountPercent: Number(DiscountPercent),
              TotalOrderPriceLarger: Number(TotalOrderPriceLarger),
              DiscountCode: DiscountCode,
            },
            setUpdate
          );
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
                  `${urlApi}/api/discount/${row.original.DiscountId}`,
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

export default ListDiscount;
