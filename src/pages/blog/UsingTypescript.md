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

### So, "Errors" you say

Given that we're using TS to expose our intentions and using the type checker to tell us wether we have described them all and are sticking to them...it would help to be able to understand the messages it gives us when we don't!

For the most part these will be simple like the error we got above when we started documenting our intentions with TS, `Argument of type 'string' is not assignable to parameter of type 'number'`. Nevertheless, even this "simple" message contains a lot of information. Let's assume that we don't know anything except this message, we can extract a lot of information from it:

1. A function was called - we infer this from the fact that is says "Argument", which is what we call the values recieved in a function call
2. The function was given and argument of type 'string'
3. The function has a parameter which is documented as being a 'number'

This illustrates that our type checking chum is very careful in the words they choose, so we need to read very carefully...

Now let's look at a MUCH more complicated error as a way of exploring the logic of these messages.

```bash
@uui/ui-core: ~/test/packages/ui-core/src/components/widgets/VulnerabilitiesFilter/VulnerabilitiesFilter.tsx
@uui/ui-core: TypeScript error in ~/test/packages/ui-core/src/components/widgets/VulnerabilitiesFilter/VulnerabilitiesFilter.tsx(113,47):
@uui/ui-core: No overload matches this call.

@uui/ui-core:   Overload 1 of 2, '(predicate: (value: Pick<Finding, "id" | "type" | "title" | "severity" | "asset" | "firstFound" | "lastFound">, index: number, array: Pick<Finding, "id" | "type" | "title" | "severity" | "asset" | "firstFound" | "lastFound">[]) => value is Pick<...>, thisArg?: any): Pick<...>[] | undefined', gave the following error.
@uui/ui-core:     Argument of type '(finding: Pick<Finding, "id" | "type" | "status" | "title" | "severity" | "assetId" | "asset" | "firstFound" | "lastFound">) => boolean' is not assignable to parameter of type '(value: Pick<Finding, "id" | "type" | "title" | "severity" | "asset" | "firstFound" | "lastFound">, index: number, array: Pick<Finding, "id" | "type" | "title" | "severity" | "asset" | "firstFound" | "lastFound">[]) => value is Pick<...>'.
@uui/ui-core:       Types of parameters 'finding' and 'value' are incompatible.
@uui/ui-core:         Property 'assetId' is missing in type 'Pick<Finding, "id" | "type" | "title" | "severity" | "asset" | "firstFound" | "lastFound">' but required in type 'Pick<Finding, "id" | "type" | "status" | "title" | "severity" | "assetId" | "asset" | "firstFound" | "lastFound">'.

@uui/ui-core:   Overload 2 of 2, '(predicate: (value: Pick<Finding, "id" | "type" | "title" | "severity" | "asset" | "firstFound" | "lastFound">, index: number, array: Pick<Finding, "id" | "type" | "title" | "severity" | "asset" | "firstFound" | "lastFound">[]) => unknown, thisArg?: any): Pick<...>[] | undefined', gave the following error.
@uui/ui-core:     Argument of type '(finding: Pick<Finding, "id" | "type" | "status" | "title" | "severity" | "assetId" | "asset" | "firstFound" | "lastFound">) => boolean' is not assignable to parameter of type '(value: Pick<Finding, "id" | "type" | "title" | "severity" | "asset" | "firstFound" | "lastFound">, index: number, array: Pick<Finding, "id" | "type" | "title" | "severity" | "asset" | "firstFound" | "lastFound">[]) => unknown'.
@uui/ui-core:       Types of parameters 'finding' and 'value' are incompatible.
@uui/ui-core:         Type 'Pick<Finding, "id" | "type" | "title" | "severity" | "asset" | "firstFound" | "lastFound">' is not assignable to type 'Pick<Finding, "id" | "type" | "status" | "title" | "severity" | "assetId" | "asset" | "firstFound" | "lastFound">'.  TS2769


@uui/ui-core:     111 |     predicate: (finding: VulnerabilityFindingData) => boolean
@uui/ui-core:     112 | ) => (findings?: TaskFindingData[]): number => {
@uui/ui-core:   > 113 |     const filteredFindings = findings?.filter(predicate) ?? [];
@uui/ui-core:         |                                               ^
@uui/ui-core:     114 |
@uui/ui-core:     115 |     return filteredFindings.length;
@uui/ui-core:     116 | };
```

