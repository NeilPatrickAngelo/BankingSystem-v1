const loginBtn = document.getElementById('submit-login');
const regisBtn = document.getElementById('change-register');
const returnregisBtn = document.getElementById('return-register');
const regisArea = document.getElementById('registration-area');
const loginArea = document.getElementById('login-area');
const transactionArea = document.getElementById('transaction-area');
const registrationArea = document.getElementById('registration-area');
const username = document.getElementById('username');
const passwordBox = document.getElementById('password');
	
loginBtn.addEventListener('click', function(){
    const loginArea = document.getElementById('login-area');
    const transactionArea = document.getElementById('transaction-area');
    const registrationArea = document.getElementById('registration-area');
    const username = document.getElementById('username');
    const passwordBox = document.getElementById('password');
    if (username.value == 'admin' && passwordBox.value == 'admin'){
        loginArea.style.display = 'none';
        regisArea.style.display = 'none';
        transactionArea.style.display = 'block';
    }
    else{
        //document.getElementById('wrong-pass').style.display = 'block';
        //username.style.border = '1px solid red';
        //passwordBox.style.border = '1px solid red';
		alert('Wrong Username or Password.');
    }

});

regisBtn.addEventListener('click', function(){
    loginArea.style.display = 'none';
    transactionArea.style.display = 'none';
    regisArea.style.display = 'block';

});

returnregisBtn.addEventListener('click', function(){
    loginArea.style.display = 'block';
    transactionArea.style.display = 'none';
    regisArea.style.display = 'none';

});