import React, { useState, useEffect } from "react";

import Axios from "axios";
import RecipeCard from "./RecipeCard";
import { Grid, makeStyles } from "@material-ui/core";

const FETCHING_DATA = "FETCHING_DATA";
const FETCHING_SUCCESS = "FETCHING_SUCCESS";
const FETCHING_FAILED = "FETCHING_FAILED";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "85%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "3rem",
    marginBottom: "2rem",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginLeft: "1rem",
      marginRight: "1rem",
    },
    [theme.breakpoints.down("sm")]: {
      width: "85%",
      marginLeft: "auto",
      marginRight: "auto",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      marginLeft: "1rem",
      marginRight: "1rem",
    },
  },
}));

const Home = () => {
  const [status, setStatus] = useState(FETCHING_DATA);
  const [recipes, setRecipes] = useState([]);

  const classes = useStyles();
  useEffect(() => {
    Axios.get(`http://starlord.hackerearth.com/recipe`)
      .then((res) => {
        setRecipes(res.data);
        setStatus(FETCHING_SUCCESS);
      })
      .catch((err) => {
        setStatus(FETCHING_FAILED);
        console.log(err);
      });
  }, []);

  if (status === FETCHING_DATA) return <div>{"Loading"}</div>;
  else if (status === FETCHING_SUCCESS)
    return (
      <Grid container spacing={6} className={classes.root}>
        {recipes.map((recipe) => (
          <Grid item xs={12} lg={3} md={4} sm={6} key={recipe.id}>
            <RecipeCard {...recipe} />
          </Grid>
        ))}
      </Grid>
    );
  else if (status === FETCHING_FAILED) return <div>{"Error getting data"}</div>;
};

export default Home;
