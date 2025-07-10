import Image from "next/image";
import Link from "next/link";
import React from "react";
import Card from "./Reusable/Card";
import PropTypes from "prop-types";
import { countTransactionCategories } from "@/lib/utils";
import Category from "./Reusable/Category";

const RightSideBar = ({ banks, user, transaction }) => {
  const categories = countTransactionCategories(transaction);

  return (
    <aside className="right-sidebar">
      <section className="flex flex-col pb-8">
        <div className="profile-banner" />
        <div className="profile">
          <div className="profile-img">
            <span className="text-5xl font-bold text-amber-900">
              {user !== null ? user?.firstName.charAt(0) : "guest"}
            </span>
          </div>

          <div className="profile-details">
            <h1 className="profile-name">
              {user !== null
                ? `${user.firstName} ${user.lastName}`
                : "John Doe"}
            </h1>

            <p className="profile-email">{user.email}</p>
          </div>
        </div>
      </section>

      <section className="banks">
        <div className="flex w-full justify-between">
          <h2 className="header-2"> My Banks</h2>
          <Link href="/" className="flex gap-2">
            <Image src="/icons/plus.svg" width={20} height={20} alt="add" />
            <h2 className="text-14 font-semibold text-gray-600">add bank</h2>
          </Link>
        </div>

        {banks.length > 0 && (
          <div className=" relative flex flex-1 flex-col items-center justify-between gap-5">
            <div className="relative z-10">
              <Card
                key={banks[0].id}
                accounts={banks[0]}
                ownerName={`${user.firstName} ${user.lastName}`}
                showBal={false}
              />
            </div>
            {banks[1] && (
              <div className=" absolute top-8 right-0 z-0 w-[90%]">
                <Card
                  key={banks[1].id}
                  accounts={banks[1]}
                  ownerName={`${user.firstName} ${user.lastName}`}
                  showBal={false}
                />
              </div>
            )}
          </div>
        )}

        <div className="mt-10 flex flex-1 flex-col gap-6">
          <h2 className="header-2">Top categories</h2>
          <div className=" space-y-6">
            {categories.map((category) => (
              <Category key={category.name} category={category} />
            ))}
          </div>
        </div>
      </section>
    </aside>
  );
};

RightSideBar.propTypes = {
  user: PropTypes.any,
  banks: PropTypes.any,
  transaction: PropTypes.any,
};

export default RightSideBar;
