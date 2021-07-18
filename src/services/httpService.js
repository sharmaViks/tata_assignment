const postData = (data,url) =>{
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credential:'include'
  };
  return fetch(url, requestOptions).then(handleResponse);
}

const deleteData = (data,url) =>{
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

const getData = (url) =>{
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };
  return fetch(url, requestOptions).then(handleGetResponse);
}

const handleResponse = async (response) => {
  let data = await response.json();
  let message = (data && data.message) || response.statusText;
  if (!response.ok) {
    return Promise.reject(message);
  }
  return message;
};

const handleGetResponse = async (response) => {
  let data = await response.json();
  data = data ? data : (data && data.message) || response.statusText;
  if (!response.ok) {
    if (response.status === 401) {
      // auto logout if 401 response returned from api
      //logout();
      // location.reload(true);
      return null;
    }
    return Promise.reject(data);
  }
  return data;
};

export const httpService = {
  postData,
  getData,
  deleteData
};

