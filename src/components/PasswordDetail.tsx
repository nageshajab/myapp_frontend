import React, { useEffect, useState } from "react";
import { getPassword } from "../api/passwordService";
import { useParams } from "react-router-dom";

const PasswordDetail: React.FC = () => {
  const { id } = useParams();
  const [entry, setEntry] = useState<any>(null);

  useEffect(() => {
    getPassword(id!).then((res) => setEntry(res.data));
  }, [id]);

  if (!entry) return <div>Loading...</div>;

  return (
    <div>
      <h2>Password Detail</h2>
      <p>
        <strong>System URL:</strong> {entry.systemUrl}
      </p>
      <p>
        <strong>Username:</strong> {entry.username}
      </p>
      <p>
        <strong>Password:</strong> {entry.password}
      </p>
    </div>
  );
};

export default PasswordDetail;
