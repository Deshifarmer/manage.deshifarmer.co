// import React, { useState, useMemo } from "react";
// import { advancedTable } from "../../../constant/table-data";
// import Card from "@/components/ui/Card";
// import Icon from "@/components/ui/Icon";
// import Tooltip from "@/components/ui/Tooltip";
// import {
//   useTable,
//   useRowSelect,
//   useSortBy,
//   useGlobalFilter,
//   usePagination,
// } from "react-table";
// import { useGetAllAdvisoryQuery } from "../../../store/features/tracking/api";
// import GlobalFilter from "../react-tables/GlobalFilter";

// const COLUMNS = [
//   {
//     Header: "Created By",
//     accessor: "created_by",
//     Cell: (row) => {
//       return <span>{row?.cell?.value}</span>;
//     },
//   },
//   {
//     Header: "Farmer Group Id",
//     accessor: "farmer_group_id",
//     Cell: (row) => {
//       return <span>{row?.cell?.value}</span>;
//     },
//   },
//   //   {
//   //     Header: "customer",
//   //     accessor: "customer",
//   //     Cell: (row) => {
//   //       return (
//   //         <div>
//   //           <span className="inline-flex items-center">
//   //             <span className="w-7 h-7 rounded-full ltr:mr-3 rtl:ml-3 flex-none bg-slate-600">
//   //               <img
//   //                 src={row?.cell?.value.image}
//   //                 alt=""
//   //                 className="object-cover w-full h-full rounded-full"
//   //               />
//   //             </span>
//   //             <span className="text-sm text-slate-600 dark:text-slate-300 capitalize">
//   //               {row?.cell?.value.name}
//   //             </span>
//   //           </span>
//   //         </div>
//   //       );
//   //     },
//   //   },
//   {
//     Header: "date",
//     accessor: "date",
//     Cell: (row) => {
//       return <span>{row?.cell?.value}</span>;
//     },
//   },
//   {
//     Header: "quantity",
//     accessor: "quantity",
//     Cell: (row) => {
//       return <span>{row?.cell?.value}</span>;
//     },
//   },
//   {
//     Header: "amount",
//     accessor: "amount",
//     Cell: (row) => {
//       return <span>{row?.cell?.value}</span>;
//     },
//   },
//   {
//     Header: "status",
//     accessor: "status",
//     Cell: (row) => {
//       return (
//         <span className="block w-full">
//           <span
//             className={` inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 ${
//               row?.cell?.value === "paid"
//                 ? "text-success-500 bg-success-500"
//                 : ""
//             }
//             ${
//               row?.cell?.value === "due"
//                 ? "text-warning-500 bg-warning-500"
//                 : ""
//             }
//             ${
//               row?.cell?.value === "cancled"
//                 ? "text-danger-500 bg-danger-500"
//                 : ""
//             }

//              `}
//           >
//             {row?.cell?.value}
//           </span>
//         </span>
//       );
//     },
//   },
//   {
//     Header: "action",
//     accessor: "action",
//     Cell: (row) => {
//       return (
//         <div className="flex space-x-3 rtl:space-x-reverse">
//           <Tooltip content="View" placement="top" arrow animation="shift-away">
//             <button className="action-btn" type="button">
//               <Icon icon="heroicons:eye" />
//             </button>
//           </Tooltip>
//           <Tooltip content="Edit" placement="top" arrow animation="shift-away">
//             <button className="action-btn" type="button">
//               <Icon icon="heroicons:pencil-square" />
//             </button>
//           </Tooltip>
//           <Tooltip
//             content="Delete"
//             placement="top"
//             arrow
//             animation="shift-away"
//             theme="danger"
//           >
//             <button className="action-btn" type="button">
//               <Icon icon="heroicons:trash" />
//             </button>
//           </Tooltip>
//         </div>
//       );
//     },
//   },
// ];

// const IndeterminateCheckbox = React.forwardRef(
//   ({ indeterminate, ...rest }, ref) => {
//     const defaultRef = React.useRef();
//     const resolvedRef = ref || defaultRef;

//     React.useEffect(() => {
//       resolvedRef.current.indeterminate = indeterminate;
//     }, [resolvedRef, indeterminate]);

//     return (
//       <>
//         <input
//           type="checkbox"
//           ref={resolvedRef}
//           {...rest}
//           className="table-checkbox"
//         />
//       </>
//     );
//   }
// );

// const Advisory = ({ title = "Advisory" }) => {
//   const { data: advisory, isLoading } = useGetAllAdvisoryQuery();

//   console.log(advisory);
//   const columns = useMemo(() => COLUMNS, []);
//   const data = useMemo(() => (advisory ? advisory : []), [advisory]);

//   const tableInstance = useTable(
//     {
//       columns,
//       data,
//     },

//     useGlobalFilter,
//     useSortBy,
//     usePagination,
//     useRowSelect,

//     (hooks) => {
//       hooks.visibleColumns.push((columns) => [
//         {
//           id: "selection",
//           Header: ({ getToggleAllRowsSelectedProps }) => (
//             <div>
//               <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
//             </div>
//           ),
//           Cell: ({ row }) => (
//             <div>
//               <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
//             </div>
//           ),
//         },
//         ...columns,
//       ]);
//     }
//   );
//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     footerGroups,
//     page,
//     nextPage,
//     previousPage,
//     canNextPage,
//     canPreviousPage,
//     pageOptions,
//     state,
//     gotoPage,
//     pageCount,
//     setPageSize,
//     setGlobalFilter,
//     prepareRow,
//   } = tableInstance;

