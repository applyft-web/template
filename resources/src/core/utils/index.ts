export * from './fetchWrapper';

export const getCssSize = (val: string | number = 0): string => {
  if (!isNaN(+val)) return `${val || 0}px`
  return val.toString();
};
