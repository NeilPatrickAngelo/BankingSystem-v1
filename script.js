const TODAYDATE = new Date().toLocaleString();

const USERTABLE = [
	{userID: "admin", firstName: "Neil", lastName: "Administrator", email: "admin@gmail.com", userName: "admin", password: "admin", userType: 0},
	{userID: "user1", firstName: "Neil1", lastName: "Falceso1", email: "admin@gmail.com", userName: "user1", password: "user1", userType: 1},
	{userID: "user2", firstName: "Neil2", lastName: "Falceso2", email: "admin@gmail.com", userName: "user2", password: "user2", userType: 1},
	{userID: "user3", firstName: "Neil3", lastName: "Falceso3", email: "admin@gmail.com", userName: "user3", password: "user3", userType: 1},
	];
	
const ACCOUNTTABLE = [
	{accountID: "account1", accountName: "My Savings1", userID: "user1", balance: 10.00, status: "Active"},
    {accountID: "account2", accountName: "My Savings2", userID: "user1", balance: 20.00, status: "Active"},
	{accountID: "account1", accountName: "My Savings3", userID: "user2", balance: 10.00, status: "Active"},
    {accountID: "account2", accountName: "My Savings4", userID: "user2", balance: 20.00, status: "Active"},
	];

let TRANSACTION = new Object();
TRANSACTION = [
    {transactionID: "transaction1", userID: "user1", account: "account1", amount: -1.50, transactionType: "withdrawal", transactionDate: TODAYDATE},
    {transactionID: "transaction2", userID: "user1", account: "account1", amount: -.50, transactionType: "withdrawal", transactionDate: TODAYDATE},
    {transactionID: "transaction3", userID: "user1", account: "account1", amount: -2.50, transactionType: "withdrawal", transactionDate: TODAYDATE},
    {transactionID: "transaction4", userID: "user1", account: "account1", amount: -1.00, transactionType: "withdrawal", transactionDate: TODAYDATE},
    {transactionID: "transaction1", userID: "user1", account: "account2", amount: -1.00, transactionType: "withdrawal", transactionDate: TODAYDATE},
    {transactionID: "transaction2", userID: "user1", account: "account2", amount: -1.50, transactionType: "withdrawal", transactionDate: TODAYDATE},
    ];



//update user
function userUpdate(userId, firstName, lastName, userName, email, password){
}

//add user
function userAdd(){
}

//account Dropdown
function dropDownAccounts(type){
    let transactType = document.getElementById(type);
    document.getElementById(type).innerHTML = "";
    let typeOption;
    typeOption = document.createElement("option");
    typeOption.id = 'none'
    typeOption.text = '-Choose Account-'
    transactType.add(typeOption);
    let accountTableLength = ACCOUNTTABLE.length;
    for (let withacc = 0; withacc < accountTableLength; withacc++) {
        typeOption = document.createElement("option");
        typeOption.id = ACCOUNTTABLE[withacc].accountID;
        typeOption.text = ACCOUNTTABLE[withacc].accountName;
        transactType.add(typeOption);
    }
}


//update account
function updateAccountTransact(amount, accountId){
    /*let filteredAccountUser = ACCOUNTTABLE.filter(function (transact){
        return transact.userID == userId;
    });*/
    let filteredAccount = ACCOUNTTABLE.filter(function (accounts){
        return accounts.accountID == accountId;
    });
    filteredAccount.forEach(function (accounts) {
        let newAmount = accounts.balance + amount;
        accounts.balance = newAmount;
        console.log(`Id: ${accountId}`);
        console.log(`Amount: ${accounts.balance}`);
    });
    viewTableuser();
}

document.getElementById('add-withdraw').addEventListener('click', function(){
    dropDownAccounts('withdraw-account');
    document.getElementById('modal-withdraw').style.display = "block";
});

document.getElementById('close-withdraw').onclick = function() {
    document.getElementById('modal-withdraw').style.display = "none";
}

document.getElementById('add-deposit').addEventListener('click', function(){
    dropDownAccounts('deposit-account');
    document.getElementById('modal-deposit').style.display = "block";
});

document.getElementById('close-deposit').onclick = function() {
    document.getElementById('modal-deposit').style.display = "none";
}

