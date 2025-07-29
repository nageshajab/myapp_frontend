import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  GetPersonKhataReport,
  GetDistinctPersonNames,
} from "../../api/KhataService";

interface KhataItem {
  id: string;
  title: string;
  amount: number;
  date: string;
  userid: string;
  personName: string;
}

const KhataList = () => {
  const [loading, setLoading] = useState(false);
  const [khataentries, setKhataEntries] = useState<KhataItem>();
  const [selectedPerson, setSelectedPerson] = useState("");
  const [distinctPersons, setDistinctPersons] = useState<string[]>([]);

  const fetchKhataEntries = async () => {
    if (selectedPerson === "") return;
    setLoading(true);
    const res = await GetPersonKhataReport({
      userid: localStorage.getItem("token"),
      personName: selectedPerson,
    });
    console.log(res);
    setKhataEntries(res.data);
    setLoading(false);
  };

  useEffect(() => {
    GetDistinctPersonNames({ userid: localStorage.getItem("token") })
      .then((res) => {
        setDistinctPersons(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Error fetching distinct persons" + err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchKhataEntries();
  }, [selectedPerson]);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Khata Report</h2>
      <div className="row mb-3">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={selectedPerson}
            onChange={(e) => setSelectedPerson(e.target.value)}
          >
            <option value="">Select Person</option>
            {distinctPersons.map((person) => (
              <option key={person} value={person}>
                {person}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4"></div>
      </div>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div>
          {khataentries && (
            <>
              <h1> {khataentries.personName}</h1>
              <br></br>
              <h5>
                Total Udhari:<b> {khataentries.amount}</b>
              </h5>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default KhataList;
