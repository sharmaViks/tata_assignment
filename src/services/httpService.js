const postData = (data,url) =>{
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credential:'include'
  };
  return fetch(url, requestOptions).then(handleResponse);
}

const handleResponse = async (response) => {
  let data = await response.json();
  let message = (data && data.message) || response.statusText;
  if (!response.ok) {
    return Promise.reject(message);
  }
  return message;
};

export const httpService = {
  postData
};

