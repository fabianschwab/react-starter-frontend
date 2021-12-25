import { useState, useEffect } from "react";
import useAxiosJWT from "../../hooks/useAxiosJWT";
import SignOutButton from "../../Components/SignOutButton/SignOutButton";

const UserProfile = () => {
  const { response, loading, error } = useAxiosJWT({
    method: "get",
    url: `/profile`,
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    if (response !== null) {
      setData(response);
    }
  }, [response]);

  return (
    <div>
      <h1>User</h1>

      {loading ? (
        <p>loading...</p>
      ) : (
        <div>
          {error && (
            <div>
              <p>{error.message}</p>
            </div>
          )}
          <div>{data && <p>{data.username}</p>}</div>
          <SignOutButton to={"/"} />
        </div>
      )}
    </div>
  );
};

export default UserProfile;
