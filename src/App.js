import React, { useState, useEffect } from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import axios from "axios";
import moment from "moment";

import RepoList from "./Components/RepoList";
import Loading from "./Components/Loading";
import { Button, Box } from "@material-ui/core";

const theme = createTheme();

const App = () => {
  const [repo, setRepo] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [dynamicValue, setDynamicValue] = useState(
    moment().subtract(30, "days").format("YYYY-MM-DD")
  );

  useEffect(() => {
    loadRepo(); // for loading initial Repos
    window.addEventListener("scroll", handleLoadMore);

    return () => {
      window.removeEventListener("scroll", handleLoadMore);
    };
  }, [dynamicValue]);

  const loadRepo = (value) => {
    const DATE_30_DAYS_BEFORE = moment()
      .subtract(30, "days")
      .format("YYYY-MM-DD");
    const DATE_14_DAYS_BEFORE = moment()
      .subtract(14, "days")
      .format("YYYY-MM-DD");
    const DATE_7_DAYS_BEFORE = moment()
      .subtract(7, "days")
      .format("YYYY-MM-DD");

    setDynamicValue(moment().subtract(30, "days").format("YYYY-MM-DD"));

    if (value === 7) {
      setDynamicValue(DATE_7_DAYS_BEFORE);
    } else if (value === 14) {
      setDynamicValue(DATE_14_DAYS_BEFORE);
    } else {
      setDynamicValue(DATE_30_DAYS_BEFORE);
    }

    // Fetching data from Github API
    axios
      .get(
        ` https://api.github.com/search/repositories?q=created:>${dynamicValue}&sort=stars&order=desc&page=${page}`
      )
      .then((resp) => {
        setRepo((prevRepo) => [...prevRepo, ...resp.data.items]);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
    console.log(error);
  };

  const handleLoadMore = () => {
    if (
      window.pageYOffset + window.innerHeight >= window.innerHeight &&
      !loading
    ) {
      loadData();
    }
  };

  const loadData = () => {
    setPage((prevPage) => prevPage + 1);
    setLoading(true);
    loadRepo();
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Button onClick={() => loadRepo(30)}>30 Days</Button>
        <Button onClick={() => loadRepo(14)}>2 Weeks</Button>
        <Button onClick={() => loadRepo(7)}>1 Week</Button>
      </Box>
      <RepoList repo={repo} />
      <Loading />
    </ThemeProvider>
  );
};

export default App;
