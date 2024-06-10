exports.handler = (event, context, callback) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const apiKey = 'fake_api_key';
    const apiUrl = 'https://reqres.in/api/users';

    switch (event.httpMethod) {
        case 'DELETE':
            done(new Error(`Unsupported method "${event.httpMethod}"`));
            break;
        case 'GET':
            const getOptions = {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${apiKey}`,
                },
              };
              console.log("url", apiUrl+`/${event.queryStringParameters.id}`,"event.queryStringParameters.id:", event.queryStringParameters.id);

              fetch(apiUrl+`/${event.queryStringParameters.id}`, getOptions)
                .then(response => {
                  if (!response.ok) {
                    // throw new Error('Network response was not ok');
                    done(new Error(`Network response was not ok "${event.httpMethod}"`));
                  }
                  return response.json();
                })
                .then(data => {
                  console.log("Received reply:", JSON.stringify(data, null, 2));
                  console.log("user.first_name:", data.data.first_name);
                  console.log("user.last_name:", data.data.last_name);
                  done(null, data);
                })
                .catch(error => {
                  console.error('Error:', error);
                  done(error);
                });
        break;
        case 'POST':
            let data = event.body.json();

            const postOptions = {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                  "name": `${data.name}`,
                  "job": `${data.job}`
                }),
              };
              
              fetch(apiUrl, postOptions)
                .then(response => {
                  if (!response.ok) {
                    // throw new Error('Network response was not ok');
                    done(new Error(`Network response was not ok "${event.httpMethod}"`));
                  }
                  return response.json();
                })
                .then(data => {
                  console.log("Received reply:", JSON.stringify(data, null, 2));
                  console.log("user.id:", data.id);
                  done(null, data);
                })
                .catch(error => {
                  console.error('Error:', error);
                  done(error);
                });
            
            break;
        case 'PUT':
            done(new Error(`Unsupported method "${event.httpMethod}"`));
            break;
        default:
            done(new Error(`Unsupported method "${event.httpMethod}"`));
    }
    
};