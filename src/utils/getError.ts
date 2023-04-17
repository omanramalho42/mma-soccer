const getError = (error: any) => error.response && error.response.data && error.response.data.message
  ? error.response.data.message
  : error.message;

export { getError };