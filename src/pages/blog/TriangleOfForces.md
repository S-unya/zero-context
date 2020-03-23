# CSS from Good to Ugly to Good again

This article expresses an **opinion** on how to use CSS-the-good-bits in harmony with CSS-in-JS for a pain-free and flexible styling solution.

At its most essential, the mental model I have used to evaluate all these pros and cons is about recognising boundaries and the consequences of crossing those boundaries. The suggestion is that we always pay some cost when we cross a boundary. For example, even if the boundary is just climbing a fence from one field to another, there is an exertion cost in climbing the fence, but in reality boundary changes are more like changing from one kind of environment to a different one; land to sea, earth to space, CSS to JS...

While it is not necessarily pertinent, it is worth knowing that most of the decisions I make on a day to day basis are based around working with relatively large code bases and multiple teams working together with a wide range of experience. It may not be immediately obvious, but these are boundaries too.

This is part one (mostly the thesis), part 2 is some practical bits

## Context

Before I start, I need to provide a bit of **opinionated** context by outlining what is good about CSS, what is hard about CSS and what has been done before to make working with CSS easier. At the same time as pointing out the boundaries.

I'd like to say upfront that I'm **not** trying to give an exhaustive insight into approaches to CSS (though I do need to reference some of this), rather I want to get to the thesis and express a way of working that I think provides the best of all worlds.

## Guess what? CSS rocks :astonished:

It really does.

1. It isn't render blocking
2. It has GPU accelerated animation
3. It handles errors and unknown syntax gracefully
4. It is declarative, simple and easy to understand (caveats)
5. It is an elegant, efficient and powerful styling language (compare with, e.g. styling something in canvas)
6. It separates the concerns of style from structural markup (caveats!)
7. It gzips really nicely
8. It caches really nicely

...but

## ~~Large~~ Unplanned CSS can be UGLY! :japanese_ogre:

...and wasteful ...and confusing

There are plenty of people willing to wail upon CSS, so I don't need to bring up war stories about 10000 line css files; 5 types of button and trying to work out what to call them... etc :helicopter: :helicopter: :helicopter: :boom: :palm_tree: :boom: :palm_tree:

I remember the initial party-like euphoria of having a way to separate style from markup (Separation Of Concerns! Boundary.), pretty soon we all woke up to the hangover of giant CSS files and 10 part selectors. We started to notice that far from SOC, our CSS was mirroring the structure of our HTML, and intimately coupled to it. Where has the separation of concerns gone? Where was the simplicity? What had the world come to?

Largely speaking the hard bits of CSS arise from the following in descending order of impact:

1. All style declarations are in the same scope - a global scope
2. Browsers don't always play by the same rules - though, compared to the days of CSS1, this is barely a consideration.
3. Sometimes, the nuances of specificity can throw up some unexpected results e.g. remembering the specificities of the different selectors... :scream_cat:

3 things, that's it. The first is the kicker though. Of the other 2, the second is still a thing across all the different devices and OSes, but there is tooling like PostCSS that eases this greatly. The third is actually very easy to avoid.

This first point is both a part of the simplicity of CSS and the footgun by which we can make our lives hell. It describes that CSS is largely a no boundary language, which makes it easy to use but also makes it easy to create a mess because there is no inherent organising factor.

There have been many attempts to apply order to the chaos introduced by this global scope over the years, these can roughly be split into 2 camps:

1. Frameworks
2. Conventions

### Frameworks

Like bootstrap, tailwind, Atomic CSS etc are quite a bit more than just CSS, but we'll just talk about their approach to CSS:

- They take the stance that if you are just applying their class names, consequently your CSS will be ordered and relatively small (if you are working on a large project).
- Generally, they work on the principle that you have as much access to the HTML as the CSS, and that there is no separation of concerns between the two.
- The declarative nature of CSS is moved to the HTML (pro and con), which is great for fast prototyping.
- They embrace the global nature of CSS, by providing one well thought out, structured way of applying CSS.
- The generally work on the principle of 1 class to apply 1 style. Some also have some style patterns (a la OOCSS).
- They also effectively solve the age old problem of knowing what to naming.
- They are seriously battle tested.
- By providing the one way to add CSS, they further simplify the cascade/specificity, which makes the styles easier to reason about.
- They can leverage tooling by limiting options

The way I think about this is that the frameworks create boundaries for CSS and control all the areas that the boudaries are crossed. This means that can solve the problems of working with CSS, but, interestingly, by adding boundaries they also introduce **new** problems. A couple of the harder to categories problems that arise are.

