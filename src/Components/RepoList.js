import React from "react";
import Repo from "./Repo";
import { Box } from "@material-ui/core";

const RepoList = ({ repo }) => {
  return (
    <Box>
      {repo.map((item, index) => (
        <Repo
          key={index}
          avatar_url={item.owner.avatar_url}
          owner={item.owner.login}
          name={item.name}
          html_url={item.html_url}
          description={item.description}
          stargazers_count={item.stargazers_count}
          open_issues_count={item.open_issues_count}
          created_at={item.created_at}
        />
      ))}
    </Box>
  );
};

export default RepoList;
