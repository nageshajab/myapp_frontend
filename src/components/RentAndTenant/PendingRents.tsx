import { useEffect, useState } from "react";
import { GetPendingRents } from "../../api/RentService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const months = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

const PendingRents = () => {
  const [loading, setLoading] = useState(false);
  const [rents, setRents] = useState<string[]>([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const handleExport = () => {
    var text = "Pending Rents:\n\n";
    text += rents.map((item, index) => `${index + 1}. ${item}`).join("\n");
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Copied to clipboard");
    });
  };

  const fetchData = async () => {
    setLoading(true);
    const res = await GetPendingRents({
      userid: localStorage.getItem("token"),
      month: selectedMonth,
      year: selectedYear,
    });
    console.log(res.data.rents);
    setRents(res.data.rents);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [selectedMonth, selectedYear]);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Pending Rents</h2>
      <div className="row mb-3">
        <div className="col-md-4">
          <select
            className="form-select"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
          >
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <button className="btn btn-primary w-100" onClick={handleExport}>
            Export
          </button>
        </div>
      </div>
      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <ul className="list-group">
          {rents?.length === 0 && (
            <div className="text-center my-5">
              <p>No data available</p>
            </div>
          )}
          {rents?.map((item, index) => (
            <li
              key={index + 1}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <div className="mb-1">
                  {index + 1}. {item}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PendingRents;
