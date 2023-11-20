import React, { useState, useMemo } from "react";
import { advancedTable } from "../../../constant/table-data";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Tooltip from "@/components/ui/Tooltip";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { subDays } from "date-fns";

import { saveAs } from "file-saver";
import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import GlobalFilter from "../react-tables/GlobalFilter";
import { useGetDayWhiseSourceSellingQuery } from "../../../store/features/agri-output/api";
import { Link } from "react-router-dom";

const COLUMNS = [
  {
    Header: "date",
    accessor: "date",
    Cell: (row) => {
      return (
        <div className="underline pb-2">
          <Link to={`/sales-details/${row?.cell?.value}`}>
            <span className="pb-2">{row?.cell?.value}</span>
          </Link>
        </div>
      );
    },
  },
  {
    Header: "Unit Wise Selling",
    accessor: "",
    Cell: (row) => {
      return (
        <div>
          {row?.cell?.row?.original?.unit_wise_selling.map((sales, i) => (
            <p key={i}>
              {sales.total_quantity} {sales.unit} Sold At Price{" "}
              {sales?.total_sell_price}
            </p>
          ))}
        </div>
      );
    },
  },
  {
    Header: "Total Selling",
    accessor: "total_selling",
    Cell: (row) => {
      return <span>{row?.cell?.value} ৳</span>;
    },
  },
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
  //       <div className="flex space-x-3 rtl:space-x-reverse">
  //         <Tooltip content="View" placement="top" arrow animation="shift-away">
  //           <button className="action-btn" type="button">
  //             <Icon icon="heroicons:eye" />
  //           </button>
  //         </Tooltip>
  //         <Tooltip content="Edit" placement="top" arrow animation="shift-away">
  //           <button className="action-btn" type="button">
  //             <Icon icon="heroicons:pencil-square" />
  //           </button>
  //         </Tooltip>
  //         <Tooltip
  //           content="Delete"
  //           placement="top"
  //           arrow
  //           animation="shift-away"
  //           theme="danger"
  //         >
  //           <button className="action-btn" type="button">
  //             <Icon icon="heroicons:trash" />
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

const DayWiseSales = ({ title = "Day Wise Sell" }) => {
  const [startDate, setStartDate] = useState(subDays(new Date(), 10));
  const [endDate, setEndDate] = useState(new Date());

  let dayWiseSell;
  try {
    const { data } = useGetDayWhiseSourceSellingQuery({
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd"),
    });
    dayWiseSell = data;
  } catch (error) {
    console.error(error);
    window.location.reload();
  }


  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => (dayWiseSell ? dayWiseSell : []), [dayWiseSell]);

  const defaultPageSize = 200;

  const excel_data = data.map((datewise) => {
    return {
      Date: datewise?.date,
      "Total Selling": datewise?.total_selling,
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

    saveAs(fileData, `Datewisesale.xlsx`);
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
      <Card>
        <div className="md:flex justify-between items-center mb-6">
          <h4 className="card-title">{title}</h4>
          <div className=" flex justify-between gap-2">
            <DatePicker
              className="border border-slate-600 rounded px-2 py-1 dark:bg-slate-700 dark:text-slate-300"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
            <DatePicker
              className="border border-slate-600 dark:bg-slate-700 dark:text-slate-300 rounded px-2 py-1"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
            />

            <button
              className="text-xs border text-white px-4  py-2 border-slate-600 rounded bg-green-800"
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
    </>
  );
};

export default DayWiseSales;
