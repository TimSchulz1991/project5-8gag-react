import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { setTokens } from "../utils/utils";

export const useRedirect = (userAuthStatus) => {
  const history = useHistory();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axios.post("/dj-rest-auth/refresh/", {
          refresh: localStorage.getItem("refreshToken"),
        });
        setTokens(data);
        if (userAuthStatus === "loggedIn") {
          history.push("/");
        }
      } catch (err) {
        if (userAuthStatus === "loggedOut") {
          history.push("/");
        }
      }
    };

    handleMount();
  }, [history, userAuthStatus]);
};
