class Account {
    constructor(accountNumber, initialBalance = 0) {
        this.accountNumber = accountNumber;
        this._balance = initialBalance;
    }

    deposit(amount) {
        if (amount > 0) {
            this._balance += amount;
            console.log(`Депозит ${amount} грн. Новий баланс: ${this._balance} грн.`);
        } else {
            console.log("Сума депозиту має бути більшою за нуль.");
        }
    }

    withdraw(amount) {
        throw new Error("Цей метод має бути реалізований у дочірньому класі.");
    }

    get balance() {
        return this._balance;
    }

    getAccountInfo() {
        return `Рахунок: ${this.accountNumber}, Баланс: ${this.balance} грн.`;
    }
}

class SavingsAccount extends Account {
    constructor(accountNumber, initialBalance, interestRate) {
        super(accountNumber, initialBalance);
        this.interestRate = interestRate; // Відсоткова ставка
    }

    withdraw(amount) {
        if (amount > this.balance) {
            console.log("Недостатньо коштів на ощадному рахунку.");
        } else {
            this._balance -= amount;
            console.log(`Знято ${amount} грн. Залишок: ${this.balance} грн.`);
        }
    }

    applyInterest() {
        const interest = this.balance * this.interestRate;
        this._balance += interest;
        console.log(`Нараховано відсотки: ${interest.toFixed(2)} грн. Новий баланс: ${this.balance} грн.`);
    }
}
class CheckingAccount extends Account {
    constructor(accountNumber, initialBalance, overdraftLimit) {
        super(accountNumber, initialBalance);
        this.overdraftLimit = overdraftLimit; // Ліміт -1000
    }

    withdraw(amount) {
        if (this.balance - amount < this.overdraftLimit) {
            console.log("Перевищено ліміт овердрафту.");
        } else {
            this._balance -= amount;
            console.log(`Знято ${amount} грн. Залишок: ${this.balance} грн.`);
        }
    }
}
console.log("--- Ощадний рахунок ---");
const savings = new SavingsAccount("UA001", 5000, 0.05);
console.log(savings.getAccountInfo()); // Рахунок: UA001, Баланс 5000 грн.
savings.withdraw(6000); // Недостатньо коштів
savings.withdraw(2000); // Знято 2000 грн. Залишок: 3000 грн
savings.applyInterest(); // Нараховано відсотки 150.00 грн
console.log(savings.getAccountInfo()); // Баланс3150 грн

console.log("\n--- Поточний рахунок ---");
const checking = new CheckingAccount("UA002", 1000, -500);
console.log(checking.getAccountInfo()); // Рахунок: UA002, Баланс: 1000 грн
checking.withdraw(1200); // Знято 1200 грн. Залишок: -200 грн
checking.withdraw(400); // Перевищено ліміт овердрафту
checking.deposit(500); // Депозит 500 грн. Новий баланс: 300 грн
console.log(checking.getAccountInfo()); //Баланс: 300 грн