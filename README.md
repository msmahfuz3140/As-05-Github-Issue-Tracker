1️⃣ Difference between var, let, and const

       var is function scoped, can be re-assigned, and is hoisted (initialized with undefined).

       let is block scoped, can be re-assigned, but is hoisted without initialization (temporal dead zone).

       const is block scoped, cannot be re-assigned, and hoisted without initialization.

       Example:

       var a = 10;
       let b = 20;
       const c = 30;

       a = 15; == allowed
       b = 25; == allowed
       c = 35; == Error

2️⃣ Spread Operator ...

       The spread operator ... allows you to expand elements of an array or object.
       
       You can also use it to pass array elements as function arguments.
       
       Example:
       
       // Arrays
       const arr1 = [1, 2, 3];
       const arr2 = [...arr1, 4, 5];
       console.log(arr2); // [1, 2, 3, 4, 5]
       
       // Objects
       const obj1 = {a: 1, b: 2};
       const obj2 = {...obj1, c: 3};
       console.log(obj2); // {a: 1, b: 2, c: 3}
       
       // Function arguments
       function sum(x, y, z) { return x + y + z; }
       const nums = [1, 2, 3];
       console.log(sum(...nums)); // 6

3️⃣ Difference between map(), filter(), and forEach()
       
       map() → returns a new array by transforming each element.
       
       filter() → returns a new array with elements that satisfy a condition.
       
       forEach() → does not return anything, used for iterating with side-effects.
       
       Example:
       
       const arr = [1, 2, 3, 4, 5];
       
       const doubled = arr.map(x => x * 2); // [2, 4, 6, 8, 10]
       const even = arr.filter(x => x % 2 === 0); // [2, 4]
       arr.forEach(x => console.log(x)); // prints 1,2,3,4,5

4️⃣ Arrow Function

       Shorter syntax for writing functions.
       
       Automatically binds this from its surrounding scope (lexical this).
       
       Example:
       
       // Normal function
       function add(a, b) { return a + b; }
       
       // Arrow function
       const addArrow = (a, b) => a + b;
       console.log(addArrow(2, 3)); // 5
       
       // Single parameter shortcut
       const square = x => x * x;
       console.log(square(4)); // 16

5️⃣ Template Literals

       Strings written with backticks ` instead of quotes.
       
       You can embed variables or expressions using ${}.
       
       Supports multi-line strings.
       
       Example:
       
       const name = "Babu";
       const age = 20;
       
       // Old way
       console.log("My name is " + name + " and I am " + age + " years old.");
       
       // Template literal
       console.log(`My name is ${name} and I am ${age} years old.`);
       
       // Multi-line example
       const text = `Hello,
       this is
       multi-line text.`;
       console.log(text);