import React, { useState, useMemo } from "react";
import { advancedTable } from "../../../constant/table-data";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Tooltip from "@/components/ui/Tooltip";
import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import GlobalFilter from "../react-tables/GlobalFilter";
import {
  useGetAllAttendanceQuery,
  useGetAllBatchQuery,
} from "../../../store/features/tracking/api";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import { useGetFarmDetailsQuery } from "../../../store/features/farmers/api";

const COLUMNS = [
  {
    Header: "batch id",
    accessor: "batch_id",
    Cell: (row) => {
      return (
        <div>
          <Link
            target="_blank"
            to={`/batch/${row?.cell?.row?.original?.batch_id}`}
          >
            <div className="flex items-center">
              <p className="font-bold text-green-600 underline">
                {row?.cell?.value}
              </p>
              <p>
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
              </p>
            </div>
          </Link>
        </div>
      );
    },
  },

  {
    Header: "created by",
    accessor: "created_by",
    Cell: (row) => {
      return (
        <Link
          target="_blank"
          to={`/me-details/${row?.cell?.row?.original?.created_by}`}
        >
          <div className="flex items-center">
            <p className="text-xs underline">
              {row?.cell?.row?.original?.created_by}
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
      );
    },
  },
  {
    Header: "Farm id",
    accessor: "farm_id",
    Cell: (row) => {
      return (
        <div className="flex items-center">
          <p className="text-xs underlin">
            {row?.cell?.row?.original?.farm_id}
          </p>

          <p>
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
          </p>
        </div>
      );
    },
  },
  {
    Header: "season",
    accessor: "season",
    Cell: (row) => {
      return (
        <p className="text-xs underline">{row?.cell?.row?.original?.season}</p>
      );
    },
  },
  {
    Header: "crop",
    accessor: "which_crop",
    Cell: (row) => {
      return (
        <p className="text-xs underline">
          {row?.cell?.row?.original?.which_crop}
        </p>
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

const FarmBatch = ({ title = "Farm Batches" }) => {
  const params = useParams();
  const { data: batch, isLoading } = useGetFarmDetailsQuery(params?.id);
  

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(
    () => (batch?.batch ? batch?.batch : []),
    [batch?.batch]
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
      {isLoading ? (
        "Loading..."
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

export default FarmBatch;
