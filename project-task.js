/*
Scenario:
You’ve been hired to help a local pet shelter digitize its animal adoption records. The program is meant to:
  
  Allow users to enter an animal type and adoption fee.
  
  Add the animal and fee to a list.
  
  Retrieve the adoption fee for a specific animal when requested.

However, the initial developer left the program in a buggy state, with missing exception-handling logic
and some errors in the implementation. Your job is to fix it!



Instructions
Start by Understanding the Errors:
Run the program and observe the exceptions that occur. Document what the exceptions are and where they happen.

Write Exception Handling Code:
Use try/catch blocks to handle the errors so the program doesn’t crash when incorrect input or unexpected situations occur.

Test and Debug:
Test the program with valid and invalid inputs to confirm that exceptions are handled gracefully
and the program continues running as intended.
*/
/* Errors when run
1. readline-sync module is missing - need to import readline-sync - npm install readline-sync
2. No error but accepts numbers as name, which might be ok. However, the program accepts non-numeric value as fee. It actually adds the fee as $NaN.
3. Throws error when inquiring fee for an animal that doesn't exist in the system. Throw error message is "Animal not found in records" instead of displaying a message instead of erroring out.
*/

// Will need to import / install readline-sync if not done so already within project dir: npm install readline-sync 
const readlineSync = require('readline-sync');

// Initial Code with Bugs (modified to use readline-sync)
let animals = [];
let fees = [];
function addAnimal(name, fee) {
    if (!name || fee < 0) {
        throw new Error("Invalid animal name or adoption fee!");
    }
    animals.push(name);
    fees.push(fee);
}
function getAdoptionFee(animalName) {
    let index = animals.indexOf(animalName);
    if (index === -1) {
        throw new Error("Animal not found in records!");
    }
    return fees[index];
}
// Main program

console.log("Welcome to the Pet Shelter System");
while (true) {
    let action = readlineSync.question("Choose an action: 'add', 'fee', or 'exit': ").toLowerCase();
    if (action === "exit") {
        console.log("Goodbye!");
        break;
    }
    if (action === "add") {
        let animal = readlineSync.question("Enter the animal's name: ");
        let fee = Number(readlineSync.question("Enter the adoption fee: "));
        
        try {addAnimal(animal, fee);
        console.log(`${animal} added with a fee of $${fee}.`);
        } catch (error) {
            console.error(error.message);
        }
    } else if (action === "fee") {
        let animal = readlineSync.question("Enter the animal's name to find its adoption fee: ");
        
        try {
            let fee = getAdoptionFee(animal);
            console.log(`${animal}'s adoption fee is $${fee}.`);
        } catch (error) {
            console.error(error.message);
        }
        
    } else {
        console.log("Invalid action. Please choose 'add', 'fee', or 'exit'.");
    }
}


/*
Problems to Solve

Invalid Input Errors:
  What happens if the user provides a negative adoption fee or leaves the name blank?
    blank name and a fee of a positive number throws an error "Invalid animal name or adoption fee!"
    a valid name and a fee of negative number throws an error "Invalid animal name or adoption fee!"
    a blank name AND a fee of a negative number throws an error "Invalid animal name or adoption fee!"
  What happens if the user tries to find the fee for an animal that hasn’t been added?
    Throws an error "Animal not found in records!"

Code Flow Problems:
  What happens if the program throws an exception? Does the rest of the code continue running?
    No, the program stops with the error.
Structured Exception Handling:
  Add try/catch blocks to handle the above errors gracefully.
    added try/catch to call function addAnimal after accepting the name and fee under action "add".
    added try/catch to call function getAdoptionFee after accepting the name under action "Fee".
*/
