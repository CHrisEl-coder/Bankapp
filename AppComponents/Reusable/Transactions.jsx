import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  cn,
  formatAmount,
  formatDateTime,
  removeSpecialCharacters,
} from "@/lib/utils";
import React from "react";
import PropTypes from "prop-types";
import { matchCategoryStyles } from "@/lib/utils";

const Transactions = ({ transactions }) => {
  return (
    <Table>
      <TableHeader className="bg-[#f9fafb]">
        <TableRow>
          <TableHead className="px-2">Transaction</TableHead>
          <TableHead className="px-2">Amount</TableHead>
          <TableHead className="px-2">Status</TableHead>
          <TableHead className="px-2">Date</TableHead>
          <TableHead className="px-2 max-md:hidden">Channel</TableHead>
          <TableHead className="px-2 max-md:hidden">Category</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => {
          const { id, name, pending, amount, date, paymentChannel, category } =
            transaction;

          const style = matchCategoryStyles(category);

          return (
            <TableRow
              key={id}
              className={`${
                pending
                  ? "bg-yellow-50"
                  : amount < 0
                  ? "bg-red-50"
                  : "bg-emerald-50"
              } hover:bg-gray-100 transition-colors duration-200`}
            >
              <TableCell className=" max-w-[250px] pl-2 pr-6">
                <div className=" flex items-center gap-2">
                  <h2 className=" truncate text-12 text-neutral-700 font-semibold">
                    {removeSpecialCharacters(name)}
                  </h2>
                </div>
              </TableCell>
              <TableCell
                className={`${
                  pending
                    ? "text-yellow-600"
                    : amount < 0
                    ? "text-red-600"
                    : "text-emerald-600"
                } pl-2 pr-6 text-[12px] font-medium`}
              >
                {formatAmount(amount)}
              </TableCell>
              <TableCell className="pl-2 pr-6">
                <div
                  className={`flex-center gap-2 border rounded-full py-1 px-2 ${
                    pending ? "border-yellow-500" : "border-emerald-500"
                  }`}
                >
                  <div
                    className={`size-2 rounded-full ${
                      pending ? "bg-neutral-500" : "bg-emerald-500"
                    }`}
                  />
                  <p
                    className={`text-[12px] font-medium ${
                      pending ? "text-yellow-500" : "text-emerald-500"
                    }`}
                  >
                    {" "}
                    {pending ? "Processing" : "Success"}{" "}
                  </p>
                </div>
              </TableCell>
              <TableCell className="min-w-32 pl-2 pr-6 text-[12px] font-medium">
                {formatDateTime(new Date(date)).dateTime}
              </TableCell>
              <TableCell className="max-md:hidden text-[12px] font-medium capitalize pl-2 pr-10 min-w-32">
                {paymentChannel || "N/A"}
              </TableCell>
              <TableCell>
                <div
                  className={cn(
                    "flex gap-2 items-center border-2 rounded-[10px] px-4 py-2 text-[12px] font-medium",
                    style?.borderColor
                  )}
                >
                  <div
                    className={cn(
                      "size-2 rounded-full aspect-square",
                      style?.chipBackgroundColor
                    )}
                  />
                  <p className={cn("lowercase", style.textColor)}>
                    {category || "N/A"}
                  </p>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
Transactions.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
        .isRequired,
      paymentChannel: PropTypes.string,
      category: PropTypes.string,
      type: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Transactions;
