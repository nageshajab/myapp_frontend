import React from "react";
import type { Item } from "./types";

interface StocksMfSummaryProps {
  form: Item;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const StocksSummary: React.FC<StocksMfSummaryProps> = ({
  form,
  handleChange,
}) => {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <td></td>
          <td>Invested</td>
          <td>Current Val</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Stocks</td>
          <td>
            {" "}
            <input
              type="text"
              name="stocksInvestamount"
              size={(form.stocksInvestamount || 0).toString().length || 1}
              value={form.stocksInvestamount || 0}
              onChange={handleChange}
            />
          </td>
          <td>
            <input
              type="text"
              name="stocksCurrentValue"
              value={form.stocksCurrentValue || 0}
              size={(form.stocksCurrentValue || 0).toString().length || 1}
              onChange={handleChange}
            />
          </td>
        </tr>
        <tr>
          <td>Mutual Fund</td>
          <td>
            {" "}
            <input
              type="text"
              name="mutualFundsInvestAmount"
              size={(form.mutualFundsInvestAmount || 0).toString().length || 1}
              value={form.mutualFundsInvestAmount || 0}
              onChange={handleChange}
            />
          </td>
          <td>
            <input
              type="text"
              name="mutualFundsCurrentValue"
              size={(form.mutualFundsCurrentValue || 0).toString().length || 1}
              value={form.mutualFundsCurrentValue || 0}
              onChange={handleChange}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default StocksSummary;
