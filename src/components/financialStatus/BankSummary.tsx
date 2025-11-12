import React, { useEffect, useState } from "react";
import type { Item } from "./types";

interface BankSummaryProps {
  form: Item;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  totalsavings: number;
  settotalsavings: (totalBankSavings: number) => void;
  totalFd: number;
  settotalFd: (totalFd: number) => void;
}

const BankSummary: React.FC<BankSummaryProps> = ({
  form,
  handleChange,
  totalsavings,
  settotalsavings,
  totalFd,
  settotalFd,
}) => {
  const [averageInBank, setAverageInBank] = useState(0);
  const [iciciTotal, setIciciTotal] = useState(0);
  const [hdfcTotal, sethdfcTotal] = useState(0);
  const [kotakTotal, setkotakTotal] = useState(0);
  const [totalBankBalance, setTotalBankBalance] = useState(0);

  //calculate totalsavings
  useEffect(() => {
    settotalsavings(
      form.IciciBankSavingsAccountBalance +
        form.HdfcBankSavingsAccountBalance +
        form.KotakBankSavingsAccountBalance
    );
  }, [
    form.IciciBankSavingsAccountBalance,
    form.HdfcBankSavingsAccountBalance,
    form.KotakBankSavingsAccountBalance,
  ]);

  useEffect(() => {
    setIciciTotal(form.IciciBankSavingsAccountBalance + form.ICICIFdAmount);
  }, [form.IciciBankSavingsAccountBalance, form.ICICIFdAmount]);

  useEffect(() => {
    sethdfcTotal(form.HdfcBankSavingsAccountBalance + form.HdfcBankFdAmount);
  }, [form.HdfcBankSavingsAccountBalance, form.HdfcBankFdAmount]);

  useEffect(() => {
    setkotakTotal(form.KotakBankSavingsAccountBalance + form.KotakBankFdAmount);
  }, [form.KotakBankSavingsAccountBalance, form.KotakBankFdAmount]);

  //calculate totalfd
  useEffect(() => {
    settotalFd(
      Number(form.ICICIFdAmount) +
        Number(form.HdfcBankFdAmount) +
        Number(form.KotakBankFdAmount) +
        Number(form.SriramFD)
    );
  }, [
    form.ICICIFdAmount,
    form.HdfcBankFdAmount,
    form.KotakBankFdAmount,
    form.SriramFD,
  ]);

  useEffect(() => {
    setTotalBankBalance(Number(totalsavings) + Number(totalFd));
  }, [totalsavings, totalFd]);

  useEffect(() => {
    setAverageInBank(Math.round(Number(totalBankBalance) / 3));
  }, [totalBankBalance]);

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <td>Bank</td>
          <td>Savings</td>
          <td>FD</td>
          <td>Total</td>
          <td>Need transfer</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>ICICI</td>
          <td>
            {" "}
            <input
              type="text"
              name="IciciBankSavingsAccountBalance"
              size={
                (form.IciciBankSavingsAccountBalance || 0).toString().length ||
                1
              }
              value={form.IciciBankSavingsAccountBalance || 0}
              onChange={handleChange}
            />
          </td>
          <td>
            {" "}
            <input
              type="text"
              name="ICICIFdAmount"
              size={(form.ICICIFdAmount || 0).toString().length || 1}
              value={form.ICICIFdAmount || 0}
              onChange={handleChange}
            />
          </td>
          <td>{iciciTotal}</td>
          <td>{Number(averageInBank) - Number(iciciTotal)}</td>
        </tr>
        <tr>
          <td>HDFC</td>
          <td>
            {" "}
            <input
              type="text"
              name="HdfcBankSavingsAccountBalance"
              value={form.HdfcBankSavingsAccountBalance || 0}
              size={
                (form.HdfcBankSavingsAccountBalance || 0).toString().length || 1
              }
              onChange={handleChange}
            />
          </td>
          <td>
            {" "}
            <input
              type="text"
              name="HdfcBankFdAmount"
              value={form.HdfcBankFdAmount || 0}
              size={(form.HdfcBankFdAmount || 0).toString().length || 1}
              onChange={handleChange}
            />
          </td>
          <td>{hdfcTotal}</td>
          <td>{Number(averageInBank) - Number(hdfcTotal)}</td>
        </tr>
        <tr>
          <td>Kotak</td>
          <td>
            {" "}
            <input
              type="text"
              name="KotakBankSavingsAccountBalance"
              value={form.KotakBankSavingsAccountBalance || 0}
              size={
                (form.KotakBankSavingsAccountBalance || 0).toString().length ||
                1
              }
              onChange={handleChange}
            />
          </td>
          <td>
            {" "}
            <input
              type="text"
              name="KotakBankFdAmount"
              value={form.KotakBankFdAmount || 0}
              size={(form.KotakBankFdAmount || 0).toString().length || 1}
              onChange={handleChange}
            />
          </td>
          <td>{kotakTotal}</td>
          <td>{Number(averageInBank) - Number(kotakTotal)}</td>
        </tr>
        <tr>
          <td>Sriram Finance</td>
          <td> </td>
          <td>
            {" "}
            <input
              type="text"
              name="SriramFD"
              value={form.SriramFD || 0}
              size={(form.SriramFD || 0).toString().length || 1}
              onChange={handleChange}
            />
          </td>
          <td>{form.SriramFD}</td>
          <td>{Number(averageInBank) - Number(form.SriramFD)}</td>
        </tr>
        <tr>
          <td>Total</td>
          <td>{totalsavings}</td>
          <td>{totalFd}</td>
          <td>{totalBankBalance}</td>
          <td>{}</td>
        </tr>
        <tr>
          <td>Average in Bank</td>
          <td colSpan={4}>{Math.round(Number(totalBankBalance) / 3)}</td>
        </tr>
        <tr>
          <td>Need FD</td>
          <td colSpan={4}> {692112 - Number(totalFd)}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default BankSummary;
