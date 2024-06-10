const apiKey = 'fake_api_key';
const apiUrl = 'https://reqres.in/api/users/2';

const requestOptions = {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${apiKey}`,
  },
};

fetch(apiUrl, requestOptions)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // console.log(JSON.stringify(data, null, 2));
    console.log("user.first_name:", data.data.first_name);
    console.log("user.last_name:", data.data.last_name);
  })
  .catch(error => {
    console.error('Error:', error);
  });