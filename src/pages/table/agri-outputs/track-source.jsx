import React, { useMemo, useState } from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";

import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import GlobalFilter from "../react-tables/GlobalFilter";
import { useGetAllSourcesQuery } from "../../../store/features/agri-output/api";
import { Link } from "react-router-dom";
import ViewSource from "./source-details";

const COLUMNS = [
  {
    Header: "product name",
    accessor: "product_name",
    Cell: (row) => {
      return (
        <div>
          <span>{row?.cell?.value}</span>
          <p className="text-xs underline text-blue-600">
            {row?.cell?.row?.original?.source_id}
          </p>
        </div>
      );
    },
  },
  {
    Header: "Buy Price",
    accessor: "buy_price",
    Cell: (row) => {
      return <span>{row?.cell?.value} ৳</span>;
    },
  },
  {
    Header: "Sell Price",
    accessor: "sell_price",
    Cell: (row) => {
      return <span>{row?.cell?.value ? `${row?.cell?.value} ৳` : "-"}</span>;
    },
  },
  {
    Header: "Quantity",
    accessor: "quantity",
    Cell: (row) => {
      return (
        <span>
          {row?.cell?.value} {row?.cell?.row?.original?.unit}
        </span>
      );
    },
  },
  {
    Header: "Source by",
    accessor: "source_by",
    Cell: (row) => {
      return (
        <Link target="_black" to={`/me-details/${row?.cell?.value}`}>
          <div className="flex items-center gap-1 text-blue-500 underline">
            <p className="  ">{row?.cell?.value}</p>
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
  {
    Header: "farmer id",
    accessor: "which_farmer",
    Cell: (row) => {
      return (
        <div>
          <p>{row?.cell?.row?.original?.farmer_name}</p>
          <span className="text-blue-600 underline text-xs">
            <Link to={`/farmer-details/${row.cell.row.original.which_farmer}`}>
              {row?.cell?.value}
            </Link>
            <p
              className={`${
                row.cell.row.original.usaid_id
                  ? "text-green-400 no-underlin font-bold"
                  : "text-red-400 no-underline"
              }`}
            >
              Usaid :{" "}
              {row.cell.row.original.usaid_id
                ? row.cell.row.original.usaid_id
                : "NaN"}
            </p>
          </span>
        </div>
      );
    },
  },
  {
    Header: "Action",
    accessor: "action",
    Cell: (row) => {
      return (
        <span>
          {row?.cell?.row?.original?.quantity > 0 ? (
            <button>
              <ViewSource row={row} />{" "}
            </button>
          ) : (
            <span className="text-white font-bold border px-7 py-4 rounded-md bg-red-600 ">
              Sold Out
            </span>
          )}
        </span>
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

const TrackSources = ({ title = "Sourcing" }) => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(10);
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const { data: sourcing, isLoading } = useGetAllSourcesQuery({
    itemsPerPage,
    currentPage,
    searchValue,
  });
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(
    () => (sourcing?.data ? sourcing?.data : []),
    [sourcing?.data]
  );

  const total_data = sourcing?.meta?.total;

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
      {isLoading ? (
        "Loading"
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
      )}
    </>
  );
};

export default TrackSources;
