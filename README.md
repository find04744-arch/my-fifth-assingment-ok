1. What is the difference between var, let, and const?

Ans : Back in the day, we only had var, but it caused a lot of headaches because it's function-scoped and allows you to re-declare the same variable name without any error. This often led to bugs.

To fix this, let and const were introduced. let is block-scoped (meaning it only lives inside the curly braces it’s written in) and you use it when you know the value will change later, like in a loop. const is also block-scoped, but it’s for values that stay the same. Once you assign it, you can't re-assign it. Nowadays, most developers use const by default and only switch to let if they absolutely have to.

2. What is the spread operator (...)?

Ans: The spread operator is basically those three dots (...). Think of it as a way to "unpack" or "spread out" the contents of an array or an object. For example, if I have an existing list and I want to create a new list that includes all the items from the old one, I just use ...oldList. It’s super handy for copying data or merging two arrays without writing long loops.

3. What is the difference between map(), filter(), and forEach()?

Ans: While all three are used to loop through arrays, they serve different purposes:

forEach(): This is just a basic loop. It goes through every item and does something (like printing a message), but it doesn't give anything back. It returns undefined.

map(): This is used when you want to transform data. It takes an array, changes every item based on your logic, and returns a new array with the modified items.

filter(): As the name suggests, it’s for picking out specific items. You give it a condition, and it returns a new array containing only the items that passed that test (like picking only "Open" issues from a list).

4. What is an arrow function?

Ans:  An arrow function is just a cleaner, more modern way to write functions in JavaScript. Instead of typing out the word function, we use the "fat arrow" =>. Besides being shorter to write, they handle the this keyword differently than regular functions, which makes them much easier to use when working with classes or callbacks.

5. What are template literals?

Ans: Template literals are strings defined with backticks (`) instead of regular quotes. They made life way easier because you can inject variables directly into a sentence using ${variable} instead of constantly using the plus (+) sign to join strings together. They also allow you to write multi-line strings without needing weird escape characters like \n.


