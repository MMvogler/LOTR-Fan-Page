const axios = require('axios');
 
// Make a request for a user with a given ID
axios.get('http://www.omdbapi.com/?i=tt0120737&apikey=a59277f6')
  .then(function (response) {
    console.log(response.data.Title);
  })
  .catch(function (error) {
    console.log(error);
  });

  axios.get('http://www.omdbapi.com/?i=tt0167261&apikey=a59277f6')
  .then(function (response) {
    console.log(response.data.Title);
  })
  .catch(function (error) {
    console.log(error);
  });

  axios.get('http://www.omdbapi.com/?i=tt0405185&apikey=a59277f6')
  .then(function (response) {
    console.log(response.data.Title);
  })
  .catch(function (error) {
    console.log(error);
  });