import React, { useMemo } from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Tooltip from "@/components/ui/Tooltip";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";

import { Link, useParams } from "react-router-dom";
import GlobalFilter from "../react-tables/GlobalFilter";
import moment from "moment";
import { useGetSingleGroupQuery } from "../../../store/features/farmers/api";

const COLUMNS = [
  {
    Header: "Farmer Id",
    accessor: "full_name",
    Cell: (row) => {
      return (
        <div className="flex flex-col">
          <span className="inline-flex items-center">
            {/* <span className="w-10 h-10 rounded-full ltr:mr-3 rtl:ml-3 flex-none">
              <img
                src={`${import.meta.env.VITE_IMG_URL}${
                  row.cell.row?.original?.image
                }`}
                alt=""
                className="object-cover w-10 h-10 rounded-full"
              />
            </span> */}
            <div>
              <p className="text-sm   text-slate-600 dark:text-slate-300 capitalize">
                {row.cell.row?.original?.full_name}
              </p>
              <Link
                to={`/farmer-details/${row?.cell?.row?.original?.farmer_id}`}
              >
                <div className="flex items-center gap-1">
                  <p className="text-[10px] underline text-green-600  ">
                    {row?.cell?.row?.original?.farmer_id}
                  </p>
                  {/* {n} */}
                  <p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-3 h-3"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </p>
                </div>
              </Link>
              <Link
                to={`/farmer-details/${row?.cell?.row?.original?.onboard_by}`}
              >
                <div className="flex items-center gap-1">
                  <p className="text-[10px] underline text-green-600  ">
                    {row?.cell?.row?.original?.onboard_by}
                  </p>
                  <p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-3 h-3"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </p>
                </div>
              </Link>
            </div>
          </span>
        </div>
      );
    },
  },
  {
    Header: "date of birth",
    accessor: "date_of_birth",
    Cell: (row) => {
      return <span className=" ">{row?.cell?.value}</span>;
    },
  },
  {
    Header: "Gender",
    accessor: "gender",
    Cell: (row) => {
      return <span className=" ">{row?.cell?.value}</span>;
    },
  },
  {
    Header: "phone",
    accessor: "phone",
    Cell: (row) => {
      return (
        <span className="text-blue-500   underline">{row?.cell?.value}</span>
      );
    },
  },
  {
    Header: "Address",
    accessor: "district",
    Cell: (row) => {
      return (
        <div>
          <p className="text-xs">
            <span className=" ">District :</span> {row?.cell?.value}
          </p>
          <p className="text-xs">
            <span className=" ">village :</span>{" "}
            {row?.cell?.row?.original?.village}
          </p>
          <p className="text-xs">
            <span className=" ">Address :</span>{" "}
            {row?.cell?.row?.original?.address}
          </p>
        </div>
      );
    },
  },
  {
    Header: "created at",
    accessor: "created_at",
    Cell: (row) => {
      return (
        <span className=" ">{moment(row?.cell?.value).format("LLL")}</span>
      );
    },
  },
];

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input
          type="checkbox"
          ref={resolvedRef}
          {...rest}
          className="table-checkbox"
        />
      </>
    );
  }
);