- Complexity: they can be an entire syntax unto themselves - `<div class="Bgc(#0280ae.5) H(90px) D(ib)--sm W(25%)--sm"></div>` is a relatively average example from the Atomic CSS framework, which is fairly equatable to other frameworks' syntaces. This is because, due its flexible nature CSS, has a huge API, so frameworks either need to be equally large, or they have to change the task we are doing.
- For me, perhaps the most problematic thing with frameworks, albeit rather nuanced - and I understand that this is both opinion and not limited to frameworks - is that they can engender a mental model where HTML and CSS are equally important; that it is okay to write HTML to fit the needs of the CSS classes that are needed.

It is probably worth noting I'm a believer in semantic and accessible HTML as a base line requirement. It is possible that I take this a little too seriously, but for me it is a requirement or a hard boundary. That said, we can see that frameworks successfully achieve the ordering of the CSS environment, nevertheless there are also reasons enough to make me want to search for another option...

### Conventions

Conventions apply a mental framework more than a code framework and they can vary in their scope. They all represent at its most essential, an organising principle that overlays boundaries on CSS. BEM for example is a way of marking boundaries through naming, while OOCSS outlines an entire philosophy of structure... and yes, it can get pretty abstract. In reality most frameworks I've seen use and formalise one or more convention (or CSS organising principle) into tooling or code structure.

Over time various conventions arose and I think that I've tried most of them in one project or another. Eventually I even started introducing my own conventions. This search led me to ITCSS; arguably the convention that most closely and fully leverages all of CSS while providing mechanisms to avoid the pitfalls. It is quite easy to grasp, and promotes reuse and HTML primacy. What I liked about it is the way it had a place for all of CSS without trying to change it.

## What is IT(CSS)?

[ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/) "stands for Inverted Triangle CSS and it helps you to organize your project CSS files in such a way that you can better deal with (not always easy-to-deal with) CSS specifics like global namespace, cascade and selectors specificity." - much of the following description is also lifted from (https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/).

One of the key principles of ITCSS is that it separates your CSS codebase to several sections (called layers), which take the form of the inverted triangle, where the most general types of styles form the top (widest part) of the inverted triangle and the most specific (and therefore, explicit) styles are at the pointy end.

What the layers are is a little academic once you understand the principle, but the ones recommended in ITCSS are, ordered from most general to most specific:

1. **Settings or Tokens** – may be used with preprocessors (like sass variables) and contain font, colors definitions, etc.
2. **Tools** – globally used mixins and functions.
   **It’s important not to output any CSS in the first 2 layers.**
3. **Generic** – reset and/or normalize styles, box-sizing definition, etc. This is the first layer which generates actual CSS.
4. **Elements** – styling for bare HTML elements (like H1, A, etc.). These come with default styling from the browser so we can redefine them here. **This is the last layer where we will select a bare HTML element**
5. **Objects** – class-based selectors which define **undecorated design patterns**, for example media object known from OOCSS
6. **Components** – specific UI components. This is where the majority of our work takes place and our UI components are often composed of Objects and Components
7. **Utilities** – utilities and helper classes with ability to **override anything which goes before in the triangle**, eg. hide helper class

My teams and I have used a reduced version of this very successfully for a few years. We have adjusted it and learned from using it. We've even managed some projects across multiple branding changes - one of the arguments for Separation of Concerns that is often rejected as not a real life scenario.

This is not an advert for ITCSS though it might seem it :P, rather the aim is to learn why it is successful. This largely revolves around the fact that it doesn't try to fight with CSS, so it doesn't need to change it. It draws boundaries around different types of CSS usage, rather than imposing new boundaries, so it is easy to use and one seldom needs to cross the boundary.

Nevertheless, both the type of application we make and the tooling to make it are changing; there are new ways of writing CSS and new ways of constructing web apps, amongst other things.

## CSS-in-JS, a new kind of foot gun :footprints: :gun:

