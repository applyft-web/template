import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { fetchWrapper } from '../utils';
import {
  API_URL,
  DEFAULT_STRIPE_PK,
  DEFAULT_STRIPE_NAME,
  SESSION_STORAGE_TOKEN_KEY,
  COOKIE_UUID_KEY,
} from '../constants';
import { setShowLoader } from './loader';
import { setShowError } from './error';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';
import { setEventData } from './events';
import { setAnalyticsUserId } from '../../analytics';

export const signupSlice = createSlice({
  name: 'signup',
  initialState: {
    uuid: '',
    email: '',
    name: '',
    emailValidity: false,
    token: '',
    btToken: '',
    deeplinkToken: '',
    deepLinkUrl: '',
    userId: '',
    isSuccess: false,
    stripe: {
      key: null,
      name: null,
    },
    paymentProvider: null,
    paymentSettingsStatus: null,
    threeDS: 0,
  },
  reducers: {
    setUserUuid: (state, action: PayloadAction<string>) => {
      state.uuid = action.payload
    },
    setEmail: (state, action) => {
      const { email, isValid } = action.payload;
      state.email = email;
      state.emailValidity = isValid;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setRequestResult: (state, action) => {
      const {
        access_token,
        deeplink_token,
        entity: { external_user_id },
      } = action.payload;
      state.isSuccess = true;
      state.token = access_token;
      state.userId = external_user_id;
      state.deeplinkToken = deeplink_token;
    },
    setDeepLinkUrl: (state, action: PayloadAction<string>) => {
      state.deepLinkUrl = action.payload;
    },
    setUserToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    setPaymentSettingStatus: (state, action) => {
      state.paymentSettingsStatus = action.payload;
    },
    setStripeData: (state, action) => {
      state.stripe = action.payload;
    },
    setBtToken: (state, action: PayloadAction<string>) => {
      state.btToken = action.payload;
    },
    setPaymentProvider: (state, action) => {
      state.paymentProvider = action.payload;
    },
    setThreeDS: (state, action: PayloadAction<number>) => {
      state.threeDS = action.payload;
    },
  },
});

export const {
  setUserUuid,
  setUserToken,
  setEmail,
  setName,
  setRequestResult,
  setPaymentSettingStatus,
  setPaymentProvider,
  setStripeData,
  setBtToken,
  setThreeDS,
  setDeepLinkUrl,
} = signupSlice.actions;

interface SignupParams {
  readonly email: string;
  readonly user_uuid: string;
  readonly landing_type: string;
  readonly name?: string;
}

export const sendSignupRequest = ({
  email,
  name,
  user_uuid,
  landing_type,
}: SignupParams) => (dispatch: Dispatch) => {
  dispatch(setShowLoader(true));

  const params = {
    registration_source: 'email',
    email,
    user_uuid,
    landing_type,
    name: name ?? email,
  };

  fetchWrapper(`${API_URL}/signup`, { body: params })
    .then((data) => {
      window.sessionStorage.setItem(SESSION_STORAGE_TOKEN_KEY, data.data.access_token);
      dispatch(setRequestResult(data.data));
      getPaymentSettings(data.data.access_token)(dispatch);
      setAnalyticsUserId(data.data.entity.external_user_id);
    })
    .catch((error) => {
      dispatch(setShowError(error.errors?.messages || 'Failed to create an account'));
      dispatch(setShowLoader(false));
    })
};

export const getPaymentSettings = (token: string, attemptNum: number = 0) => (dispatch: Dispatch) => {
  let stripeParams: {[key: string]: string} = {
      key: DEFAULT_STRIPE_PK,
      name: DEFAULT_STRIPE_NAME,
    },
    status: null | string = null,
    paymentGateway: null | string = null;

  fetchWrapper(
    `${API_URL}/users/me/payments-settings`,
    {headers: { Authorization: `Bearer ${token}` }}
  )
    .then((data) => {
      const {
        stripe_publishable_key,
        stripe_account_name,
        braintree_client_token,
        payment_gateway,
        request_three_d_secure,
        // experiments,
      } = data;
      paymentGateway = payment_gateway || 'stripe';
      dispatch(setBtToken(braintree_client_token || null));
      dispatch(setThreeDS(request_three_d_secure || 0));
      status = 'success';
      if (stripe_publishable_key) {
        stripeParams = {
          key: stripe_publishable_key,
          name: stripe_account_name,
        }
      }
    })
    .catch((error) => {
      console.log(error);
      if (attemptNum < 2) {
        setTimeout(() => getPaymentSettings(token, ++attemptNum)(dispatch),1000);
      } else {
        status = 'fail';
        paymentGateway = 'stripe';
      }
    })
    .then(() => {
      dispatch(setPaymentProvider(paymentGateway));
      dispatch(setStripeData(stripeParams));
      dispatch(setPaymentSettingStatus(status));
    })
    .then(() => dispatch(setShowLoader(false)))
};

export const getUserInfo = (token: string) => (dispatch: Dispatch) => {
  fetchWrapper(
    `${API_URL}/users/me`,
    {headers: { Authorization: `Bearer ${token}` }}
  )
    .then((data) => {
      window.sessionStorage?.setItem(SESSION_STORAGE_TOKEN_KEY, data.access_token);
      setUuid(data.data.entity.uuid)(dispatch);
      dispatch(setRequestResult({ ...data.data, access_token: token }));
      setAnalyticsUserId(data.data.entity.external_user_id);
    })
    .catch((error) => console.error(error));
};

export const setUuid = (userUuid: string = '') => (dispatch: Dispatch) => {
  const cookieUuid = Cookies.get(COOKIE_UUID_KEY);
  const generatedUuid = uuidv4();
  const uuid = userUuid || cookieUuid || generatedUuid;

  if (!cookieUuid) Cookies.set(COOKIE_UUID_KEY, uuid, { expires: 365 });
  dispatch(setUserUuid(uuid));
  dispatch(setEventData({ userUuid: uuid }));
};

export const selectIsSuccess = (state: any) => state.signup.isSuccess;
export const selectPaymentSettingsStatus = (state: any) => state.signup.paymentSettingsStatus;
export const selectEmail = (state: any) => state.signup.email;
export const selectName = (state: any) => state.signup.name;
export const selectEmailValidity = (state: any) => state.signup.emailValidity;
export const selectUuid = (state: any) => state.signup.uuid;
export const selectToken = (state: any) => state.signup.token;
export const selectPaymentProvider = (state: any) => state.signup.paymentProvider;
export const selectStripe = (state: any) => state.signup.stripe;
export const selectBtToken = (state: any) => state.signup.btToken;
export const selectDeeplinkToken = (state: any) => state.signup.deeplinkToken;
export const selectDeepLinkUrl = (state: any) => state.signup.deepLinkUrl;
export const selectThreeDS = (state: any) => state.signup.threeDS;

export default signupSlice.reducer;