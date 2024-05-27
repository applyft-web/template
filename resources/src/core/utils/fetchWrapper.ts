interface Options {
  body?: object;
  headers?: object;
}

interface ConfigProps extends RequestInit {
  method?: string;
  body?: string;
  headers?: HeadersInit;
}

export const fetchWrapper = (url: string, { body, headers, ...customConfig }: Options = {}, method: string = 'POST') => {
  const customHeaders = {
    'Content-Type': 'application/json',
    ...headers
  };

  const config: ConfigProps = {
    method: body ? method : 'GET',
    ...customConfig,
    headers: customHeaders,
  };

  if (body) {
    config.body = JSON.stringify(body)
  }

  return window
    .fetch(url, config)
    .then(async response => {
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data)
      }
    })
};
