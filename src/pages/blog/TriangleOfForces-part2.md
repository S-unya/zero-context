# Triangle of Forces, part 2

This is the second part of a 2 part exposition on a considered set of conventions for using CSS + CSS-in-JS to their best. [Part 1](/TriangleOfForces) lays out the theory, this is more about the nuts and bolts. If we continue with the idea of recognising boundaries and the cost of crossing them as a way of explaining the decisions I'm making, hopefully the solutions will be clearer.

## Themeing

Themeing is a way of providing a set of shared values for all your styles, irrespective of how you are adding those styles. We'll look at 2 ways of providing a theme; one CSS-in-JS solution and one based on the observations in part 1.

## CSS-in-JS themes

Let's have a look at themeing as solved by one of the most popular CSS-in-JS libs, and the one that solves it most elegantly (IMO), [styled-components](https://styled-components.com/docs/advanced#theming):

```js
// Define our button, but with the use of props.theme this time
const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;

  /* Color the border and text with theme.main */
  color: ${props => props.theme.main};
  border: 2px solid ${props => props.theme.main};
`;

// Define what props.theme will look like
const theme = {
  main: "mediumseagreen"
};

render(
  <div>
    <Button>Normal</Button>
    <ThemeProvider theme={theme}>
      <Button>Themed</Button>
    </ThemeProvider>
  </div>
);
```

Immediately you can see the value in the Styled-Components approach because you can apply different themes by wrapping in different `ThemeProvider`s. The themes are nice and controlled... Great... So let's just draw some boundaries to see what is happening:

1. There is the possible JS/CSS team member boundary
2. There is the JS/CSS language boundary
3. The JSX `<button>`/HTML `<button>` boundary
4. There is the `Button = styled.button`/JSX `<button>` boundary. It is a `<button>` encapsulated with some styles and it has a controlled interface (way to cross the boundary) to receive some props for some values
5. There is the theme, which is a JS Object that has a boundary around it.
6. There is the portable, global boundary (`<ThemeProvider>` context) that passes the theme to anything wrapped in it.
7. There are the boundaries around each of the files in which these things live (they would be most useful in their own module).
8. HTML/CSS/JS because JS is creating the CSS in this case.
9. We haven't even looked at Media Queries

First boundary is a skillset/team boundary. To a CSS dev, the majority of that example is a mass of unknown with a bit of recognisable stuff in it, whereas to a React dev, the syntax is relatively obvious... except perhaps the template string boundary around the CSS. The team boundary is quite big and potentially costly, both in training and in possible mistakes (because JS isn't as forgiving as CSS).

The seocond boundary, JS/CSS language is represented by that (initially) odd template string tagged on the end of `styled.thing`. The styled-components solution for this boundary is quite nice because it is possible to quickly encapsulate components/JSX with styles AND one can use CSS like syntax instead of JS Object notation.

That notwithstanding, it is a nice, clear demonstration of another type of cost of crossing a boundary. The team boundary is costly in one set of ways more obvious ways, but the initial cost with this solution (for a React dev) is just some cognitive load to understand some odd syntax... Or so it seems because, while the CSS is not written in JS object notation, the theme **is** constructed with object notation. So there is another cognitive load in switching when crossing that boundary and then back again when using it in the "CSS" template string.

Those are mostly costs we pay upfront but they dwindle as the team gets used to the tech, apart from points 3, 4 and 8.

### TOF

In part 1 I identified a number of types of styles that we basically have to have in place for every web app; I used ITCSS's layers to further sub-divide these styles, of those the following 2 layers are the essential for themeing... plus a small note about "Utilities".

### Settings/Design Tokens

This is an, ideally ordered list of CSS variables (custom properties). I use CSS variables because they are globally available, accessible and setable with JS and context dependant so that they can respond to e.g. media queries. What you choose for these will possibly vary, but I have found that these settle down to a consistent set and only the values change between projects. I recommned having a couple of conventions:

1. Set up some variable prefixes that identify what the token sets, e.g. `--t-body`; `--c-brand1`; `--s-3`; or you could be more explicit to avoid the issues of obtuse syntaxes, e.g. `--text-body`, `--color-brand1`, `--space-3x`.
2. Be as explicit as you can with what these are set to, to the point of making a named variable to set the token to. This works very well in sass because you can do `--c-brand1: #{$bright-red};`, but equally you can do `--c-brand1: var(--bright-red);`.
3. Organise your tokens logically
4. Have a token/setting for al the parts you need to set, e.g. it makes sense to set a body text colour setting, but you might forget to make a body background colour setting; some elements, like buttons will have hover, focus, etc states for each of their multiple settings too.

These conventions are to address the potential pitfalls of having opaque variable names and the inherent problem of having a long list of things that need to be remembered. I tend to use sass variables as "static", local variables and custom properties/CSS variables as dynamic, global variables.

### Generic & Elements

Modern day browsers are much more consistent than they used to be, so reset stylesheets are less "necessary", but there is still the need for a place to put them. I tend to merge my Generic and Element layers for efficiency. This along with the "settings" layer are the key areas where we can leverage CSS with a light touch, without breaking the principles of the approach and simultaneously overcome the limitations of CSS-in-JS.

I use this layer to do "themeing" against bare HTML elements using the tokens set up in the "settings" layer, e.g. `body, html { color: var(--c-body);}` or `p { font-size: var(--t-medium); }`. I also setup classes for headings because it is seldom that a receive a design that has the heading hierarchy as one would expect... so I do things like `h2, .heading-l { font-size: var(--t-large); line-height...}`. This extra class is a backdoor that I try not to use too often.