document.getElementById('add-transfer').addEventListener('click', function(){
    dropDownAccounts('transfer-account-from');
    dropDownAccounts('transfer-account-to');
    document.getElementById('modal-transfer').style.display = "block";
});

document.getElementById('close-transfer').onclick = function() {
    document.getElementById('modal-transfer').style.display = "none";
}

window.onclick = function(event) {
    if (event.target == document.getElementById('modal-withdraw')) {
        document.getElementById('modal-withdraw').style.display = "none";
    }
    else if (event.target == document.getElementById('modal-deposit')) {
        document.getElementById('modal-deposit').style.display = "none";
    }
    else if (event.target == document.getElementById('modal-transfer')) {
        document.getElementById('modal-transfer').style.display = "none";
    }
}

//add transaction
function addTransaction(amount, transactType, accountId){
    let filteredTransactionsUser = TRANSACTION.filter(function (transact){
        return transact.userID == document.getElementById("user-id").value;;
    });
    let filteredTransactions = TRANSACTION.filter(function (transact){
        return transact.account == accountId;
    });
    let countTransaction = filteredTransactionsUser.length + 1;
    let datetoday = new Date().toLocaleString();
    let newTransaction = {
        transactionID: 'transaction'+countTransaction,
        account: accountId,
        transactionType: transactType,
        amount: amount,
        transactionDate: datetoday,
    };
    //TRANSACTION.push(newTransaction);
}

//view Receipt after transaction
function viewReceipt(transactInfo, transactionType){
    document.getElementById('modal-receipt').style.display = "block";
    document.getElementById('receipt-title').textContent = transactionType;
    document.getElementById('receipt-account').textContent = transactInfo.accountName;
    document.getElementById('receipt-name').textContent = transactInfo.fullName;
    document.getElementById('receipt-date').textContent = transactInfo.datetoday;
    document.getElementById('receipt-amount').textContent = transactInfo.amount;
    document.getElementById('receipt-balance').textContent = transactInfo.remBalance;
}

document.getElementById('receipt-close-x').onclick = function() {
    document.getElementById('modal-receipt').style.display = "none";
}

//view Receipt in Account table
function viewReceiptAccount(transactInfo, transactionType){
    document.getElementById('modal-receipt').style.display = "block";
    document.getElementById('receipt-title').textContent = transactionType;
    document.getElementById('receipt-account').textContent = transactInfo.accountName;
    document.getElementById('receipt-name').textContent = transactInfo.fullName;
    document.getElementById('receipt-date').textContent = transactInfo.datetoday;
    document.getElementById('receipt-amount').textContent = transactInfo.amount;
    document.getElementById('receipt-balance').textContent = transactInfo.remBalance;
}

//get transaction info
function getTransactionInfoAccount(transactionId, accountId, userId, amount, date){
    let datetoday = new Date().toLocaleString();
    let fullName = "", accountID = "", accountName = "", remBalance = "";
    let filteredUser = USERTABLE.filter(function (users){
        return users.userID == document.getElementById("user-id").value;
    });
    filteredUser.forEach(function (users) {
        fullName = users.firstName + " " + users.lastName;
    });
    let filteredAccount = ACCOUNTTABLE.filter(function (accounts){
        return accounts.userID == document.getElementById("user-id").value;
    });
    filteredAccount.forEach(function (accounts) {
        accountID = accounts.accountID;
    });
    let filteredAccountName = filteredAccount.filter(function (accounts){
        return accounts.accountID == accountId;
    });
    filteredAccountName.forEach(function (accounts) {
        accountName = accounts.accountName;
        remBalance = accounts.balance;
    });
    console.log('accountName'+accountName+' fullName'+fullName+' datetoday'+datetoday+' amount'+amount+' remBalance'+remBalance);
    let newTransactionInfo = {
        accountName: accountName,
        fullName: fullName,
        datetoday: datetoday,
        amount: amount,
        remBalance: remBalance,
    };
    return newTransactionInfo;
}

