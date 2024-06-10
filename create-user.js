const apiKey = 'fake_api_key';
const apiUrl = 'https://reqres.in/api/users';

const requestOptions = {
  method: 'POST',
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
    console.log("user.id:", data.id);
  })
  .catch(error => {
    console.error('Error:', error);
  });