and lastly...

### Utitlities (optional)

These are useful classes that one uses a lot, such as `.screenReaderOnly`. Ideally there are not too many of these because, by their nature they need to be rule breakers; they need to override other styles. I tend to make this a CSS module file and `composes` these classes into my components because the encapsulation is being deliberately broken here.

### What that looks like

"Settings" and "Elements" layers/files might have something like this - the actual structuring or naming might be completely different - but over time you will find that the content will stop changing and it will just be the values of the variables in "Settings" that change.

```scss
// setting.scss - this could as well be a css file
:root {
  /***** Primary Palette *****/
  --c-m-blue: #2b70b9;
  --c-d-blue: #{$cobalt}; // using sass variables as "static"
  --c-black: #{$black};
  --c-white: #ffffff;
  --c-orange: #ffbd4a;
  // ...etc

  /***** Grayscale Palette *****/
  --c-gray-100: #f5f5f5;
  --c-gray-200: #eaeaea;
  // ...etc

  /***** Usage Semantics *****/
  --c-focus-ring: var(--c-orange);
  // Body
  --c-body-bg: var(--c-white);
  --c-body: var(--c-black);
  --c-main-bg: var(--c-gray-100);
  // Button
  --c-button: var(--c-white-pure);
  --c-button-bg: var(--c-m-blue);
  --c-button-border: var(--c-white-pure);
  --c-button-active: var(--c-m-blue);
  --c-button-bg-active: var(--c-white);
  --c-button-border-active: var(--c-m-blue);
  // ...etc

  // Link
  // ...etc

  /****** TEXT *******/
  --t-base: 16;
  --t-sm: calc(
    14rem / var(--t-base)
  ); // this is the type of thing that you might use a Utility function for in sass
  --t-m: calc(16rem / var(--t-base));
  --t-l: calc(18rem / var(--t-base));
  // ...etc

  --t-body: var(--t-med);
  // ...etc
}

// css variables can be modified by context like media queries
@media (min-width: $bp-s) {
  :root {
    --t-sm: calc(16rem / var(--t-base));
    --t-m: calc(18rem / var(--t-base));
    --t-l: calc(20rem / var(--t-base));
  }
}
// ...etc
```

You would use it in CSS initially in the "Elements" CSS file initially to make a theme, but you can also use the Settings variables in your Components.

```css
/* elements.css 
 You could equally use SCSS, I'm swapping to show it is possible to do in both
*/
body {
  background-color: var(--c-body-bg);
  /* This is sufficient to set all text (assuming a reset stylesheet is set) */
  color: var(--c-body);
}

/* This will style all buttons which you may or may not wish */
button {
  border-color: var(--c-button-border);
  background-color: var(--c-button-bg);
  border-width: 2px;
  border-style: solid;
  color: var(--c-button);
}

button:focus,
button:hover {
  border-color: var(--c-button-border-active);
  background-color: var(--c-button-bg-active);
  color: var(--c-button-active);
}
```

```js
render(
  <div>
    <button>Themed</button>
  </div>
);
```

Notice the `:root {}` pseudo-class, it matches the `<html>` element, so all variables declared in there are scoped to the html tag and its decendants. Let's outline the boundaries here:

1. There is the possible JS/CSS team member boundary
2. The `:root {}` - this encapsulates the boundary between CSS and HTML.
3. The files, there are 3 files; 2 CSS and 1 JS.
4. The CSS/JS boundary
5. Maybe not obvious, there is the JSX `<button>`/HTML `<button>` boundary
6. Media Queries.

An interesting thing about these boundaries is that they don't cross, but sit adjacent and have no cost as a result (apart from point 5, which is the cost of running React). That said, we still have a globally scoped CSS ableit controlled by convention.

So the costs of the TOF solution are much lower. This is not a reflection on the excellent styled-components library, but rather an indication of the complexity of the problem. Styled-components still solves the main issue of global scope very successfully, whereas the CSS example rather "controls" it, but it is clearly a much simpler solution.

The question is only whether the costs and complexity are worth the the solution, which they may be in your case. In my case it is much harder to justify those costs, and that is why I decided to approach the problem in this way.

## Creating re-usable Components

One of the things that the approach of drawing boundaries has highlighted to me is that there are also boundaries within our applications, and being clear about these boundaries can help make components much more reusable.

To aproach this problem, let's look at this design that we have been given:

![Vertical list of cards](/static/assets/TOF/card-vertical-list.png)

Spend a little time and think about how you would build a/some component/s that caters for these 2 use cases.

As we've disccused elsewhere, the first step in making a Component is just making it, so the following Components are not going to be optimised for any other situation than the one seen here.

```js
import React as "react";
import cx from "classnames";

export const CardImage = ({className, uri, alt, ...rest}) => (<img alt={alt} src={uri} className={cx(className, styles.image)} {...rest} />);
export const CardTitle = ({className, text, ...rest}) => (<header className={cx(className, styles.header)} {...rest}><h3>{text}</h3></header>);
export const CardTaxonomy = ({className, text, ...rest}) => ()

export const Card = ({className, children, uri, ...rest}) => {
   return (
       <article className={cx(className, styles.card)} {...rest}>
           <a href={uri} className={styles.link}>
           {children}
           </a>
       </article>
   )
}

```
