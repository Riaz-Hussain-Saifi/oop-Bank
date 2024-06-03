#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Welcome message
console.log(chalk.yellow(`
 \n\t Welcome to the ${chalk.red("Saifi Developer's")} ${chalk.green("OOP")} ${chalk.blue("Bank")}!\n
 `));
let PinCode = 2024; // Initial PIN code
let myBalance = 10000; // Assuming an initial balance
const accountInfo = {
    name: "Riaz Hussain",
    accountNumber: "123456789",
    branch: "Main Street",
    ifsc: "MCB0001234",
};
const miniStatement = [
    {
        date: new Date().toLocaleString(),
        description: "Initial Balance",
        amount: 10000,
    },
];
// Async Bank function
async function Bank() {
    const response = await inquirer.prompt([
        {
            name: "pincode",
            type: "input",
            message: "Enter your ATM code: ",
            validate(input) {
                if (isNaN(Number(input))) {
                    return "Please enter a valid ATM pin!";
                }
                else if (Number(input) === PinCode) {
                    return true; // Validation passed
                }
                else {
                    return "Incorrect ATM pin!";
                }
            },
        },
    ]);
    if (Number(response.pincode) === PinCode) {
        console.log(chalk.greenBright("\n\tWelcome to MCB Bank ATM machine\n"));
        await ATM_Options();
    }
}
async function ATM_Options() {
    const mainATM = await inquirer.prompt([
        {
            name: "options",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "Cash Withdrawal",
                "Balance Inquiry",
                "Fast Cash",
                "Money Transfer",
                "Deposit",
                "Mini Statement",
                "Account Information",
                "Exit",
            ],
        },
    ]);
    const selectedOption = mainATM.options;
    chalk.blueBright(selectedOption);
    switch (selectedOption) {
        case "Cash Withdrawal":
            await cashWithdrawal();
            break;
        case "Balance Inquiry":
            balanceInquiry();
            break;
        case "Fast Cash":
            await fastCash();
            break;
        case "Money Transfer":
            await moneyTransfer();
            break;
        case "Deposit":
            await deposit();
            break;
        case "Mini Statement":
            miniStatementDisplay();
            break;
        case "Account Information":
            accountInformation();
            break;
        case "Exit":
            exitATM();
            break;
        default:
            console.log(chalk.redBright("\n\tInvalid option selected!\n"));
            break;
    }
}
async function cashWithdrawal() {
    const withdraw = await inquirer.prompt([
        {
            name: "amount",
            type: "input",
            message: "Enter the amount to withdraw: ",
            validate(input) {
                if (isNaN(Number(input))) {
                    return "Please enter a valid amount!";
                }
                else if (Number(input) > myBalance) {
                    return "Insufficient balance!";
                }
                else {
                    return true;
                }
            },
        },
    ]);
    const amount = Number(withdraw.amount);
    myBalance -= amount;
    miniStatement.push({
        date: new Date().toLocaleString(),
        description: "ATM Withdrawal",
        amount: -amount,
    });
    console.log(chalk.greenBright(`\n\tYou have withdrawn ${chalk.blueBright(withdraw.amount)}\n`));
    console.log(chalk.greenBright(`\n\tYour current balance is ${chalk.whiteBright(myBalance)}\n`));
    await ATM_Options();
}
function balanceInquiry() {
    console.log(chalk.greenBright(`\n\tYour current balance is ${chalk.whiteBright(myBalance)}\n`));
    ATM_Options();
}
async function fastCash() {
    const fastCash = await inquirer.prompt([
        {
            name: "fastcash",
            type: "list",
            message: "How much would you like to withdraw?",
            choices: [500, 1000, 2000, 5000, 10000],
        },
    ]);
    const amount = fastCash.fastcash;
    if (myBalance >= amount) {
        myBalance -= amount;
        miniStatement.push({
            date: new Date().toLocaleString(),
            description: "Fast Cash Withdrawal",
            amount: -amount,
        });
        console.log(chalk.greenBright(`\n\tYou have withdrawn ${chalk.cyanBright(amount)}\n`));
        console.log(chalk.greenBright(`\n\tYour current balance is ${chalk.whiteBright(myBalance)}\n`));
    }
    else {
        console.log(chalk.redBright("\n\tInsufficient balance!\n"));
    }
    await ATM_Options();
}
async function moneyTransfer() {
    const transfer = await inquirer.prompt([
        {
            name: "accountNumber",
            type: "input",
            message: "Enter the account number to transfer to: ",
        },
        {
            name: "amount",
            type: "input",
            message: "Enter the amount to transfer: ",
            validate(input) {
                if (isNaN(Number(input))) {
                    return "Please enter a valid amount!";
                }
                else if (Number(input) > myBalance) {
                    return "Insufficient balance!";
                }
                else {
                    return true;
                }
            },
        },
    ]);
    const amount = Number(transfer.amount);
    myBalance -= amount;
    miniStatement.push({
        date: new Date().toLocaleString(),
        description: `Transfer to ${chalk.yellowBright(transfer.accountNumber)}`,
        amount: -amount,
    });
    console.log(chalk.greenBright(`\n\tYou have transferred ${chalk.cyanBright(transfer.amount)} to account ${chalk.yellowBright(transfer.accountNumber)}\n`));
    console.log(chalk.greenBright(`\n\tYour current balance is ${chalk.whiteBright(myBalance)}\n`));
    await ATM_Options();
}
async function deposit() {
    const deposit = await inquirer.prompt([
        {
            name: "amount",
            type: "input",
            message: "Enter the amount to deposit: ",
            validate(input) {
                if (isNaN(Number(input))) {
                    return "Please enter a valid amount!";
                }
                else {
                    return true;
                }
            },
        },
    ]);
    const amount = Number(deposit.amount);
    myBalance += amount;
    miniStatement.push({
        date: new Date().toLocaleString(),
        description: "Deposit",
        amount,
    });
    console.log(chalk.greenBright(`\n\tYou have deposited ${chalk.yellowBright(deposit.amount)}\n`));
    console.log(chalk.greenBright(`\n\tYour current balance is ${chalk.whiteBright(myBalance)}\n`));
    await ATM_Options();
}
function miniStatementDisplay() {
    console.log(chalk.yellowBright("\n\tHere is your mini statement:\n"));
    miniStatement.forEach((transaction) => {
        console.log(chalk.greenBright(`\t${transaction.date}\t${chalk.cyanBright(transaction.description)}\t${chalk.whiteBright(transaction.amount)}`));
    });
    console.log(chalk.greenBright("\n"));
    ATM_Options();
}
function accountInformation() {
    console.log(chalk.yellowBright("\n\tYour account information:\n"));
    console.log(chalk.greenBright(`\tName: ${chalk.whiteBright(accountInfo.name)}`));
    console.log(chalk.greenBright(`\tAccount Number: ${chalk.whiteBright(accountInfo.accountNumber)}`));
    console.log(chalk.greenBright(`\tBranch: ${chalk.whiteBright(accountInfo.branch)}`));
    console.log(chalk.greenBright(`\tIFSC: ${chalk.whiteBright(accountInfo.ifsc)}`));
    console.log(chalk.greenBright(`\tCurrent Date and Time: ${chalk.whiteBright(new Date().toLocaleString())}\n`));
    ATM_Options();
}
function exitATM() {
    console.log(chalk.blueBright("\n\tThank you for using our ATM. Goodbye!\n"));
    process.exit(0);
}
// Run the Bank function
Bank();
