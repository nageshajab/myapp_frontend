import React from "react";
import type { Item } from "./types";

interface PFSummaryProps {
  form: Item;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
//const BankSummary: React.FC<BankSummaryProps> = ({ form, handleChange }) => {
const PFSummary: React.FC<PFSummaryProps> = ({ form, handleChange }) => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>PF Employee Share</td>
            <td>
              {" "}
              <input
                type="text"
                name="PfEmployeeShare"
                size={(form.PfEmployeeShare || 0).toString().length || 1}
                value={form.PfEmployeeShare || 0}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>PF Employer Share</td>
            <td>
              {" "}
              <input
                type="text"
                name="PfEmployerShare"
                size={(form.PfEmployerShare || 0).toString().length || 1}
                value={form.PfEmployerShare || 0}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>Pension Contribution</td>
            <td>
              {" "}
              <input
                type="text"
                name="pensionContribution"
                size={(form.pensionContribution || 0).toString().length || 1}
                value={form.pensionContribution || 0}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>Total PF</td>
            <td>
              {Number(form.PfEmployeeShare) +
                Number(form.PfEmployerShare) +
                Number(form.pensionContribution)}{" "}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PFSummary;
