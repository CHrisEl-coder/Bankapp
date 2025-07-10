import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import React from "react";
import PropTypes from "prop-types";
import { BankTabItem } from "./BankTabsItem";
import BankInfo from "./BankInfo";
import Transactions from "./Transactions";
import { Pagination } from "./Pagination";

const RecentTransactions = ({
  accounts,
  transactions = [],
  page = 1,
  appwriteItemId,
}) => {
  const displayedRows = 10;
  const totalPages = Math.ceil(transactions.length / displayedRows);
  const lastTransactionIndex = page * displayedRows;
  const firstTransactionIndex = lastTransactionIndex - displayedRows;

  const currentRows = transactions.slice(
    firstTransactionIndex,
    lastTransactionIndex
  );
  return (
    <section className="recent-transactions">
      <header className=" flex items-center justify-between mb-4">
        <h2 className=" text-14 font-medium text-neutral-600 dark:text-neutral-300">
          Recent Transactions
        </h2>

        <Link
          href={`/history/?id=${appwriteItemId}`}
          className=" text-12 font-semibold text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
        >
          View All
        </Link>
      </header>

      <Tabs defaultValue={appwriteItemId}>
        <TabsList className="w-full">
          {accounts.map((account) => (
            <TabsTrigger
              key={account.id}
              value={account.appwriteItemId}
              className="w-full flex gap-2 justify-center text-center"
            >
              <BankTabItem
                key={account.id}
                account={account}
                appwriteItemId={appwriteItemId}
              />
            </TabsTrigger>
          ))}
        </TabsList>

        {accounts.map((account) => (
          <TabsContent
            key={account.id}
            value={account.appwriteItemId}
            className=" space-y-6"
          >
            <BankInfo
              account={account}
              appwriteItemId={appwriteItemId}
              type={"full"}
            />
          </TabsContent>
        ))}
      </Tabs>

      <Transactions transactions={currentRows} />
      {totalPages > 1 && (
        <div className="my-4 w-full">
          <Pagination totalPages={totalPages} page={page} />
        </div>
      )}
    </section>
  );
};
RecentTransactions.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.object).isRequired,
  transactions: PropTypes.array,
  page: PropTypes.number,
  appwriteItemId: PropTypes.string,
};

export default RecentTransactions;