//get transaction info
function getTransactionInfo(accountId, amount){
    let datetoday = new Date().toLocaleString();
    let fullName = "", accountID = "", accountName = "", remBalance = "";
    let filteredUser = USERTABLE.filter(function (users){
        return users.userID == document.getElementById("user-id").value;
    });
    filteredUser.forEach(function (users) {
        fullName = users.firstName + " " + users.lastName;
    });
    let filteredAccount = ACCOUNTTABLE.filter(function (accounts){
        return accounts.userID == document.getElementById("user-id").value;
    });
    filteredAccount.forEach(function (accounts) {
        accountID = accounts.accountID;
    });
    let filteredAccountName = filteredAccount.filter(function (accounts){
        return accounts.accountID == accountId;
    });
    filteredAccountName.forEach(function (accounts) {
        accountName = accounts.accountName;
        remBalance = accounts.balance;
    });
    console.log('accountName'+accountName+' fullName'+fullName+' datetoday'+datetoday+' amount'+amount+' remBalance'+remBalance);
    let newTransactionInfo = {
        accountName: accountName,
        fullName: fullName,
        datetoday: datetoday,
        amount: amount,
        remBalance: remBalance,
    };
    return newTransactionInfo;
}

//withdrawal
document.getElementById('submit-withdraw').onclick = function() {
    let amount = document.getElementById("withdraw-amount").value;
    let select = document.getElementById("withdraw-account").options;
    let account = select[select.selectedIndex].id;
    let transactType = "withdrawal";
    let amountValue = parseFloat(amount);
    if(account == 'none'){
        alert('Please Select an Account.');
    }
    else if(amountValue){
        if(isNaN(amountValue)){
            alert('Invalid amount.');
        }
        else if(amountValue<0){
            alert('Amount sholud not be less than 0.');
        }
        else{
            if(!confirm('Confirm Withdrawal?')){
                return false;
            }
            else{
                let withdrawAmount = amountValue * -1;
                addTransaction(withdrawAmount, transactType, account);
                updateAccountTransact(withdrawAmount, account);
                let transactInfo = getTransactionInfo(account, amountValue);
                console.log(transactInfo);
                viewReceipt(transactInfo, 'Deposit Complete');
                document.getElementById('modal-withdraw').style.display = "none";
            }
        }
    }else{
        alert('Amount Missing.');
    }
};

//deposit
document.getElementById('submit-deposit').onclick = function() {
    let amount = document.getElementById("deposit-amount").value;
    let select = document.getElementById("deposit-account").options;
    let account = select[select.selectedIndex].id;
    let transactType = "deposit";
    let amountValue = parseFloat(amount);
    if(account == 'none'){
        alert('Please Select an Account.');
    }
    else if(amountValue){
        if(isNaN(amountValue)){
            alert('Invalid amount.');
        }
        else if(amountValue<0){
            alert('Amount sholud not be less than 0.');
        }
        else{
            if(!confirm('Confirm Deposit?')){
                return false;
            }
            else{
                addTransaction(amountValue, transactType, account);
                updateAccountTransact(amountValue, account);
                let transactInfo = getTransactionInfo(account, amountValue);
                viewReceipt(transactInfo, 'Withdrawal Complete');
                document.getElementById('modal-deposit').style.display = "none";
            }
        }
    }else{
        alert('Amount Missing.');
    }
};

//transfer
document.getElementById('submit-transfer').onclick = function() {
    let amount = document.getElementById("transfer-amount").value;
    let selectfrom = document.getElementById("transfer-account-from").options;
    let selectto = document.getElementById("transfer-account-to").options;
    let accountfrom = selectfrom[selectfrom.selectedIndex].id;
    let accountto = selectto[selectto.selectedIndex].id;
    let transactType = "transfer";
    let amountValue = parseFloat(amount);
    if(accountfrom == 'none' || accountto == 'none'){
        alert('Please Select an Account.');
    }
    else if(accountfrom == accountto){
        alert('You are transfering to the same account.');
    }
    else if(amountValue){
        if(isNaN(amountValue)){
            alert('Invalid amount.');
        }
        else if(amountValue<0){
            alert('Amount sholud not be less than 0.');
        }
        else{
            if(!confirm('Confirm Transfer?')){
                return false;
            }
            else{
                let withamount = amountValue * -1
                addTransaction(withamount, transactType, accountfrom);
                addTransaction(amountValue, transactType, accountto);
                updateAccountTransact(withamount, accountfrom);
                updateAccountTransact(amountValue, accountto);
                let transactInfofrom = getTransactionInfo(accountfrom, amountValue);
                viewReceipt(transactInfofrom, 'Transfer Complete');
                document.getElementById('modal-transfer').style.display = "none";
            }
        }
    }else{
        alert('Amount Missing.');
    }
};

