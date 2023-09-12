import React from "react";

const OrderedItems = ({ data, details }) => {
  const subtotal = details?.total_price;

  return (
    <>
      <div>
        <table className="w-full border-collapse table-fixed dark:border-slate-700 dark:border">
          <thead>
            <tr>
              <th
                colSpan={3}
                className="bg-slate-50 dark:bg-slate-700 dark:text-slate-300 text-xs  font-medium leading-4 uppercase text-slate-600 ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left"
              >
                <span className="block px-6 py-5 font-semibold">ITEM</span>
              </th>
              <th className="bg-slate-50 dark:bg-slate-700 dark:text-slate-300 text-xs  font-medium leading-4 uppercase text-slate-600 ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left">
                <span className="block px-6 py-5 font-semibold">Company</span>
              </th>
              <th className="bg-slate-50 dark:bg-slate-700 dark:text-slate-300 text-xs  font-medium leading-4 uppercase text-slate-600 ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left">
                <span className="block px-6 py-5 font-semibold">QTY</span>
              </th>
              <th className="bg-slate-50 dark:bg-slate-700 dark:text-slate-300 text-xs  font-medium leading-4 uppercase text-slate-600 ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left">
                <span className="block px-6 py-5 font-semibold">PRICE</span>
              </th>
              <th className="bg-slate-50 dark:bg-slate-700 dark:text-slate-300 text-xs  font-medium leading-4 uppercase text-slate-600 ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left">
                <span className="block px-6 py-5 font-semibold">TOTAL</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr
                key={i}
                className="border-b border-slate-100 dark:border-slate-700"
              >
                <td
                  colSpan={3}
                  className="text-slate-900 dark:text-slate-300 text-sm  font-normal ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left px-6 py-4"
                >
                  {item?.product_details?.name}
                </td>
                <td className="text-slate-900 capitalize dark:text-slate-300 text-sm  font-normal ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left px-6 py-4">
                  {item?.product_details?.company}
                </td>
                <td className="text-slate-900 dark:text-slate-300 text-sm  font-normal ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left px-6 py-4">
                  {item?.quantity} {item?.unit}
                </td>
                <td className="text-slate-900 dark:text-slate-300 text-sm  font-normal ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left px-6 py-4">
                  Tk {item?.product_details?.sell_price}
                </td>
                <td className="text-slate-900 dark:text-slate-300 text-sm  font-normal ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left px-6 py-4">
                  Tk {item?.total_price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="md:flex px-6 py-6 items-center">
          <div className="flex-1 text-slate-500 dark:text-slate-300 text-sm">
            <br />
          </div>
          <div className="flex-none min-w-[270px] space-y-3">
            <div className="flex justify-between">
              <span className="font-medium text-slate-600 text-xs dark:text-slate-300 uppercase">
                Sub total:
              </span>
              <span className="text-slate-900 dark:text-slate-300 text-xs">
                Tk {subtotal}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium text-slate-600 text-xs dark:text-slate-300 uppercase">
                VAT 0%
              </span>
              <span className="text-slate-900 dark:text-slate-300 font-bold text-xs">
                TK 0.00
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-slate-600 text-xs dark:text-slate-300 uppercase">
                Delivery charge
              </span>
              <span className="text-slate-900 dark:text-slate-300 font-bold text-xs">
                TK 0.00
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-slate-600 text-sm dark:text-slate-300 uppercase">
                Grand total:
              </span>
              <span className="text-slate-900 dark:text-slate-300 font-bold">
                Tk {subtotal}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderedItems;
