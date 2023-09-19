import React, { useState, useMemo, useEffect } from "react";
import { advancedTable } from "../../../constant/table-data";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Tooltip from "@/components/ui/Tooltip";
import { Link } from "react-router-dom";
import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import axios from "axios";
import moment from "moment";
import { useGetAllDistributorsQuery } from "../../../store/features/distributor/api";
import GlobalFilter from "../react-tables/GlobalFilter";

const COLUMNS = [
  {
    Header: "Id",
    accessor: "df_id",
    Cell: (row) => {
      return (
        <div className="flex flex-col">
          <Link
            target="_black"
            to={`/channel-details/${row?.cell?.row?.original?.channel}`}
          >
            <div className="flex text-blue-500">
              <p className="text-blue-500 underline  ">
                {row?.cell?.row?.original?.channel}
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </Link>
          <Link
            target="_blank"
            to={`/distributor/${row?.cell?.row?.original.df_id}`}
          >
            <div className="flex">
              <p className="text-[10px] underline text-blue-500  ">
                {row?.cell?.value}
              </p>
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
            </div>
          </Link>
        </div>
      );
    },
  },

  {
    Header: "Image & name",
    accessor: "photo",
    Cell: (row) => {
      return (
        <div>
          <span className="inline-flex items-center">
            <span className="w-10 h-10 rounded-full ltr:mr-3 rtl:ml-3 flex-none ">
              <img
                src={`${import.meta.env.VITE_IMG_URL}${
                  row?.cell?.row?.original?.photo
                }`}
                alt=""
                className="object-cover w-10 h-10 rounded-full"
              />
            </span>
            <span className="text-sm   text-slate-600 dark:text-slate-300 capitalize">
              {row?.cell?.row?.original.full_name}
            </span>
          </span>
        </div>
      );
    },
  },
  {
    Header: "Balance",
    accessor: "balance",
    Cell: (row) => {
      return <span className=" ">৳ {row?.cell?.value}</span>;
    },
  },
  {
    Header: "Total Transaction",
    accessor: "all_transaction",
    Cell: (row) => {
      return <span className=" ">৳ {row?.cell?.value}</span>;
    },
  },
  {
    Header: "Total Sales",
    accessor: "total_sale",
    Cell: (row) => {
      return <span className=" ">{row?.cell?.value}</span>;
    },
  },
  {
    Header: "Joining Date",
    accessor: "joining_date",
    Cell: (row) => {
      return (
        <span className=" ">
          {moment(row?.cell?.value).format("llll")}
        </span>
      );
    },
  },

  {
    Header: "Starting Status",
    accessor: "status",
    Cell: (row) => {
      return (
        <span className="block w-full">
          <span
            className={` inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 ${
              row?.cell?.value === "active"
                ? "text-success-500 bg-success-500"
                : ""
            } 
            ${
              row?.cell?.value === "due"
                ? "text-warning-500 bg-warning-500"
                : ""
            }
            ${
              row?.cell?.value === "cancled"
                ? "text-danger-500 bg-danger-500"
                : ""
            }
            
             `}
          >
            {row?.cell?.value}
          </span>
        </span>
      );
    },
  },
  // {
  //   Header: "action",
  //   accessor: "action",
  //   Cell: (row) => {
  //     return (
  //       <div className="flex space-x-3 rtl:space-x-reverse">
  //         <Tooltip
  //           content="View Distributor Profile"
  //           placement="top"
  //           arrow
  //           animation="shift-away"
  //         >
  //           <Link to={`/distributor/${row?.cell?.row?.original.df_id}`}>
  //             <button className="action-btn" type="button">
  //               <Icon icon="heroicons:eye" />
  //             </button>
  //           </Link>
  //         </Tooltip>
  //       </div>
  //     );
  //   },
  // },
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

const AllDistributors = ({ title = "All Distributors" }) => {
  const {
    data: distributors,
    isLoading,
    isError,
  } = useGetAllDistributorsQuery();

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(
    () => (distributors ? distributors : []),
    [distributors]
  );



  const tableInstance = useTable(
    {
      columns,
      data,
    },

    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect

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
      {isLoading
        ? "Loading..."
        : isError
        ? "Error"
        : distributors && (
            <Card>
              <div className="md:flex justify-between items-center mb-6">
                <h4 className="card-title">{title}</h4>
                <div>
                  <GlobalFilter
                    filter={globalFilter}
                    setFilter={setGlobalFilter}
                  />
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
                                  <td
                                    {...cell.getCellProps()}
                                    className="table-td"
                                  >
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

export default AllDistributors;
