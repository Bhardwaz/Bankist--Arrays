'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Sumit Bhardwaj',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Govind Bhardwaj',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Dantva Bhardwaj',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Jony Bhardwaj',
  movements: [430, 1000, 700, 50, 90,-120],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const createUserName  = function(accs){
  accs.forEach((acc) => {
  acc.username = acc.owner
  .toLowerCase()
  .split(' ')
  .map(name =>
    name[0]
  ).join('')
  })
}
createUserName(accounts)

const displayMovements = function(movements, sort = false){
containerMovements.innerHTML = ''

const movs = sort ? movements.slice().sort((a,b) => 
  a - b) : movements

movs.forEach((mov, i) => {
const type = mov > 0 ? 'deposit' : 'withdrawal'
const html = `
<div class="movements__row">
<div class="movements__type movements__type--${type}">${i + 1} ${type} </div>
<div class="movements__value">${mov} ₹</div>
</div>  
`
containerMovements.insertAdjacentHTML('afterbegin', html)
//  .insertAdjacentHTML -- look this on mdn web docs
})
}

const calcDisplayBalance = acc => {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0)
  labelBalance.textContent = `${acc.balance} ₹` 
}
// calcDisplayBalance(account1.movements)

const calcDisplaySummary = acc => {
const incomes = acc.movements.filter(mov =>  mov > 0).reduce((acc, val) =>
  acc + val, 0)
  labelSumIn.textContent = `${incomes}₹`

  const outcomes = acc.movements.filter(mov => mov < 0).reduce((acc, val) => acc + val,0)
  labelSumOut.textContent = `${Math.abs(outcomes)}₹`

  const interest = acc.movements.filter(mov => mov > 0).map(deposit => (deposit * acc.interestRate) / 100).filter(int => int >= 1)
  .reduce((acc, int) => acc + int, 0)
  labelSumInterest.textContent = `${interest}₹`
}
// calcDisplaySummary(account1.movements)

const updateUI = (currentAccount) => {
  // Display movements 
  displayMovements(currentAccount.movements)
  // Display balance 
  calcDisplayBalance(currentAccount)
  // Display summary 
  calcDisplaySummary(currentAccount)
}
// Event Handlers
let currentAccount;
btnLogin.addEventListener('click', event => {
event.preventDefault();
currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
console.log(currentAccount);
if(currentAccount?.pin === Number(inputLoginPin.value)){
  // Display UI Message 
  labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
  containerApp.style.opacity = 100;
  inputLoginUsername.value = inputLoginPin.value = '';
  inputLoginPin.blur();
  // Update UI
  updateUI(currentAccount)
}
})

btnTransfer.addEventListener('click', event => {
event.preventDefault();
const amount = Number(inputTransferAmount.value);
const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value)

inputTransferAmount.value = inputTransferTo.value = ''

if(amount > 0 && receiverAcc && currentAccount.balance >= amount && receiverAcc?.username !== currentAccount.username){
  // Doing The Transfer
  currentAccount.movements.push(-amount)
  receiverAcc.movements.push(amount);
  // update UI
  updateUI(currentAccount)
}
})

btnLoan.addEventListener('click', event => {
  event.preventDefault()
  const amount = Number(inputLoanAmount.value)
  if(amount > 0 && currentAccount.movements.some(mov => mov >= amount % 0.1)){
   currentAccount.movements.push(amount)
   // updated UI
   updateUI(currentAccount)
  }
  inputLoanAmount.value = ''
})

btnClose.addEventListener('click', event => {
event.preventDefault()
if(inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin){
 const index = accounts.findIndex(acc => acc.username === currentAccount.username)
// Delete the Account
 accounts.splice(index,1)
 // Hide UI
 containerApp.style.opacity = 0
}
inputCloseUsername.value = inputClosePin.value = "" ;
})

let sorted = false
btnSort.addEventListener('click', event => {
  event.preventDefault()
  displayMovements(currentAccount.movements, !sorted)
  sorted = !sorted
})

// the MAP method always needs to return value into new array and in this one liner it is returning the array
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// in for of loop i can do it like [ index , valueoFarray ] = array.Entries()
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// movements.forEach((mov, i) => {
//   i = i + 1
//   if(mov > 0){
//     console.log(`Transcation ${i} : You Deposited ${mov}`);
//    }else{
//     console.log(`Transcation ${i} : You Withdrew ${Math.abs(mov)}`);
//    }
// })
/// we can not break out from forEach loop -- break statements do not work in this
/////////////////////////////////////////////////

// MAP, FILTER, REDUCE

// MAP Takes an array then applies an callback function on each element and then returns the values in new array. just as forEach method MAP method also has access to all three parameter of array 

// const movementsDescription = account1.movements.map((mov, i) => {
//   return `Transcation ${i + 1} : You have ${mov > 0 ? 'deposited' : "withdrawl"} ${Math.abs(mov)}₹ in your account`
// })
// console.log(movementsDescription);

// FILTER -> its return new array by filtering each value

// REDUCE -> its boils down all array elements down to one single value e.g adding all the values

// The magic of chaining methods

// const rupess = [1333,2343,345,1234,745,5,3,6353]
// console.log(rupess.filter(rupee => rupee > 0).map(rupee =>`${rupee/82}$`))

// The Find method --- it returns the first value that respect the condition
// const m = [5000, 3400, -150, -790, -3210, -1000, 8500, -30]
// console.log(m.find(mov => mov < 1000))

// const account = accounts.find(acc => acc.owner === 'Jony Bhardwaj')
// console.log(account);

// find method
// find index

// flat and flatMap

// Some and Every
//  const movements = [200, 450, -400, 3000, -650, -130, 70, 1300]
// console.log(movements.includes(100));

// const anyDeposits = movements.some(mov => mov > 0)
// console.log(anyDeposits);

// Every Method That is Close cousion to some method

// console.log(movements.every(mov => mov > 0));

// const deposits = mov => mov > 0 ;
// console.log(movements.some(deposits));
// console.log(movements.filter(deposits));
// console.log(movements.every(deposits));  THis is Good for DRY Principle

// flat and flatMap methods bring all values from nested array
// flat brings one level nesting data into 
// flatMap is the combination of flat and Map method

// const arrDeep = [1,[2,3,4,6], [5,6,7,8],4,5]
// console.log(arrDeep.flat());

// const accountMovements = accounts.map(acc => acc.movements)
// console.log(accountMovements);
// const allMovements = accountMovements.flat()
// console.log(allMovements);
// const overallBalance = allMovements.reduce((acc,val) => acc + val,0);
// console.log(overallBalance);

// same thing but with chaining methods 
// const overallBalance = accounts.map(acc => acc.movements).flat().reduce((acc,val) => acc + val,0)
// console.log(overallBalance);

// Sorting Arrays
// sort() method sort out string for sorting out numbers we need to specify callback function and condition

// return < 0, A,B (Keep Order)
// return > 0, B,A (switch order) 
// console.log(account1.movements);

// // Ascending Order
// account1.movements.sort((a,b) => {
//  console.log(a,b);
//  if(a > b) return 1
//  if(b < a) return -1
// })

// account1.movements.sort((a,b) => {
//   console.log(a,b);
//   if(a < b) return 1
//   if(b > a) return -1
//  })
// console.log(account1.movements);

// Array fill Method

// Array Method Practice
const bankDepositSum = accounts.flatMap(acc => acc.movements).filter(mov => mov > 0).reduce((sum,cur) => sum + cur, 0)
console.log(bankDepositSum);


