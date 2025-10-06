import { useEffect, useState } from "react";
import { read_users } from "../../api/auth";

const PageHomeUser = () => {
  const [users, setUsers] = useState([]);

  async function fetch_users() {
    try {
      const response = await read_users();
      setUsers(response?.data.users);
    } catch (error) {
      console.log("Error fetching data:", error?.response);
    }
  }

  useEffect(() => {
    fetch_users();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div>
        <p className=" font-bold">Hello...</p>
      </div>

      <div className="divider"></div>

      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Full Name</th>
            </tr>
          </thead>
          <tbody>
            {users?.length > 0 && (
              <>
                {users.map((user, i) => (
                  <tr key={user?._id}>
                    <th>{i + 1}</th>
                    <td>{user?.email}</td>
                    <td>{user?.display_name}</td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PageHomeUser;
