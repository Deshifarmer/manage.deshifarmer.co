import React, { useState, useMemo } from "react";
import { advancedTable } from "../../../constant/table-data";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Tooltip from "@/components/ui/Tooltip";
import grain from "../../../assets/images/icon/grain.svg";
import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { useGetAllFarmsQuery } from "../../../store/features/farmers/api";
import GlobalFilter from "../react-tables/GlobalFilter";
import { Link } from "react-router-dom";

const COLUMNS = [
  {
    Header: "farm name",
    accessor: "farm_name",
    Cell: (row) => {
      return (
        <div className="">
          <p className=" ">{row?.cell?.value}</p>
          <p className="  text-[10px] text-green-600">
            {row?.cell?.row?.original?.farm_id}
          </p>
        </div>
      );
    },
  },
  {
    Header: "farmer id",
    accessor: "farmer_id",
    Cell: (row) => {
      return (
        <Link
          target="_black"
          to={`/farmer-details/${row.cell.row.original.farmer_id}`}
        >
          <span className="  text-blue-500 underline">
            {row?.cell?.value}
          </span>
        </Link>
      );
    },
  },
  {
    Header: "address",
    accessor: "address",
    Cell: (row) => {
      return (
        <div>
          <p className="text-xs">
            {" "}
            <span className=" ">address :</span> {row?.cell?.value}
          </p>
          <p className="text-xs">
            {" "}
            <span className=" ">union :</span>{" "}
            {row?.cell?.row?.original?.union}
          </p>
          <p className="text-xs">
            {" "}
            <span className=" ">mouza :</span>{" "}
            {row?.cell?.row?.original?.mouaza}
          </p>
        </div>
      );
    },
  },
  {
    Header: "union",
    accessor: "union",
    Cell: (row) => {
      return (
        <div className="flex items-center gap-2">
          <p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
          </p>
          <p className=" ">{row?.cell?.value}</p>
        </div>
      );
    },
  },
  //   {
  //     Header: "customer",
  //     accessor: "customer",
  //     Cell: (row) => {
  //       return (
  //         <div>
  //           <span className="inline-flex items-center">
  //             <span className="w-7 h-7 rounded-full ltr:mr-3 rtl:ml-3 flex-none bg-slate-600">
  //               <img
  //                 src={row?.cell?.value.image}
  //                 alt=""
  //                 className="object-cover w-full h-full rounded-full"
  //               />
  //             </span>
  //             <span className="text-sm text-slate-600 dark:text-slate-300 capitalize">
  //               {row?.cell?.value.name}
  //             </span>
  //           </span>
  //         </div>
  //       );
  //     },
  //   },
  {
    Header: "farm area",
    accessor: "farm_area",
    Cell: (row) => {
      return <span className=" ">{row?.cell?.value}</span>;
    },
  },
  {
    Header: "soil type",
    accessor: "soil_type",
    Cell: (row) => {
      return <span className=" ">{row?.cell?.value}</span>;
    },
  },
  {
    Header: "current crop",
    accessor: "current_crop",
    Cell: (row) => {
      return (
        <div className="flex items-center gap-2">
          <img className="w-5 h-5" src={grain} alt="" />
          <p className=" ">
            {Array?.from(row?.cell?.value)?.map((grain) => (
              <span className="text-xs">{grain}</span>
            ))}
          </p>
        </div>
      );
    },
  },

  // {
  //   Header: "action",
  //   accessor: "action",
  //   Cell: (row) => {
  //     return (
  //       <div className="flex space-x-3 rtl:space-x-reverse">
  //         <Tooltip content="View" placement="top" arrow animation="shift-away">
  //           <button className="action-btn" type="button">
  //             <Icon icon="heroicons:eye" />
  //           </button>
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

const AllFarms = ({ title = "All Farms" }) => {
  const { data: farms, isLoading, isError } = useGetAllFarmsQuery();
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => (farms ? farms : []), [farms]);

  console.log(farms);

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
      {isLoading ? (
        "Data is Loading, Please wait..."
      ) : (
        <Card>
          <div className="md:flex justify-between items-center mb-6">
            <h4 className="card-title">{title}</h4>
            <div>
              <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            </div>
          </div>
          <div className="overflow-x-auto -mx-6">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden">
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

export default AllFarms;
