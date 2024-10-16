/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_ENV: 'development' | 'production';
    REACT_APP_PRODUCT_NAME: string;
    REACT_APP_META_TITLE: string;
    REACT_APP_META_DESCRIPTION: string;
    REACT_APP_META_THEME_COLOR: string;
    REACT_APP_API_URL: string;
    REACT_APP_STRIPE_PK: string;
    REACT_APP_STRIPE_NAME: string;
    REACT_APP_AMPLITUDE_KEY: string;
    REACT_APP_GISMART_KEY: string;
    REACT_APP_GISMART_DOMAIN: string;
    REACT_APP_GISMART_AUTH_TOKEN: string;
    REACT_APP_LOCKER_STUDIO_DOMAIN: string;
    REACT_APP_FB_PIXEL_ID: string;
    REACT_APP_ENABLE_PAYPAL: string;
    REACT_APP_GOOGLE_API_KEY: string;
    REACT_APP_GOOGLE_PAY_MERCHANT_ID: string;
    REACT_APP_GOOGLE_MEASUREMENT_ID: string;
    REACT_APP_GOOGLE_ADS_ID: string;
    REACT_APP_TIKTOK_PIXEL_ID: string;
    REACT_APP_HOTJAR_ID: string;
  }
}
