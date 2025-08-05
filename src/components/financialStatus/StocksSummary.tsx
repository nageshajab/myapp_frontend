import React, { useEffect } from "react";
import type { Item } from "./types";
import { Tooltip } from "react-tooltip";

interface StocksMfSummaryProps {
  form: Item;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setmfCurrentVal: (mfCurrentVal: number) => void;
  setstocksCurrentVal: (stocksCurrentVal: number) => void;
}

const StocksSummary: React.FC<StocksMfSummaryProps> = ({
  form,
  handleChange,
  setmfCurrentVal,
  setstocksCurrentVal,
}) => {
  useEffect(() => {
    setmfCurrentVal(Number(form.mutualFundsCurrentValue));
  }, [form.mutualFundsCurrentValue]);

  useEffect(() => {
    setstocksCurrentVal(Number(form.stocksCurrentValue));
  }, [form.stocksCurrentValue]);

  return (
    <div>
      <Tooltip id="my-tooltip" />
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
            <td
              data-tooltip-id="my-tooltip"
              data-tooltip-content="I have 2 demat account. First is Grow app - demat acc no- 1208870372250115. Second Icici Direct- acc id 8503333634"
            >
              Mutual Fund
            </td>

            <td>
              {" "}
              <input
                type="text"
                name="mutualFundsInvestAmount"
                size={
                  (form.mutualFundsInvestAmount || 0).toString().length || 1
                }
                value={form.mutualFundsInvestAmount || 0}
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="mutualFundsCurrentValue"
                size={
                  (form.mutualFundsCurrentValue || 0).toString().length || 1
                }
                value={form.mutualFundsCurrentValue || 0}
                onChange={handleChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StocksSummary;