//view-account gawin nlng 10 yung visible na transactions!!
/*btnOpenAccount.addEventListener('click',function(){
    document.getElementById('modal-withdrawal').style.display = "block";

});*/

document.getElementById('view-account1').addEventListener('click', function(){
    let id = document.getElementById("account-id1").textContent, name = document.getElementById("account-name1").textContent;
    let balance = document.getElementById("balance1").textContent, status =  document.getElementById("status1").textContent;
    console.log(id, name, balance, status);
    viewAccount(id, name, balance, status);
    //document.getElementById('modal-withdrawal').style.display = "block";
});

document.getElementById('view-account2').addEventListener('click', function(){
    let id = document.getElementById("account-id2").textContent, name = document.getElementById("account-name2").textContent;
    let balance = document.getElementById("balance2").textContent, status =  document.getElementById("status2").textContent;
    console.log(id, name, balance, status);
    viewAccount(id, name, balance, status);
    //document.getElementById('modal-withdrawal').style.display = "block";
});

document.getElementById('view-account3').addEventListener('click', function(){
    let id = document.getElementById("account-id3").textContent, name = document.getElementById("account-name3").textContent;
    let balance = document.getElementById("balance3").textContent, status =  document.getElementById("status3").textContent;
    console.log(id, name, balance, status);
    viewAccount(id, name, balance, status);
    //document.getElementById('modal-withdrawal').style.display = "block";
});

//for viewing the account
function viewAccount(id, name, balance, status){
    document.getElementById('modal-account').style.display = "block";
    console.log('Id and Name: '+id, name);
    document.getElementById("container-transaction-table-tbody").innerHTML = "";
    let filteredTransactions = TRANSACTION.filter(function (transact){
        return transact.account == id;
    });
    let count = 0;
    filteredTransactions.forEach(function (transaction, index) {
        let newTransaction = {
            accountName: accountName,
            fullName: fullName,
            datetoday: datetoday,
            amount: amount,
            remBalance: remBalance
        }
        /*console.log(`No. ${index + 1}:`);
        console.log(`Id: ${transaction.transactionID}`);
        console.log(`Type: ${transaction.transactionType}`);
        console.log(`Amount: ${transaction.amount}`);
        console.log(`Date: ${transaction.transactionDate}`);
        console.log("--------------");*/
        document.getElementById("container-transaction-table-tbody").innerHTML+= `<tr class="container-accounts-details">` +
        `<td class="column1">${transaction.transactionType}</td><td class="column2">${transaction.amount}</td>` +
        `<td class="column3">${transaction.transactionDate}</td><td class="column4">`+
        `<button type="button" id="view-account" onclick="getTransactionInfoAccount(newTransaction , transaction.transactionType)">View</button></td></tr>`
    });
    document.getElementById('account-id').innerHTML = id;
    document.getElementById('account-name').innerHTML = name;
    document.getElementById('balance').innerHTML = balance;
}

document.getElementById('close-account').onclick = function() {
    document.getElementById('modal-account').style.display = "none";
}

//create account pwede to sa pag deposit kasi 5 centavo yung need
document.getElementById('add-account').addEventListener('click', function(){
    document.getElementById('modal-account-create').style.display = 'block';
});

document.getElementById('close-account-create').onclick = function() {
    document.getElementById('modal-account-create').style.display = "none";
}

document.getElementById('cancel-account-create').onclick = function() {
    document.getElementById('modal-account-create').style.display = "none";
}

document.getElementById('submit-account-create').onclick = function() {
    let filteredUser = ACCOUNTTABLE.filter(function (accounts){
        return accounts.userID == document.getElementById("user-id").value;
    });
    let amountdeposit = parseFloat(document.getElementById('account-create-amount').value);
    if(filteredUser.length == 3){
        alert('You have reach the limited Account per user.');
    }
    else if(document.getElementById('account-create-name').value == '' && document.getElementById('account-create-amount').value == ''){
        alert('Please fill in all fields.');
    }
    //else if(!isNaN(amountdeposit)){
    //    alert('Please enter only amount in amount.');
    //}
    else{
        let newAccount = {
            accountID: 'account'+filteredUser.length + 1,
            accountName: document.getElementById('account-create-name').value,
            userID: document.getElementById("user-id").value,
            balance: document.getElementById('account-create-amount').value,
            status: 'Active',
        };
        ACCOUNTTABLE.push(newAccount);
        viewTableuser();
        alert('Account Created');
        document.getElementById('modal-account-create').style.display = 'none';
    }
}

