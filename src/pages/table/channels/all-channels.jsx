import React, { useMemo } from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";

import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";

import { Link } from "react-router-dom";
import { useGetAllChannelsQuery } from "../../../store/features/channels/api";
import GlobalFilter from "../react-tables/GlobalFilter";

const COLUMNS = [
  {
    Header: "Channel Name",
    accessor: "channel_name",
    Cell: (row) => {
      return (
        <div>
          <Link
            to={`/channel-details/${row?.cell?.row?.original.channel_name}`}
          >
            <div className="flex gap-1 text-blue-500">
              <span className="  underline text-blue-500">
                {row?.cell?.value}
              </span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 "
                >
                  <path
                    fillRule="evenodd"
                    d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          </Link>
        </div>
      );
    },
  },
  {
    Header: "District",
    accessor: "district",
    Cell: (row) => {
      return (
        <span className="text-teal-500  ">{row?.cell?.value}</span>
      );
    },
  },
  {
    Header: "Division",
    accessor: "division",
    Cell: (row) => {
      return (
        <span className="text-orange-500  ">{row?.cell?.value}</span>
      );
    },
  },
  {
    Header: "Total Distributors",
    accessor: "toatal_distributor",
    Cell: (row) => {
      return <span className=" ">{row?.cell?.value}</span>;
    },
  },
  {
    Header: "Total Order",
    accessor: "total_order",
    Cell: (row) => {
      return <span className=" ">{row?.cell?.value}</span>;
    },
  },
  {
    Header: "Total Sales",
    accessor: "total_sales",
    Cell: (row) => {
      return (
        <span className="  text-green-500">{row?.cell?.value}</span>
      );
    },
  },
  {
    Header: "Total ME",
    accessor: "total_me",
    Cell: (row) => {
      return <span className=" ">{row?.cell?.value}</span>;
    },
  },
  // {
  //   Header: "Action",
  //   accessor: "action",
  //   Cell: (props) => {
  //     return (
  //       // <button onClick={() => handleRowClick(props)}>Show Details</button>
  //       <Link to={`/channel-details/${props.row.original.channel_name}`}>
  //         Show Details
  //       </Link>
  //     );
  //   },
  // },
  // {
  //   Header: "Order",
  //   accessor: "order",
  //   Cell: (row) => {
  //     // return <span>#{row?.cell?.value}</span>;
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
  //             {/* {row?.cell?.value.name} */}
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
  // {
  //   Header: "action",
  //   accessor: "action",
  //   Cell: (row) => {
  //     return (
  //       <div>
  //         <Dropdown
  //           classMenuItems="right-0 w-[140px] top-[110%]"
  //           label={
  //             <span className="text-xl text-center block w-full">
  //               <Icon icon="heroicons-outline:dots-vertical" />
  //             </span>
  //           }
  //         >
  //           <div className="divide-y divide-slate-100 dark:divide-slate-800">
  //             {actions.map((item, i) => (
  //               <Menu.Item key={i}>
  //                 <div
  //                   className={`

  //                 ${
  //                   item.name === "delete"
  //                     ? "bg-danger-500 text-danger-500 bg-opacity-30   hover:bg-opacity-100 hover:text-white"
  //                     : "hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50"
  //                 }
  //                  w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer
  //                  first:rounded-t last:rounded-b flex  space-x-2 items-center rtl:space-x-reverse `}
  //                 >
  //                   <span className="text-base">
  //                     <Icon icon={item.icon} />
  //                   </span>
  //                   <span>{item.name}</span>
  //                 </div>
  //               </Menu.Item>
  //             ))}
  //           </div>
  //         </Dropdown>
  //       </div>
  //     );
  //   },
  // },
];

const actions = [
  {
    name: "view",
    icon: "heroicons-outline:eye",
  },
  {
    name: "edit",
    icon: "heroicons:pencil-square",
  },
  {
    name: "delete",
    icon: "heroicons-outline:trash",
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

const ChannelLists = () => {
  const { data: channels, isLoading, isError } = useGetAllChannelsQuery();
  isError && console.log("Error in channels");
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => (channels ? channels : []), [channels]);

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
    <div>
      {isLoading ? (
        "Loading..."
      ) : (
        <Card noborder>
          <div className="md:flex justify-between items-center mb-6">
            <h4 className="card-title">Channel List</h4>
            <div>
              <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            </div>
          </div>
          <div className="overflow-x-auto -mx-6">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden  ">
                <table
                  className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                  {...getTableProps}
                >
                  <thead className=" border-t border-slate-100 dark:border-slate-800">
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
              <span className=" flex space-x-2  rtl:space-x-reverse items-center">
                <span className=" text-sm font-medium text-slate-600 dark:text-slate-300">
                  Go
                </span>
                <span>
                  <input
                    type="number"
                    className=" form-control py-2"
                    defaultValue={pageIndex + 1}
                    onChange={(e) => {
                      const pageNumber = e.target.value
                        ? Number(e.target.value) - 1
                        : 0;
                      gotoPage(pageNumber);
                    }}
                    style={{ width: "50px" }}
                  />
                </span>
              </span>
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
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                >
                  <Icon icon="heroicons-outline:chevron-left" />
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
              <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
                <button
                  className={` ${
                    !canNextPage ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => nextPage()}
                  disabled={!canNextPage}
                >
                  <Icon icon="heroicons-outline:chevron-right" />
                </button>
              </li>
            </ul>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ChannelLists;
