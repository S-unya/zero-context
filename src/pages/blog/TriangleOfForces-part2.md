# Triangle of Forces, part 2

This is the second part of a 2 part exposition on a considered set of conventions for using CSS and CSS-in-JS to their best. [Part 1](/TriangleOfForces) lays out the theory, this is more about the nuts and bolds.

I'm just going to continue from where I lefft off in part 1.

The following are the 2 important layers out of the 5 ITCSS layers that I find we always end up with in every web app... plus a small note about "Utilities".

### Settings/Design Tokens

This is an, ideally ordered list of CSS variables (custom properties). I use CSS variables because they are globally available, accessible and setable with JS and context dependant so that they can respond to e.g. media queries. What you choose for these will possibly vary, but I have found that these settle down to a consistent set and only the values change between projects. I recommned having a couple of conventions:

1. Set up some variable prefixes that identify what the token sets, e.g. `--t-body`; `--c-brand1`; `--s-3`; or you could be more explicit to avoid the issues of obtuse syntaxes, e.g. `--text-body`, `--color-brand1`, `--space-3x`.
2. Be as explicit as you can with what these are set to, to the point of making a named variable to set the token to. This works very well in sass because you can do `--c-brand1: $bright-red;`, but equally you can do `--c-brand1: var(--bright-red);`.
3. Organise your tokens logically

These conventions are to address the potential pitfalls of having opaque variable names and the inherent problem of having a long list of things that need to be remembered. I tend to use sass variables as "static", local variables and custom properties/CSS variables as dynamic, global variables.

### Generic & Elements

Modern day browsers are much more consistent than they used to be, so reset stylesheets are less "necessary", but there is still the need for a place to put them. I tend to merge my Generic and Element layers for efficiency. This along with the "settings" layer are the key areas where we can leverage CSS with a light touch, without breaking the principles of the approach and simultaneously overcome the limitations of CSS-in-JS.

I use this layer to do "themeing" against bare HTML elements using the tokens set up in the "settings" layer, e.g. `body, html { color: var(--c-body);}` or `p { font-size: var(--t-medium); }`. I also setup classes for headings because it is seldom that a receive a design that has the heading hierarchy as one would expect... so I do things like `h2, .heading-l { font-size: var(--t-large); line-height...}`. This extra class is a backdoor that I try not to use too often.

and lastly...

### Utitlities (optional)

These are useful classes that one uses a lot, such as `.screenReaderOnly`. Ideally there are not too many of these because, by their nature they need to be rule breakers; they need to override other styles. I tend to make this a CSS module file and `composes` these classes into my components because the encapsulation is being deliberately broken here.
