import React, { useState, useMemo } from "react";
import Card from "@/components/ui/Card";
import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import GlobalFilter from "../react-tables/GlobalFilter";
import {
  useGetAllSalesQuery,
  useGetSingleDayWhiseSourceSellingQuery,
} from "../../../store/features/agri-output/api";
import { Link, useParams } from "react-router-dom";
import moment from "moment";

const COLUMNS = [
  {
    Header: "market type",
    accessor: "market_type",
    Cell: (row) => {
      return (
        <div>
          <span>{row?.cell?.value}</span>
          <p>
            <span className="  dark:text-slate-300 text-xs underline text-sky-500">

              <Link to={`/sales-invoice/${row?.cell?.row?.original?.id}`}>
              {row?.cell?.row?.original?.source_id}
              </Link>
            </span>
          </p>
        </div>
      );
    },
  },
  {
    Header: "sell price",
    accessor: "sell_price",
    Cell: (row) => {
      return <span>{row?.cell?.value} ৳</span>;
    },
  },
  {
    Header: "quantity",
    accessor: "quantity",
    Cell: (row) => {
      return (
        <div className="flex gap-2">
          <span>{row?.cell?.value}</span>
          <p>{row?.cell?.row?.original?.unit}</p>
        </div>
      );
    },
  },
  {
    Header: "Date",
    accessor: "created_at",
    Cell: (row) => {
      return <span>{moment(row?.cell?.value).format("LLLL")} </span>;
    },
  },
  {
    Header: "sell location",
    accessor: "sell_location",
    Cell: (row) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "action",
    accessor: "",
    Cell: (row) => {
      return (
        <div>
          <Link to={`/sales-invoice/${row?.cell?.row?.original?.id}`}>
            <div className="">View Details</div>
          </Link>
        </div>
      );
    },
  },
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

const SalesDetails = ({ title = "Sales" }) => {
  const { id } = useParams();
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(10);
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const { data: sales } = useGetSingleDayWhiseSourceSellingQuery({
    id,
    currentPage,
    itemsPerPage,
  });

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => (sales?.data ? sales?.data : []), [sales?.data]);
  console.log(data);

  const excel_data = data.map((datewise) => {
    return {
      Date: datewise?.date,

      "Total Selling": datewise?.sell_price,
    };
  });

  const handleExport = async () => {
    const XLSX = await import("xlsx"); // Use dynamic import for XLSX
    const worksheet = XLSX.utils.json_to_sheet(excel_data); // ensure excel_data contains all data
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


  const total_data = sales?.meta?.total;

  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };
  const pages = [];

  for (let i = 1; i <= Math.ceil(total_data / itemsPerPage); i++) {
    pages.push(i);
  }

  const renderPageNumbers = pages?.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={
            currentPage == number
              ? "active bg-white px-5 py-2 text-black-500 rounded-full cursor-pointer"
              : "cursor-pointer"
          }
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  let pageIncrementBtn = null;

  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
  }

 const defaultPageSize = 10;

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
          <div className=" flex gap-4">
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
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
        {/* <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
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
        </div> */}
        <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
          <div className="flex justify-between w-full">
            {/* <button
                onClick={handleLoadMore}
                className="loadmore border px-4 py-2 rounded"
              >
                Load More
              </button> */}
            <ul className="pageNumbers flex items-center gap-10">
              <li>
                <button
                  onClick={handlePrevbtn}
                  className="border px-4 py-2 disabled:cursor-not-allowed rounded"
                  disabled={currentPage == pages[0] ? true : false}
                >
                  Prev
                </button>
              </li>
              {pageDecrementBtn}
              {renderPageNumbers}
              {pageIncrementBtn}

              <li>
                <button
                  onClick={handleNextbtn}
                  className="border px-4 py-2 disabled:cursor-not-allowed rounded"
                  disabled={
                    currentPage == pages[pages.length - 1] ? true : false
                  }
                >
                  Next
                </button>
              </li>
            </ul>
          </div>
        </div>
        {/*end*/}
      </Card>
    </>
  );
};

export default SalesDetails;
