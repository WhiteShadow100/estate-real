interface IFetch <T>{
    url: string,
    method: 'POST' | 'GET'
    successCallback?: (data: T) => void,
    completeCallback?: () => void,
    errorCallback?: (err: Error) => void,
}

export default function APICall<T>({
    url,
    method,
    successCallback,
    completeCallback,
    errorCallback
}: IFetch<T>) {
  fetch(
    '/api' + url,
    {
      method,
      cache: "no-store"
    }
  )
  .then((response) => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  })
  .then((data: T) => {
    successCallback && successCallback(data);
  })
  .finally(() => {
    completeCallback && completeCallback();
  })
  .catch(error => {
    errorCallback && errorCallback(error);
  });
}