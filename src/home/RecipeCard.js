import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  makeStyles,
  Typography,
} from "@material-ui/core";

import { useDispatch } from "react-redux";
import { setPaymentDetails } from "../redux/reducers/paymentReducer";
import { useHistory } from "react-router";

const useStyles = makeStyles({
  cardRoot: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardContent: {
    flexGrow: 1,
  },
  recipeImage: {
    height: 200,
  },
  orderButton: {
    height: "3rem",
    width: "100%",
    bottom: 0,
    borderRadius: 0,
    color: "#ffffff",
    backgroundColor: "#099E44",
    ["&:hover"]: {
      backgroundColor: "#098344",
    },
  },
  categoryChip: {
    marginBottom: "0.35rem",
    textTransform: "uppercase",
    fontSize: "0.5rem",
  },
});

const RecipeCard = ({ name, image, category, label, price, description }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const goToPayment = () => {
    dispatch(
      setPaymentDetails({
        orderId: Math.floor(Math.random() * 1000),
        orderAmount: price,
        orderName: name,
        merchantId: "ABC-XYZ",
        merchantName: "Balaraman's Recipe",
      })
    );
    history.push('/payment?auth="sample_id"');
  };

  return (
    <Card className={classes.cardRoot}>
      <CardMedia className={classes.recipeImage} image={image} title={name} />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          {name}
        </Typography>
        <Chip
          size="small"
          className={classes.categoryChip}
          label={category}
          color="primary"
          variant="outlined"
        />
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
      <Button
        className={classes.orderButton}
        variant="contained"
        disableElevation
        size="small"
        onClick={goToPayment}
      >
        {`Order $${price}`}
      </Button>
    </Card>
  );
};

export default RecipeCard;
