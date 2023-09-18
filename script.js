const TODAYDATE = new Date().toLocaleString();

const USERTABLE = [
	{userID: "admin", firstName: "Neil", lastName: "Administrator", email: "admin@gmail.com", userName: "admin", password: "admin", userType: 0, status: "Unfreeze", attemptLogin: 0},
	{userID: "user1", firstName: "Neil1", lastName: "Falceso1", email: "admin@gmail.com", userName: "user1", password: "user1", userType: 1, status: "Unfreeze", attemptLogin: 0},
	{userID: "user2", firstName: "Neil2", lastName: "Falceso2", email: "admin@gmail.com", userName: "user2", password: "user2", userType: 1, status: "Freeze", attemptLogin: 0},
	];
	
const ACCOUNTTABLE = [
	{accountID: "account1", accountName: "My Savings1", userID: "user1", balance: 10.00, status: "Active"},
    {accountID: "account2", accountName: "My Savings2", userID: "user1", balance: 20.00, status: "Active"},
	{accountID: "account1", accountName: "My Savings3", userID: "user2", balance: 10.00, status: "Active"},
    {accountID: "account2", accountName: "My Savings4", userID: "user2", balance: 20.00, status: "Active"},
	];

let TRANSACTION = new Object();
TRANSACTION = [
    {transactionID: "transaction1", userID: "user1", account: "account1", amount: -1.50, transactionType: "withdrawal", transactionDate: '9/17/2023, 7:35:48 PM'},
    {transactionID: "transaction2", userID: "user1", account: "account1", amount: -.50, transactionType: "withdrawal", transactionDate: '5/17/2023, 8:36:48 PM'},
    {transactionID: "transaction3", userID: "user1", account: "account1", amount: -2.50, transactionType: "withdrawal", transactionDate: '3/30/2023, 9:35:48 AM'},
    {transactionID: "transaction4", userID: "user1", account: "account1", amount: -1.00, transactionType: "withdrawal", transactionDate: '8/20/2023, 1:35:48 PM'},
    {transactionID: "transaction2", userID: "user1", account: "account1", amount: -1.50, transactionType: "withdrawal", transactionDate: '2/15/2023, 5:31:48 PM'},
    {transactionID: "transaction1", userID: "user1", account: "account2", amount: -1.00, transactionType: "withdrawal", transactionDate: '4/11/2023, 1:15:48 AM'},
    {transactionID: "transaction2", userID: "user1", account: "account2", amount: -1.50, transactionType: "withdrawal", transactionDate: '2/15/2023, 5:31:48 PM'},
    ];



//update user
function userUpdate(userId, firstName, lastName, userName, email, password){
}

//add user
function userAdd(){
}

//account Dropdown
function dropDownAccounts(type){
    let userId = document.getElementById("user-id").value;
    let transactType = document.getElementById(type);
    let filteredAccount = ACCOUNTTABLE.filter(function (accounts){
        return accounts.userID == userId;
    });
    //console.log(filteredAccount);
    document.getElementById(type).innerHTML = "";
    let typeOption;
    typeOption = document.createElement("option");
    typeOption.id = 'none'
    typeOption.text = '-Choose Account-'
    transactType.add(typeOption);
    let accountTableLength = filteredAccount.length;
    for (let withacc = 0; withacc < accountTableLength; withacc++) {
        typeOption = document.createElement("option");
        typeOption.id = filteredAccount[withacc].accountID;
        typeOption.text = filteredAccount[withacc].accountName;
        transactType.add(typeOption);
    }
}


//update account
function updateAccountTransact(amount, accountId){
    let newBal = 0, newBalance = 0.00;
    let filteredAccountUser = ACCOUNTTABLE.filter(function (users){
        return users.userID == document.getElementById("user-id").value;
    });
    let filteredAccount = filteredAccountUser.filter(function (accounts){
        return accounts.accountID == accountId;
    });
    filteredAccount.forEach(function (accounts) {
        //newAmount = accounts.balance + newAmount;
        newBal = accounts.balance;
    });
    newBalance = parseFloat(newBal);
    newBalance += amount;
    //console.log('newBal: ' + newBalance);
    filteredAccount.forEach(function (accounts) {
        //newAmount = accounts.balance + newAmount;
        accounts.balance = parseFloat(newBalance).toFixed(2);
    });
    viewTableUser();
}

//withdraw denominations
function withdrawdenom(element){
    let select = element.options;
    let account = select[select.selectedIndex].id;
    let balance = "", floatBalance = "";
    if(account !== 'none'){
        //console.log(account);
        let filteredAccountUser = ACCOUNTTABLE.filter(function (accounts){
            return accounts.userID == document.getElementById("user-id").value;
        });
        let filteredAccount = filteredAccountUser.filter(function (accounts){
            return accounts.accountID == account;
        });
        filteredAccount.forEach(function (accounts) {
            balance = accounts.balance;
        });
        floatBalance = parseFloat(balance).toFixed(2);
        let denomArr = setDenom(floatBalance);

        document.getElementById("withdraw-balance").innerHTML = `Available Balance: ${balance}`;
        document.getElementById("withdraw-twentyfive").innerHTML = `25 cents: ${denomArr.cents25final}`;
        document.getElementById("withdraw-ten").innerHTML = `10 cents: ${denomArr.cents10final}`;
        document.getElementById("withdraw-five").innerHTML = `5 cents: ${denomArr.cents05final}`;
    }
    
}
//deposit denominations
function depositdenom(element){
    let amount = element.value, floatBalance = "";
    floatBalance = parseFloat(amount).toFixed(2);
    let denomArr = setDenom(floatBalance);

    document.getElementById("deposit-twentyfive").innerHTML = `25 cents: ${denomArr.cents25final}`;
    document.getElementById("deposit-ten").innerHTML = `10 cents: ${denomArr.cents10final}`;
    document.getElementById("deposit-five").innerHTML = `5 cents: ${denomArr.cents05final}`;
}

