import { useNavigate } from 'react-router-dom';

export const useCustomNavigate = () => {
  const navigate = useNavigate();

  return (path: string) => navigate(`${path}${window.location.search}`);
};
