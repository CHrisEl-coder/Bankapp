import React from "react";
import PropTypes from "prop-types";
import Counter from "./Reusable/Counter";
import DougnutChart from "./Reusable/DougnutChart";

const TotalBal = ({ bankAcc = [], banks, currentBal }) => {
  return (
    <section className=" total-balance">
      <div className=" total-balance-chart">
        <DougnutChart acc={bankAcc} />
      </div>

      <div className=" flex flex-col gap-6">
        <h2 className="header-2">Accounts: {banks}</h2>

        <div className=" flex flex-col gap-2">
          <p className=" total-balance-label">Current Bal:</p>

          <p className="total-balance-amount flex-center gap-2">
            <Counter amount={currentBal} />
          </p>
        </div>
      </div>
    </section>
  );
};

TotalBal.propTypes = {
  bankAcc: PropTypes.array,
  banks: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  currentBal: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default TotalBal;