//   const { globalFilter, pageIndex, pageSize } = state;
//   return (
//     <>
//       {isLoading ? (
//         "Loading..."
//       ) : (
//         <Card>
//           <div className="md:flex justify-between items-center mb-6">
//             <h4 className="card-title">{title}</h4>
//             <div>
//               <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
//             </div>
//           </div>
//           <div className="overflow-x-auto -mx-6">
//             <div className="inline-block min-w-full align-middle">
//               <div className="overflow-hidden ">
//                 <table
//                   className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
//                   {...getTableProps}
//                 >
//                   <thead className="bg-slate-200 dark:bg-slate-700">
//                     {headerGroups.map((headerGroup) => (
//                       <tr {...headerGroup.getHeaderGroupProps()}>
//                         {headerGroup.headers.map((column) => (
//                           <th
//                             {...column.getHeaderProps(
//                               column.getSortByToggleProps()
//                             )}
//                             scope="col"
//                             className=" table-th "
//                           >
//                             {column.render("Header")}
//                             <span>
//                               {column.isSorted
//                                 ? column.isSortedDesc
//                                   ? " 🔽"
//                                   : " 🔼"
//                                 : ""}
//                             </span>
//                           </th>
//                         ))}
//                       </tr>
//                     ))}
//                   </thead>
//                   <tbody
//                     className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"
//                     {...getTableBodyProps}
//                   >
//                     {page.map((row) => {
//                       prepareRow(row);
//                       return (
//                         <tr {...row.getRowProps()}>
//                           {row.cells.map((cell) => {
//                             return (
//                               <td {...cell.getCellProps()} className="table-td">
//                                 {cell.render("Cell")}
//                               </td>
//                             );
//                           })}
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//           <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
//             <div className=" flex items-center space-x-3 rtl:space-x-reverse">
//               <select
//                 className="form-control py-2 w-max"
//                 value={pageSize}
//                 onChange={(e) => setPageSize(Number(e.target.value))}
//               >
//                 {[10, 25, 50].map((pageSize) => (
//                   <option key={pageSize} value={pageSize}>
//                     Show {pageSize}
//                   </option>
//                 ))}
//               </select>
//               <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
//                 Page{" "}
//                 <span>
//                   {pageIndex + 1} of {pageOptions.length}
//                 </span>
//               </span>
//             </div>
//             <ul className="flex items-center  space-x-3  rtl:space-x-reverse">
//               <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
//                 <button
//                   className={` ${
//                     !canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
//                   }`}
//                   onClick={() => gotoPage(0)}
//                   disabled={!canPreviousPage}
//                 >
//                   <Icon icon="heroicons:chevron-double-left-solid" />
//                 </button>
//               </li>
//               <li className="text-sm leading-4 text-slate-900 dark:text-white rtl:rotate-180">
//                 <button
//                   className={` ${
//                     !canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
//                   }`}
//                   onClick={() => previousPage()}
//                   disabled={!canPreviousPage}
//                 >
//                   Prev
//                 </button>
//               </li>
//               {pageOptions.map((page, pageIdx) => (
//                 <li key={pageIdx}>
//                   <button
//                     href="#"
//                     aria-current="page"
//                     className={` ${
//                       pageIdx === pageIndex
//                         ? "bg-slate-900 dark:bg-slate-600  dark:text-slate-200 text-white font-medium "
//                         : "bg-slate-100 dark:bg-slate-700 dark:text-slate-400 text-slate-900  font-normal  "
//                     }    text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
//                     onClick={() => gotoPage(pageIdx)}
//                   >
//                     {page + 1}
//                   </button>
//                 </li>
//               ))}
//               <li className="text-sm leading-4 text-slate-900 dark:text-white rtl:rotate-180">
//                 <button
//                   className={` ${
//                     !canNextPage ? "opacity-50 cursor-not-allowed" : ""
//                   }`}
//                   onClick={() => nextPage()}
//                   disabled={!canNextPage}
//                 >
//                   Next
//                 </button>
//               </li>
//               <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
//                 <button
//                   onClick={() => gotoPage(pageCount - 1)}
//                   disabled={!canNextPage}
//                   className={` ${
//                     !canNextPage ? "opacity-50 cursor-not-allowed" : ""
//                   }`}
//                 >
//                   <Icon icon="heroicons:chevron-double-right-solid" />
//                 </button>
//               </li>
//             </ul>
//           </div>
//           {/*end*/}
//         </Card>
//       )}
//     </>
//   );
// };

// export default Advisory;

import Card from "@/components/ui/Card";
import { useGetAllAdvisoryQuery } from "../../../store/features/tracking/api";
import { data } from "autoprefixer";
import moment from "moment";
import { Link } from "react-router-dom";

const Advisory = () => {
  const { data: advisory, isLoading } = useGetAllAdvisoryQuery();
  console.log(advisory);
  return (
    <div className="grid ">
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          {advisory?.map((item, i) => (
            <div key={i}>
              <Card noborder bodyClass="p-0">
                <div className="p-6 text-center flex items-center gap-1">
                  {/* <div className="card-title mb-5">{item?.subject}</div> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                    />
                  </svg>

                  <div className="text-sm text-left">
                    Delowar Hossain Pappu{" "}
                    <Link to={`/me-details/${item?.created_by}`}>
                      <span className="underline text-blue-600">
                        (#{item?.created_by})
                      </span>
                    </Link>{" "}
                    gave advisory of <span className="font-bold">30 mins</span>{" "}
                    to Kabita{" "}
                    <Link
                      to={`/farmer-groups-details/${item?.farmer_group_id}`}
                    >
                      <span className="underline text-blue-600">
                        (#{item?.farmer_group_id})
                      </span>
                    </Link>{" "}
                    at{" "}
                    <span className="font-bold">
                      {" "}
                      {moment().format("LLLL")}
                    </span>{" "}
                    on {item?.subject}
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Advisory;
