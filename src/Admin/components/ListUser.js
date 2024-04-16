import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { getApi } from "../../Api/getApi";
import Cookies from "js-cookie";
import { dateFormat } from "./formatDate";
import { urlApi } from "../../Api/urlApi";

const ListUser = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [dataUsers, setDataUsers] = useState();
  const accessToken = Cookies.get("accessToken");
  useEffect(() => {
    const fetchData = async () => {
      const res = await getApi(accessToken, `${urlApi}/api/users`);
      const formatData = res.data.data;
      formatData.forEach((item) => {
        item.createdAt = dateFormat(item.createdAt);
      });
      setDataUsers(res.data.data);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (dataUsers) {
    dataUsers.forEach((item) => {
      item["role"] = item.isAdmin;
    });
  }

  console.table(dataUsers);

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 50,

        Cell: ({ row }) => <div className="text-center">{row.original.id}</div>,
      },
      {
        accessorKey: "username", //access nested data with dot notation
        header: "Tên",
        size: 150,
        Cell: ({ row }) => (
          <div className="text-center">{row.original.username}</div>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 150,
        Cell: ({ row }) => (
          <div className="text-center">{row.original.email}</div>
        ),
      },
      {
        accessorKey: "role",
        header: "Vai trò",
        size: 150,

        Cell: ({ row }) => (
          <div className="text-center">
            {row.original.role === true ? (
              <span className="bg-green-600 p-2 rounded-md text-white">
                Quản trị viên
              </span>
            ) : (
              <span className="bg-orange-600 p-2 rounded-md text-white">
                Khách hàng
              </span>
            )}
          </div>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Ngày tạo",
        size: 150,
        Cell: ({ row }) => (
          <div className="text-center">{row.original.createdAt}</div>
        ),
      },
    ],
    []
  );
  const tableData = dataUsers ? dataUsers : "Khong có dữ liẹu";
  const table = useMaterialReactTable({
    columns,
    data: tableData,
    paginationDisplayMode: "pages",
    muiPaginationProps: {
      showRowsPerPage: false,
      shape: "rounded",
    },
    onPaginationChange: setPagination, //hoist pagination state to your state when it changes internally
    state: { pagination },
  });

  return <MaterialReactTable table={table} />;
};

export default ListUser;
