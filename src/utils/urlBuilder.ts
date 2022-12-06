export default (
  url: string,
  queryParams: Record<string, string>,
  pathParams?: Record<string, string>
) => {
  let urlWithParams = url;
  if (pathParams) {
    Object.keys(pathParams).forEach((key) => {
      urlWithParams = urlWithParams.replace(`:${key}`, pathParams[key]);
    });
  }
  const urlParams = new URLSearchParams(queryParams);
  return `${urlWithParams}?${urlParams.toString()}`;
};
