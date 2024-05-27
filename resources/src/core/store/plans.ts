import { createSlice } from '@reduxjs/toolkit';

export const plansSlice = createSlice({
  name: 'plans',
  initialState: {
    showCheckout: false,
    defaultPlanId: '',
    paywallType: 'fullPrice',
    plan: '',
    upsellPlan: '',
    planDetails: null,
    couponDetails: null,
  },
  reducers: {
    setDefaultPlanId: (state, action) => {
      state.defaultPlanId = action.payload;
    },
    setShowCheckout: (state, action) => {
      state.showCheckout = action.payload;
    },
    setPaywallType: (state, action) => {
      state.paywallType = action.payload || 'fullPrice';
    },
    setPlan: (state, action) => {
      state.plan = action.payload;
    },
    setUpsellPlan: (state, action) => {
      state.upsellPlan = action.payload;
    },
    setPlanDetails: (state, action) => {
      state.planDetails = action.payload;
    },
    setCouponDetails: (state, action) => {
      state.couponDetails = action.payload;
    },
  },
});

export const {
  setPlan,
  setUpsellPlan,
  setPaywallType,
  setPlanDetails,
  setShowCheckout,
  setDefaultPlanId,
  setCouponDetails,
} = plansSlice.actions;

export const selectShowCheckout = (state: any) => state.plans.showCheckout;
export const selectPlan = (state: any) => state.plans.plan;
export const selectUpsellPlan = (state: any) => state.plans.upsellPlan;
export const selectPaywallType = (state: any) => state.plans.paywallType;
export const selectPlanDetails = (state: any) => state.plans.planDetails;
export const selectPlanCoupon = (state: any) => state.plans.couponDetails;

export default plansSlice.reducer;