"CSS-in-JS" is a catch all term to describe a number of approaches to, what I think of as a natural evolution of CSS that was driven by tooling, pre/post processing and the move towards "componentising" UI such as React and Custom Components. The different CSS-in-JS libraries deal with this new way of creating content for the web in their own ways, but they all try to solve the one big issue - namespacing styles to a specific "atom" of UI so as to entirely obviate global scope and style clashes. To give an idea of how popular the idea is, [here is what the ecosystem looked like a couple of years back](https://github.com/MicheleBertoli/css-in-js). These days there are some clear favourites, but the picture is still as broad.

Some CSS purists would say that this goal is no different to BEM or one of the other Convention based approaches, but there are important differences:

- We get real modules in CSS
- Files are optimised for tooling
- We get dynamic and conditional styles
- We get an explicit relationship between "components" and their styles, which means no more "append only" stylesheets.

To put it another way, we get an explicit boundaries (modules) and a way to extend it to the JS tie it to UI components so that we have effective ring fencing of component styles so that styles cannot clash. It is effectively automatic namespacing, no different from namespacing we used to do, but now it is automatic and explicitly linked to the UI. Plus we get some extra functionality that we didn't have before...

Unfortunately it isn't all good news! Just as with the previous attempts to mitigate the hard bits of CSS, this approach includes some sacrifices and some new issues:

- Loss of non-blocking, cacheable styles if JS is generating the CSS (or double loading CSS with Critical CSS)
- A great deal of duplication because all components exist in isolation (caveats)
- On the fly CSS generation can be SLOW, especially in low end devices
- New syntaces to learn for CSS devs
- Buy-in; once you start with one CSS-in-JS lib, it is hard to switch because of new syntax
- More to learn; greater impact of mistakes. CSS is very forgiving of mistakes so errors in CSS files have low impact, but an error in a JS file can cause the application to error.
- Treating components in isolation can also lead to the need to override the styles in the components

### Stepping back a bit

Hopefully by now I've shown that there hasn't yet been a perfect CSS alternative developed (in my opinion); there are almost always as many issues with the solutions to the problems of CSS development as there are benefits.... sometimes more. It is worth being practical and recognising that while a set of pliers is an excellent tool, there may be a better tool for getting a screw to go into some wood; and that maybe you will need more than one tool if you want to build a house...

I've glossed over the fact that each time one of these imperfect solutions has arisen and its problems have been realised, someone has stepped back and put in place some conventions and tools to mitigate them. These adapted workflows tend not to be as elegantly simple as using one tool, but are practical and focus on using the new tool for what it is good at and using other tools where they are needed to make the best of all worlds.

The most successful maintain the philosophical consistency and boundaries of each tool in the toolbox so that they are consistent, easy to use and think about. ITCSS, is one of these successful responses.

## Choices and considerations

Well, having stepped back and evaluated the pain points, it seems some of the issues with CSS-in-JS can be mitigated just with tooling, or making a different choice.

### Which flavour? :ice_cream:

For example, the choice of CSS-in-JS approach. Although it isn't particularly popular in React, I tend to favour [CSS modules](https://github.com/css-modules/css-modules). I do this consciously because:

1. the development pattern is the same as with CSS or SASS, so it is easy to onboard new devs, there is _some_ custom syntax (like `composes` and the scope syntax) but basically it is just CSS.
2. Additionally, the convention for CSS modules is to have a separate CSS file from the JS. The style classes are exposed as named exports from the module that can be imported into the Component. This means that CSS files can be worked without affecting the JS while still maintaining the explicit CSS dependency boundary relationship. Admittedly, one loses out on the convenience of the CSS actually being in the JS, but gain in simplicity for junior team members and fault isolation.

Other CSS-in-JS options provide other benefits, but by itself this one choice removes 3 of the issues we face with CSS-in-JS (syntax, fault isolation and buy in), so from my point of view it makes sense.

CSS modules also allow "composition" of styles (from the same file and from other files). There are potential issues with composing styles from other components because it breaks the boundaries of isolation/encapsulation... so we need to be considered in using this powerful feature... more on this later, but one can see that there are also options here to reduce duplication.

### Pre-rendering :potable_water:

Another choice I favour for the purpose of improving performance and delivering the right CSS to a page in a cacheable way is to Server Side Render as much as possible; I choose [Gatsby](https://www.gatsbyjs.com/) for all the amazing benefits that it provides, but there are other options like Zeit's awesome [nextjs](https://nextjs.org/), that will take all the pain out of this process to the point that I will do this instead of using CreateReactApp to bootstrap React projects.

With these 2 choices, the only cost of using CSS-in-JS is the code duplication issue and the isolation issue. That may be enough for you, nevertheless, what I'm going to talk about is more of a holistic approach to the problems that have existed from the beginning and to try to learn the combined lessons of 20+ years of web development experience.

### ITCSS it again

I'm returning to ITCSS as the possibly the most succesful response (only from the point of view of it not having any downsides rather than what it adds); it works because it comprises the best bits from all the other options, regardless, and draws layer boundaries in harmony with the way CSS works and how teams work.

Given that it is one of the few options that don't create new problems, let's examine how we might use its lessons.

ITCSS proposes 7 "layers" or types of CSS rule. In my experience they fall fairly neatly into 2 groups - the styles that one always has to write for every project (like layouts, themes, etc), and the styles that are specific to implmentation (what is actually on the page). If we split those 7 layers up innto these categories, it looks like this.

Styles that always have to be set:

1. **Settings or Tokens**
2. **Tools**
3. **Generic**
4. **Elements**
5. **Utilities**

Implementation specific:

6. **Objects**
7. **Components**

Of all the style types considered useful by ITCSS, it is really only these last 2, implementation specific sets of styles that comforatbly live in the isolated UI Component world (the names are a bit of a give away). We can guess that these would be well suited for CSS-in-JS. To prove it we should inspect our process, to see that we can easily write isolated styles for our components using CSS-in-JS... which we can. You'd almost imagine it was created for it! That notwithstanding, if we introspect how we manage writing those other types of styles, the styles that we have to do for every project, in my opinion, we find that CSS-in-JSS doesn't provide for them well at all.

For example, some CSS-in-JS approaches have the concept of "themes". This is a list of "Settings" (in ITCSS terminology) of colours, fonts, etc that make up a the building blocks of a theme. This is fine except that we then end up inserting them directly in our (isolated) Components - `theme.bodyFont` - to get fonts and colours, etc into our Components. Initially I thought this might be a good solution until I thought about it for a bit.

1. Yes, it reduces duplication but doesn't represent a good response to the duplication of code issue
2. This theme is essentially a globally scoped style set, albeit a controlled one. This breaks the philosophy of local scoping, and the boundary is crossed (more later)
3. Also, because we need to insert these global styles in our locally scoped, "reusable" Components, it is quite likely we will run into the situation where we need to reuse a Component for a specifc situation that will require us to override those styles, which should act as a potential warning flag - the less we have to override, the more stable the style.
4. Finally, this solution only partially solves the first of the 5 types of style that you most likely need to implement and creates 3 new problems.

I'm not saying that we shouldn't be using global scope; I'm not even saying that we shouldn't be overriding styles particularly - though I think it best if we keep both rather controlled. I'm saying that these points represent a breaking of the philosophy/implementation of CSS-in-JS. Consequently inconsistency and an increase in complexity... and the irony is that **it would be easier and better to do in plain old CSS**.

It is this last point that led me to this simple thesis: we can leverage CSS for the things CSS does well and CSS-in-JS for the things it does well while protecting the fundamental philosphies and boundaries of each of those parts. Basically a set of boundaries drawn around those 2 types of style. I call it the Triangle of Forces, which talks about 3 forces in balance, because it is heavily inspired by ITCSS, it uses CSS-in-JS and it proposes some new conventions for using CSS-in-JS.

## Enter the Triangle of forces

On the face of it ToF is a split in the styles of an application or website, where there are some styles that are relatively static and get used across projects and some that are specific to implementation.

The 5 ITCSS layers I highlight above as "Styles that always have to be set" tend to become almost static across projects once they have been setup for one project, except for the settings layer, which changes the values that all the other styles use. Largely speaking I consider all but 2 of these 5 layers to be optional. I treat these styles as plain old CSS; they are output as normal CSS files and imported in such a way that they can be loaded as CSS and cached as CSS.

## Summary

By taking a step back and evaluating the governing principles of the various systems available, we can come up with solutions that are better than just gritting our teeth and trying to hammer a screw in with some pliers. This layer then sets up the theme that all your components will inherit. It uses CSS cascade, it will be loaded as plain CSS and will be cached. All the styles will be very low specificity so components will have no issues overriding them, but more importantly, **the isolated components will not care about theme at all unless they have to so something specific to the component**. This means that we have a controlled theme, with low specificity and no duplication; we have a number of design tokens that can be used in isolated components, which allows the components to adapt to different themes and increases their reusability and stylability; and we have a known language and syntax.

## Further reading

https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/
https://medium.com/dailyjs/what-is-actually-css-in-js-f2f529a2757
https://gist.github.com/threepointone/731b0c47e78d8350ae4e105c1a83867d
https://medium.com/free-code-camp/the-tradeoffs-of-css-in-js-bee5cf926fdb
https://mxb.dev/blog/the-css-mindset/
https://mxstbr.com/thoughts/css-in-js
https://css-tricks.com/bridging-the-gap-between-css-and-javascript-css-in-js/
https://css-tricks.com/bridging-the-gap-between-css-and-javascript-css-modules-postcss-and-the-future-of-css/
https://css-tricks.com/css-modules-part-1-need/
https://jxnblk.com/blog/two-steps-forward/

This is the second part of a 2 part exposition on a considered set of conventions for using CSS + CSS-in-JS to their best. [Part 1](/TriangleOfForces) lays out the theory and the "boundary" paradigm for evaluating success, this is more about the nuts and bolts. If we continue with the idea of recognising boundaries and the cost of crossing them as a way of evaluating solutions and decisions, hopefully the costs and benefits will be clearer.

In part 1 I used ITCSS's layers to identify a number of types of styles that we basically have to have for every web app. I then split those styles into 2 types; roughly speaking General styles and Specific styles. The Specific styles are the ones that apply to specific components and the General styles are largely for themeing... and "Utilities". So let's look at themeing first.

## Themeing

Themeing is a way of providing a set of shared styles that can be used throughout an application. Let's look at 2 ways of providing a theme; one CSS-in-JS solution and one based on the observations in part 1 and then work out the boundaries in each.

### CSS-in-JS themes

Themeing as solved by one of the most popular CSS-in-JS libs, and the one that solves it very elegantly (IMO), [styled-components](https://styled-components.com/docs/advanced#theming) looks like this (in reality the theme would most likely be in its own file):

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

Immediately you can see the value in the Styled-Components' approach: CSS syntax in Components; awesomely, you can apply different themes by wrapping in different `ThemeProvider`s; the themes are nice and controlled... Great, it looks like a good option. Let's draw some boundaries to get some clarity:

1. (Putting this first though it depends on your team) There is a possible boundary between JS devs and CSS devs
2. There is the JS/CSS language boundary
3. The JSX `<button>` and HTML `<button>` boundary (handled by React)
4. There is the `Button = styled.button`/JSX `<button>` boundary. Handled by Style-Components, this is a JSX `<button>` wrapped up with some styles and it has a controlled interface (way to cross the boundary) to receive some props for some values
5. There is the theme, which is a JS Object (that has a boundary around it).
6. There is the portable, global boundary (`<ThemeProvider>` context) that passes the theme to anything within it.
7. There are the boundaries around each of the files in which these things live (they would be most useful in their own module) which is handled by either JS or tooling.
8. HTML/CSS/JS because JS is creating the CSS in this case.
9. We haven't even looked at Media Queries

First boundary is a skillset/team boundary. To a CSS dev, the majority of that example is a mass of unknown with a bit of recognisable stuff in it, whereas to a React dev, the syntax is relatively obvious... except perhaps the template string boundary around the CSS. The team boundary is quite big and potentially costly, both in training and in possible mistakes (because JS isn't as forgiving as CSS).

The second boundary, JS/CSS language is represented by that (initially) odd template string tagged on the end of `styled.button`. The styled-components solution for this boundary is quite nice because it is possible to quickly encapsulate components/JSX with styles AND one can use CSS like syntax instead of JS Object notation, but there is still a context switch.

While the team boundary is costly in one set of more obvious ways, the initial cost with this solution (for a React dev) seems to be just a small effort to understand some odd syntax... on closer inspection we can see that each time we write CSS and use the theme or write the theme we are doing multiple language switches. For example, while the CSS in the template string uses CSS syntax, the theme is JS object notation. So there is a cognitive switch within lines of code where one is writing CSS, then switching to JS to insert a theme style and then back to CSS and then back to React... This is like changing lanes on the Motorway, initially it is scary, then it seems easy, but that belies the fact that most accidents happen during the change.

It is worth talking briefly about points 3, 4 and 8 because these representative of a type of costs of crossing boundaries that are moved by tooling/libraries. React makes it very easy to write HTML style markup and Componentise code, VDOM, etc. Tons of value, but the cost is a minimum bundle size (minified and gzipped) of > 30K. To put this into context [Addy Osmani](https://v8.dev/blog/cost-of-javascript-2019) recommends

> "Avoid having just a single large bundle; if a bundle exceeds ~50–100 kB, split it up into separate smaller bundles"

If you then add the extra [size of Styled-Components](https://github.com/styled-components/styled-components/issues/748) and the CSS that it has to turn into CSS...

The nice developer cost is transferred to the user... even worse, it gets almost exponentially more costly as the device capability goes down.

### TOF

From ITCSS's layers the ones that are essential are "Settings" & "Elements", the rest are mostly for making development easier. The Settings layer (described below) is a bit like the theme object in Styled-Components, except that it is written in CSS and (ideally) remains globally accessible...

#### Settings/Design Tokens

This is a structured list of CSS variables (custom properties). This is the only place that this type of CSS variable is declared in your application to prevent clashes. I use CSS variables because they are globally available, accessible and context dependant so that they can respond to e.g. media queries. What you choose for these will possibly vary. I have found that once set up these settle down to a consistent set and only the values change between projects.

I recommned using a couple of conventions:

1. Set up some variable prefixes that identify what the token sets, e.g. `--t-body`; `--c-brand1`; `--s-3`; or you could be more explicit to avoid the issues of obtuse syntaxes, e.g. `--text-body`, `--color-brand1`, `--space-3x`.
2. Be as explicit as you can with what these are set to, to the point of making a named variable to set the token to. This works very well in sass because you can do `--c-brand1: #{$bright-red};`, but equally you can do `--c-brand1: var(--bright-red);`.
3. Organise your tokens logically - e.g. put colours together, put types together, etc
4. Have a token/setting for every the theme part you need to set, e.g. it makes sense to set a body text colour setting, but you might forget to make a body background colour setting; or some elements, like buttons will have multiple settings (border, background, etc) and then have hover, focus, etc states for each of those multiple settings too.

These conventions are to address the potential pitfalls of having opaque variable names and the inherent problem of having a long list of things that need to be remembered. I tend to use sass variables as "static", local variables and custom properties/CSS variables as dynamic, global variables.

#### Generic & Elements

Modern day browsers are much more consistent than they used to be, so reset stylesheets are less "necessary", but there is still the need for a place to put them. I tend to merge my Generic and Element layers for efficiency. This along with the "settings" layer are the key areas where we can leverage CSS with a light touch, without breaking the principles of the approach and simultaneously overcome the limitations of CSS-in-JS.

I use this layer to apply the "theme" set up in "Settings" on to bare HTML elements, e.g.

```css
  body, html {
    color: var(--c-body);
    font-size: var(--t-medium);
  }
  p { ... }
  h2, .heading-l {
    font-size: var(--t-large);
    line-height:...
  }
  ...etc
```

I also create classes for headings because it is seldom that a design has the heading hierarchy as one would hope... This extra class is a backdoor that I try not to use too often, even though they are quite controlled because this is the only place that they can be set.

Lastly a quick word about Utility classes.

#### Utitlities (optional)

These are useful classes that one uses a lot, such as `.screenReaderOnly`. Ideally there are not too many of these because, by their nature they need to be rule breakers; they need to override other styles. I tend to make this a CSS module file and `composes` these classes into my components because the encapsulation is being deliberately broken here, but that is not necessary. One could use an entire CSS utility library here if one wanted, but we need to be wary of

#### What that looks like

"Settings" and "Elements" layers/files might have something like this - the actual structuring or naming might differ - but over time you will find that the content will stop changing and it will just be the values of the variables in "Settings" that change.

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

You would use it initially in the "Elements" CSS file to make a theme, but you can also use the Settings variables in your Components.

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

Notice the `:root {}` pseudo-class, it matches the `<html>` element, so all variables declared in there are scoped to the html tag and its decendants.

Whether the above looks like a good solution or not, let's examine it by outlining the boundaries:

1. There is the possible JS/CSS team member boundary as above
2. The `:root {}` - this encapsulates the boundary between CSS and HTML.
3. The files, there are 3 files; 2 CSS and 1 JS.
4. The CSS/JS boundary, unlike above, these are kept separate
5. As above, there is the JSX `<button>`/HTML `<button>` boundary
6. Media Queries.

An interesting thing about these boundaries (number 5 notwithstanding) is that they don't cross, but sit adjacent and consequently have no cost (apart from point 5, which is the cost of running React). That said, we still have a **globally scoped CSS**, ableit controlled by convention.

So the costs of the TOF solution are much lower. This is not a reflection on the excellent Styled-Components library, but rather an indication of the complexity of the problem. Styled-Components still solves the main issue of global scope very successfully, whereas the CSS example rather "controls" it, but it is clearly a much simpler solution.

The question is only whether the costs and complexity are worth the the solution, which they may be in your case. In my case it is much harder to justify those costs, and that is why I decided to approach the problem in this way.
