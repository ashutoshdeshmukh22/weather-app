console.log('Client Side JS File is Loaded');

// fetch data from this URl and then call the call back method
// fetch('https://puzzle.mead.io/puzzle').then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

const weatherForm = document.querySelector('form');
const addressInput = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

// messageOne.textContent = 'From client JS';

// Adding a event
weatherForm.addEventListener('submit', (e) => {
  e.preventDefault(); //to prevent the default behavior of the browser to reloading the page or rerendering page

  const location = addressInput.value;

  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';

  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
          console.log(data.error);
        } else {
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forcast;
          console.log(data.forcast);
        }
      });
    }
  );
});
