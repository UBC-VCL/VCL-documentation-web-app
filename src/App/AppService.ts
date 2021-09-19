import { useAppSelector, useAppDispatch } from '@redux/hooks';
import { selectAuth, authActions } from '@redux/generics/AuthRedux';
import { checkAuth } from '@adapters/authAdapter';
import React from 'react';

export const useHandleCheckAuth = () => {
  const dispatch = useAppDispatch();

  const { refresh_token, isLoggingIn } = useAppSelector(selectAuth);

  React.useEffect(() => {
    if (refresh_token && !isLoggingIn) {
      checkAuth(refresh_token)
        .then((res) => {
          if (res.data) {
            dispatch(authActions.setAccessToken(res.data.access_token));
          } else {
            console.error(res.message);
          }
        })
        .catch(() => console.error('Error: AppService.ts checkAuth call'));
    }
  }, [dispatch, isLoggingIn, refresh_token]);
};
