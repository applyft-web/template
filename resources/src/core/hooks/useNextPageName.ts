import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { selectFlow } from '../store/app';

export const useNextPageName = (skipCount = 0) => {
  const location = useLocation();
  const current = location.pathname;
  const flow = useSelector(selectFlow);
  
  return flow[flow.indexOf(current) + 1 + skipCount];
};
