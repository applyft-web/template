import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SESSION_STORAGE_TOKEN_KEY } from '../constants';
import { setUserToken, setUuid } from '../store/signup';

export const useSetTokens = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storageToken = window.sessionStorage?.getItem(SESSION_STORAGE_TOKEN_KEY);
    if (storageToken) dispatch(setUserToken(storageToken));

    setUuid()(dispatch);
  });
};
