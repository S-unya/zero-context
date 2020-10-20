---
title: Using Typescript in stages
date: 2020-10-15
headerImage: ../../assets/headers/raining-road.jpg
---

## Value

TypeScript is modern JavaScript with types. The types makes it possible for editors and IDEs to provide really rich developer experiences, that help catch certain types of errors really early in the development cycle. More importantly though, the TS we write is for people - us in 6 months time, or other members of our teams - but it is there to help us orient, write good code and avoid illogic.

This means that we are not writing code to satisfy the TS transpiler! We're writing code to document what it happening and how our methods should be used. I hope to show some ideas on how we can approach TS in a practical and useful way. Hopefully I can show some ways of thinking or approaching coding that will both make us better developers and avoid some of the pitfalls of writing TS.

### 1. Setup TS to suit your needs

There are many ways that you can set up your `.tsconfig` to suit how you like to program. There are [good docs on what each setting in the config does](https://www.staging-typescript.org/tsconfig). There are also [base configs](https://github.com/tsconfig/bases/) setup for quick setup using recommended values. There are enough configurations that you could code pretty much as you want; you can evern run [TS checking against JavaScript](https://www.staging-typescript.org/tsconfig#allowJs). If you are used to JSDoc, then the TS service in VSCode can even use that to give some of the benefits of TS, but it is considerably more verbose, less flexible and it is hard to keep up to date.

Let's have a look at this in practice as a way of understanding what TS is adding to a project, with a simple function that takes any number of numbers and adds them together:

```javascript
// @ts-check
// You can even use some thing like this to trigger type checking on a per file basis

const addNumbers = (...numbers) =>
    numbers.reduce((total, number) => (total += number), 0);
```

The TS server that is checking this JavaScript will try to help us here, but it can't really do much more than telling us the connotations of what we have written...![TS is trying to help](/assets/blog/ts/untyped-numbers.jpg)

TS is telling us that `...numbers` is `any[]`. That is, an array of anything. Hopefully your spidey sense are tingling because I can legitimately do this (and worse):

```javascript
const total = addNumbers("1", 2, "ten");

console.log(total); // => "012ten"
```

Clearly no-one genuinely trying to use this function would add those values, but if adding numbers from some data where the actual values were not under the developer's control, this would not be out of the question.

JSDoc or TS types can give TS **some hints about our intention** and **simultaneously document that intention**. It looks like this in js with JSDoc:

```javascript
// @ts-check

/**
 *
 * @param  {...Number} numbers - Numbers to add together
 * @returns {Number}
 */
const addNumbers = (...numbers) =>
    numbers.reduce((total, number) => (total += number), 0);

const total = addNumbers("1", 2, "ten");

console.log(total); // => "012ten"
```

By documenting that we want the parameters of our function to be numbers, TS can help not only by surfacing that intention, but by warning when we are not using the function as intended.

As shown in the picture, the TS typings are actually a lot simpler than the JSDoc:

```typescript
const addNumber = (...numbers: number[]): number =>
    numbers.reduce((total, number) => (total += number), 0);
```

That is all very well, but what if we didn't realise in the first place that this was a problem? That is why the "recommended" setup for TS is `"strict": true`. I think this is an unfortunate choice of name for this setting, because really it turns on TS "full help mode"! With strict turned on, TS would have warned us the moment we closed the bracket on `(...numbers)` that we probably didn't want that parameter to be anything. It would have shown an "error" (`Rest parameter 'numbers' implicitly has an 'any[]' type`).

### Early errors are a gift

Lot's of people get overwhelmed by TS when they first start because the type checker surfaces things like this, that on the surface don't seem like a big deal, as errors. And everybody knows that errors are bad. And they are if your code is in production and errors are occurring, but this is a potential error that you know about now, **before it has a chance to break something**. And really, it is just the type checker saying either "I can't reason about this code, so you probably won't be able to in 6 months either" or "Hold on, you said that you wanted stuff like this, but this isn't like that! Maybe something is happening that you aren't expecting"... which are basically the most helpful things anyone can say to you and the type checker is doing it as you code! Consequently we learn to code better, document our code better, and end up with more resillient applications.

So really, it better to think about those little pointers as a gift of foresight and hindsight.

-   Reading TS Errors
-   Bad types are worse than no types
    -   eg use of any, unknown, never
-   Allow inference
    -   declare data shapes early
    -   declare expectations
-   Local types vs global types
-   Some TS things that are not available in other typed langs
