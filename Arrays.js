let arr = ['a','b','c','d','e']
console.log(arr.slice(2));
console.log(arr.slice(2,4));
// we can define a negative interger just like in string to begin with
console.log(arr.slice(-2));
// we can create shallow copies of arrays with slice method
const copiedarr = arr.slice()
console.log(copiedarr);
// we can copy array using spread operator
console.log([...arr]);

// SPLICE METHOD
// It changes original array or mutate the array
console.log(arr.splice(2));
console.log( "The orignial array" , arr);
// we can simply remove all the unwanted values from array using splice method
// second parameter is number of elements that we want to delete

// Reverse 
arr = ['a','b','c','d','e']
const arr2 = ['j','k','l','m']
console.log(arr2.reverse());

// reverse mutate the array that means original array got effect

// CONCAT -- It does not mutate the original array. original array stays same
const letters = arr.concat(arr2)
console.log(letters);
console.log(arr2);
console.log(arr);
console.log([...arr,...arr2]); // we can do same with spread operator

// JOIN
console.log(letters.join(' - '));

// At Method -- it also works on array and as well on strings

console.log(arr.at(1));

// for each works with maps and sets
const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
  ]);

currencies.forEach((value, key, map) => {
 console.log(`${value} ${key} ${map}`);
})
// for each does not work with sets as sets does not have indexes