//edit account yung name lang iedit
document.getElementById('edit-account').addEventListener('click', function(){
    document.getElementById("account-edit-id").value = document.getElementById("account-id").textContent;
    document.getElementById("account-edit-name").value = document.getElementById("account-name").textContent;
    document.getElementById('modal-account-edit').style.display = 'block';
    document.getElementById('modal-account').style.display = "none";
});

document.getElementById('close-account-edit').onclick = function() {
    document.getElementById('modal-account-edit').style.display = "none";
}

document.getElementById('cancel-account-edit').onclick = function() {
    document.getElementById('modal-account-edit').style.display = "none";
}

document.getElementById('submit-account-edit').onclick = function() {
    if(document.getElementById('account-edit-name').value == ''){
        alert('Please fill in all fields.');
    }
    else{
        let filteredUser = ACCOUNTTABLE.filter(function (accounts){
            return accounts.userID == document.getElementById("user-id").value;
        });
        let filteredAccount = filteredUser.filter(function (accounts){
            return accounts.accountID == document.getElementById("account-edit-id").value;
        });
        filteredAccount.forEach(function (accounts) {
            accounts.accountName = document.getElementById("account-edit-name").value;
        });
        viewTableuser();
        alert('Account updated.');
        document.getElementById('modal-account-edit').style.display = "none";
    }
}

//open profile
document.getElementById('profile-update').onclick = function() {
    document.getElementById('transaction-area').style.display = 'none';
    document.getElementById('profile-area').style.display = 'block';
    document.getElementById('user-id-edit').value = document.getElementById('user-id').value;
    let filteredUser = USERTABLE.filter(function (users){
        return users.userID == document.getElementById('user-id-edit').value;
    });
    filteredUser.forEach(function (users) {
        console.log(`password: ${users.email}`);
        document.getElementById('first-name-edit').value = users.firstName;
        document.getElementById('last-name-edit').value = users.lastName;
        document.getElementById('email-address-edit').value = users.email;
        console.log(`password: ${users.email}`);
    });
}

//update user
document.getElementById('submit-user-edit').addEventListener('click', function(){
    if(document.getElementById("first-name-edit").value == '' && document.getElementById("last-name-edit").value == '' &&
    document.getElementById("email-address-edit").value == ''){
        alert('Please fill up all field.');
    }
    else{
        console.log(document.getElementById("user-id-edit").value);
        let filteredUser = USERTABLE.filter(function (users){
            return users.userID == document.getElementById("user-id-edit").value;
        });
        filteredUser.forEach(function (users) {
            users.firstName = document.getElementById("first-name-edit").value;
            users.lastName = document.getElementById("last-name-edit").value;
            users.email = document.getElementById("email-address-edit").value;
        });
        alert('Update Success.');
        document.getElementById('transaction-area').style.display = 'block';
        document.getElementById('profile-area').style.display = 'none';
    }
});

document.getElementById('return-user-edit').onclick = function() {
    document.getElementById('transaction-area').style.display = 'block';
    document.getElementById('profile-area').style.display = 'none';
}

    
document.getElementById('submit-login').addEventListener('click', function(){
    let password = '', userId = '', fullname = '';
    if(document.getElementById('login-username').value !== ''){
        let filteredUser = USERTABLE.filter(function (users){
            return users.userName == document.getElementById("login-username").value;
        });
        filteredUser.forEach(function (users) {
            userId = users.userID;
            password = users.password;
            console.log(`userName: ${userId}`);
            console.log(`password: ${password}`);
        });
        if(document.getElementById('login-password').value === password){
            document.getElementById('login-area').style.display = 'none';
            document.getElementById('transaction-area').style.display = 'block';
            document.getElementById('user-id').value = userId;
            viewTableuser();
            //document.getElementById('user-greetings').innerHTML = "WELCOME " + ; add ng function sa user table para iview yung full name
        }
        else{
            alert('Wrong Username or Password.');
        }
    }
    /*if (document.getElementById('username').value == 'admin' && document.getElementById('password').value == 'admin'){
        document.getElementById('login-area').style.display = 'none';
        document.getElementById('registration-area').style.display = 'none';
        document.getElementById('transaction-area').style.display = 'block';
    }
    else{
        //document.getElementById('wrong-pass').style.display = 'block';
        //username.style.border = '1px solid red';
        //passwordBox.style.border = '1px solid red';
		alert('Wrong Username or Password.');
    }*/

});

