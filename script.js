const DATETODAY = new Date().toLocaleString();

const USERTABLE = [
	{userID: "admin", firstName: "Neil", lastName: "Administrator", userName: "admin", password: "admin", userType: 0,},
	{userID: "user1", firstName: "Neil1", lastName: "Falceso1", userName: "user1", password: "auser1", userType: 1,},
	{userID: "user2", firstName: "Neil2", lastName: "Falceso2", userName: "user2", password: "auser2", userType: 1,},
	{userID: "user3", firstName: "Neil3", lastName: "Falceso3", userName: "user3", password: "auser3", userType: 1,},
	];
	
const ACCOUNTTABLE = [
	{accountID: "account1", accountName: "My Savings1", userID: "user1", balance: 10.00, status: "Active",},
    {accountID: "account2", accountName: "My Savings2", userID: "user1", balance: 20.00, status: "Active",},
	];

let transaction = new Object();
transaction = [
    {transactionID: "transaction1", account: "account1", amount: 1.50, transactionType: "withdrawal", transactionDate: DATETODAY},
    ];

//console.log(transaction);


//area init
const loginBtn = document.getElementById('submit-login');
const regisBtn = document.getElementById('change-register');
const returnregisBtn = document.getElementById('return-register');
const regisArea = document.getElementById('registration-area');
const loginArea = document.getElementById('login-area');
const transactionArea = document.getElementById('transaction-area');
const registrationArea = document.getElementById('registration-area');
const username = document.getElementById('username');
const passwordBox = document.getElementById('password');
const userTableView = document.getElementById('container-accounts-details');

//modal buttons
const btnAddWithdrawal = document.getElementById('submit-withdrawal');
const btnCloseWithdrawal = document.getElementById('close-withdrawal');
const btnAddDeposit = document.getElementById('submit-deposit');
const btnCloseDeposit = document.getElementById('close-deposit');
const btnAddTransfer = document.getElementById('submit-transfer');
const btnCloseTransfer = document.getElementById('close-transfer');
const btnAddProfile = document.getElementById('submit-profile');
const btnCloseProfile = document.getElementById('close-profile');
const btnCloseAccount = document.getElementById('close-account');

//transaction-area buttons
const btnOpenWithdrawal = document.getElementById('add-withdrawal');
const btnOpenDeposit = document.getElementById('add-deposit');
const btnOpenTransfer = document.getElementById('add-transfer');
const btnOpenProfile = document.getElementById('add-profile');
//const btnOpenAccount = document.getElementById('view-account');

//open modal account

//input area init

//modal pages
const modalWithdrawArea = document.getElementById('modal-withdrawal');

//login

//register

//create account

//wihtdrawal

//transfer

//deposit

//update account

//transactions

//withdrawals
function dropDownAccounts(){
    let accountWithdraw = document.getElementById("withdraw-account");
    accountWithdraw.innerHTML = "";
    let accountOptionWithdraw;
    let accountTableLength = ACCOUNTTABLE.length;
    for (let withacc = 0; withacc < accountTableLength; withacc++) {
        accountOptionWithdraw = document.createElement("option");
        accountOptionWithdraw.text = ACCOUNTTABLE[withacc].accountName;
        accountWithdraw.add(accountOptionWithdraw);
    }
}

function addTransaction(amount, transactType){
    
}

btnOpenWithdrawal.addEventListener('click', function(){
    dropDownAccounts();
    modalWithdrawArea.style.display = "block";
});

btnCloseWithdrawal.onclick = function() {
    modalWithdrawArea.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modalWithdrawArea) {
        modalWithdrawArea.style.display = "none";
    }
}

btnAddWithdrawal.onclick = function() {
    let amount = document.getElementById("withdraw-amount").value;
    let transactType = "withdrawal";
    let amountValue = parseFloat(amount);
    if(amountValue){
        if(isNaN(amountValue)){
            alert('Invalid amount.');
        }
        else if(amountValue<0){
            alert('Amount sholud not be less than 0.');
        }
        else{
            addTransaction(amount, transactType);
            modalWithdrawArea.style.display = "none";
        }
    }else{
        alert('Amount Missing. ');
    }
};

//view-account gawin nlng 10 yung visible na transactions!!
/*btnOpenAccount.addEventListener('click',function(){
    modalWithdrawArea.style.display = "block";

});*/

