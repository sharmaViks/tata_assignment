export const httpService = {
    register
  };
  
  // register user request
  function register(user) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    };
    return fetch(`/api/register`, requestOptions).then(handleResponse);
  }

  const handleResponse = async (response) => {
    let data = await response.json();
    let message = (data && data.message) || response.statusText;
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        //logout();
        // location.reload(true);
      }
      return Promise.reject(message);
    }
    return message;
  };
  