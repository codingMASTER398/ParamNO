# ParamNO
An esoteric programming language that shuffles function parameters

## Installation

Download the executable of your choice in [releases](https://github.com/codingMASTER398/ParamNO/releases/), OR download the source code and npm install.

## Usage

By providing the path to the file, the interpreter will run the program.
```bash
./index-linux /path/to/file/bottlesonthewall.prmno
```
```bash
Greedy program wants number >9

9 bottles of beer on the wall, 9 bottles of beer! 
Take one down, pass it around 8 bottles of beer on the wall. 

8 bottles of beer on the wall, 8 bottles of beer! 
Take one down, pass it around 7 bottles of beer on the wall.

...etc.
```
ParamNO programs do not have to end in `.prmno` but I think its nice (:

## Example program
```
// This is an example of my ParamNO esolang
// Comments can be made with double lines like in JavaScript
// But you can't append a comment to a line of actual code, so make sure you are on a new line.


// This function called "GOO" Should never run
FUNC goo
PRINT
-TEXT Huh? This isn't supposed to run

// Any line starting with "FUNC" will become a new function. It must have a name.

// Say you wanted to print something, you would have the PRINT function, then following that, parameters starting with a -
// Most parameters have to start with something like "TEXT" or "VAR" depending on what it's referring to.
// Parameters are jumbled though and scrambled, as that is the base concept of this esolang


FUNC MAIN

// The MAIN function is always called first.


// Here we set the variable GOO to GOO and print it.

SET
-TEXT GOO
-TEXT GOO

PRINT
-VAR GOO

IF
-TEXT GOO
-TEXT GOO
-TEXT GOO

PRINT
-TEXT "GOO" is not "GOO" for some reason

// Here we use a workaround for the IF statement
// Because all parameters are jumbled, it's better if all the parameters are the same. You can't do much that way but it makes sure that it runs 100% of the time.

//IF the text "GOO" is equal to "GOO" then we go to the function called "TEXT GOO". When you go to a function, it cancels all the other lines after it.

FUNC TEXT GOO

PRINT
-TEXT Yes, "GOO" is in fact "GOO"
```

## List of commands
```
// ADDNEXTPRINT adds text, numbers, or variables to the next PRINT statement.

ADDNEXTPRINT
-TEXT Here is some text
-NUMBER 1
-VAR cool_variable

// The params are still shuffled
```

```
// PRINT prints text, numbers, or variables and whatever added in the "ADDNEXTPRINT" command

PRINT
-TEXT Here is some text
-NUMBER 1
-VAR cool_variable

// Empty print, new line
PRINT

// The params are still shuffled
```

```
// SET sets a variable to another variable, text, or number.

SET
-TEXT variable_name
-TEXT variable_value

// As params are shuffled this can be pretty tricky
```

```
// IF does an if [A] == [B] statement, and if true, jumps to another function

IF
-VAR variable_name
-NUMBER 2
-true

FUNC true
PRINT
-TEXT variable_name is equal to 2

// As params are shuffled this can be pretty tricky
```

```
// IFGREATER does an if [A] > [B] statement, and if true, jumps to another function

IF
-VAR variable_name
-NUMBER 2
-true

FUNC true
PRINT
-TEXT variable_name is above 2

// As params are shuffled this can be pretty tricky
```

```
// INPUT gets the user's string input and saves it to a variable

INPUT
-TEXT variable_name

// For numbers use INPUTNUM

INPUT
-TEXT number_variable_name

PRINT
-VAR variable_name
-VAR number_variable_name
```
```
// GO moves to another function
GO
-newfunc

FUNC newfunc
// Continue
```
```
// MINUSONE and PLUSONE does what you would expect
MINUSONE
-bottles
PLUSONE
-bottles
```
```
// CHANGE changes a variable by an amount

// Plus 5
CHANGE
-variable_name
-5

// Minus 6
CHANGE
-variable_name
--6
```
```
// TIMES and DIVIDE does multiplication and division on a variable

TIMES
-var_name
-5

DIVIDE
-var_name
-5

// As always, parameter shuffling is still a thing so this can be hard
```
```
// EXIT exits the script, but if there is a STOPOVERRIDE function, it jumps to that then exits.
// You can only use STOPOVERRIDE once. If you call EXIT again, it will exit.

EXIT


// ZEROSTOP does the same as exit but only if a number is below or equal to 0 (variables can be passed)

ZEROSTOP
-VAR bottles
```
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
