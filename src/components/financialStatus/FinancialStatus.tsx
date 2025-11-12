import { useEffect, useState, useRef } from "react";
import html2canvas from "html2canvas";
import "../../App.css";

import {
  updateFinancialStatus,
  GetFinancialStatus,
} from "../../api/FinancialStatusService";
import ExpenseSummary from "./ExpenseSummary";
import BankSummary from "./BankSummary";
import StocksMfSummary from "./StocksSummary";

import PFSummary from "./PFSummary";
import { toast } from "react-toastify";
import LineChartExample from "./PieChart";

const FinancialStatus = () => {
  const componentRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    Id: "",
    UserId: "",
    LastUpdatedDate: new Date(),

    IciciBankSavingsAccountBalance: 0,
    ICICIFdAmount: 0,

    HdfcBankSavingsAccountBalance: 0,
    HdfcBankFdAmount: 0,

    KotakBankSavingsAccountBalance: 0,
    KotakBankFdAmount: 0,
    SriramFD: 0,

    stocksInvestamount: 0,
    stocksCurrentValue: 0,

    mutualFundsInvestAmount: 0,
    mutualFundsCurrentValue: 0,

    PfEmployeeShare: 0,
    PfEmployerShare: 0,
    pensionContribution: 0,
    userid: localStorage.getItem("token") || "",
  });
  const [totalsavings, settotalsavings] = useState(0);
  const [totalFd, setTotalFd] = useState(0);
  const [stocksCurrentVal, setstocksCurrentVal] = useState(0);
  const [mfCurrentVal, setmfCurrentVal] = useState(0);
  const [pfTotalVal, setpfTotalVal] = useState(0);

  let monthlyexpense = 32625 + 17318 + 533 + 2000 + 3000 + 700 + 1000 + 500;
  useEffect(() => {
    fetchData();
  }, []);

  const handlePrint = () => {
    if (componentRef.current) {
      html2canvas(componentRef.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imgData;
        link.download = "component-image.png";
        link.click();
      });
    } else {
      console.error("Component ref is null");
    }
  };

  const fetchData = async () => {
    setLoading(true);
    const res = await GetFinancialStatus({
      userid: localStorage.getItem("token") || "",
    });
    console.log(res.data);
    setForm({
      Id: res.data.id,
      UserId: res.data.userId,
      LastUpdatedDate: res.data.lastUpdatedDate,
      IciciBankSavingsAccountBalance: res.data.iciciBankSavingsAccountBalance,
      ICICIFdAmount: res.data.iciciFdAmount,
      HdfcBankSavingsAccountBalance: res.data.hdfcBankSavingsAccountBalance,
      HdfcBankFdAmount: res.data.hdfcBankFdAmount,
      KotakBankSavingsAccountBalance: res.data.kotakBankSavingsAccountBalance,
      KotakBankFdAmount: res.data.kotakBankFdAmount,
      SriramFD: res.data.sriramFD,
      stocksInvestamount: res.data.stocksInvestamount,
      stocksCurrentValue: res.data.stocksCurrentValue,
      mutualFundsInvestAmount: res.data.mutualFundsInvestAmount,
      mutualFundsCurrentValue: res.data.mutualFundsCurrentValue,
      PfEmployeeShare: res.data.pfEmployeeShare,
      PfEmployerShare: res.data.pfEmployerShare,
      pensionContribution: res.data.pensionContribution,
      userid: localStorage.getItem("token") || "",
    });

    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const updatedForm = {
        ...form,
        LastUpdatedDate: new Date().toISOString(),
        userId: localStorage.getItem("token") || "",
      };

      await updateFinancialStatus(updatedForm);
      toast.success("Date updated successfully");
    } catch (err) {
      toast.error("Error submitting form");
    } finally {
    }
  };
  return (
    <div className="container mt-4" ref={componentRef}>
      <div className="row">
        <div className="col-md-8">
          <h2 className="mb-3 ">Financial Status</h2>
        </div>

        <div className="col-md-4">
          Last Updated:<b> {new Date(form.LastUpdatedDate).toDateString()}</b>
        </div>
      </div>
      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div>
          <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
            <input type="hidden" name="UserId" value={form.UserId} />
            <input
              type="hidden"
              name="LastUpdatedDate"
              value={new Date().toISOString()}
            />

            <div className="row">
              <div className="col-md-4 component-border ">
                <ExpenseSummary monthlyexpense={monthlyexpense} />
              </div>
              <div className="col-md-1"></div>
              <div className="col-md-7  component-border">
                <BankSummary
                  form={form}
                  handleChange={handleChange}
                  totalsavings={totalsavings}
                  settotalsavings={settotalsavings}
                  totalFd={totalFd}
                  settotalFd={setTotalFd}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 component-border">
                <StocksMfSummary
                  form={form}
                  handleChange={handleChange}
                  setmfCurrentVal={setmfCurrentVal}
                  setstocksCurrentVal={setstocksCurrentVal}
                />
              </div>
              <div className="col-md-1"></div>
              <div className="col-md-6 component-border">
                <PFSummary
                  form={form}
                  handleChange={handleChange}
                  pfTotalVal={pfTotalVal}
                  setpfTotalVal={setpfTotalVal}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                {" "}
                <button type="submit" className="btn btn-primary w-100">
                  Save
                </button>
              </div>
              <div className="col-md-6 bg-warning text-white fw-bold rounded">
                <h4>
                  All{" "}
                  {(
                    Number(totalsavings) +
                    Number(totalFd) +
                    Number(stocksCurrentVal) +
                    Number(mfCurrentVal) +
                    Number(pfTotalVal)
                  ).toLocaleString("en-IN")}
                </h4>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 mt-4 component-border">
                <LineChartExample
                  totalsavings={totalsavings}
                  totalFd={totalFd}
                  totalPf={pfTotalVal}
                  mfCurrentVal={mfCurrentVal}
                  stocksCurrentVal={stocksCurrentVal}
                />
              </div>
            </div>
          </form>
        </div>
      )}
      <button onClick={handlePrint}>Print Component</button>
    </div>
  );
};

export default FinancialStatus;
