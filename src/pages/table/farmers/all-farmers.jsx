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
import { Link } from "react-router-dom";
import { useGetAllFarmersQuery } from "../../../store/features/farmers/api";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import useFarmerAge from "../../../hooks/useFarmerAge";

function calculateFarmerAge(birthdate) {
  const today = new Date();
  const birthDate = new Date(birthdate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

// Example usage:
const birthdate = "1990-01-01"; // Replace with the actual birthdate
const age = calculateFarmerAge(birthdate);
console.log(`The farmer is ${age} years old.`);

const COLUMNS = [
  {
    Header: "Farmer Id",
    accessor: "farmer_id",
    Cell: (row) => {
      return (
        <div className="flex flex-col">
          <span className="inline-flex items-center">
            {/* <span className="w-10 h-10 rounded-full ltr:mr-3 rtl:ml-3 flex-none">
              <img
                src={`${import.meta.env.VITE_IMG_URL}${
                  row.cell.row?.original?.image
                }`}
                alt=""
                className="object-cover w-10 h-10 rounded-full"
              />
            </span> */}
            <div>
              <p className=" font-bold text-slate-600 dark:text-slate-300 capitalize">
                {row.cell.row?.original?.full_name}
              </p>
              <span className="text-[10px] font-bold text-green-600">
                {row?.cell?.row?.original?.farmer_id}
              </span>
            </div>
          </span>
        </div>
      );
    },
  },

  {
    Header: "onboarded by",
    accessor: "onboard_by",
    Cell: (row) => {
      return (
        <Link target="_black" to={`/me-details/${row?.cell?.value}`}>
          <div className="flex items-center gap-1 text-blue-500 underline">
            <p className="font-bold">{row?.cell?.value}</p>
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
      );
    },
  },
  {
    Header: "Date of Birth",
    accessor: "date_of_birth",
    Cell: (row) => {
      return (
        <span className="font-bold">
          {calculateFarmerAge(row?.cell?.value)} years
        </span>
      );
    },
  },
  {
    Header: "Phone No",
    accessor: "phone",
    Cell: (row) => {
      return <span className="font-bold">{row?.cell?.value}</span>;
    },
  },
  {
    Header: "yearly income",
    accessor: "yearly_income",
    Cell: (row) => {
      return <span className="font-bold">{row?.cell?.value} TK</span>;
    },
  },
  {
    Header: "Joining Date",
    accessor: "onboard_date",
    Cell: (row) => {
      return (
        <span className="font-bold">
          {moment(row?.cell?.value).format("LLLL")}
        </span>
      );
    },
  },
  {
    Header: "Location",
    accessor: "address",
    Cell: (row) => {
      return <span className="font-bold">{row?.cell?.value}</span>;
    },
  },
  {
    Header: "action",
    accessor: "action",
    Cell: (row) => {
      return (
        <div className="flex space-x-3 rtl:space-x-reverse">
          {/* <Tooltip content="View" placement="top" arrow animation="shift-away">
            <Link to={`/farmer-details/${row.cell.row.original.farmer_id}`}>
              <button className="action-btn" type="button">
                <Icon icon="heroicons:eye" />
              </button>
            </Link>
          </Tooltip> */}
          <Tooltip content="View" placement="top" arrow animation="shift-away">
            <Link
              target="_black"
              to={`/farmer-details/${row.cell.row.original.farmer_id}`}
            >
              <button className="action-btn" type="button">
                <Icon icon="heroicons:eye" />
              </button>
            </Link>
          </Tooltip>
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
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(150);
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

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

  const {
    data: farmers,
    isLoading,
    isError,
  } = useGetAllFarmersQuery({ itemsPerPage, currentPage, searchValue });
  isError && console.log("Error in fetching all farmers");
  const total_data = farmers?.meta?.total;

  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };
  const pages = [];

  for (let i = 1; i <= Math.ceil(total_data / itemsPerPage); i++) {
    pages.push(i);
  }

  //   const indexOfLastItem = currentPage * itemsPerPage;
  //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  //   const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

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

  const handleLoadMore = () => {
    setitemsPerPage(itemsPerPage + 5);
  };

  const defaultPageSize = 200;
  const columns = useMemo(() => COLUMNS, []);

  const data = useMemo(
    () => (farmers?.data ? farmers?.data : []),
    [farmers?.data]
  );

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

    // hiding the checkbox column
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

  console.log(farmers);

  return (
    <>
      {isLoading ? (
        <div>"Loading Farmers Data, Please wait..."</div>
      ) : (
        <Card>
          <div className="md:flex justify-between items-center mb-6">
            <h4 className="card-title">{title}</h4>
            <div className="flex gap-4">
              <input
                className="border border-slate-600 text-white  rounded px-4 py-1 bg-gray-700"
                placeholder="Search..."
                type="text"
                onChange={(e) => setSearchValue(e.target.value)}
              />
              {/* Excel Import */}
              {/* <button
                className="text-xs border px-4 border-slate-600 rounded bg-green-800 text-white"
                onClick={handleExport}
              >
                Export to Excel
              </button> */}
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
        </Card>
      )}
    </>
  );
};

export default AllFarmers;
