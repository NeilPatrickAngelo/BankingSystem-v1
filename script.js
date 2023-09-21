let USERTABLE = [];
USERTABLE = [
	{userID: "admin", firstName: "Neil", lastName: "Administrator", email: "admin@gmail.com", userName: "admin", password: "admin", userType: 0, status: "Unfreeze", attemptLogin: 100},
	{userID: "user1", firstName: "Neil1", lastName: "Falceso1", email: "admin@gmail.com", userName: "user1", password: "user1", userType: 1, status: "Unfreeze", attemptLogin: 0},
	{userID: "user2", firstName: "Neil2", lastName: "Falceso2", email: "admin@gmail.com", userName: "user2", password: "user2", userType: 1, status: "Unfreeze", attemptLogin: 0},
	];

let ACCOUNTTABLE = [];
ACCOUNTTABLE = [
	{accountID: "account1", accountNumber: "number1", accountName: "My Savings1", userID: "user1", balance: '10.00', status: "Unfreeze"},
    {accountID: "account2", accountNumber: "number2", accountName: "My Savings2", userID: "user1", balance: '20.00', status: "Freeze"},
    {accountID: "account3", accountNumber: "number3", accountName: "My Savings2", userID: "user2", balance: '20.00', status: "Unfreeze"},
//	{accountID: "account1", accountName: "My Savings3", userID: "user2", balance: 10.00, status: "Active"},
//    {accountID: "account2", accountName: "My Savings4", userID: "user2", balance: 20.00, status: "Active"},
	];

let TRANSACTION = [];
TRANSACTION = [
    {transactionID: "14", userID: "user1", account: "account1", amount: '-.10', transactionType: "withdrawal", transactionDate: '9/20/2023, 7:35:48 PM'},
    {transactionID: "6", userID: "user1", account: "account1", amount: '-.40', transactionType: "withdrawal", transactionDate: '9/20/2023, 5:31:48 PM'},
    {transactionID: "5", userID: "user1", account: "account1", amount: '-.20', transactionType: "transfer", transactionDate: '9/20/2023, 5:31:48 PM'},
    {transactionID: "13", userID: "user1", account: "account1", amount: '-.50', transactionType: "withdrawal", transactionDate: '5/17/2023, 8:36:48 PM'},
    {transactionID: "12", userID: "user1", account: "account1", amount: '-2.50', transactionType: "transfer", transactionDate: '3/30/2023, 9:35:48 AM'},
    {transactionID: "11", userID: "user1", account: "account1", amount: '-1.00', transactionType: "withdrawal", transactionDate: '8/20/2023, 1:35:48 PM'},
    {transactionID: "10", userID: "user1", account: "account1", amount: '-1.50', transactionType: "withdrawal", transactionDate: '2/15/2023, 5:31:48 PM'},
    {transactionID: "9", userID: "user1", account: "account1", amount: '-1.00', transactionType: "withdrawal", transactionDate: '4/11/2023, 1:15:48 AM'},
    {transactionID: "8", userID: "user1", account: "account1", amount: '-1.50', transactionType: "withdrawal", transactionDate: '2/20/2023, 5:31:48 PM'},
    {transactionID: "7", userID: "user1", account: "account1", amount: '-1.50', transactionType: "transfer", transactionDate: '9/15/2023, 5:31:48 PM'},
    {transactionID: "4", userID: "user1", account: "account1", amount: '1.50', transactionType: "transfer", transactionDate: '10/15/2022, 5:31:48 PM'},
    {transactionID: "3", userID: "user1", account: "account2", amount: '1.50', transactionType: "transfer", transactionDate: '10/15/2022, 5:31:48 PM'},
    {transactionID: "2", userID: "user1", account: "account2", amount: '1.50', transactionType: "transfer", transactionDate: '10/15/2022, 5:31:48 PM'},
    {transactionID: "1", userID: "user1", account: "account2", amount: '1.50', transactionType: "transfer", transactionDate: '10/15/2022, 5:31:48 PM'},
    ];

let LOGHISTORY = [];


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
        typeOption.text = filteredAccount[withacc].accountNumber;
        transactType.add(typeOption);
    }
}


