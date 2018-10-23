const BASE_URL = 'http://localhost:3001';

export default store => next => action => {
  if (!action.api) return next(action);

  const { endpoint, method } = action.api;
  let { body, headers } = action.api;

  const defaultHeaders = {};
  if (body) {
    body = JSON.stringify(body);
    console.log('body', body);
    defaultHeaders['Content-type'] = 'application/json';
  }

  const token = store.getState() ? store.getState().token : undefined;
  if (token) {
    defaultHeaders.Authorization = `Bearer ${token}`;
  }

  headers = {
    ...defaultHeaders,
    ...headers
  };

  next({
    ...action,
    type: `${action.type}_REQUEST`
  });

  fetch(`${BASE_URL}${endpoint}`, {
    method: method || 'GET',
    body,
    headers
  })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        store.dispatch({
          ...action,
          type: `${action.type}_ERROR`,
          api: undefined,
          error: data.error
        });
      } else {
        store.dispatch({
          ...action,
          type: `${action.type}_SUCCESS`,
          api: undefined,
          data
        });
      }
    })
    .catch(error => {
      store.dispatch({
        ...action,
        type: `${action.type}_FAILURE`,
        api: undefined,
        error: error
      });
    });
};
