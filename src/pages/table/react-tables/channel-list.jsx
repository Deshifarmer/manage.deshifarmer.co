import React, { useState, useMemo, useEffect } from "react";
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
import GlobalFilter from "./GlobalFilter";
import axios from "axios";
import { Link } from "react-router-dom";

const ChannelList = ({ title = "Channel Lists", params }) => {
  const COLUMNS = [
    {
      Header: "channel name",
      accessor: "channel_name",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    // {
    //   Header: "Full Name",
    //   accessor: "full_name",
    //   Cell: (row) => {
    //     return <span>{row?.cell?.value}</span>;
    //   },
    // },
    // {
    //   Header: "Phone",
    //   accessor: "phone",
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
    //               src={row?.cell?.value.image}
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
    //   Header: "status",
    //   accessor: "status",
    //   Cell: (row) => {
    //     return (
    //       <span className="block w-full">
    //         <span
    //           className={` inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 ${
    //             row?.cell?.value === "active"
    //               ? "text-success-500 bg-success-500"
    //               : ""
    //           }
    //         ${
    //           row?.cell?.value === "due"
    //             ? "text-warning-500 bg-warning-500"
    //             : ""
    //         }
    //         ${
    //           row?.cell?.value === "revoked"
    //             ? "text-danger-500 bg-danger-500"
    //             : ""
    //         }

    //          `}
    //         >
    //           {row?.cell?.value}
    //         </span>
    //       </span>
    //     );
    //   },
    // },
    // {
    //   Header: "Assign Micro Entrepreneurs",
    //   accessor: "",
    //   Cell: (row) => {
    //     console.log(row);
    //     return (
    //       <Link
    //         to={`/assign-micro-entreprenures/${row?.cell?.row?.original?.df_id}`}
    //       >
    //         <button className="inline-block text-success-500 bg-success-500 px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25">
    //           Assign Micro Entrepreneurs
    //         </button>
    //       </Link>
    //     );
    //   },
    // },
    {
      Header: "action",
      accessor: "action",
      Cell: (row) => {
        console.log(row);
        return (
          <div className="flex space-x-3 rtl:space-x-reverse">
            <Tooltip
              content="View Distributor Profile"
              placement="top"
              arrow
              animation="shift-away"
            >
              <Link
                to={`/channel-details/${row?.cell?.row?.original?.channel_name}`}
              >
                <button className="action-btn" type="button">
                  <Icon icon="heroicons:eye" />
                </button>
              </Link>
            </Tooltip>
            {/* <Tooltip
              content="Edit"
              placement="top"
              arrow
              animation="shift-away"
            >
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

  const [distrubutors_lists, set_distributors_lists] = useState([]);
  const token = localStorage.getItem("hq-token");
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => distrubutors_lists, [distrubutors_lists]);

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

  // note => all channel data
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE}/hq/channel_list/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set_distributors_lists(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(distrubutors_lists);

  const tableInstance = useTable(
    {
      columns,
      data,
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
    </>
  );
};

export default ChannelList;