//transfer denominations
function transferdenom(element){
    let select = element.options;
    let account = select[select.selectedIndex].id;
    let balance = "", floatBalance = "";
    if(account !== 'none'){
        //console.log(account);
        let filteredAccountUser = ACCOUNTTABLE.filter(function (accounts){
            return accounts.userID == document.getElementById("user-id").value;
        });
        let filteredAccount = filteredAccountUser.filter(function (accounts){
            return accounts.accountID == account;
        });
        filteredAccount.forEach(function (accounts) {
            balance = accounts.balance;
        });
        floatBalance = parseFloat(balance).toFixed(2);
        let denomArr = setDenom(floatBalance);

        document.getElementById("transfer-balance").innerHTML = `Available Balance: ${balance}`;
        document.getElementById("transfer-twentyfive").innerHTML = `25 cents: ${denomArr.cents25final}`;
        document.getElementById("transfer-ten").innerHTML = `10 cents: ${denomArr.cents10final}`;
        document.getElementById("transfer-five").innerHTML = `5 cents: ${denomArr.cents05final}`;
    }
}

function setDenom(amount){
    let censts25mod = (amount % .25) * 100;
    let censts10mod = (amount % .10) * 100;
    let censts05mod = (amount % .05) * 100;

    let roundcensts25mod = Math.round(parseFloat(censts25mod)).toFixed(2);
    let roundcensts10mod = Math.round(parseFloat(censts10mod)).toFixed(2);
    let roundcensts05mod = Math.round(parseFloat(censts05mod)).toFixed(2);

    let cents25 = amount / .25;
    let cents10 = amount / .10;
    let cents05 = amount / .05;

    let cents25final = parseFloat(cents25).toFixed(2);
    let cents10final = parseFloat(cents10).toFixed(2);
    let cents05final = parseFloat(cents05).toFixed(2);

    if(roundcensts25mod>25)
    cents25final = cents25 - 1;
    if(roundcensts10mod>10)
    cents10final = cents10 - 1;
    if(roundcensts05mod>5)
    cents05final = cents05 - 1;

    let denominations = {
        cents25final: parseInt(cents25final),
        cents10final: parseInt(cents10final),
        cents05final: parseInt(cents05final),
    };
    //console.log(denominations);
    return denominations;
}

document.getElementById("add-withdraw").addEventListener('click', function(){
    document.getElementById("withdraw-balance").innerHTML = "Available Balance: ";
    document.getElementById("withdraw-twentyfive").innerHTML = "25 cents: ";
    document.getElementById("withdraw-ten").innerHTML = "10 cents: ";
    document.getElementById("withdraw-five").innerHTML = "5 cents: ";

    dropDownAccounts("withdraw-account");
    document.getElementById("modal-withdraw").style.display = "block";
});

document.getElementById("close-withdraw").onclick = function() {
    document.getElementById("modal-withdraw").style.display = "none";
}

document.getElementById("add-deposit").addEventListener('click', function(){
    dropDownAccounts("deposit-account");
    document.getElementById("modal-deposit").style.display = "block";
});

document.getElementById("close-deposit").onclick = function() {
    document.getElementById("modal-deposit").style.display = "none";
}

document.getElementById("add-transfer").addEventListener('click', function(){
    document.getElementById("transfer-balance").innerHTML = "Available Balance: ";
    document.getElementById("transfer-twentyfive").innerHTML = "25 cents: ";
    document.getElementById("transfer-ten").innerHTML = "10 cents: ";
    document.getElementById("transfer-five").innerHTML = "5 cents: ";
    dropDownAccounts("transfer-account-from");
    dropDownAccounts("transfer-account-to");
    document.getElementById("modal-transfer").style.display = "block";
});

document.getElementById("close-transfer").onclick = function() {
    document.getElementById("modal-transfer").style.display = "none";
}

window.onclick = function(event) {
    if (event.target == document.getElementById("modal-withdraw")) {
        document.getElementById("modal-withdraw").style.display = "none";
    }
    else if (event.target == document.getElementById("modal-deposit")) {
        document.getElementById("modal-deposit").style.display = "none";
    }
    else if (event.target == document.getElementById("modal-transfer")) {
        document.getElementById("modal-transfer").style.display = "none";
    }
    else if (event.target == document.getElementById("modal-content-transactions")) {
        document.getElementById("modal-content-transactions").style.display = "none";
    }
    else if (event.target == document.getElementById("modal-account-create")) {
        document.getElementById("modal-account-create").style.display = "none";
    }
}

//add transaction
function addTransaction(amount, transactType, accountId){
    let admountValue = parseFloat(amount).toFixed(2);
    let filteredTransactionsUser = TRANSACTION.filter(function (users){
        return users.userID == document.getElementById("user-id").value;;
    });
    let filteredTransactions = filteredTransactionsUser.filter(function (users){
        return users.account == accountId;
    });
    let countTransaction = filteredTransactions.length + 1;
    let datetoday = new Date().toLocaleString();
    let newTransaction = {
        transactionID: 'transaction'+countTransaction,
        userID: document.getElementById("user-id").value,
        account: accountId,
        amount: admountValue,
        transactionType: transactType,
        transactionDate: datetoday,
    };
    TRANSACTION.push(newTransaction);
}