const GroupDetails = ({ title = "Group Details" }) => {
  const { id } = useParams();
  const todayDate = new Date();
  const { data: groupDetails, isLoading } = useGetSingleGroupQuery(id);
  const { farmer_list } = groupDetails || {};
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => (farmer_list ? farmer_list : []), [farmer_list]);

  // const farmer_data = data.map((farmer) => {
  //   return {
  //     farmer_id: farmer?.farmer_id,
  //     image: `https://core.deshifarmer.co/storage${farmer?.image}`,
  //     first_name: farmer?.first_name,
  //     last_name: farmer?.last_name,
  //     sex: farmer?.gender,
  //     phone: farmer?.phone,
  //     farm_area: farmer?.farm_area,
  //     district: farmer?.district,
  //     group_leader: orders?.group_leader?.full_name,
  //   };
  // });

  const farmer_data = data.map((farmer) => {
    return {
      id: farmer?.usaid_id,
      // image: `https://core.deshifarmer.co/storage${farmer?.image}`,
      first_name: farmer?.first_name,
      middle_name: farmer?.middle_name,
      last_name: farmer?.last_name,
      sex: farmer?.gender,
      age:
        todayDate?.getFullYear() -
        new Date(farmer?.date_of_birth).getFullYear(),
      contact_number: farmer?.phone,
      village: farmer?.village,
      date: "",
      // date: moment(farmer?.created_at).format("DD-MM-YYYY"),
      // farm_area: farmer?.farm_area,
      // district: farmer?.district,
      // group_leader: orders?.group_leader?.full_name,
      // group_leader: {
      //   first_name: farmer?.group_leader?.first_name,
      // },
    };
  });

  const leader_data = [
    {
      id: groupDetails?.group_leader?.usaid_id,
      // image: `https://core.deshifarmer.co/storage${allData?.group_leader?.image}`,
      first_name: groupDetails?.group_leader?.first_name,
      middle_name: groupDetails?.group_leader?.middle_name,
      last_name: groupDetails?.group_leader?.last_name,
      sex: groupDetails?.group_leader?.gender,
      age:
        todayDate?.getFullYear() -
        new Date(groupDetails?.group_leader?.date_of_birth).getFullYear(),
      contact_number: groupDetails?.group_leader?.phone,
      village: groupDetails?.group_leader?.village,
      date: "",
      // date: moment(allData?.group_leader?.created_at).format("DD-MM-YYYY"),
      role: "Group Leader",
    },
  ];

  const newFarmerData = [...leader_data, ...farmer_data];

  const handleExport = async () => {
    const XLSX = await import("xlsx"); // Use dynamic import for XLSX
    const worksheet = XLSX.utils.json_to_sheet(newFarmerData);
    // const worksheet1 = XLSX.utils.json_to_sheet(leader_data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    // XLSX.utils.book_append_sheet(workbook, worksheet1, "Sheet2");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const fileData = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(fileData, `${groupDetails?.farmer_group_name}.xlsx`);
  };

  const tableInstance = useTable(
    {
      columns,
      data,
    },

    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect

    // comment out this to show checkbox
    // (hooks) => {
    //   hooks.visibleColumns.push((columns) => [
    //     {
    //       id: "selection",
    //       Header: ({ getToggleAllRowsSelectedProps }) => (
    //         <div>
    //           <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
    //         </div>
    //       ),
    //       Cell: ({ row }) => (
    //         <div>
    //           <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
    //         </div>
    //       ),
    //     },
    //     ...columns,
    //   ]);
    // }
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    setGlobalFilter,
    prepareRow,
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <>
      {isLoading ? (
        "Loading"
      ) : (
        <Card>
          <div className="md:flex justify-between items-center mb-6">
            <h4 className="card-title">{title}</h4>
            <div className="flex gap-4">
              <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
              <button
                className="text-xs border text-white px-4 border-slate-600 rounded bg-green-800"
                onClick={handleExport}
              >
                Export to Excel
              </button>
            </div>
          </div>
          <div className="overflow-x-auto -mx-6">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden ">
                <table
                  className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                  {...getTableProps}
                >
                  <thead className="bg-slate-200 dark:bg-slate-700">
                    {headerGroups.map((headerGroup) => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                          <th
                            {...column.getHeaderProps(
                              column.getSortByToggleProps()
                            )}
                            scope="col"
                            className=" table-th "
                          >
                            {column.render("Header")}
                            <span>
                              {column.isSorted
                                ? column.isSortedDesc
                                  ? " 🔽"
                                  : " 🔼"
                                : ""}
                            </span>
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody
                    className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"
                    {...getTableBodyProps}
                  >
                    {page.map((row) => {
                      prepareRow(row);
                      return (
                        <tr {...row.getRowProps()}>
                          {row.cells.map((cell) => {
                            return (
                              <td {...cell.getCellProps()} className="table-td">
                                {cell.render("Cell")}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
            <div className=" flex items-center space-x-3 rtl:space-x-reverse">
              <select
                className="form-control py-2 w-max"
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
              >
                {[10, 25, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Page{" "}
                <span>
                  {pageIndex + 1} of {pageOptions.length}
                </span>
              </span>
            </div>
            <ul className="flex items-center  space-x-3  rtl:space-x-reverse">
              <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
                <button
                  className={` ${
                    !canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => gotoPage(0)}
                  disabled={!canPreviousPage}
                >
                  <Icon icon="heroicons:chevron-double-left-solid" />
                </button>
              </li>
              <li className="text-sm leading-4 text-slate-900 dark:text-white rtl:rotate-180">
                <button
                  className={` ${
                    !canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                >
                  Prev
                </button>
              </li>
              {pageOptions.map((page, pageIdx) => (
                <li key={pageIdx}>
                  <button
                    href="#"
                    aria-current="page"
                    className={` ${
                      pageIdx === pageIndex
                        ? "bg-slate-900 dark:bg-slate-600  dark:text-slate-200 text-white font-medium "
                        : "bg-slate-100 dark:bg-slate-700 dark:text-slate-400 text-slate-900  font-normal  "
                    }    text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
                    onClick={() => gotoPage(pageIdx)}
                  >
                    {page + 1}
                  </button>
                </li>
              ))}
              <li className="text-sm leading-4 text-slate-900 dark:text-white rtl:rotate-180">
                <button
                  className={` ${
                    !canNextPage ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => nextPage()}
                  disabled={!canNextPage}
                >
                  Next
                </button>
              </li>
              <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
                <button
                  onClick={() => gotoPage(pageCount - 1)}
                  disabled={!canNextPage}
                  className={` ${
                    !canNextPage ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <Icon icon="heroicons:chevron-double-right-solid" />
                </button>
              </li>
            </ul>
          </div>
          {/*end*/}
        </Card>
      )}
    </>
  );
};

export default GroupDetails;
