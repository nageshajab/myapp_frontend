import React, { useState } from "react";

interface Props {
  monthlyexpense: number;
}

const ExpenseSummary: React.FC<Props> = ({}) => {
  const [items] = useState([
    { label: "L& T", value: 32625 },
    { label: "HDFC BANK HL", value: 17318 },
    { label: "HDFC BANK HL2", value: 533 },
    { label: "society maintenance", value: 2000 },
    { label: "mseb", value: 3000 },
    { label: "internet", value: 700 },
    { label: "mobile", value: 1000 },
    { label: "car wash", value: 500 },
    { label: "Monthly Expense", value: 57676 },
    { label: "Six Months Expense", value: 346056 },
    { label: "Yearly Expense", value: 692112 },
  ]);

  return (
    <div>
      <h5>Current Expense</h5>
      {items.map((item, index) => {
        const isSummary =
          item.label === "Monthly Expense" ||
          item.label === "Six Months Expense" ||
          item.label === "Yearly Expense";

        return (
          <div
            key={index}
            className={`row ${
              isSummary ? "bg-warning text-white fw-bold" : ""
            }`}
          >
            <div className="col-md-6">
              <div>{item.label}</div>
            </div>
            <div className="col-md-6">
              <div>{item.value}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ExpenseSummary;
