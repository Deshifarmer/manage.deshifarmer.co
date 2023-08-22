import React, { useState, useMemo } from "react";
import { advancedTable } from "../../../constant/table-data";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Tooltip from "@/components/ui/Tooltip";
import moment from "moment";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import GlobalFilter from "./GlobalFilter";
import { Link } from "react-router-dom";

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

  // {
  //   Header: "Location",
  //   accessor: "address",
  //   Cell: (row) => {
  //     return <span>{row?.cell?.value}</span>;
  //   },
  // },
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

const MeFarmerLists = ({
  title = "Me Farmer Lists",
  farmer_lists,
  isLoading,
}) => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(
    () => (farmer_lists ? farmer_lists : []),
    [farmer_lists]
  );

  console.log(data);
  const defaultPageSize = 200;

  const excel_data = data.map((farmer) => {
    return {
      farmer_id: farmer?.farmer_id,
      image: `https://core.deshifarmer.co/storage${farmer?.image}`,
      date_of_birth: farmer?.date_of_birth,
      farm_area: farmer?.farm_area,
      father_name: farmer?.father_name,
      first_name: farmer?.first_name,
      full_name: farmer?.full_name,
      last_name: farmer?.last_name,
      sex: farmer?.gender,
      phone: farmer?.phone,
      district: farmer?.district,
      division: farmer?.division,
      union: farmer?.union,
      upazila: farmer?.upazila,
      village: farmer?.village,
      created_at: farmer?.created_at,
    };
  });

  const handleExport = async () => {
    const XLSX = await import("xlsx"); // Use dynamic import for XLSX
    const worksheet = XLSX.utils.json_to_sheet(excel_data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const fileData = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(fileData, "MD.ABUL HASNAT.xlsx");
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
        "Loading..."
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

export default MeFarmerLists;