//update account
function updateAccountTransact(amount, accountId){
    let newBal = 0, newBalance = 0, amountValue = 0;
    let filteredAccountUser = ACCOUNTTABLE.filter(function (users){
        return users.userID == document.getElementById("user-id").value;
    });
    let filteredAccount = ACCOUNTTABLE.filter(function (accounts){
        return accounts.accountID == accountId;
    });
    filteredAccount.forEach(function (accounts) {
        //newAmount = accounts.balance + newAmount;
        newBal = accounts.balance;
    });
    amountValue = parseFloat(amount);
    newBalance = parseFloat(newBal);
    newBalance += amountValue;
    console.log(newBalance);
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

//transfer denominations own
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

//transfer denominations other user
function transferdenomUser(element){
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

        document.getElementById("transfer-balance-user").innerHTML = `Available Balance: ${balance}`;
        document.getElementById("transfer-twentyfive-user").innerHTML = `25 cents: ${denomArr.cents25final}`;
        document.getElementById("transfer-ten-user").innerHTML = `10 cents: ${denomArr.cents10final}`;
        document.getElementById("transfer-five-user").innerHTML = `5 cents: ${denomArr.cents05final}`;
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

//open withdraw
document.getElementById("add-withdraw").addEventListener('click', function(){
    document.getElementById("withdraw-balance").innerHTML = "Available Balance: ";
    document.getElementById("withdraw-twentyfive").innerHTML = "25 cents: ";
    document.getElementById("withdraw-ten").innerHTML = "10 cents: ";
    document.getElementById("withdraw-five").innerHTML = "5 cents: ";
    document.getElementById("withdraw-amount").innerHTML = " ";
    dropDownAccounts("withdraw-account");
    document.getElementById("modal-withdraw").style.display = "block";
});

document.getElementById("close-withdraw").onclick = function() {
    document.getElementById("modal-withdraw").style.display = "none";
}

//open deposit
document.getElementById("add-deposit").addEventListener('click', function(){
    dropDownAccounts("deposit-account");
    document.getElementById("deposit-amount").innerHTML = " ";
    document.getElementById("modal-deposit").style.display = "block";
});

document.getElementById("close-deposit").onclick = function() {
    document.getElementById("modal-deposit").style.display = "none";
}

//open transfer
document.getElementById("add-transfer").addEventListener('click', function(){
    dropDownAccounts("transfer-account-from-user");
    document.getElementById("modal-transfer-user").style.display = "block";
});

document.getElementById("close-transfer-select").onclick = function() {
    document.getElementById("modal-transfer-select").style.display = "none";
}

//open transfer to own
document.getElementById("submit-transfer-own").addEventListener('click', function(){
    document.getElementById("transfer-balance").innerHTML = "Available Balance: ";
    document.getElementById("transfer-twentyfive").innerHTML = "25 cents: ";
    document.getElementById("transfer-ten").innerHTML = "10 cents: ";
    document.getElementById("transfer-five").innerHTML = "5 cents: ";
    document.getElementById("transfer-amount").innerHTML = " ";
    dropDownAccounts("transfer-account-from");
    dropDownAccounts("transfer-account-to");
    document.getElementById("modal-transfer-select").style.display = "none";
    document.getElementById("modal-transfer").style.display = "block";
});

document.getElementById("close-transfer").onclick = function() {
    document.getElementById("modal-transfer").style.display = "none";
}

document.getElementById("close-transfer-x").onclick = function() {
    document.getElementById("modal-transfer").style.display = "none";
}

//open transfer to another user
document.getElementById("submit-transfer-user").addEventListener('click', function(){
    document.getElementById("transfer-balance-user").innerHTML = "Available Balance: ";
    document.getElementById("transfer-twentyfive-user").innerHTML = "25 cents: ";
    document.getElementById("transfer-ten-user").innerHTML = "10 cents: ";
    document.getElementById("transfer-five-user").innerHTML = "5 cents: ";
    document.getElementById("transfer-amount-user").innerHTML = " ";
    dropDownAccounts("transfer-account-from-user");
    document.getElementById("modal-transfer-select").style.display = "none";
    document.getElementById("modal-transfer-user").style.display = "block";
});

document.getElementById("close-transfer-other-user").onclick = function() {
    document.getElementById("modal-transfer-user").style.display = "none";
}

document.getElementById("close-transfer-user-x").onclick = function() {
    document.getElementById("modal-transfer-user").style.display = "none";
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
    let admountValue = parseFloat(amount).toFixed(2), getUser;
    let filteredUser = USERTABLE.filter(function (accounts){
        return accounts.accountID == accountId;
    });
    filteredUser.forEach(function (users) {
        getUser = users.userId;
    });
    let countTransaction = parseInt(TRANSACTION.length) + 1;
    let datetoday = new Date().toLocaleString();
    let newTransaction = {
        transactionID: ''+countTransaction,
        userID: getUser,
        account: accountId,
        amount: admountValue,
        transactionType: transactType,
        transactionDate: datetoday,
    };
    TRANSACTION.unshift(newTransaction);
}

//view Receipt after transaction
function viewReceipt(transactInfo, transactionType){
    console.log(transactInfo);
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
function viewReceiptAccount(accountName, fullName, dateTransact, amount, remBalance, transactionType){
    document.getElementById("modal-receipt").style.display = "block";
    document.getElementById("receipt-title").textContent = transactionType;
    document.getElementById("receipt-account").textContent = accountName;
    document.getElementById("receipt-name").textContent = fullName;
    document.getElementById("receipt-date").textContent = dateTransact;
    document.getElementById("receipt-amount").textContent = amount;
    document.getElementById("receipt-balance").textContent = remBalance;
}

document.getElementById("receipt-close-x").onclick = function() {
    document.getElementById("modal-receipt").style.display = "none";
}

//get transaction info
function getTransactionInfoAccount(accountId, amount, name){
    console.log('accountId'+accountId);
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

function getTransactionTransferInfo(accountFrom, accountTo, amount){
    let datetoday = new Date().toLocaleString();
    let fullName = "", accountID = "", accountNameFrom = "", accountNameTo = "", remBalance = "";
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
    let filteredAccountNameFrom = ACCOUNTTABLE.filter(function (accounts){
        return accounts.accountID == accountFrom;
    });
    let filteredAccountNameTo = ACCOUNTTABLE.filter(function (accounts){
        return accounts.accountID == accountTo;
    });
    filteredAccountNameFrom.forEach(function (accounts) {
        accountNameFrom = accounts.accountName;
        remBalance = accounts.balance;
    });
    filteredAccountNameTo.forEach(function (accounts) {
        accountNameTo = accounts.accountName;
    });
    //console.log('accountName'+accountName+' fullName'+fullName+' datetoday'+datetoday+' amount'+amount+' remBalance'+remBalance);
    let newTransactionInfo = {
        accountName: 'Transfer From: ' +accountNameFrom + ' To: '+ accountNameTo,
        fullName: fullName,
        datetoday: datetoday,
        amount: amount,
        remBalance: remBalance,
    };
    return newTransactionInfo;
}
//withdrawal
document.getElementById("submit-withdraw").onclick = function() {
    let newBal = 0, newBalance = 0.00, datetoday = new Date(), dateTransact = '';
    let amount = parseFloat(document.getElementById("withdraw-amount").value).toFixed(2);
    let select = document.getElementById("withdraw-account").options;
    let account = select[select.selectedIndex].id, status = '';
    let transactType = "withdrawal", shortDate = `${datetoday.getMonth()+1}/${datetoday.getDate()}/${datetoday.getFullYear()}`;
    let totalWithdraw = 0.00, withAmount = 0.00;
    let filteredAccountUser = ACCOUNTTABLE.filter(function (users){
        return users.userID == document.getElementById("user-id").value;
    });
    let filteredAccount = filteredAccountUser.filter(function (accounts){
        return accounts.accountID == account;
    });
    let filteredTransactDate = TRANSACTION.filter(function (transact){
        return transact.account == account;
    });
    filteredAccount.forEach(function (accounts) {
        newBal = accounts.balance;
        status = accounts.status;
    });
    console.log(status);
    if(status == 'Freeze'){
        alert('Cannot do withdrawals. Account is Frozen.');
    }
    else{
        filteredTransactDate.forEach(function (transact) {
            let getShortDate = '', getLongDate = '';
            getLongDate = new Date(transact.transactionDate);
            getShortDate = `${getLongDate.getMonth()+1}/${getLongDate.getDate()}/${getLongDate.getFullYear()}`;
            if(transact.transactionType == "withdrawal"){
                if(datetoday.getFullYear()==getLongDate.getFullYear()){
                    if(datetoday.getMonth()+1==getLongDate.getMonth()+1){
                        if(datetoday.getDate()==getLongDate.getDate()){
                            withAmount = parseFloat(transact.amount);
                            totalWithdraw = totalWithdraw + withAmount;
                        }
                    }
                }
            }
        });
        totalWithdraw -= parseFloat(amount).toFixed(2);
        console.log('dateTransact::::'+totalWithdraw);
        if(totalWithdraw < -.9){
            alert('You have reached your withdrawal limit of 90 cents per day!');
        }
        else{
            newBalance = parseFloat(newBal).toFixed(2);
            newBalance -= amount;
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
                        viewReceipt(transactInfo, 'Withdrawal Complete');
                        document.getElementById("modal-withdraw").style.display = "none";
                    }
                }
            }else{
                alert('Amount Missing.');
            }
        }
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
                viewReceipt(transactInfo, 'Deposit Complete');
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

//transfer to own
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
        return accounts.accountID == accountfrom;
    });
    filteredAccount.forEach(function (accounts) {
        newBal = accounts.balance;
    });
    newBalance = parseFloat(newBal).toFixed(2);
    console.log(newBalance);
    newBalance -= amount;
    if(accountfrom == 'none' || accountto == 'none'){
        alert('Please Select an Account.');
    }
    else if(accountfrom == accountto){
        alert('You are transfering to the same account.');
    }
    else if(amount != ''){
        console.log(newBalance);
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
                let transactInfofrom = getTransactionTransferInfo(accountfrom, accountto, amountValue);
                viewReceipt(transactInfofrom, 'Transfer Complete');
                document.getElementById("modal-transfer").style.display = "none";
            }
        }
    }else{
        alert('Amount Missing.');
    }
};

