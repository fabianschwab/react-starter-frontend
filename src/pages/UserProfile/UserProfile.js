import { useState, useEffect, Fragment } from "react";
import useAxiosJWT from "../../hooks/useAxiosJWT";
import SignOutButton from "../../Components/SignOutButton/SignOutButton";
import { CircularProgress, Box } from "@mui/material";

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
    <Fragment>
      <h1>User</h1>
      <Box>
        {loading ? (
          <CircularProgress />
        ) : (
          <div>
            {error && (
              <div>
                <p>{error.message}</p>
              </div>
            )}
            <div>{data && <p>{data.username}</p>}</div>
          </div>
        )}
      </Box>
      <SignOutButton to={"/"} />
    </Fragment>
  );
};

export default UserProfile;
