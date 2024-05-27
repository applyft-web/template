import { DEFAULT_DELAYED_TIME } from '../constants';

export const useDelayedExecute = () => (callback: () => void, delay = DEFAULT_DELAYED_TIME) => {
  setTimeout(() => callback(), delay);
};
