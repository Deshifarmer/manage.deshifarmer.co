import React, { useState, useMemo, useEffect } from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Tooltip from "@/components/ui/Tooltip";
import moment from "moment";
import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import GlobalFilter from "./GlobalFilter";
import { Link } from "react-router-dom";
import { useGetAllFarmersQuery } from "../../../store/features/farmers/api";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const COLUMNS = [
  {
    Header: "Farmer Id",
    accessor: "farmer_id",
    Cell: (row) => {
      return (
        <div className="flex flex-col">
          <span className="inline-flex items-center">
            <span className="w-10 h-10 rounded-full ltr:mr-3 rtl:ml-3 flex-none bg-slate-600">
              <img
                src={`${import.meta.env.VITE_IMG_URL}${
                  row.cell.row?.original?.image
                }`}
                alt=""
                className="object-cover w-10 h-10 rounded-full"
              />
            </span>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-300 capitalize">
                {row.cell.row?.original?.full_name}
              </p>
              <span className="text-[10px] text-green-600 font-bold">
                {row?.cell?.row?.original?.farmer_id}
              </span>
            </div>
          </span>
        </div>
      );
    },
  },

  {
    Header: "Location",
    accessor: "address",
    Cell: (row) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "Phone No",
    accessor: "phone",
    Cell: (row) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  // {
  //   Header: "Total Transaction",
  //   accessor: "total_transaction",
  //   Cell: (row) => {
  //     return <span>{row?.cell?.value}</span>;
  //   },
  // },
  // {
  //   Header: "Ent Name",
  //   accessor: "ent_name",
  //   Cell: (row) => {
  //     return <span>{row?.cell?.value}</span>;
  //   },
  // },
  // {
  //   Header: "customer",
  //   accessor: "customer",
  //   Cell: (row) => {
  //     return (
  //       <div>
  //         <span className="inline-flex items-center">
  //           <span className="w-7 h-7 rounded-full ltr:mr-3 rtl:ml-3 flex-none bg-slate-600">
  //             <img
  //               // src={row?.cell?.value.image}
  //               alt=""
  //               className="object-cover w-full h-full rounded-full"
  //             />
  //           </span>
  //           <span className="text-sm text-slate-600 dark:text-slate-300 capitalize">
  //             {row?.cell?.value.name}
  //           </span>
  //         </span>
  //       </div>
  //     );
  //   },
  // },
  // {
  //   Header: "date",
  //   accessor: "date",
  //   Cell: (row) => {
  //     return <span>{row?.cell?.value}</span>;
  //   },
  // },
  // {
  //   Header: "quantity",
  //   accessor: "quantity",
  //   Cell: (row) => {
  //     return <span>{row?.cell?.value}</span>;
  //   },
  // },
  // {
  //   Header: "amount",
  //   accessor: "amount",
  //   Cell: (row) => {
  //     return <span>{row?.cell?.value}</span>;
  //   },
  // },
  // {
  //   Header: "status",
  //   accessor: "status",
  //   Cell: (row) => {
  //     return (
  //       <span className="block w-full">
  //         <span
  //           className={` inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 ${
  //             row?.cell?.value === "paid"
  //               ? "text-success-500 bg-success-500"
  //               : ""
  //           }
  //           ${
  //             row?.cell?.value === "due"
  //               ? "text-warning-500 bg-warning-500"
  //               : ""
  //           }
  //           ${
  //             row?.cell?.value === "cancled"
  //               ? "text-danger-500 bg-danger-500"
  //               : ""
  //           }

  //            `}
  //         >
  //           {row?.cell?.value}
  //         </span>
  //       </span>
  //     );
  //   },
  // },
  {
    Header: "Joining Date",
    accessor: "onboard_date",
    Cell: (row) => {
      return <span>{moment(row?.cell?.value).format("llll")}</span>;
    },
  },
  {
    Header: "action",
    accessor: "action",
    Cell: (row) => {
      return (
        <div className="flex space-x-3 rtl:space-x-reverse">
          <Tooltip content="View" placement="top" arrow animation="shift-away">
            <Link to={`/farmer-details/${row.cell.row.original.farmer_id}`}>
              <button className="action-btn" type="button">
                <Icon icon="heroicons:eye" />
              </button>
            </Link>
          </Tooltip>
          {/* <Tooltip content="Edit" placement="top" arrow animation="shift-away">
            <button className="action-btn" type="button">
              <Icon icon="heroicons:pencil-square" />
            </button>
          </Tooltip>
          <Tooltip
            content="Delete"
            placement="top"
            arrow
            animation="shift-away"
            theme="danger"
          >
            <button className="action-btn" type="button">
              <Icon icon="heroicons:trash" />
            </button>
          </Tooltip> */}
        </div>
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

const AllFarmers = ({ title = "All Farmers" }) => {
  const itemsPerPage = 600;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const {
    data: farmers,
    isLoading,
    isError,
  } = useGetAllFarmersQuery({ itemsPerPage, currentPage, searchValue });
  isError && console.log("Error in fetching all farmers");
  const total_data = farmers?.meta?.total;

  const defaultPageSize = 200;
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(
    () => (farmers?.data ? farmers?.data : []),
    [farmers?.data]
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // when ever the current page value change i wnna scroll to top
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  const totalPages = Math.ceil(total_data / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // const currentData = data?.slice(startIndex, endIndex);

  const handleExport = async () => {
    const XLSX = await import("xlsx"); // Use dynamic import for XLSX
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const fileData = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(fileData, "exported_data.xlsx");
  };

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: defaultPageSize },
    },

    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,

    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
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
        "loading..."
      ) : (
        <Card>
          <div className="md:flex justify-between items-center mb-6">
            <h4 className="card-title">{title}</h4>
            <div className="flex gap-4">
              {/* <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} /> */}
              <input
                className="border border-slate-600  rounded px-4 py-1 bg-gray-700"
                placeholder="Search..."
                type="text"
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button
                className="text-xs border px-4 border-slate-600 rounded bg-green-800"
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
          {/* <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
            <div className=" flex items-center space-x-3 rtl:space-x-reverse">
              <select
                className="form-control py-2 w-max"
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
              >
                {[300, 550, 850].map((pageSize) => (
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
          </div> */}
          <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
            <div className=" flex items-center space-x-3 rtl:space-x-reverse">
              {/* <select
                className="form-control py-2 w-max"
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
              >
                {[150, 250, 550].map((pageSize) => (
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
              </span> */}
            </div>
            <ul className="flex items-center  space-x-3  rtl:space-x-reverse">
              {/* <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
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
              </li> */}
              <div>
                {/* Render your data items */}
                {/* {currentData.map((item, index) => (
                  <div key={index}>{item}</div>
                ))} */}

                {/* Pagination controls */}
                <div className="flex justify-center flex-wrap gap-6 mt-4">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(index + 1)}
                      className={`mx-1 px-3 py-1 rounded ${
                        currentPage === index + 1
                          ? "bg-blue-500 text-white"
                          : "bg-gray-300 text-black-500"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            </ul>
          </div>
          {/* <div className="flex justify-center space-x-4 mt-10 text-white">
            <div className="space-x-6 flex justify-center">
              {[...Array(pages).keys()].map((number) => (
                <button
                  onClick={() => setPage(number)}
                  className={
                    number === page
                      ? "px-4 py-2 mx-1 text-white transition-colors duration-300 transform bg-red-500 rounded-md sm:flex dark:bg-gray-800 dark:text-gray-200 hover:bg-red-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200"
                      : "px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:flex dark:bg-gray-800 dark:text-gray-200 hover:bg-red-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200 border-2"
                  }
                  key={number}
                >
                  {number + 1}
                </button>
              ))}
            </div>
          </div> */}

          {/*end*/}
        </Card>
      )}
    </>
  );
};

export default AllFarmers;
