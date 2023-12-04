import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";

export default function Farmer() {
  // const [farmer, setfarmer] = useState([]);

  // var today = new Date();

  // useEffect(() => {
  //   fetch(
  //     `${import.meta.env.VITE_API_URL}/manager/dashboard/farmer_added?date=${
  //       today.getFullYear() +
  //       "-" +
  //       (today.getMonth() + 1) +
  //       "-" +
  //       today.getDate()
  //     }`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setfarmer(data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [me, setMe] = useState([]);
  const [loading, setLoading] = useState(true);

  // console.log(formatDate(startDate), formatDate(endDate));

  const fetchData = (start, end) => {
    const startDateString = formatDate(start);
    const endDateString = formatDate(end);
    setLoading(true);
    let apiUrl = `${
      import.meta.env.VITE_BASE
    }/hq/testForSourceSellingDataExport`;

    if (start && end) {
      console.log(startDateString, endDateString);
      apiUrl = `${
        import.meta.env.VITE_API_URL
      }/manager/dashboard/farmer_added?start_date=${startDateString}&end_date=${endDateString}`;
    } else if (start) {
      apiUrl = `${
        import.meta.env.VITE_BASE
      }/hq/testForSourceSellingDataExport?date=${startDateString}`;
    }

    fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("hq-token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMe(data);
          console.log(data);
        } else {
          console.error("Error: Fetched data is not an array:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData(startDate, endDate);
  }, [startDate, endDate]);

  const handleFresh = () => {
    setStartDate(null);
    setEndDate(null);
  };
  function formatDate(date) {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
  }
  const excel_data = me.map((datewise) => {
    return {
     " Farmer ID": datewise?.farmer_df_id,
        "Participant ID": datewise?.participant_id,
        "Participant Name": datewise?.participant_name,
        Commodity: datewise?.commodity,
        Unit: datewise?.unit,
        Quantity: datewise?.qty_sold,
        Price: datewise?.price,
        Village: datewise?.village,
        MicroEnterproner_Name : datewise?.me_name,
        

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

  return (
    <>
  <div className="flex bg-slate-900 md:hidden lg:hidden xl:hidden 2xl:hidden block sm:block p-4"></div>
  <div className="dark:bg-slate-800 rounded-md dark:text-slate-300 text-slate-500 bg-slate-300 font-poppins">
    <div className="flex justify-between">
      <h1 className="mt-5 font-bold p-5 text-2xl font-Dosis">Sales onboard</h1>

      <div className="flex flex-col sm:flex-row  gap-3 font-Dosis p-5">
        <div className=" text-sm mb-2">
          <p className=" mb-2">Start Date</p>
          <DatePicker
            className="border border-slate-600 dark:bg-slate-700 dark:text-slate-300 rounded px-4 py-2"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>

        <button
          className="w-full sm:w-28 mt-3 sm:mt-7 border-slate-400 hover:bg-slate-400 bg-green-900 text-white text-xs font-bold h-10  px-4 rounded border"
          onClick={handleExport}
        >
          Excel
        </button>

        <button
          onClick={handleFresh}
          className="w-full sm:w-28 mt-3 sm:mt-7 border-slate-400 hover:bg-slate-400 bg-slate-300 text-slate-700 font-bold h-10 px-4 rounded border"
        >
          Clear
        </button>
      </div>
    </div>

    <div>
      {loading ? (
        <p className=" p-5">Loading...</p>
      ) : (
        <div className=" overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
            <thead className="bg-slate-200 dark:bg-slate-700">
              <tr className="text-sm">
                <th scope="col" className="px-6 py-4">
                  Farmer ID
                </th>
                <th scope="col" className="px-6 py-4">
                  Participate Id
                </th>
                <th scope="col" className="px-6 py-4">
                  Participate name
                </th>
                <th scope="col" className="px-6 py-4">
                  Commodity
                </th>
                <th scope="col" className="px-6 py-4">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-4">
                  Price
                </th>
                <th scope="col" className="px-6 py-4">
                  Village
                </th>
                <th scope="col" className="px-6 py-4">
                  ME Name
                </th>
              </tr>
            </thead>

            <tbody className=" divide-y divide-slate-100 dark:divide-slate-700">
              {me.map((me, index) => (
                <tr
                  key={index}
                  className="bg-white text-center   text-sm divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"
                >
                  <td className="px-6 py-4  ">{me.farmer_df_id}</td>
                  <td className="px-6 py-4">{me.participant_id}</td>
                  <td className="px-6 py-4">{me.participant_name}</td>
                  <td className="px-6 py-4">{me.commodity}</td>
                  <td className="px-6 py-4">

                    {me.qty_sold} {me.unit}
                  </td>
                  
                  <td className="px-6 py-4">{me.price}</td>
                  <td className="px-6 py-4">{me.village}</td>
                  <td className="px-6 py-4">{me.me_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>
</>

  );
}
