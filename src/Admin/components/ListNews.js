/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { MaterialReactTable } from "material-react-table";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { dateFormat } from "./formatDate";
import { Box, IconButton } from "@mui/material";
import { deleteApi } from "../../Api/deleteApi";
import { fetchAllNews } from "../../Api/apiNews";
import { useNavigate } from "react-router-dom";
import { urlApi } from "../../Api/urlApi";
const ListNews = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 7,
  });
  const navigate = useNavigate();
  const [dataNews, setDataNews] = useState();
  const [remove, setRemove] = useState(false);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    fetchAllNews(setDataNews);
    setRemove(false);
    setUpdate(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remove, update]);
  const columns = useMemo(
    () => [
      {
        accessorKey: "NewsId",
        header: "ID",
        size: 100,
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
            {row.original.NewsId}
          </div>
        ),
      },
      {
        accessorKey: "NewsTitle",
        header: "Tin tức",
        size: 200,
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
            {row.original.NewsTitle}
          </div>
        ),
      },

      {
        accessorKey: "NewsImage",
        header: "Hình ảnh",
        size: 150,
        enableEditing: false,
        Cell: ({ row }) => (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={row.original.NewsImage}
              className="w-[100px] h-[100px] rounded-md"
            />
          </Box>
        ),
      },

      {
        accessorKey: "createdAt",
        header: "Ngày đăng",
        size: 100,
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
            {dateFormat(row.original.createdAt).substring(
              0,
              dateFormat(row.original.createdAt).indexOf(" ")
            )}
          </div>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const tableData = dataNews ? dataNews : [];
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
          header: "Hành động",
        },
      }}
      enableEditing={true}
      editDisplayMode="modal"
      enableRowActions
      renderRowActions={({ row, table }) => (
        <Box sx={{ display: "flex", flexWrap: "nowrap" }}>
          <IconButton
            color="error"
            onClick={() => {
              deleteApi(`${urlApi}/api/news/${row.original.NewsId}`, setRemove);
            }}
          >
            <DeleteIcon />
          </IconButton>

          <IconButton
            color="success"
            onClick={() => {
              navigate(`/newsDetails/${row.original.NewsId}`);
            }}
          >
            <div>
              <FontAwesomeIcon icon={faEye} />
            </div>
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

export default ListNews;