The first thing we have to do is NOT BE OVERWHELMED by all this information, TS is just trying to give us enough information to understand what is wrong. I tend to take each statement at a time as it is easier to digest small mouthfulls:

1. The start and end of the message show where the error occurred (because this a TS transpilation error in a log). Sometimes this is enough to debug the issue - this snippet is clearly doing something interesting!
2. The next thing it tells us is very generally what went wrong, `@uui/ui-core: No overload matches this call.`. From this we can infer that a function is called and that a Type is provided that has at least 1 overload.
3. Then TS shows how each overload doesn't match expectations. It makes 4 statements for each overload.
4. It seems to be repeating itself, but if we read carefully we can see that making progressively more specific statements.
    1. `Overload * of *, ...general shapes..., gave the following error.`. So the next thing we see is an error in expectations.
    2. The error is exactly the same as the "simple" example above `Argument of type ... not assignable to parameter of type ...`. Which means that we just need to check that we are passing the shape of data to the function that we have said it expects.
    3. Then TS helpfully tries to say that to us, `Types of parameters 'finding' and 'value' are incompatible.`. So now we know that there are 2 functions, because here is is saying that we have a function that expects a type of `finding` and another that expects a type of `value`... and they are incompatible.
    4. Finally TS shows just the 2 types that are inconpatable. And indeed they appear to have been constructed using `Pick` from the same original `Finding` type, so are similar but have different shapes.

So, even without looking at the original code, we now know that the `predicate` function on line 113 (whose shape is declared on line 111) is being called with data of the wrong shape... which means that the `findings` on line 113 is not what we are expecting!

### Do less, declare your intentions

All of the above is caught for us because somebody took the time to declare the types of those things, consequently TS can check expectaionts are met as we code.

This leads to the first practical tip when writing TS, not just thinking about TS:

> Allow TS to do the work for you.

Followed swiftly by the second:

> Declare expectations early

Let's look at an example of why this is a good idea.

```typescript
let one;

function declareExpectations(aThing) {
    if (aThing === "happy") {
        return "The weather is lovely and there's plenty of coffee!";
    }

    if (aThing === "sad") {
        return "We ran out of coffee, gosh darn it!";
    }

    if (aThing === "ambivalent") {
        return "Meeting at 9am?";
    }
}

one = declareExpectations(1); // ts type: `let one: any`
one = declareExpectations("happy"); // ts type: `let one: any`
```

This seems like a simple function, but what do we really know about this function? It might not be what you expect, but our friend TS can tell us what we can know about it:

`function declareExpectations(aThing: any): "The weather is lovely and there's plenty of coffee!" | "We ran out of coffee, gosh darn it!" | "Meeting at 9am?" | undefined`

You were probably expecting that `aThing: any` from the example earlier, but did you expect that return type? Do you think that the original intention of this function was to return those specific strings? Did you expect that final `undefined`?

The point is that TS is extremely good at inferring what is going on in a program, so let it... Nevertheless we absolutely should declare our intentions as soon as we are aware of them as a way of documenting how our application works. For example, a developer using our function might use it like this `one = declareExpectations(1);` and neither they nor TS would know whether that was expected use or not unless we declared our intention for that parameter.

Whereas if we declare outr intentions early TS can help us and other devlopers understand both how the code should be used and how our expectation might not be met.

```typescript
let one: string;

function declareExpectations(aThing: string) {
    if (aThing === "happy") {
        return "The weather is lovely and there's plenty of coffee!";
    }

    if (aThing === "sad") {
        return "We ran out of coffee, gosh darn it!";
    }

    if (aThing === "ambivalent") {
        return "Meeting at 9am?";
    }
}

one = declareExpectations(1);
// Error - expectation not met: Type 'string | undefined' is not assignable to type 'string'.Type 'undefined' is not assignable to type 'string'.ts(2322)
// Error - code expected to be used differently: Argument of type 'number' is not assignable to parameter of type 'string'.ts(2345)
```

-   Allow inference

    -   declare data shapes early - e.g. let n; pattern
    -   declare expectations

-   Bad types are worse than no types

    -   eg use of any, unknown, never

-   Local types vs global types
-   Some TS things that are not available in other typed langs
