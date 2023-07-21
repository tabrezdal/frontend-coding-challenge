import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import {
  Typography,
  ButtonBase,
  Paper,
  Grid,
  Chip,
  Link,
  Box,
} from "@material-ui/core";

const Repo = ({
  avatar_url,
  name,
  html_url,
  owner,
  description,
  stargazers_count,
  open_issues_count,
  created_at,
}) => {
  return (
    <Box>
      <Paper>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase>
              <a
                href={` https://github.com/${owner} `}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img alt="Avatar" src={` ${avatar_url} `} />
              </a>
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h3">
                  <Link
                    href={html_url}
                    color="inherit"
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                  >
                    {name}
                  </Link>
                </Typography>
                <Typography gutterBottom variant="subtitle1">
                  {description}
                </Typography>
                <Chip
                  label={`Stars: ${stargazers_count}`}
                  clickable
                  variant="outlined"
                />
                <Chip
                  label={`Issues: ${open_issues_count}`}
                  clickable
                  variant="outlined"
                />
                <Typography color="primary" inline>
                  Last pushed {moment(created_at).fromNow()} By {owner}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

Repo.propTypes = {
  avatar_url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  html_url: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  stargazers_count: PropTypes.number.isRequired,
  open_issues_count: PropTypes.number.isRequired,
  created_at: PropTypes.string.isRequired,
};

export default Repo;
