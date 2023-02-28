const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));


//Serve form page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/form.html');
});

//Handling Form Submission
app.post('/submit', (req, res)=>{
  const formData = req.body;
  
  //Do validation
  let errors = [];

  if(!formData || formData.length < 5) {
    errors.push('Name should be 5 characters minimum');
  }
  if(!formData.email || !isEmail(formData.email)){
    errors.push('Invalid Email');
  }
if (!isValidPhone(formData.phone)) {
  errors.push('Invalid Phone Number');
}

if (!formData.gender || !isValidGender(formData.gender)) {
  errors.push('Please select a valid gender');
}

if(!isValidHobbies(formData.hobbies)) {
  errors.push('Please select valid hobby')
}

//Send results
if(errors.length>0) {
  const errorMessage = `There were some errors with your submission:<br>${errors.join('<br>')}<br><a href="/">Go back to form</a>`;
  res.status(400).send(errorMessage);
} else {
  res.status(200).send("Form Submitted successfully");
}

//Functions
function isEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidGender(gender) {
  const allowedOptions = ['male', 'female', 'others'];
  if(!allowedOptions.includes(gender)) {
    return false;
  }
  return true;
}

function isValidPhone(phone) {
  if(!phone || phone.length !==10 || isNaN(phone)) return false;

  else return true;
}

function isValidHobbies(hobbies) {
  const allowedOptions = ['reading', 'travelling', 'music'];

  if (!hobbies || hobbies.length < 1 || hobbies.length > allowedOptions.length) return false; 

  for(let i = 0; i < hobbies.length; i++) {
    if(!allowedOptions.includes(hobbies[i]))return false;
  }
  return true;
}
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });

