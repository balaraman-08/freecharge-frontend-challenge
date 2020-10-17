import {
  Button,
  Card,
  CircularProgress,
  FormControl,
  Grid,
  Input,
  InputLabel,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {
  generateOTP,
  OTP_SENDING,
  OTP_SENT_SUCCESSFULLY,
  RECEIVING_CARD_DETAILS,
} from "../redux/reducers/paymentReducer";

const mapStateToProps = (state) => ({
  orderId: state.paymentReducer.orderId,
  orderAmount: state.paymentReducer.orderAmount,
  orderName: state.paymentReducer.orderName,
  merchantId: state.paymentReducer.merchantId,
  merchantName: state.paymentReducer.merchantName,
  paymentStatus: state.paymentReducer.paymentStatus,
});

const useStyles = makeStyles((theme) => ({
  card: {
    width: "80%",
    maxWidth: 360,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "3rem",
    padding: "2rem",
  },
  formControl: {
    width: "100%",
    marginTop: "0.25rem",
    marginBottom: "0.25rem",
  },
}));

const PaymentPage = ({
  orderId,
  orderAmount,
  orderName,
  merchantId,
  merchantName,
  paymentStatus,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [cardNumber, setCardNumber] = useState(undefined);
  const [cardHolderName, setCardHolderName] = useState(undefined);
  const [expiryDate, setExpiryDate] = useState(undefined);
  const [cvv, setCvv] = useState(undefined);
  const [otp, setOTP] = useState(undefined);

  if (!orderId) {
    history.goBack();
  }

  return (
    <div>
      <Card className={classes.card}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography variant="h5">{orderName}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography
              variant="h6"
              color="primary"
            >{`$${orderAmount}`}</Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="cardholder-name">
                {"Card Holder Name"}
              </InputLabel>
              <Input
                fullWidth
                id="cardholder-name"
                value={cardHolderName}
                onChange={(event) => {
                  setCardHolderName(event.target.value);
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="card-number">{"Card Number"}</InputLabel>
              <Input
                type="number"
                maxLength={16}
                fullWidth
                id="card-number"
                value={cardNumber}
                onChange={(event) => {
                  setCardNumber(event.target.value);
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="card-number">{"Expiry Date"}</InputLabel>
              <Input
                type="month"
                fullWidth
                id="card-number"
                value={cardNumber}
                onChange={(event) => {
                  setExpiryDate(event.target.value);
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="card-cvv">{"CVV"}</InputLabel>
              <Input
                type="password"
                maxLength={16}
                fullWidth
                id="card-cvv"
                value={cvv}
                onChange={(event) => {
                  setCvv(event.target.value);
                }}
              />
            </FormControl>
          </Grid>
          {paymentStatus === RECEIVING_CARD_DETAILS && (
            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                color="secondary"
                onClick={() => {
                  dispatch(generateOTP());
                }}
              >
                {"Generate OTP"}
              </Button>
            </Grid>
          )}
          {paymentStatus === OTP_SENDING && (
            <CircularProgress
              size={32}
              style={{ margin: "auto" }}
              color="secondary"
            />
          )}
          {paymentStatus === OTP_SENT_SUCCESSFULLY && (
            <Grid item xs={6}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="card-otp">{"OTP"}</InputLabel>
                <Input
                  type="password"
                  maxLength={6}
                  fullWidth
                  id="card-cvv"
                  value={otp}
                  onChange={(event) => {
                    setOTP(event.target.value);
                  }}
                />
              </FormControl>
            </Grid>
          )}
          {paymentStatus === OTP_SENT_SUCCESSFULLY && (
            <Grid item xs={6}>
              <Button
                variant="contained"
                fullWidth
                color="secondary"
                onClick={() => {
                  if (otp === "123456") {
                    history.push("/success");
                  } else {
                    history.push("/failed");
                  }
                }}
              >
                {"Valdiate OTP"}
              </Button>
            </Grid>
          )}
        </Grid>
      </Card>
    </div>
  );
};

export default connect(mapStateToProps)(PaymentPage);
