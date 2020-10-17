const initialState = {
  orderId: undefined,
  orderAmount: 0,
  orderName: undefined,
  merchantId: undefined,
  merchantName: undefined,
  paymentStatus: null,
};

export const RECEIVING_CARD_DETAILS = "RECEIVING_CARD_DETAILS";
export const OTP_SENDING = "OTP_SENDING";
export const OTP_SENT_SUCCESSFULLY = "OTP_SENT_SUCCESSFULLY";
export const OTP_VERIFYING = "OTP_VERIFYING";
export const PAYMENT_SUCCESSFULL = "PAYMENT_SUCCESSFULL";
export const PAYMENT_FAILED = "PAYMENT_FAILED";

const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INITIATE_PAYMENT":
      return {
        ...state,
        ...action.payload,
        paymentStatus: RECEIVING_CARD_DETAILS,
      };
    case "SEND_OTP":
      return { ...state, paymentStatus: OTP_SENDING };
    case "OTP_SENT_SUCCESSFULLY":
      return { ...state, paymentStatus: OTP_SENT_SUCCESSFULLY };
    case "OTP_VERIFYING":
      return { ...state, paymentStatus: OTP_VERIFYING };
    case "PAYMENT_SUCCESSFULL":
      return { ...state, paymentStatus: PAYMENT_SUCCESSFULL };
    case "PAYMENT_FAILED":
      return { ...state, paymentStatus: PAYMENT_FAILED };
    default:
      return state;
  }
};

/* Action creaters to dispatch each actions */
export const setPaymentDetails = (payload) => ({
  type: "INITIATE_PAYMENT",
  payload,
});

export const generateOTP = () => ({
  type: "OTP_SENT_SUCCESSFULLY",
});

export default paymentReducer;