document.getElementById('view-account1').addEventListener('click', function(){
    let id = document.getElementById("account-id1").textContent, name = document.getElementById("account-name1").textContent;
    let balance = document.getElementById("balance1").textContent, status =  document.getElementById("status1").textContent;
    console.log(id, name, balance, status);
    viewAccount(id, name, balance, status);
    //modalWithdrawArea.style.display = "block";
});

document.getElementById('view-account2').addEventListener('click', function(){
    let id = document.getElementById("account-id2").textContent, name = document.getElementById("account-name2").textContent;
    let balance = document.getElementById("balance2").textContent, status =  document.getElementById("status2").textContent;
    console.log(id, name, balance, status);
    viewAccount(id, name, balance, status);
    //modalWithdrawArea.style.display = "block";
});

document.getElementById('view-account3').addEventListener('click', function(){
    let id = document.getElementById("account-id3").textContent, name = document.getElementById("account-name3").textContent;
    let balance = document.getElementById("balance3").textContent, status =  document.getElementById("status3").textContent;
    console.log(id, name, balance, status);
    viewAccount(id, name, balance, status);
    //modalWithdrawArea.style.display = "block";
});

function viewAccount(id, name, balance, status){
    let btnOpenAccount = document.getElementById('modal-account');
    btnOpenAccount.style.display = "block";
    console.log('Id and Name: '+id, name);
    document.getElementById('account-name').innerHTML = name;
    document.getElementById('balance').innerHTML = balance;
}

btnCloseAccount.onclick = function() {
    let btnOpenAccount = document.getElementById('modal-account');
    btnOpenAccount.style.display = "none";
}

    
loginBtn.addEventListener('click', function(){
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

viewTableuser();

function viewTableuser(){
    let accountTableLength = ACCOUNTTABLE.length;
    let i = 0;
    let button1 = document.getElementById('view-account1');
    let button2 = document.getElementById('view-account2');
    let button3 = document.getElementById('view-account3');
    button1.style.display = 'none';
    button2.style.display = 'none';
    button3.style.display = 'none';
    while(i<accountTableLength){
        if(i==0){
            document.getElementById("account-id1").innerHTML = `${ACCOUNTTABLE[i].accountID}`;
            document.getElementById("account-name1").innerHTML = `${ACCOUNTTABLE[i].accountName}`;
            document.getElementById("balance1").innerHTML = `${ACCOUNTTABLE[i].balance}`;
            document.getElementById("status1").innerHTML = `${ACCOUNTTABLE[i].status}`;
            button1.style.display = 'block';
        }
        else if(i==1){
            document.getElementById("account-id2").innerHTML = `${ACCOUNTTABLE[i].accountID}`;
            document.getElementById("account-name2").innerHTML = `${ACCOUNTTABLE[i].accountName}`;
            document.getElementById("balance2").innerHTML = `${ACCOUNTTABLE[i].balance}`;
            document.getElementById("status2").innerHTML = `${ACCOUNTTABLE[i].status}`;
            button2.style.display = 'block';
        }
        else if(i==2){
            document.getElementById("account-id3").innerHTML = `${ACCOUNTTABLE[i].accountID}`;
            document.getElementById("account-name3").innerHTML = `${ACCOUNTTABLE[i].accountName}`;
            document.getElementById("balance3").innerHTML = `${ACCOUNTTABLE[i].balance}`;
            document.getElementById("status3").innerHTML = `${ACCOUNTTABLE[i].status}`;
            button3.style.display = 'block';
        }
        i++;
    }
    for(let i = 0; i < accountTableLength; i ++){

    }
    /*
    for (let i = 0; i < ACCOUNTTABLE.length; i++) {
    document.getElementById("container-accounts-table-tbody").innerHTML+= `<tr class="container-accounts-details"><td class="column1">`+
        `${ACCOUNTTABLE[i].accountID}</td><td class="column2">${ACCOUNTTABLE[i].accountName}</td><td class="column3">${ACCOUNTTABLE[i].balance}</td><td class="column4">`+
        `<button type="button" id="view-account" onclick="viewAccount('${ACCOUNTTABLE[i].accountID}' , '${ACCOUNTTABLE[i].accountName}')">View</button></td></tr>`
        console.log(`<button id="view-account${[i]}" onclick="viewAccount(${ACCOUNTTABLE[i].accountID})">View</button></td></tr>`);
    }
    */
}

function updateUser(){
}

function updateAccount(){
    //let accountID = do
}