//view Receipt after transaction
function viewReceipt(transactInfo, transactionType){
    document.getElementById("modal-receipt").style.display = "block";
    document.getElementById("receipt-title").textContent = transactionType;
    document.getElementById("receipt-account").textContent = transactInfo.accountName;
    document.getElementById("receipt-name").textContent = transactInfo.fullName;
    document.getElementById("receipt-date").textContent = transactInfo.datetoday;
    document.getElementById("receipt-amount").textContent = transactInfo.amount;
    document.getElementById("receipt-balance").textContent = transactInfo.remBalance;
}

document.getElementById("receipt-close-x").onclick = function() {
    document.getElementById("modal-receipt").style.display = "none";
}

//view Receipt in Account table
function viewReceiptAccount(transactInfo, transactionType){
    document.getElementById("modal-receipt").style.display = "block";
    document.getElementById("receipt-title").textContent = transactionType;
    document.getElementById("receipt-account").textContent = transactInfo.accountName;
    document.getElementById("receipt-name").textContent = transactInfo.fullName;
    document.getElementById("receipt-date").textContent = transactInfo.datetoday;
    document.getElementById("receipt-amount").textContent = transactInfo.amount;
    document.getElementById("receipt-balance").textContent = transactInfo.remBalance;
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
    //console.log('accountName'+accountName+' fullName'+fullName+' datetoday'+datetoday+' amount'+amount+' remBalance'+remBalance);
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
    //console.log('accountName'+accountName+' fullName'+fullName+' datetoday'+datetoday+' amount'+amount+' remBalance'+remBalance);
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
document.getElementById("submit-withdraw").onclick = function() {
    let newBal = 0, newBalance = 0.00;
    let amount = parseFloat(document.getElementById("withdraw-amount").value).toFixed(2);
    let select = document.getElementById("withdraw-account").options;
    let account = select[select.selectedIndex].id;
    let transactType = "withdrawal";
    let filteredAccountUser = ACCOUNTTABLE.filter(function (users){
        return users.userID == document.getElementById("user-id").value;
    });
    let filteredAccount = filteredAccountUser.filter(function (accounts){
        return accounts.accountID == account;
    });
    filteredAccount.forEach(function (accounts) {
        newBal = accounts.balance;
    });
    newBalance = parseFloat(newBal).toFixed(2);
    newBalance -= amount;
    console.log(amount);
    console.log(newBal);
    console.log(newBalance);
    if(account == 'none'){
        alert('Please Select an Account.');
    }
    else if(amount != ''){
        if(isNaN(amount)){
            alert('Invalid amount.');
        }
        else if(amount<0){
            alert('Amount sholud not be less than 0.');
        }
        else if(newBalance < 0.05){
            alert('Cannot withdraw from account. Maintaining balance of 5 centavos is required.');
        }
        else{
            if(!confirm('Confirm Withdrawal?')){
                return false;
            }
            else{
                let amountValue = parseFloat(amount).toFixed(2);
                let withdrawAmount = amountValue * -1;
                addTransaction(parseFloat(withdrawAmount).toFixed(2), transactType, account);
                updateAccountTransact(withdrawAmount, account);
                let transactInfo = getTransactionInfo(account, amountValue);
                //console.log(transactInfo);
                viewReceipt(transactInfo, 'Withdrawal Complete');
                document.getElementById("modal-withdraw").style.display = "none";
            }
        }
    }else{
        alert('Amount Missing.');
    }
};
document.getElementById("close-withdraw").onclick = function() {
    document.getElementById("modal-withdraw").style.display = "none";
}

//deposit
document.getElementById("submit-deposit").onclick = function() {
    let amount = parseFloat(document.getElementById("deposit-amount").value).toFixed(2);
    let select = document.getElementById("deposit-account").options;
    let account = select[select.selectedIndex].id;
    let transactType = "deposit";
    if(account == 'none'){
        alert('Please Select an Account.');
    }
    else if(amount != ''){
        if(isNaN(amount)){
            alert('Invalid amount.');
        }
        else if(amount<0){
            alert('Amount sholud not be less than 0.');
        }
        else{
            if(!confirm('Confirm Deposit?')){
                return false;
            }
            else{
                let amountValue = parseFloat(amount).toFixed(2);
                addTransaction(amountValue, transactType, account);
                updateAccountTransact(amountValue, account);
                let transactInfo = getTransactionInfo(account, amountValue);
                viewReceipt(transactInfo, 'Withdrawal Complete');
                document.getElementById("modal-deposit").style.display = "none";
            }
        }
    }else{
        alert('Amount Missing.');
    }
};
document.getElementById("close-deposit").onclick = function() {
    document.getElementById("modal-deposit").style.display = "none";
}

//transfer
document.getElementById("submit-transfer").onclick = function() {
    let newBal = 0, newBalance = 0.00;
    let amount = parseFloat(document.getElementById("transfer-amount").value).toFixed(2);
    let selectfrom = document.getElementById("transfer-account-from").options;
    let selectto = document.getElementById("transfer-account-to").options;
    let accountfrom = selectfrom[selectfrom.selectedIndex].id;
    let accountto = selectto[selectto.selectedIndex].id;
    let transactType = "transfer";
    let filteredAccountUser = ACCOUNTTABLE.filter(function (users){
        return users.userID == document.getElementById("user-id").value;
    });
    let filteredAccount = filteredAccountUser.filter(function (accounts){
        return accounts.accountID == selectfrom;
    });
    filteredAccount.forEach(function (accounts) {
        newBal = accounts.balance;
    });
    newBalance = parseFloat(newBal).toFixed(2);
    newBalance -= amount;
    console.log(amount);
    console.log(newBal);
    console.log(newBalance);
    if(accountfrom == 'none' || accountto == 'none'){
        alert('Please Select an Account.');
    }
    else if(accountfrom == accountto){
        alert('You are transfering to the same account.');
    }
    else if(amount != ''){
        if(isNaN(amount)){
            alert('Invalid amount.');
        }
        else if(amount<0){
            alert('Amount sholud not be less than 0.');
        }
        else if(newBalance < 0.05){
            alert('Cannot withdraw from account. Maintaining balance of 5 centavos is required.');
        }
        else{
            if(!confirm('Confirm Transfer?')){
                return false;
            }
            else{
                let amountValue = parseFloat(amount).toFixed(2);
                let withamount = amountValue * -1
                addTransaction(withamount, transactType, accountfrom);
                addTransaction(amountValue, transactType, accountto);
                updateAccountTransact(withamount, accountfrom);
                updateAccountTransact(amountValue, accountto);
                let transactInfofrom = getTransactionInfo(accountfrom, amountValue);
                viewReceipt(transactInfofrom, 'Transfer Complete');
                document.getElementById("modal-transfer").style.display = "none";
            }
        }
    }else{
        alert('Amount Missing.');
    }
};

document.getElementById("close-transfer").onclick = function() {
    document.getElementById("modal-transfer").style.display = "none";
}

//view-account gawin nlng 10 yung visible na transactions!!
/*btnOpenAccount.addEventListener('click',function(){
    document.getElementById('modal-withdrawal').style.display = "block";

});*/

document.getElementById("view-account1").addEventListener('click', function(){
    let id = document.getElementById("account-id1").textContent, name = document.getElementById("account-name1").textContent;
    let balance = document.getElementById("balance1").textContent, status =  document.getElementById("status1").textContent;
    //console.log(id, name, balance, status);
    viewAccount(id, name, balance, status);
    //document.getElementById('modal-withdrawal').style.display = "block";
});

document.getElementById("view-account2").addEventListener('click', function(){
    let id = document.getElementById("account-id2").textContent, name = document.getElementById("account-name2").textContent;
    let balance = document.getElementById("balance2").textContent, status =  document.getElementById("status2").textContent;
    //console.log(id, name, balance, status);
    viewAccount(id, name, balance, status);
    //document.getElementById('modal-withdrawal').style.display = "block";
});

document.getElementById("view-account3").addEventListener('click', function(){
    let id = document.getElementById("account-id3").textContent, name = document.getElementById("account-name3").textContent;
    let balance = document.getElementById("balance3").textContent, status =  document.getElementById("status3").textContent;
    //console.log(id, name, balance, status);
    viewAccount(id, name, balance, status);
    //document.getElementById('modal-withdrawal').style.display = "block";
});

//for viewing the account
function viewAccount(id, name, balance, status){
    document.getElementById("modal-account").style.display = "block";
    //console.log('Id and Name: '+id, name);
    document.getElementById("container-transaction-table-tbody").innerHTML = "";
    let filteredAccount = TRANSACTION.filter(function (transact){
        return transact.userID == document.getElementById("user-id").value;
    });
    console.log(filteredAccount);
    let filteredTransactions = filteredAccount.filter(function (transact){
        return transact.account == id;
    });
    let filteredTransactionsSlice = filteredTransactions.slice(0,10);
    filteredTransactionsSlice.forEach(function (transaction) {
        /*console.log(`No. ${index + 1}:`);
        console.log(`Id: ${transaction.transactionID}`);
        console.log(`Type: ${transaction.transactionType}`);
        console.log(`Amount: ${transaction.amount}`);
        console.log(`Date: ${transaction.transactionDate}`);
        console.log("--------------");*/
        document.getElementById("container-transaction-table-tbody").innerHTML+= `<tr class="container-accounts-details">` +
        `<td class="column1">${transaction.transactionType}</td><td class="column2">${transaction.amount}</td>` +
        `<td class="column3">${transaction.transactionDate}</td></tr>`
    });
    document.getElementById("account-id").innerHTML = id;
    document.getElementById("account-name").innerHTML = name;
    document.getElementById("balance").innerHTML = balance;
}

document.getElementById("close-account").onclick = function() {
    document.getElementById("modal-account").style.display = "none";
}

//view user ni admin
document.getElementById("admin-view1").addEventListener('click', function(){
    let id = document.getElementById("admin-id1").textContent;
    //console.log(id);
    viewAccountAdmin(id);
    //document.getElementById('modal-withdrawal').style.display = "block";
});
document.getElementById("admin-view2").addEventListener('click', function(){
    let id = document.getElementById("admin-id2").textContent;
    //console.log(id);
    viewAccountAdmin(id);
    //document.getElementById('modal-withdrawal').style.display = "block";
});
document.getElementById("admin-view3").addEventListener('click', function(){
    let id = document.getElementById("admin-id3").textContent;
    //console.log(id);
    viewAccountAdmin(id);
    //document.getElementById('modal-withdrawal').style.display = "block";
});
document.getElementById("admin-view4").addEventListener('click', function(){
    let id = document.getElementById("admin-id4").textContent;
    //console.log(id);
    viewAccountAdmin(id);
    //document.getElementById('modal-withdrawal').style.display = "block";
});
document.getElementById("admin-view5").addEventListener('click', function(){
    let id = document.getElementById("admin-id5").textContent;
    //console.log(id);
    viewAccountAdmin(id);
    //document.getElementById('modal-withdrawal').style.display = "block";
});

document.getElementById("close-account-admin").onclick = function() {
    document.getElementById("modal-account-admin").style.display = "none";
}
document.getElementById("cancel-account-edit-admin").onclick = function() {
    document.getElementById("modal-account-admin").style.display = "none";
}

function viewAccountAdmin(id){
    document.getElementById("modal-account-admin").style.display = "block";
    document.getElementById("account-edit-id-admin").value = id;
    let status = '';
    let filteredUsers = USERTABLE.filter(function (users){
        return users.userID == id;
    });
    filteredUsers.forEach(function (users) {
        document.getElementById("account-edit-first-name-admin").value = users.firstName;
        document.getElementById("account-edit-last-name-admin").value = users.lastName;
        document.getElementById("account-edit-email-admin").value = users.email;
        document.getElementById("account-edit-status-admin").innerHTML = `Status: ${users.status}`;
        status = users.status;
    });
    if(status=='Freeze'){
        document.getElementById("submit-account-status-admin").innerHTML = 'Unfreeze';
    }
    else{
        document.getElementById("submit-account-status-admin").innerHTML = 'Freeze';
    }
}

document.getElementById("submit-account-status-admin").onclick = function() {
    let filteredUser = USERTABLE.filter(function (users){
        return users.userID == document.getElementById("account-edit-id-admin").value;
    });
    filteredUser.forEach(function (users) {
        users.status = document.getElementById("submit-account-status-admin").textContent;
    });
    alert('User '+ document.getElementById("submit-account-status-admin").textContent);
    viewTableAdmin();
    document.getElementById("modal-account-admin").style.display = "none";
}

document.getElementById("submit-account-edit-admin").onclick = function() {
    if(document.getElementById("account-edit-first-name-admin").value == '' && 
    document.getElementById("account-edit-last-name-admin").value == '' &&
    document.getElementById("account-edit-email-admin").value == ''){
        alert('Please fill in all fields.');
    }
    else{
        let filteredUser = USERTABLE.filter(function (users){
            return users.userID == document.getElementById("account-edit-id-admin").value;
        });
        filteredUser.forEach(function (users) {
            users.firstName = document.getElementById("account-edit-first-name-admin").value;
            users.lastName = document.getElementById("account-edit-last-name-admin").value;
            users.email = document.getElementById("account-edit-email-admin").value;
        });
        viewTableAdmin();
        alert('User updated.');
        document.getElementById("modal-account-admin").style.display = "none";
    }
}

//create account pwede to sa pag deposit kasi 5 centavo yung need
document.getElementById("add-account").addEventListener('click', function(){
    document.getElementById("modal-account-create").style.display = 'block';
});

document.getElementById("close-account-create").onclick = function() {
    document.getElementById("modal-account-create").style.display = "none";
}

document.getElementById("cancel-account-create").onclick = function() {
    document.getElementById("modal-account-create").style.display = "none";
}

document.getElementById("submit-account-create").onclick = function() {
    let amountDeposit = parseFloat(document.getElementById("account-create-amount").value).toFixed(2);
    let filteredUser = ACCOUNTTABLE.filter(function (accounts){
        return accounts.userID == document.getElementById("user-id").value;
    });
    let amountdeposit = parseFloat(document.getElementById("account-create-amount").value).toFixed(2);
    if(filteredUser.length == 3){
        alert('You have reach the limited Account per user.');
    }
    else if(document.getElementById("account-create-name").value == '' && document.getElementById("account-create-amount").value == ''){
        alert('Please fill in all fields.');
    }
    else{
        if(isNaN(amountDeposit)){
            alert('Please enter only amount in amount.');
        }
        else if(document.getElementById("account-create-amount").value < .05){
            alert('Minimum deposit of 5 centavos is required.');
        }
        else{
            let newAccount = {
                accountID: 'account'+filteredUser.length + 1,
                accountName: document.getElementById("account-create-name").value,
                userID: document.getElementById("user-id").value,
                balance: amountdeposit,
                status: 'Active',
            };
            ACCOUNTTABLE.push(newAccount);
            viewTableUser();
            alert('Account Created');
            document.getElementById("modal-account-create").style.display = 'none';
        }
    }
}

//edit account yung name lang iedit
document.getElementById("edit-account").addEventListener('click', function(){
    document.getElementById("account-edit-id").value = document.getElementById("account-id").textContent;
    document.getElementById("account-edit-name").value = document.getElementById("account-name").textContent;
    document.getElementById("modal-account-edit").style.display = 'block';
    document.getElementById("modal-account").style.display = "none";
});

document.getElementById("close-account-edit").onclick = function() {
    document.getElementById("modal-account-edit").style.display = "none";
}

document.getElementById("cancel-account-edit").onclick = function() {
    document.getElementById("modal-account-edit").style.display = "none";
}

document.getElementById("submit-account-edit").onclick = function() {
    if(document.getElementById("account-edit-name").value == ''){
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
        viewTableUser();
        alert('Account updated.');
        document.getElementById("modal-account-edit").style.display = "none";
    }
}

//open profile
document.getElementById("profile-update").onclick = function() {
    document.getElementById("transaction-area").style.display = 'none';
    document.getElementById("profile-area").style.display = 'block';
    document.getElementById("user-id-edit").value = document.getElementById("user-id").value;
    let filteredUser = USERTABLE.filter(function (users){
        return users.userID == document.getElementById("user-id-edit").value;
    });
    filteredUser.forEach(function (users) {
        document.getElementById("first-name-edit").value = users.firstName;
        document.getElementById("last-name-edit").value = users.lastName;
        document.getElementById("email-address-edit").value = users.email;
    });
}

//update user
document.getElementById("submit-user-edit").addEventListener('click', function(){
    if(document.getElementById("first-name-edit").value == '' && document.getElementById("last-name-edit").value == '' &&
    document.getElementById("email-address-edit").value == ''){
        alert('Please fill up all field.');
    }
    else{
        //console.log(document.getElementById("user-id-edit").value);
        let filteredUser = USERTABLE.filter(function (users){
            return users.userID == document.getElementById("user-id-edit").value;
        });
        filteredUser.forEach(function (users) {
            users.firstName = document.getElementById("first-name-edit").value;
            users.lastName = document.getElementById("last-name-edit").value;
            users.email = document.getElementById("email-address-edit").value;
        });
        alert('Update Success.');
        document.getElementById("transaction-area").style.display = 'block';
        document.getElementById("profile-area").style.display = 'none';
    }
});

document.getElementById("return-user-edit").onclick = function() {
    document.getElementById("transaction-area").style.display = 'block';
    document.getElementById("profile-area").style.display = 'none';
}

//open profile admin
document.getElementById("profile-update-admin").onclick = function() {
    document.getElementById("transaction-area-admin").style.display = 'none';
    document.getElementById("profile-area-admin").style.display = 'block';
    document.getElementById("user-id-edit-admin").value = document.getElementById("admin-id").value;
    let filteredUser = USERTABLE.filter(function (users){
        return users.userID == document.getElementById("user-id-edit-admin").value;
    });
    filteredUser.forEach(function (users) {
        document.getElementById("first-name-edit-admin").value = users.firstName;
        document.getElementById("last-name-edit-admin").value = users.lastName;
        document.getElementById("email-address-edit-admin").value = users.email;
    });
}

//profile update user admin
document.getElementById("submit-user-edit-admin").addEventListener('click', function(){
    if(document.getElementById("first-name-edit").value == '' && document.getElementById("last-name-edit").value == '' &&
    document.getElementById("email-address-edit").value == ''){
        alert('Please fill up all field.');
    }
    else{
        //console.log(document.getElementById("user-id-edit-admin").value);
        let filteredUser = USERTABLE.filter(function (users){
            return users.userID == document.getElementById("user-id-edit").value;
        });
        filteredUser.forEach(function (users) {
            users.firstName = document.getElementById("first-name-edit-admin").value;
            users.lastName = document.getElementById("last-name-edit-admin").value;
            users.email = document.getElementById("email-address-edit-admin").value;
        });
        alert('Update Success.');
        document.getElementById("transaction-area-admin").style.display = 'block';
        document.getElementById("profile-area-admin").style.display = 'none';
    }
});

//update user admin
document.getElementById("submit-user-edit-admin").addEventListener('click', function(){
    if(document.getElementById("first-name-edit").value == '' && document.getElementById("last-name-edit").value == '' &&
    document.getElementById("email-address-edit").value == ''){
        alert('Please fill up all field.');
    }
    else{
        //console.log(document.getElementById("user-id-edit-admin").value);
        let filteredUser = USERTABLE.filter(function (users){
            return users.userID == document.getElementById("user-id-edit").value;
        });
        filteredUser.forEach(function (users) {
            users.firstName = document.getElementById("first-name-edit-admin").value;
            users.lastName = document.getElementById("last-name-edit-admin").value;
            users.email = document.getElementById("email-address-edit-admin").value;
        });
        alert('Update Success.');
        document.getElementById("transaction-area-admin").style.display = 'block';
        document.getElementById("profile-area-admin").style.display = 'none';
    }
});

document.getElementById("return-user-edit-admin").onclick = function() {
    document.getElementById("transaction-area-admin").style.display = 'block';
    document.getElementById("profile-area-admin").style.display = 'none';
}

//login
document.getElementById("submit-login").addEventListener('click', function(){
    let password = '', userId = '', fullname = '', usertype = '', attempt = '', status = '';
    if(document.getElementById("login-username").value !== '' && document.getElementById("login-password").value){
        let filteredUser = USERTABLE.filter(function (users){
            return users.userName == document.getElementById("login-username").value;
        });
        filteredUser.forEach(function (users) {
            userId = users.userID;
            password = users.password;
            usertype = users.userType;
            attempt = users.attemptLogin;
            status = users.status;
            fullname = users.firstName + " " + users.lastName;
        });
        if(document.getElementById("login-password").value === password){
            filteredUser.forEach(function (users) {
                users.attemptLogin = 0;
            });
            if(status=='Freeze'){
                alert('Your account is Frozen. Please contact your administrator to unfreeze your account'); 
            }
            else{
                document.getElementById("login-area").style.display = 'none';
                if(usertype === 1){
                    document.getElementById("profile-update").innerHTML = "";
                    document.getElementById("profile-update").innerHTML = `Hello, ${fullname}`;
                    document.getElementById("user-id").value = userId;
                    document.getElementById("transaction-area").style.display = 'block';
                    viewTableUser();
                }
                else if(usertype === 0){
                    document.getElementById("profile-update-admin").innerHTML = "";
                    document.getElementById("profile-update-admin").innerHTML = `Hello, ${fullname}`;
                    document.getElementById("admin-id").value = userId;
                    document.getElementById("transaction-area-admin").style.display = 'block';
                    viewTableAdmin();
                }
            }
            //document.getElementById('user-greetings').innerHTML = "WELCOME " + ; add ng function sa user table para iview yung full name
        }
        else if(attempt >= 3){
            filteredUser.forEach(function (users) {
                users.status = 'Freeze';
            });
            alert('Your account is Frozen. Please contact your administrator to unfreeze your account'); 
        }
        else{
            filteredUser.forEach(function (users) {
                users.attemptLogin += 1;
            });
            alert('Wrong Username or Password.'); 
        }
    }
    else{
        alert('Please fill in all fields.');
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

document.getElementById("change-register").addEventListener('click', function(){
    document.getElementById("first-name").value = '';
    document.getElementById("last-name").value = '';
    document.getElementById("email-address").value = '';
    document.getElementById("user-name").value = '';
    document.getElementById("password").value = '';
    document.getElementById("confirm-password").value = '';
    document.getElementById("login-area").style.display = 'none';
    document.getElementById("transaction-area").style.display = 'none';
    document.getElementById("registration-area").style.display = 'block';

});

//close register
document.getElementById("return-register").addEventListener('click', function(){
    document.getElementById("login-area").style.display = 'block';
    document.getElementById("transaction-area").style.display = 'none';
    document.getElementById("registration-area").style.display = 'none';

});

//register user user
document.getElementById("submit-register").addEventListener('click', function(){
    if(document.getElementById("first-name").value == '' && document.getElementById("last-name").value == '' &&
    document.getElementById("email-address").value == '' && document.getElementById("user-name").value == '' &&
    document.getElementById("password").value == '' && document.getElementById("confirm-password").value == ''){
        alert('Please fill up all field.');
    }
    else if(document.getElementById("password").value !== document.getElementById("confirm-password").value){
        alert('Password does not match.');
    }
    else{
        let filteredUser = USERTABLE.filter(function (users){
            return users.userName == document.getElementById("user-name").value;
        });
        if(USERTABLE.length >= 6){
            alert('Can only add up to 5 users.');
        }
        else if(filteredUser.length > 0){
            alert('Username already taken.');
        }
        else{
            if(!confirm('Add User?')){
                return false;
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
                    userType: 1,
                    status: 'Unfreeze',
                    attemptLogin: 0,
                };
                USERTABLE.push(newUser);
                alert('User Registered Successfully.');
                document.getElementById("registration-area").style.display = 'none';
                document.getElementById("login-area").style.display = 'block';
            }
        }
    }
});

document.getElementById("add-user").addEventListener('click', function(){
    document.getElementById("transaction-area-admin").style.display = 'none';
    document.getElementById("registration-area-admin").style.display = 'block';

});

//close register
document.getElementById("return-register-admin").addEventListener('click', function(){
    document.getElementById("transaction-area-admin").style.display = 'block';
    document.getElementById("registration-area-admin").style.display = 'none';

});

//register user admin
document.getElementById("submit-register-admin").addEventListener('click', function(){
    if(document.getElementById("first-name-admin").value == '' && document.getElementById("last-name-admin").value == '' &&
    document.getElementById("email-address-admin").value == '' && document.getElementById("user-name-admin").value == '' &&
    document.getElementById("password-admin").value == '' && document.getElementById("confirm-password-admin").value == ''){
        alert('Please fill up all field.');
    }
    else if(document.getElementById("password-admin").value !== document.getElementById("confirm-password-admin").value){
        alert('Password does not match.');
    }
    else{
        let filteredUser = USERTABLE.filter(function (users){
            return users.userName == document.getElementById("user-name-admin").value;
        });
        console.log(USERTABLE.length);
        if(USERTABLE.length >= 6){
            alert('Can only add up to 5 users.');
        }
        else if(filteredUser.length >0){
            alert('Username already taken.');
        }
        else{
            if(!confirm('Add User?')){
                return false;
            }
            else{
                let userTotal = USERTABLE.length;
                let newUser = {
                    userID: 'user'+userTotal,
                    firstName: document.getElementById("first-name-admin").value,
                    lastName: document.getElementById("last-name-admin").value,
                    email: document.getElementById("email-address-admin").value,
                    userName: document.getElementById("user-name-admin").value,
                    password: document.getElementById("password-admin").value,
                    userType: 1,
                    status: 'Unfreeze',
                    attemptLogin: 0,
                };
                USERTABLE.push(newUser);
                viewTableAdmin();
                alert('User Registered Successfully.');
                document.getElementById("registration-area-admin").style.display = 'none';
                document.getElementById("transaction-area-admin").style.display = 'block';
            }
        }
    }
});

//log out-user
document.getElementById("log-out").addEventListener('click', function(){
    document.getElementById("user-id").value = '';
    document.getElementById("user-id-edit").value = '';
    document.getElementById("login-username").value = '';
    document.getElementById("login-password").value = '';
    document.getElementById("login-area").style.display = 'block';
    document.getElementById("transaction-area").style.display = 'none';
});

//log out-admin
document.getElementById("log-out-admin").addEventListener('click', function(){
    document.getElementById("admin-id").value = '';
    document.getElementById("user-id-edit").value = '';
    document.getElementById("login-username").value = '';
    document.getElementById("login-password").value = '';
    document.getElementById("login-area").style.display = 'block';
    document.getElementById("transaction-area-admin").style.display = 'none';
});

//delete before presentation
//viewTableUser();

//user table
function viewTableUser(){
    //console.log('userId:::::'+document.getElementById("user-id").value);
    let filteredAccount = ACCOUNTTABLE.filter(function (accounts){
        return accounts.userID == document.getElementById("user-id").value;
    });
    let accountTableLength = filteredAccount.length;
    let i = 0, count = 1, countUser = 3;
    document.getElementById("view-account1").style.display = 'none';
    document.getElementById("view-account2").style.display = 'none';
    document.getElementById("view-account3").style.display = 'none';
    if(accountTableLength < 3){
        countUser = filteredAccount.length;
    }
    if(countUser > 0){
        while(i<countUser){
            /*if(USERTABLE[i].userID == document.getElementById("user-id").value){
                i++;
            }
            else{*/
            if(i==0){
                document.getElementById("account-id1").innerHTML = `${filteredAccount[i].accountID}`;
                document.getElementById("account-name1").innerHTML = `${filteredAccount[i].accountName}`;
                document.getElementById("balance1").innerHTML = `${filteredAccount[i].balance}`;
                document.getElementById("status1").innerHTML = `${filteredAccount[i].status}`;
                document.getElementById("view-account1").style.display = 'block';
                i++;
            }
            else if(i==1){
                document.getElementById("account-id2").innerHTML = `${filteredAccount[i].accountID}`;
                document.getElementById("account-name2").innerHTML = `${filteredAccount[i].accountName}`;
                document.getElementById("balance2").innerHTML = `${filteredAccount[i].balance}`;
                document.getElementById("status2").innerHTML = `${filteredAccount[i].status}`;
                document.getElementById("view-account2").style.display = 'block';
                i++;
            }
            else if(i==2){
                document.getElementById("account-id3").innerHTML = `${filteredAccount[i].accountID}`;
                document.getElementById("account-name3").innerHTML = `${filteredAccount[i].accountName}`;
                document.getElementById("balance3").innerHTML = `${filteredAccount[i].balance}`;
                document.getElementById("status3").innerHTML = `${filteredAccount[i].status}`;
                document.getElementById("view-account3").style.display = 'block';
                i++;
            }
        }
        
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

//viewTableAdmin();

function viewTableAdmin(){
    //console.log('userId:::::'+document.getElementById("admin-id").value);
    let i = 0, count = 1, countUser = 0;
    document.getElementById("admin-view1").style.display = 'none';
    document.getElementById("admin-view2").style.display = 'none';
    document.getElementById("admin-view3").style.display = 'none';
    document.getElementById("admin-view4").style.display = 'none';
    document.getElementById("admin-view5").style.display = 'none';
    if(USERTABLE.length < 6){
        countUser = USERTABLE.length;
    }
    if(countUser > 0){
        while(i<countUser){
            console.log(i);
            if(i==0){
                document.getElementById("admin-id1").innerHTML = `${USERTABLE[i].userID}`;
                document.getElementById("admin-name1").innerHTML = `${USERTABLE[i].firstName} ${USERTABLE[i].lastName}`;
                document.getElementById("admin-username1").innerHTML = `${USERTABLE[i].userName}`;
                document.getElementById("admin-status1").innerHTML = `${USERTABLE[i].status}`;
                document.getElementById("admin-view1").style.display = 'block';
                i++;
            }
            else if(i==1){
                document.getElementById("admin-id2").innerHTML = `${USERTABLE[i].userID}`;
                document.getElementById("admin-name2").innerHTML = `${USERTABLE[i].firstName} ${USERTABLE[i].lastName}`;
                document.getElementById("admin-username2").innerHTML = `${USERTABLE[i].userName}`;
                document.getElementById("admin-status2").innerHTML = `${USERTABLE[i].status}`;
                document.getElementById("admin-view2").style.display = 'block';
                i++;
            }
            else if(i==2){
                document.getElementById("admin-id3").innerHTML = `${USERTABLE[i].userID}`;
                document.getElementById("admin-name3").innerHTML = `${USERTABLE[i].firstName} ${USERTABLE[i].lastName}`;
                document.getElementById("admin-username3").innerHTML = `${USERTABLE[i].userName}`;
                document.getElementById("admin-status3").innerHTML = `${USERTABLE[i].status}`;
                document.getElementById("admin-view3").style.display = 'block';
                i++;
            }
            else if(i==3){
                document.getElementById("admin-id4").innerHTML = `${USERTABLE[i].userID}`;
                document.getElementById("admin-name4").innerHTML = `${USERTABLE[i].firstName} ${USERTABLE[i].lastName}`;
                document.getElementById("admin-username4").innerHTML = `${USERTABLE[i].userName}`;
                document.getElementById("admin-status4").innerHTML = `${USERTABLE[i].status}`;
                document.getElementById("admin-view4").style.display = 'block';
                i++;
            }
            else if(i==4){
                document.getElementById("admin-id5").innerHTML = `${USERTABLE[i].userID}`;
                document.getElementById("admin-name5").innerHTML = `${USERTABLE[i].firstName} ${USERTABLE[i].lastName}`;
                document.getElementById("admin-username5").innerHTML = `${USERTABLE[i].userName}`;
                document.getElementById("admin-status5").innerHTML = `${USERTABLE[i].status}`;
                document.getElementById("admin-view5").style.display = 'block';
                i++;
            }
            else if(i==5){
                document.getElementById("admin-id6").innerHTML = `${USERTABLE[i].userID}`;
                document.getElementById("admin-name6").innerHTML = `${USERTABLE[i].firstName} ${USERTABLE[i].lastName}`;
                document.getElementById("admin-username6").innerHTML = `${USERTABLE[i].userName}`;
                document.getElementById("admin-status6").innerHTML = `${USERTABLE[i].status}`;
                document.getElementById("admin-view6").style.display = 'block';
                i++;
            }
        }

    }
}