//transfer to other user
document.getElementById("submit-transfer-other-user").onclick = function() {
    let newBal = 0, newBalance = 0.00;
    let amount = parseFloat(document.getElementById("transfer-amount-user").value).toFixed(2);
    let selectfrom = document.getElementById("transfer-account-from-user").options;
    let accountfrom = selectfrom[selectfrom.selectedIndex].id;
    let accountto = document.getElementById("transfer-account-to-user").value;
    let accounttoId = '';
    let transactType = "transfer";
    let filteredAccountUser = ACCOUNTTABLE.filter(function (users){
        return users.userID == document.getElementById("user-id").value;
    });
    let filteredAccount = filteredAccountUser.filter(function (accounts){
        return accounts.accountID == accountfrom;
    });
    filteredAccount.forEach(function (accounts) {
        newBal = accounts.balance;
    });
    let accountNumber = ACCOUNTTABLE.filter(function (accounts){
        return accounts.accountNumber == accountto;
    });
    accountNumber.forEach(function (accounts) {
        accounttoId = accounts.accountID;
    });
    newBalance = parseFloat(newBal).toFixed(2);
    console.log(newBalance);
    newBalance -= amount;
    if(accountfrom == 'none'){
        alert('Please Select an Account.');
    }
    else if(accountfrom == accountto){
        alert('You are transfering to the same account.');
    }
    else if(accountto == ''){
        alert('Please Fill in where to Transfer.');
    }
    else if(amount != ''){
        console.log(newBalance);
        if(isNaN(amount)){
            alert('Invalid amount.');
        }
        else if(amount<0){
            alert('Amount sholud not be less than 0.');
        }
        else if(newBalance < 0.05){
            alert('Cannot withdraw from account. Maintaining balance of 5 centavos is required.');
        }
        else if(accountNumber.length == 0){
            alert('Account Number Does not Exist');
        }
        else{
            if(!confirm('Confirm Transfer?')){
                return false;
            }
            else{
                let amountValue = parseFloat(amount).toFixed(2);
                let withamount = amountValue * -1
                addTransaction(withamount, transactType, accountfrom);
                addTransaction(amountValue, transactType, accounttoId);
                updateAccountTransact(withamount, accountfrom);
                updateAccountTransact(amountValue, accounttoId);
                let transactInfofrom = getTransactionTransferInfo(accountfrom, accounttoId, amountValue);
                viewReceipt(transactInfofrom, 'Transfer Complete');
                document.getElementById("modal-transfer").style.display = "none";
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

//for viewing the account buttons
document.getElementById("view-account1").addEventListener('click', function(){
    let id = document.getElementById("account-id1").textContent, name = document.getElementById("account-name1").textContent;
    let number = document.getElementById("account-number1").textContent, balance = document.getElementById("balance1").textContent;
    let status =  document.getElementById("status1").textContent;
    //console.log(id, name, balance, status);
    viewAccount(id, name, balance, number, status);
    //document.getElementById('modal-withdrawal').style.display = "block";
});

document.getElementById("view-account2").addEventListener('click', function(){
    let id = document.getElementById("account-id2").textContent, name = document.getElementById("account-name2").textContent;
    let number = document.getElementById("account-number2").textContent, balance = document.getElementById("balance2").textContent;
    let status =  document.getElementById("status2").textContent;
    //console.log(id, name, balance, status);
    viewAccount(id, name, balance, number, status);
    //document.getElementById('modal-withdrawal').style.display = "block";
});

document.getElementById("view-account3").addEventListener('click', function(){
    let id = document.getElementById("account-id3").textContent, name = document.getElementById("account-name3").textContent;
    let number = document.getElementById("account-number3").textContent, balance = document.getElementById("balance3").textContent;
    let status =  document.getElementById("status3").textContent;
    //console.log(id, name, balance, status);
    viewAccount(id, name, balance, number, status);
    //document.getElementById('modal-withdrawal').style.display = "block";
});

//for viewing the account
function viewAccount(id, name, balance, number, status){
    let TRANSACTIONHISTORY = [];
    document.getElementById("modal-account").style.display = "block";
    //console.log('Id and Name: '+id, name);
    document.getElementById("container-transaction-table-tbody").innerHTML = "";
    let filteredAccount = TRANSACTION.filter(function (transact){
        return transact.userID == document.getElementById("user-id").value;
    });
    //console.log(filteredAccount);
    let filteredTransactions = filteredAccount.filter(function (transact){
        return transact.account == id;
    });
    let filteredTransactionsSlice = filteredTransactions.slice(0,10);
    let filteredTransactionsSliceSize = filteredTransactionsSlice.length;
    //console.log(filteredTransactionsSlice);
    /*filteredTransactionsSlice.forEach(function (transaction) {
        receiptInfo = {
            accountName: name,
            fullName: 'Neil Patrick Falceso',
            datetoday: transaction.transactionDate,
            amount: transaction.amount,
            remBalance: balance,
        };
        console.log(receiptInfo);
        /*console.log(`No. ${index + 1}:`);
        console.log(`Id: ${transaction.transactionID}`);
        console.log(`Type: ${transaction.transactionType}`);
        console.log(`Amount: ${transaction.amount}`);
        console.log(`Date: ${transaction.transactionDate}`);
        console.log("--------------");
        document.getElementById("container-transaction-table-tbody").innerHTML+= `<tr class="container-accounts-details">` +
        `<td class="column1">${transaction.transactionType}</td><td class="column2">${transaction.amount}</td>` +
        `<td class="column3">${transaction.transactionDate}</td><td class="column4">` +
        `<button type="button" id="view-account" onclick="viewReceipt('Neil' , ${transaction.transactionType});">View</button></td></tr>`
    });*/
    for(let i = 0; i < filteredTransactionsSliceSize; i ++){
        let count = i + 1;
        let typeId = 'typeId'+count, amountId = 'amountId'+count, dateId = 'dateId'+count, accountNameId = 'accountNameId'+count, buttonId = 'buttonId'+count;
        let receiptInfo = {
            accountName: name,
            fullName: document.getElementById("full-name-user").textContent,
            datetoday: filteredTransactionsSlice[i].transactionDate,
            amount: filteredTransactionsSlice[i].amount,
            remBalance: balance,
        };
        let infoSelect = '"'+name+'","'+document.getElementById("full-name-user").textContent+'","' +
        filteredTransactionsSlice[i].transactionDate+'","'+filteredTransactionsSlice[i].amount+'","'+balance+'","'+
        filteredTransactionsSlice[i].transactionType+'"';
        TRANSACTIONHISTORY.unshift(receiptInfo);
        document.getElementById("container-transaction-table-tbody").innerHTML+= "<tr class='container-accounts-details'>" +
        "<td id='"+typeId+"' class='column1'>"+filteredTransactionsSlice[i].transactionType+"</td><td id='"+amountId+"' class='column2'>"+filteredTransactionsSlice[i].amount+"</td>" +
        "<td id='"+dateId+"' class='column3'>"+filteredTransactionsSlice[i].transactionDate+"</td><td></td"+
        "<td class='column4'><button type='button' id='"+buttonId+"' onclick='viewReceiptAccount("+infoSelect+")'>View</button></td></tr>"
    }
    document.getElementById("account-id").value = id;
    document.getElementById("account-number").innerHTML = number;
    document.getElementById("account-name").value = name;
    document.getElementById("balance").innerHTML = balance;
}

//for viewing the account transactions admin side
function viewAccountTransactionAdmin(){
    let TRANSACTIONHISTORY = [];
    document.getElementById("container-transaction-table-open").style.display = "block";
    //console.log('Id and Name: '+id, name);
    document.getElementById("container-transactions-admin-table-tbody").innerHTML = "";
    let filteredAccount = TRANSACTION.filter(function (transact){
        return transact.account == document.getElementById("account-id-admin-user").value;
    });
    //console.log(filteredAccount);
    let filteredTransactions = filteredAccount.filter(function (transact){
        return transact.account == document.getElementById("account-id-admin-user").value;
    });
    let filteredTransactionsSlice = filteredTransactions.slice(0,10);
    let filteredTransactionsSliceSize = filteredTransactionsSlice.length;
    //console.log(filteredTransactionsSlice);
    /*filteredTransactionsSlice.forEach(function (transaction) {
        receiptInfo = {
            accountName: name,
            fullName: 'Neil Patrick Falceso',
            datetoday: transaction.transactionDate,
            amount: transaction.amount,
            remBalance: balance,
        };
        console.log(receiptInfo);
        /*console.log(`No. ${index + 1}:`);
        console.log(`Id: ${transaction.transactionID}`);
        console.log(`Type: ${transaction.transactionType}`);
        console.log(`Amount: ${transaction.amount}`);
        console.log(`Date: ${transaction.transactionDate}`);
        console.log("--------------");
        document.getElementById("container-transaction-table-tbody").innerHTML+= `<tr class="container-accounts-details">` +
        `<td class="column1">${transaction.transactionType}</td><td class="column2">${transaction.amount}</td>` +
        `<td class="column3">${transaction.transactionDate}</td><td class="column4">` +
        `<button type="button" id="view-account" onclick="viewReceipt('Neil' , ${transaction.transactionType});">View</button></td></tr>`
    });*/
    for(let i = 0; i < filteredTransactionsSliceSize; i ++){
        let count = i + 1;
        let typeId = 'typeTransactId'+count, amountId = 'amountTransactId'+count, dateId = 'dateTransactId'+count, accountNameId = 'accountNameTransactId'+count, buttonId = 'buttonTransactId'+count;
        let receiptInfo = {
            accountName: document.getElementById("account-name-admin-user").value,
            fullName: document.getElementById("account-edit-first-name-admin").value + ' ' + document.getElementById("account-edit-last-name-admin").value,
            datetoday: filteredTransactionsSlice[i].transactionDate,
            amount: filteredTransactionsSlice[i].amount,
            remBalance: document.getElementById("balance-admin-user").textContent,
        };
        let infoSelect = '"'+document.getElementById("account-name-admin-user").value+'","'+document.getElementById("account-edit-first-name-admin").value + 
        ' ' + document.getElementById("account-edit-last-name-admin").value+'","' +filteredTransactionsSlice[i].transactionDate+'","'+
        filteredTransactionsSlice[i].amount+'","'+document.getElementById("balance-admin-user").textContent+'","'+
        filteredTransactionsSlice[i].transactionType+'"';
        TRANSACTIONHISTORY.unshift(receiptInfo);
        document.getElementById("container-transactions-admin-table-tbody").innerHTML+= "<tr class='container-accounts-details'>" +
        "<td id='"+typeId+"' class='column1'>"+filteredTransactionsSlice[i].transactionType+"</td><td id='"+amountId+"' class='column2'>"+filteredTransactionsSlice[i].amount+"</td>" +
        "<td id='"+dateId+"' class='column3'>"+filteredTransactionsSlice[i].transactionDate+"</td><td></td"+
        "<td class='column4'><button type='button' id='"+buttonId+"' onclick='viewReceiptAccount("+infoSelect+")'>View</button></td></tr>"
    }
}
function viewAccountTransactionAdminClear(){
    document.getElementById("container-transactions-admin-table-tbody").innerHTML = "";
}

document.getElementById("close-account").onclick = function() {
    document.getElementById("modal-account").style.display = "none";
}

//for viewing transactions per account
function viewTransactions(){

}
//view account transactions ni admin
document.getElementById("submit-account-transactions-admin-user").addEventListener('click', function(){
    document.getElementById('container-transaction-table-open').style.display = "block";
    document.getElementById('account-transactions-admin-user').style.display = "none";
    document.getElementById('add-remove-funds-transact').style.display = "none";
    viewAccountTransactionAdmin();
});


document.getElementById("close-transactions-admin").addEventListener('click', function(){
    document.getElementById('container-transaction-table-open').style.display = "none";
    document.getElementById('account-transactions-admin-user').style.display = "block";
    document.getElementById('add-remove-funds-transact').style.display = "none";
    viewAccountTransactionAdminClear();
});

//view user ni admin
document.getElementById("admin-view1").addEventListener('click', function(){
    let id = document.getElementById("admin-id1").textContent;
    //console.log(id);
    viewAccountAdmin(id);
    //document.getElementById('modal-withdrawal').style.display = "block";
});

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
/*document.getElementById("cancel-account-edit-admin").addEventListener('click', function(){
    document.getElementById("modal-account-admin").style.display = "none";
});*/

document.getElementById("user-view-account1").addEventListener('click', function(){
    let id = document.getElementById("user-account-id1").textContent;
    //console.log(id);
    viewAccountAdminUser(id);
    //document.getElementById('modal-withdrawal').style.display = "block";
});
document.getElementById("user-view-account2").addEventListener('click', function(){
    let id = document.getElementById("user-account-id2").textContent;
    //console.log(id);
    viewAccountAdminUser(id);
    //document.getElementById('modal-withdrawal').style.display = "block";
});
document.getElementById("user-view-account3").addEventListener('click', function(){
    let id = document.getElementById("user-account-id3").textContent;
    //console.log(id);
    viewAccountAdminUser(id);
    //document.getElementById('modal-withdrawal').style.display = "block";
});

document.getElementById("close-account-admin-user").onclick = function() {
    document.getElementById("modal-account-admin-user").style.display = "none";
    document.getElementById("container-transaction-table-open").style.display = "none";
    document.getElementById("add-remove-funds-transact").style.display = "none";
    document.getElementById("account-transactions-admin-user").style.display = "block";
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
        document.getElementById("account-edit-status-admin").innerHTML = `Status:\t\t${users.status}`;
        status = users.status;
    });
    if(status=='Freeze'){
        document.getElementById("submit-account-status-admin").innerHTML = 'Unfreeze';
    }
    else{
        document.getElementById("submit-account-status-admin").innerHTML = 'Freeze';
    }
    viewTableAdminUser(id);
}

function viewAccountAdminUser(id){
    document.getElementById("modal-account-admin-user").style.display = "block";
    document.getElementById("account-id-admin-user").value = id;
    let status = '';
    let filteredUsers = ACCOUNTTABLE.filter(function (accounts){
        return accounts.accountID == id;
    });
    filteredUsers.forEach(function (accounts) {
        document.getElementById("account-number-admin-user").innerHTML = accounts.accountNumber;
        document.getElementById("account-name-admin-user").value = accounts.accountName;
        document.getElementById("balance-admin-user").innerHTML = accounts.balance;
        document.getElementById("status-admin-user").innerHTML = `Status: ${accounts.status}`;
        status = accounts.status;
    });
    if(status=='Freeze'){
        document.getElementById("submit-account-status-admin-user").innerHTML = 'Unfreeze';
        document.getElementById("submit-account-status-admin-user").style.background = '#12b564';
    }
    else{
        document.getElementById("submit-account-status-admin-user").innerHTML = 'Freeze';
        document.getElementById("submit-account-status-admin-user").style.background = '#ab2905';
    }
}

document.getElementById("submit-account-status-admin-user").onclick = function() {
    let filteredUser = ACCOUNTTABLE.filter(function (accounts){
        return accounts.accountID == document.getElementById("account-id-admin-user").value;
    });
    filteredUser.forEach(function (accounts) {
        accounts.status = document.getElementById("submit-account-status-admin-user").textContent;
    });
    alert('Account '+ document.getElementById("submit-account-status-admin").textContent);
    viewAccountAdminUser(document.getElementById("account-id-admin-user").value);
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

//add or remove funds by admin
document.getElementById("submit-account-addremove-admin-user").onclick = function() {
    document.getElementById("add-remove-funds-transact").style.display = "block";
    document.getElementById("account-transactions-admin-user").style.display = "none";
    document.getElementById("container-transaction-table-open").style.display = "none";
}

document.getElementById("close-add-remove-funds").onclick = function() {
    document.getElementById("add-remove-funds-transact").style.display = "none";
    document.getElementById("account-transactions-admin-user").style.display = "block";
    document.getElementById("container-transaction-table-open").style.display = "none";
}

document.getElementById("remove-funds-submit").onclick = function() {
    let newBal = 0, newBalance = 0.00, datetoday = new Date(), dateTransact = '';
    let amount = parseFloat(document.getElementById("add-remove-funds").value).toFixed(2);
    //let status = '';
    let account = document.getElementById("account-id-admin-user").value;
    let transactType = "withdrawal", shortDate = `${datetoday.getMonth()+1}/${datetoday.getDate()}/${datetoday.getFullYear()}`;
    //let totalWithdraw = 0.00, withAmount = 0.00;
    let filteredAccount = ACCOUNTTABLE.filter(function (accounts){
        return accounts.accountID == account;
    });
    let filteredTransactDate = TRANSACTION.filter(function (transact){
        return transact.account == account;
    });
    filteredAccount.forEach(function (accounts) {
        newBal = accounts.balance;
    });
    /*filteredTransactDate.forEach(function (transact) {
        let getShortDate = '', getLongDate = '';
        getLongDate = new Date(transact.transactionDate);
        getShortDate = `${getLongDate.getMonth()+1}/${getLongDate.getDate()}/${getLongDate.getFullYear()}`;
        if(transact.transactionType == "withdrawal"){
            if(datetoday.getFullYear()==getLongDate.getFullYear()){
                if(datetoday.getMonth()+1==getLongDate.getMonth()+1){
                    if(datetoday.getDate()==getLongDate.getDate()){
                        withAmount = parseFloat(transact.amount);
                        totalWithdraw = totalWithdraw + withAmount;
                    }
                }
            }
        }
    });
    totalWithdraw -= parseFloat(amount).toFixed(2);
    console.log('dateTransact::::'+totalWithdraw);
    if(totalWithdraw < -.9){
        alert('You have reached your withdrawal limit of 90 cents per day!');
    }
    else{*/
        newBalance = parseFloat(newBal).toFixed(2);
        newBalance -= amount;
        /*if(account == 'none'){
            alert('Please Select an Account.');
        }*/
        if(amount != ''){
            if(isNaN(amount)){
                alert('Invalid amount.');
            }
            else if(amount<0){
                alert('Amount sholud not be less than 0.');
            }
            else if(newBalance < 0.05){
                alert('Cannot remove funds from account. Maintaining balance of 5 centavos is required.');
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
                    viewReceipt(transactInfo, 'Funds Removal Complete');
                    viewAccountAdminUser(account)
                    //document.getElementById("modal-withdraw").style.display = "none";
                }
            }
        }else{
            alert('Amount Missing.');
        }
    //}
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
    let countAccount = parseInt(ACCOUNTTABLE.length + 1);
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
                accountID: 'account'+ countAccount,
                accountNumber: 'number'+ countAccount,
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
/*document.getElementById("edit-account").addEventListener('click', function(){
    document.getElementById("account-edit-id").value = document.getElementById("account-id").textContent;
    document.getElementById("account-edit-name").value = document.getElementById("account-name").textContent;
    document.getElementById("modal-account-edit").style.display = 'block';
    document.getElementById("modal-account").style.display = "none";
});*/

document.getElementById("close-account-edit").onclick = function() {
    document.getElementById("modal-account-edit").style.display = "none";
}

document.getElementById("cancel-account-edit").onclick = function() {
    document.getElementById("modal-account-edit").style.display = "none";
}

document.getElementById("submit-account-edit").onclick = function() {
    console.log('here');
    if(document.getElementById("account-name").value == ''){
        alert('Please fill in all fields.');
    }
    else{
        let accountNameNew = '';
        let filteredUser = ACCOUNTTABLE.filter(function (accounts){
            return accounts.userID == document.getElementById("user-id").value;
        });
        console.log(filteredUser);
        let filteredAccount = filteredUser.filter(function (accounts){
            return accounts.accountID == document.getElementById("account-id").value;
        });
        console.log(document.getElementById("account-id").value);
        filteredAccount.forEach(function (accounts) {
            accounts.accountName = document.getElementById("account-name").value;
        }); 
        accountNameNew = document.getElementById("account-name").value;
        console.log(document.getElementById("account-id").value, accountNameNew, document.getElementById("balance").textContent);
        viewTableUser();
        alert('Account updated.');
        viewAccount(document.getElementById("account-id").value,  accountNameNew, document.getElementById("balance").textContent)
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
    let fullname = "";
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
        fullname = document.getElementById("first-name-edit").value + " " + document.getElementById("last-name-edit").value;
        document.getElementById("transaction-area").style.display = 'block';
        document.getElementById("profile-area").style.display = 'none';
        document.getElementById("profile-update").innerHTML = `Hello, ${fullname}`;
        document.getElementById("full-name-admin").innerHTML = `${fullname}`;
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
    //document.getElementById("modal-password").style.display = 'block';
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
                alert(`WELCOME, ${fullname}`);
                if(usertype === 1){
                    document.getElementById("profile-update").innerHTML = "";
                    document.getElementById("profile-update").innerHTML = `Hello ${fullname}`;
                    document.getElementById("full-name-user").innerHTML = `${fullname}`;
                    document.getElementById("user-id").value = userId;
                    document.getElementById("transaction-area").style.display = 'block';
                    viewTableUser();
                }
                else if(usertype === 0){
                    document.getElementById("profile-update-admin").innerHTML = "";
                    document.getElementById("profile-update-admin").innerHTML = `Hello ${fullname}`;
                    document.getElementById("full-name-admin").innerHTML = `${fullname}`;
                    document.getElementById("admin-id").value = userId;
                    document.getElementById("transaction-area-admin").style.display = 'block';
                    viewTableAdmin();
                }
            }
            //document.getElementById('user-greetings').innerHTML = "WELCOME " + ; add ng function sa user table para iview yung full name
        }
        else if(usertype == 0){
            alert('Wrong Username or Password.'); 
        }
        else if(usertype == 1){
            if(status=='Freeze'){
                alert('Your account is Frozen. Please contact your administrator to unfreeze your account'); 
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
                //console.log('user1');
                alert('Wrong Username or Password.'); 
            }
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
        //console.log(USERTABLE.length);
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
//clear tableUser
function viewTableUserClear(){
    document.getElementById("view-account1").style.display = 'none';
    document.getElementById("view-account2").style.display = 'none';
    document.getElementById("view-account3").style.display = 'none';
    document.getElementById("account-id1").innerHTML = '';
    document.getElementById("account-number1").innerHTML = '';
    document.getElementById("account-name1").innerHTML = '';
    document.getElementById("balance1").innerHTML = '';
    document.getElementById("status1").innerHTML = '';
    document.getElementById("account-id2").innerHTML = '';
    document.getElementById("account-number2").innerHTML = '';
    document.getElementById("account-name2").innerHTML = '';
    document.getElementById("balance2").innerHTML = '';
    document.getElementById("status2").innerHTML = '';
    document.getElementById("account-id3").innerHTML = '';
    document.getElementById("account-number3").innerHTML = '';
    document.getElementById("account-name3").innerHTML = '';
    document.getElementById("balance3").innerHTML = '';
    document.getElementById("status3").innerHTML = '';
}


//user table
function viewTableUser(){
    //console.log('userId:::::'+document.getElementById("user-id").value);
    let filteredAccount = ACCOUNTTABLE.filter(function (accounts){
        return accounts.userID == document.getElementById("user-id").value;
    });
    let accountTableLength = filteredAccount.length;
    console.log(accountTableLength);
    let i = 0, count = 1, countUser = 3;
    viewTableUserClear();
    if(accountTableLength != 0){
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
                    document.getElementById("account-number1").innerHTML = `${filteredAccount[i].accountNumber}`;
                    document.getElementById("account-name1").innerHTML = `${filteredAccount[i].accountName}`;
                    document.getElementById("balance1").innerHTML = `${filteredAccount[i].balance}`;
                    document.getElementById("status1").innerHTML = `${filteredAccount[i].status}`;
                    document.getElementById("view-account1").style.display = 'block';
                    i++;
                }
                else if(i==1){
                    document.getElementById("account-id2").innerHTML = `${filteredAccount[i].accountID}`;
                    document.getElementById("account-number2").innerHTML = `${filteredAccount[i].accountNumber}`;
                    document.getElementById("account-name2").innerHTML = `${filteredAccount[i].accountName}`;
                    document.getElementById("balance2").innerHTML = `${filteredAccount[i].balance}`;
                    document.getElementById("status2").innerHTML = `${filteredAccount[i].status}`;
                    document.getElementById("view-account2").style.display = 'block';
                    i++;
                }
                else if(i==2){
                    document.getElementById("account-id3").innerHTML = `${filteredAccount[i].accountID}`;
                    document.getElementById("account-number3").innerHTML = `${filteredAccount[i].accountNumber}`;
                    document.getElementById("account-name3").innerHTML = `${filteredAccount[i].accountName}`;
                    document.getElementById("balance3").innerHTML = `${filteredAccount[i].balance}`;
                    document.getElementById("status3").innerHTML = `${filteredAccount[i].status}`;
                    document.getElementById("view-account3").style.display = 'block';
                    i++;
                }
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
//viewTableAdmin clear
function viewTableAdminClear(){
    document.getElementById("admin-view1").style.display = 'none';
    document.getElementById("admin-view2").style.display = 'none';
    document.getElementById("admin-view3").style.display = 'none';
    document.getElementById("admin-view4").style.display = 'none';
    document.getElementById("admin-view5").style.display = 'none';
    document.getElementById("admin-view6").style.display = 'none';
    document.getElementById("admin-id1").innerHTML = '';
    document.getElementById("admin-name1").innerHTML = '';
    document.getElementById("admin-username1").innerHTML = '';
    document.getElementById("admin-status1").innerHTML = '';
    document.getElementById("admin-id2").innerHTML = '';
    document.getElementById("admin-name2").innerHTML = '';
    document.getElementById("admin-username2").innerHTML = '';
    document.getElementById("admin-status2").innerHTML = '';
    document.getElementById("admin-id3").innerHTML = '';
    document.getElementById("admin-name3").innerHTML = '';
    document.getElementById("admin-username3").innerHTML = '';
    document.getElementById("admin-status3").innerHTML = '';
    document.getElementById("admin-id4").innerHTML = '';
    document.getElementById("admin-name4").innerHTML = '';
    document.getElementById("admin-username4").innerHTML = '';
    document.getElementById("admin-status4").innerHTML = '';
    document.getElementById("admin-id5").innerHTML = '';
    document.getElementById("admin-name5").innerHTML = '';
    document.getElementById("admin-username5").innerHTML = '';
    document.getElementById("admin-status5").innerHTML = '';
    document.getElementById("admin-id6").innerHTML = '';
    document.getElementById("admin-name6").innerHTML = '';
    document.getElementById("admin-username6").innerHTML = '';
    document.getElementById("admin-status6").innerHTML = '';

}

function viewTableAdmin(){
    //console.log('userId:::::'+document.getElementById("admin-id").value);
    let i = 0, count = 0, countUser = 0;
    document.getElementById("admin-view1").style.display = 'none';
    document.getElementById("admin-view2").style.display = 'none';
    document.getElementById("admin-view3").style.display = 'none';
    document.getElementById("admin-view4").style.display = 'none';
    document.getElementById("admin-view5").style.display = 'none';
    document.getElementById("admin-view6").style.display = 'none';
    if(USERTABLE.length < 6){
        countUser = USERTABLE.length;
    }
    if(countUser > 0){
        while(i<countUser){
            //console.log(i);
            if(USERTABLE[i].userID != document.getElementById("admin-id").value){
                if(count==0){
                    document.getElementById("admin-id1").innerHTML = `${USERTABLE[i].userID}`;
                    document.getElementById("admin-name1").innerHTML = `${USERTABLE[i].firstName} ${USERTABLE[i].lastName}`;
                    document.getElementById("admin-username1").innerHTML = `${USERTABLE[i].userName}`;
                    document.getElementById("admin-status1").innerHTML = `${USERTABLE[i].status}`;
                    document.getElementById("admin-view1").style.display = 'block';
                    count++;
                    i++;
                }
                else if(count==1){
                    document.getElementById("admin-id2").innerHTML = `${USERTABLE[i].userID}`;
                    document.getElementById("admin-name2").innerHTML = `${USERTABLE[i].firstName} ${USERTABLE[i].lastName}`;
                    document.getElementById("admin-username2").innerHTML = `${USERTABLE[i].userName}`;
                    document.getElementById("admin-status2").innerHTML = `${USERTABLE[i].status}`;
                    document.getElementById("admin-view2").style.display = 'block';
                    count++;
                    i++;
                }
                else if(count==2){
                    document.getElementById("admin-id3").innerHTML = `${USERTABLE[i].userID}`;
                    document.getElementById("admin-name3").innerHTML = `${USERTABLE[i].firstName} ${USERTABLE[i].lastName}`;
                    document.getElementById("admin-username3").innerHTML = `${USERTABLE[i].userName}`;
                    document.getElementById("admin-status3").innerHTML = `${USERTABLE[i].status}`;
                    document.getElementById("admin-view3").style.display = 'block';
                    count++;
                    i++;
                }
                else if(count==3){
                    document.getElementById("admin-id4").innerHTML = `${USERTABLE[i].userID}`;
                    document.getElementById("admin-name4").innerHTML = `${USERTABLE[i].firstName} ${USERTABLE[i].lastName}`;
                    document.getElementById("admin-username4").innerHTML = `${USERTABLE[i].userName}`;
                    document.getElementById("admin-status4").innerHTML = `${USERTABLE[i].status}`;
                    document.getElementById("admin-view4").style.display = 'block';
                    count++;
                    i++;
                }
                else if(count==4){
                    document.getElementById("admin-id5").innerHTML = `${USERTABLE[i].userID}`;
                    document.getElementById("admin-name5").innerHTML = `${USERTABLE[i].firstName} ${USERTABLE[i].lastName}`;
                    document.getElementById("admin-username5").innerHTML = `${USERTABLE[i].userName}`;
                    document.getElementById("admin-status5").innerHTML = `${USERTABLE[i].status}`;
                    document.getElementById("admin-view5").style.display = 'block';
                    count++;
                    i++;
                }
                else if(count==5){
                    document.getElementById("admin-id6").innerHTML = `${USERTABLE[i].userID}`;
                    document.getElementById("admin-name6").innerHTML = `${USERTABLE[i].firstName} ${USERTABLE[i].lastName}`;
                    document.getElementById("admin-username6").innerHTML = `${USERTABLE[i].userName}`;
                    document.getElementById("admin-status6").innerHTML = `${USERTABLE[i].status}`;
                    document.getElementById("admin-view6").style.display = 'block';
                    count++;
                    i++;
                }

            }
            else{
                i++;
            }
        }

    }
}

function viewTableAdminUserClear(){
    document.getElementById("user-view-account1").style.display = 'none';
    document.getElementById("user-view-account2").style.display = 'none';
    document.getElementById("user-view-account3").style.display = 'none';
    document.getElementById("user-account-id1").innerHTML = '';
    document.getElementById("user-account-number1").innerHTML = '';
    document.getElementById("user-account-name1").innerHTML = '';
    document.getElementById("user-balance1").innerHTML = '';
    document.getElementById("user-status1").innerHTML = '';
    document.getElementById("user-account-id2").innerHTML = '';
    document.getElementById("user-account-number2").innerHTML = '';
    document.getElementById("user-account-name2").innerHTML = '';
    document.getElementById("user-balance2").innerHTML = '';
    document.getElementById("user-status2").innerHTML = '';
    document.getElementById("user-account-id3").innerHTML = '';
    document.getElementById("user-account-number3").innerHTML = '';
    document.getElementById("user-account-name3").innerHTML = '';
    document.getElementById("user-balance3").innerHTML = '';
    document.getElementById("user-status3").innerHTML = '';
}

function viewTableAdminUser(id){
    let filteredAccount = ACCOUNTTABLE.filter(function (accounts){
        return accounts.userID == id;
    });
    let accountTableLength = filteredAccount.length;
    console.log('lenght'+id);
    let i = 0, count = 1, countUser = 3;
    viewTableAdminUserClear();
    if(accountTableLength != 0){
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
                    document.getElementById("user-account-id1").innerHTML = `${filteredAccount[i].accountID}`;
                    document.getElementById("user-account-number1").innerHTML = `${filteredAccount[i].accountNumber}`;
                    document.getElementById("user-account-name1").innerHTML = `${filteredAccount[i].accountName}`;
                    document.getElementById("user-balance1").innerHTML = `${filteredAccount[i].balance}`;
                    document.getElementById("user-status1").innerHTML = `${filteredAccount[i].status}`;
                    document.getElementById("user-view-account1").style.display = 'block';
                    i++;
                }
                else if(i==1){
                    document.getElementById("user-account-id2").innerHTML = `${filteredAccount[i].accountID}`;
                    document.getElementById("user-account-number2").innerHTML = `${filteredAccount[i].accountNumber}`;
                    document.getElementById("user-account-name2").innerHTML = `${filteredAccount[i].accountName}`;
                    document.getElementById("user-balance2").innerHTML = `${filteredAccount[i].balance}`;
                    document.getElementById("user-status2").innerHTML = `${filteredAccount[i].status}`;
                    document.getElementById("user-view-account2").style.display = 'block';
                    i++;
                }
                else if(i==2){
                    document.getElementById("user-account-id3").innerHTML = `${filteredAccount[i].accountID}`;
                    document.getElementById("user-account-number3").innerHTML = `${filteredAccount[i].accountNumber}`;
                    document.getElementById("user-account-name3").innerHTML = `${filteredAccount[i].accountName}`;
                    document.getElementById("user-balance3").innerHTML = `${filteredAccount[i].balance}`;
                    document.getElementById("user-status3").innerHTML = `${filteredAccount[i].status}`;
                    document.getElementById("user-view-account3").style.display = 'block';
                    i++;
                }
            }
        }
    }
}