document.getElementById('change-register').addEventListener('click', function(){
    document.getElementById('login-area').style.display = 'none';
    document.getElementById('transaction-area').style.display = 'none';
    document.getElementById('registration-area').style.display = 'block';

});

//close register
document.getElementById('return-register').addEventListener('click', function(){
    document.getElementById('login-area').style.display = 'block';
    document.getElementById('transaction-area').style.display = 'none';
    document.getElementById('registration-area').style.display = 'none';

});

//register user
document.getElementById('submit-register').addEventListener('click', function(){
    if(document.getElementById("first-name").value == '' && document.getElementById("last-name").value == '' &&
    document.getElementById("email-address").value == '' && document.getElementById("user-name").value == '' &&
    document.getElementById("password").value == '' && document.getElementById("confirm-password").value == ''){
        alert('Please fill up all field.');
    }
    if(document.getElementById("password").value !== document.getElementById("confirm-password").value){
        alert('Password does not match.');
    }
    else{
        let filteredUser = USERTABLE.filter(function (users){
            return users.userName == document.getElementById("user-name").value;
        });
        if(filteredUser.length >0){
            alert('Username already taken.');
        }
        else{
            let userTotal = USERTABLE.length;
            let newUser = {
                userID: 'user'+userTotal,
                firstName: document.getElementById("first-name").value,
                lastName: document.getElementById("last-name").value,
                email: document.getElementById("email-address").value,
                userName: document.getElementById("user-name").value,
                password: document.getElementById("password").value,
                userType: 0,
            };
            USERTABLE.push(newUser);
        }
    }
});

//log out
document.getElementById('log-out').addEventListener('click', function(){
    document.getElementById("user-id").value = '';
    document.getElementById("user-id-edit").value = '';
    document.getElementById("login-username").value = '';
    document.getElementById("login-password").value = '';
    document.getElementById('login-area').style.display = 'block';
    document.getElementById('transaction-area').style.display = 'none';
});

//delete before presentation
viewTableuser();

function viewTableuser(){
    console.log('userId:::::'+document.getElementById("user-id").value);
    let filteredAccount = ACCOUNTTABLE.filter(function (accounts){
        return accounts.userID == document.getElementById("user-id").value;
    });
    let accountTableLength = filteredAccount.length;
    let i = 0;
    document.getElementById('view-account1').style.display = 'none';
    document.getElementById('view-account2').style.display = 'none';
    document.getElementById('view-account3').style.display = 'none';
    while(i<accountTableLength){
        if(i==0){
            document.getElementById("account-id1").innerHTML = `${filteredAccount[i].accountID}`;
            document.getElementById("account-name1").innerHTML = `${filteredAccount[i].accountName}`;
            document.getElementById("balance1").innerHTML = `${filteredAccount[i].balance}`;
            document.getElementById("status1").innerHTML = `${filteredAccount[i].status}`;
            document.getElementById('view-account1').style.display = 'block';
        }
        else if(i==1){
            document.getElementById("account-id2").innerHTML = `${filteredAccount[i].accountID}`;
            document.getElementById("account-name2").innerHTML = `${filteredAccount[i].accountName}`;
            document.getElementById("balance2").innerHTML = `${filteredAccount[i].balance}`;
            document.getElementById("status2").innerHTML = `${filteredAccount[i].status}`;
            document.getElementById('view-account2').style.display = 'block';
        }
        else if(i==2){
            document.getElementById("account-id3").innerHTML = `${filteredAccount[i].accountID}`;
            document.getElementById("account-name3").innerHTML = `${filteredAccount[i].accountName}`;
            document.getElementById("balance3").innerHTML = `${filteredAccount[i].balance}`;
            document.getElementById("status3").innerHTML = `${filteredAccount[i].status}`;
            document.getElementById('view-account3').style.display = 'block';
        }
        i++;
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
