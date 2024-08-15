export interface PlanInfoProps {
  [key: string]: {
    name: string,
    price: number,
    periodPrice: number,
    description: string,
    disclaimer: string,
    product_id: string,
    duration: string,
    currency: string, // 'USD' | 'EUR' | 'MXN',
    currencySymbol: string, // '$' | '€' | 'Mex$',
  };
}

export const PLANS: PlanInfoProps = {
  'bb-monthly-intro7d-699-1499': {
    name: 'bb-monthly-intro7d-699-1499',
    price: 14.99,
    periodPrice: 6.99,
    description: 'monthly',
    disclaimer: 'monthly',
    product_id: '1 month - $14.99',
    duration: '1 month',
    currency: 'USD',
    currencySymbol: '$',
  },
  'bb-monthly-1499': {
    name: 'bb-monthly-1499',
    price: 14.99,
    periodPrice: 14.99,
    description: 'monthly',
    disclaimer: 'monthly',
    product_id: '1 month - $14.99',
    duration: '1 month',
    currency: 'USD',
    currencySymbol: '$',
  },
  'bb-annual-3999': {
    name: 'bb-annual-3999',
    price: 39.99,
    periodPrice: 39.99,
    description: 'annually',
    disclaimer: 'annually',
    product_id: '1 year - $39.99',
    duration: '1 year',
    currency: 'USD',
    currencySymbol: '$',
  },
};
