import React from "react";
import { useEffect, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { getApi } from "../../Api/getApi";
import Cookies from "js-cookie";
import { dateFormat } from "./formatDate";
import { Box, IconButton } from "@mui/material";
import { deleteApi } from "../../Api/deleteApi";
import { updateApi } from "../../Api/updateApi";
import { urlApi } from "../../Api/urlApi";

const ListCategory = ({ dataChange, addData }) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 7,
  });
  const [dataCategory, setDataCategory] = useState();
  const accessToken = Cookies.get("accessToken");
  const [remove, setRemove] = useState(false);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getApi(accessToken, `${urlApi}/api/category`);
      const formatData = res.data.data;
      formatData.forEach((item) => {
        item.createdAt = dateFormat(item.createdAt);
        item.updatedAt = dateFormat(item.updatedAt);
      });
      setDataCategory(res.data.data);
      setRemove(false);
      setUpdate(false);
      addData(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, remove, update, dataChange]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "CategoryId",
        header: "ID",
        size: 100,
        enableEditing: false,
      },
      {
        accessorKey: "CategoryName",
        header: "Danh mục",
        size: 150,
        muiEditTextFieldProps: {
          required: true,
          type: "string",
        },
      },

      {
        accessorKey: "createdAt",
        header: "Thời gian tạo",
        size: 150,
        enableEditing: false,
      },
      {
        accessorKey: "updatedAt",
        header: "Thời gian cập nhật",
        size: 150,
        enableEditing: false,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const tableData = dataCategory ? dataCategory : [];
  return (
    <MaterialReactTable
      columns={columns}
      data={tableData}
      layoutMode="grid"
      positionActionsColumn="last"
      displayColumnDefOptions={{
        "mrt-row-actions": {
          size: 200,
          grow: false,
        },
      }}
      enableEditing={true}
      editDisplayMode="modal"
      onEditingRowSave={({ table, values }) => {
        const CategoryId = values.CategoryId;
        const CategoryName = values.CategoryName;
        updateApi(
          `${urlApi}/api/category/${CategoryId}`,
          {
            categoryName: CategoryName,
          },
          setUpdate
        );
        table.setEditingRow(null);
      }}
      enableRowActions
      renderRowActions={({ row, table }) => (
        <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
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
                `${urlApi}/api/category/${row.original.CategoryId}`,
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
  );
};

export default ListCategory;
