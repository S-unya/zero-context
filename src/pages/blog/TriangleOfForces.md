---
title: CSS from Good to Ugly to Good again
date: 2020-03-20
headerImage: ../../assets/headers/wild-grasses.png
---

This is an **opinion** and some (biased) observations that suggest a way to use _CSS-the-good-bits_ in blissful harmony with CSS-in-JS for a reasonable and flexible styling solution. Most of this article looks at historical and modern attempts to "tame" CSS using a mental model to support the reasoning behind the practical bit at the end and [part 2](/TriangleOfForces-part2.md), which is more in depth on how these ideas enhance the re-use of components

## The mental model

At its most essential it is recognizing boundaries and recognizing the consequences of crossing them. I'm aware that much of what I have to say here is likely to contradict mainstream opinion, and worse, it is likely to have bias just by the nature of opinion. Nevertheless, the hope is that by explaining the model you will be armed with the same paradigms and can make your own choices! In the end it is all grist to the mill.

The mental model is based on 4 general observations:

1. **The first and most important is that there is always a consequence/cost of crossing a boundary**. For example, if we cross between 2 fields while out walking, we either have to climb a fence, or use a gate or style in the fence. In both cases there are costs; to climb the fence we expend more effort and are slowed; to use a gate, first we loose the choice of where to cross, but the real cost is abstracted away to the fence builder (a gate is more complex and costs more). In reality boundary changes are seldom between like and like but from one kind of environment to a another; land to sea, earth to space, CSS to JS...
2. **The second is that some boundaries cost more to cross than others**.
3. **The third is that some boundaries are crossed (or avoided) for good reasons** and some without reason.
4. **The final observation is that some boundaries are good**! Too many boundaries are invariably bad, but too few can be as well.

## Context

First I'd like to outline what is good about CSS, what is hard about CSS.

### Guess what? CSS is really good at what it does! 😲

1. It isn't render blocking and is super optimized by browsers.
2. It provides the absolute simplest way to GPU accelerate any graphics. Ever.
3. It handles errors and unknown syntax gracefully.
4. It is declarative (caveats), simple and easy to understand (caveats). This makes using it a low barrier (boundary)
5. It is an elegant, efficient, flexible and powerful styling language (compare with, e.g. styling something in canvas)
6. It separates the concerns of style from structural markup (caveats!)
7. It gzips really nicely
8. It caches really nicely

...but

### ~~Large~~ Unplanned CSS can be UGLY! 👹

And wasteful. And confusing.

There are plenty of people willing to wail upon CSS, so I don't need to, but I remember when CSS was introduced; the initial party-like euphoria of having a way to separate style from markup (Separation of Concerns, good boundaries) and more granular style control... Pretty soon we all woke up to the hangover of giant CSS files and 10 part selectors. We started to notice that far from SoC, our CSS was actually mirroring the structure of our HTML. We lost sight of all those good points and flexibility and cried about all our headaches.

Nevertheless if we look closely, largely speaking all our problems - the hard bits of CSS - arise from the following 3 things (in descending order of impact):

1. All style declarations are in the same, global scope - there is are inherent boundaries
2. Browsers don't always play by the same rules - though, this is barely a consideration these days! Get orf me lawn!
3. Sometimes, the nuances of specificity can throw up some unexpected results. 🤔...

This first point is both a part of the genius of CSS and the foot-gun by which we can make our lives hard. It states that CSS is inherently a no boundary language - it gives the tools to shape our own boundaries - which makes it easy to use but also makes it easy to create a mess because there is no internal organizing factor.

The second point can be tricky across all the different devices and OSes, nevertheless, these days there is tooling like PostCSS that eases this greatly.

The third is actually very easy to work with; it is the domain specific language of CSS, and can be learned.

## The Taming of the void

I think it is fair to say that most subsequent innovations in CSS have been attempts to apply order to the chaos introduced by boundary-less global scope. Before CSS-in-JS these could roughly be split into 2 camps:

1. Frameworks
2. Conventions

### Frameworks

Frameworks like bootstrap, tailwind, Atomic CSS, etc are quite a bit more than just CSS, but we're only interested in their approach to CSS. Typically they all:

-   Take the stance that if you are just applying their class names and conventions, your CSS will be ordered and relatively small (caveats).
-   Embrace the global nature of CSS, by providing one well thought out, structured way of applying CSS (basically a convention).
-   Move the declarative nature of CSS to the HTML - accepting that people were not separating the concerns of markup and styling (pro and con).
-   Work on the principle that you have as much access to the HTML as the CSS.
-   Effectively solve the age old problem of naming.
-   Are seriously battle tested (addressing point 2 of the CSS hard bits).
-   Can abstract away some complexity by providing one approved way to apply CSS. This can make styles easier to reason about (point 3 above).
-   Can leverage tooling by limiting options

**Using the mental model**: frameworks create consistent boundaries and to CSS. This means they can solve the hard parts of working with CSS, but interestingly, by adding boundaries they also introduce the costs of crossing boundaries. A couple of examples are:

-   Complexity: while they clarify how we should use CSS, CSS is huge and flexible; so they either have to be equally large and flexible or be much reduced. Consequently complexity arises usually in one of 2 ways. Either they become complex themselves - e.g. their syntax becomes opaque, `<div class="Bgc(#0280ae.5) H(90px) D(ib)--sm W(25%)--sm"></div>` (an example from the Atomic CSS framework website). Alternatively they are too limited and mean that we also write CSS outside of their framework, which adds another boundary and complexity.
-   Unclear boundaries: ironically their clear rules can obscure other boundaries within their context - for me the most problematic thing with frameworks, albeit rather nuanced, is that they can engender a mental model where HTML and CSS are equally important; that it is okay to write HTML to fit the needs of the CSS classes that are needed rather than the need of the content. I understand that this is both opinion and not limited to frameworks; it is just something I see most often in codebases where these frameworks have been used.

#### Summary

Clearly frameworks successfully achieve the ordering of the CSS environment, nevertheless there are also reasons enough to make one want to search for another option.

### Conventions

The other option, Conventions, are kind of like a "Do It Yourself Framework". They can vary in their scope but they all represent an organizing principle that overlays boundaries on CSS. BEM for example is a way of marking boundaries through naming, while OOCSS outlines an entire philosophy of structure... and it can get pretty abstract.

#### Summary

Frameworks use and formalize one or more of these Conventions into tooling and code structure, while you may choose instead to do that work yourself.

## So what is IT(CSS)

Over time various Conventions arose and I think that I've tried most of them in one project or another. Eventually I even started introducing my own conventions. This search led me to ITCSS; arguably the Convention that most successfully harmonizes with CSS usage; it has a place for all of CSS without trying to change it, while providing mechanisms to avoid the pitfalls. It is quite easy to grasp, and promotes reuse and Separation of Concerns between presentation and content.

[ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/) <q cite="https://www.xfive.co/blog/</cite>itcss-scalable-maintainable-css-architecture/">stands for Inverted Triangle CSS and it helps you to organize your project CSS files in such a way that you can better deal with (not always easy-to-deal with) CSS specifics like global namespace, cascade and selectors specificity.</q>.

One of the key principles of ITCSS is that it distinguishes 7 types of CSS style and physically separates the CSS into sections (called layers). What the layers are is a little academic once you understand the principle, but the ones recommended in ITCSS are ordered from most general (wide, top of the inverted triangle) to most specific (sharp, bottom of the triangle).

![modified ITCSS from the ITCSS website](/assets/blog/tof/ITCSS.png)

My teams and I have used a reduced version of this very successfully for a few years. We have adjusted it and learned from using it. We've even managed some projects across multiple branding changes - one of the arguments for Separation of Concerns that is often rejected as not a real life scenario.

This is not an advert for ITCSS though it might seem it 🤨, rather the aim is to understand why it is successful. From the point of view of the boundary mental model, it is because it draws boundaries that aren't at odds with actual usage or unnatural to the domain. Consequently it feels as if it works in harmony with CSS, and existing ways of using it, not trying to change it. Furthermore, because of this, it isn't necessary to learn whole new syntaxes or frameworks.

Nevertheless, both the type of application we make and the tooling to make them are changing. There are new ways of writing CSS and new ways of constructing web apps... so how does all this history apply to modern web development?

## CSS-in-JS, a new kind of foot gun 🦶🔫

"CSS-in-JS" is a catch all term to describe a number of approaches to, what I think of as a natural evolution of CSS that was driven by 3 forces: tooling, pre/post processing and the move towards "componentising" UI such as React and Custom Components. The different CSS-in-JS libraries deal with this new way of creating content for the web in their own ways, but they all just new ways of solving the one problem - no internal boundaries in CSS. They use modern tooling and application structures to "name-space"/boundary styles to a specific "atom" of UI.

Some CSS purists would say that this is no different to name-spacing in BEM or one of the other Convention based approaches, but there are important differences:

-   We get real modules in CSS
-   Files are optimized for tooling
-   We get dynamic and conditional styles
-   We get an explicit relationship between "components" and their styles, which means no more "append only" stylesheets.

To put it another way, we get an explicit boundaries (modules) and a way to tie them to UI components so that styles across an application cannot clash.

Unfortunately it isn't all good news! Just as with previous attempts to "solve" CSS, this approach includes some sacrifices and some new costs with these new boundaries:

-   Loss of non-blocking, cacheable styles if JS is generating the CSS (or double loading CSS with Critical CSS)
-   A great deal of duplication because all components exist in their own boundaries (caveats)
-   On the fly CSS generation can be SLOW, especially in low end devices
-   New syntaxes to learn for CSS devs (boundaries)
-   Buy-in; once you start with one CSS-in-JS lib, it is hard to switch because of new syntax (boundaries) or mixing Components in component libraries.
-   Greater impact of mistakes. CSS is very forgiving of mistakes so errors in CSS files have low impact, but an error in a JS file can cause the application to error.
-   Ironically, treating components in isolation can lead to the need to override styles in Components (boundaries) - more on this in [part] 2](/TriangleOfForces-part2.md)

This whole discussion is nicely summed up by on twitter by @sanketsahu:
![Tweet by @sanketsahu:](/assets/blog/tof/sanketsahu.jpg)

## Stepping back a bit

Hopefully I've explained why I don't think there has yet been a perfect CSS alternative developed; there are almost always as many issues with the solutions to the problems of CSS development as there are benefits... sometimes more.

Historically, each time one of these (imperfect) solutions has arisen and its problems have been realized, someone has stepped back and put in place some conventions and tools to mitigate them. These adapted workflows tend not to be as elegantly simple as using one tool, but are practical and focus on using the new tool for what it is good at and using other tools where they are needed to make the best of all worlds. It is worth being practical and recognizing that while a set of pliers is an excellent tool, there may be a better tool for getting a screw to go into some wood; and that maybe you will need more than one tool if you want to build a house...

The most successful solutions, like ITCSS, maintain the philosophical consistency and boundaries of each tool in the toolbox so that they are easy to use and think about.

## Solutions, choices and considerations

Having stepped back and evaluated CSS-in-JS in context, it is easier to make decisions about which CSS-in-JS library is right for you and to realise some of the gaps in tooling that might make life easier.

### Which flavour? 🍦

The choice of CSS-in-JS will come with all its own boundaries and costs, and it should be evaluated for your use case. In my case, although it isn't particularly popular in React, I tend to favour [CSS modules](https://github.com/css-modules/css-modules). I do this having considered the costs because:

1. The development pattern is the same as CSS or SCSS, so there is a low barrier to onboard new devs. There is _some_ custom syntax (like `composes` and the scope syntax) and some best practice difference, but these are generally simplifications rather than complications.
2. The convention for CSS modules is to have a separate CSS file from the JS. The style classes are exposed as named exports from the module that can be imported into a JS file and used like a JS object. This means that CSS files can be worked without affecting the JS while still maintaining the explicit CSS dependency boundary relationship. Admittedly, one loses out on the convenience of the CSS actually being in the JS, but gain in simplicity for junior team members and fault isolation.

Other CSS-in-JS options provide other benefits, but by itself this one choice mitigates 3 of the issues we face with CSS-in-JS (syntax, fault isolation and buy-in), so from my point of view it makes sense.

CSS modules also allow "composition" of styles (from the same file and from other files). There are potential issues with composing styles from other Components because it breaks the boundaries of isolation/encapsulation, so we need to be considered in using this powerful feature - more on this later - but one can see that there are also options here to resolve another of the problems, code duplication.

### Pre-rendering 🚰

Another choice I favour for the purpose of improving performance and delivering the right CSS to a page in a cacheable way is to Server Side Render as much as possible; I choose [Gatsby](https://www.gatsbyjs.com/) for all the amazing benefits that it provides, but there are other options like Zeit's awesome [nextjs](https://nextjs.org/), that will take all the pain out of this process to the point that I will do this instead of using CreateReactApp to bootstrap React projects.

With these 2 choices, the only costs of using CSS-in-JS are the related costs of code duplication issue and isolation leading to needing to override styles issue. That may be enough for you, nevertheless, what I'm going to talk about is more of a holistic approach to the problems that have existed from the beginning and to try to learn the combined lessons of 20+ years of web development experience.

## ITCSS it again

I'm returning to ITCSS for its success in this area; given that it is one of the few options that don't create new problems, I hope to learn its lessons.

I've observed over time that the 7 "layers" or types of CSS in ITCSS fall fairly
neatly into 2 groups - the styles that one always has to write for every project
(like layouts, themes, etc), and the styles that are specific to implementation
(what is actually on the page). I've modified this diagram to reflect these:

![modified ITCSS from the ITCSS website](/assets/blog/tof/ITCSS.png)

Styles that always have to be set (in blue and white):

1. **Settings or Tokens** – may be used with preprocessors (like sass variables) and contain font, colors definitions, etc but not styles.
2. **Tools** – globally used mix-ins and functions. **Really only appropriate for preprocessors, frameworks, etc that have these concepts**
3. **Generic** – reset and/or normalize styles, etc. This is the first layer which generates actual styles.
4. **Elements** – styling for bare HTML tags (H1, A, etc.).
5. **Utilities** – utilities and helper classes with ability to **override anything which goes before in the triangle**, eg. a hide helper class

Implementation specific (in red):

6. **Objects** – class-based selectors which define **undecorated design patterns**, for example media object known from OOCSS
7. **Components** – specific UI components. This is where the majority of our work takes place and our UI components are often composed of Objects and Components

Of all the style types considered useful by ITCSS, it is only the
2 red layers, that are typically the main focus of CSS-in-JS solutions. Though this is changing, vis [theme ui](https://theme-ui.com/).

So, how do we cater for the more general styles that experience tells us most applications need?

## Theming

Some CSS-in-JS approaches have the concept of "themes". Themes are a set of shared styles that can be used throughout an application. So like the "Settings" layer in the figure above. Let's evaluate at 2 ways of providing a theme through the filter of boundaries; one CSS-in-JS solution and one adapted from the observations above.

### CSS-in-JS themes

Theming as solved by
[styled-components](https://styled-components.com/docs/advanced#theming) looks something
like this (though likely 2 files):

```js
// Define our button, but with the use of props.theme
const Button = styled.button`
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border-radius: 3px;

    /* Color the border and text with theme.main */
    color: ${(props) => props.theme.main};
    border: 2px solid ${(props) => props.theme.main};
`;

// Define the theme
const theme = {
    main: "mediumseagreen",
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

Immediately you can see the value in the Styled-Components' approach: CSS syntax
in Components; awesomely, you can apply different themes by wrapping in
different `ThemeProvider`s; the themes are nice and declarative... and more. So what are boundaries and what do they tell us?

1. There is a possible boundary between JS devs and CSS devs (it may depend on your team)
2. There is the JS/CSS language boundary
3. The JSX `<button>` and HTML `<button>` boundary (handled by React)
4. There is the `Button = styled.button`/JSX `<button>` boundary. Handled by
   Style-Components, this is a JSX `<button>` wrapped up with some styles and it
   has a controlled interface (way to cross the boundary) to receive some props
   for some values
5. There is the theme, which is a JS Object (has a boundary around it).
6. There is the portable, global boundary (`<ThemeProvider>` context) that
   passes the theme to anything within it.
7. There are the boundaries around each of the files in which these things live which is handled by either JS
   or tooling.
8. HTML/CSS/JS because JS is creating the CSS in this case.
9. We haven't even looked at Media Queries (but we do below)

At first glance these don't seem like real boundaries, so it is worth taking the time to reason through a couple. For example, the first boundary is a skillset/team boundary. This doesn't make sense unless you look at the files from the perspective of understanding and cognitive load. To a CSS dev, the majority of that
example is a mass of unknown with a bit of recognizable stuff in it. Whereas to
a React dev, the syntax is relatively obvious... except perhaps the template
string boundary around the CSS. The team boundary is quite big and potentially
costly, both in training and in possible mistakes (because JS isn't as forgiving
as CSS).

Another example from point 2; JS/CSS language is represented by that (initially) odd
template string tagged on the end of `styled.button`. The styled-components
solution for this boundary is quite nice because it is possible to quickly
encapsulate components/JSX with styles AND one can use CSS like syntax instead
of JS Object notation. Nevertheless there is still a context switch...

While the team boundary is costly in one set of tangible ways, the initial
cost this context switch (for a React dev) seems to be just a small effort to
understand some odd syntax. On closer inspection we can see that each time we
write CSS and use the theme, or add to the theme we are doing multiple language
switches. For example, while the CSS in the template string uses CSS syntax, the
theme is JS object notation. So there is a cognitive switch within single lines of code
where one is writing CSS, then switching to JS to insert a theme style and then
back to CSS and then back to React... This is like changing lanes on the
Motorway, initially it is scary, then it seems easy, but that belies the fact
that most accidents happen during the lane change.

Finally, it is worth talking briefly about points 3, 4 and 8 because these are
representative of the type of costs of crossing boundaries that are moved, but not paid, by
tooling/libraries. React makes it very easy to write HTML style markup and
Componentize code, VDOM, etc. Tons of value, but the cost is a minimum bundle
size (minified and gzipped) of > 30K. To put this into context
[Addy Osmani](https://v8.dev/blog/cost-of-javascript-2019) recommends

> "Avoid having just a single large bundle; if a bundle exceeds ~50–100 kB,
> split it up into separate smaller bundles"

If you then add the extra
[size of Styled-Components](https://github.com/styled-components/styled-components/issues/748)
and the CSS that it has to turn into CSS...

The cost is transferred from the developer to the user... and that is only for the Settings layer. The irony is that **it would be easier and less costly to do in plain old CSS**.

This last point that led me to this simple thesis: leverage CSS for what CSS does well and CSS-in-JS for what it does well while protecting the fundamental philosophies and boundaries of each. Basically use the existing boundaries around those 2 types of style. I rather pompously call it the "Triangle of Forces", which represents 3 forces in balance, because it is heavily inspired by ITCSS's layers, it uses CSS-in-JS and it proposes some new conventions for using CSS-in-JS.

## Enter the Triangle of forces 🔻

On the face of it ToF is a split in the styles of an application or website, where there are some styles that are relatively static and get used across projects and some that are specific to implementation. In the figure above, the stronger the colour the more changeable the layer, especially across projects.

The 5 ITCSS layers I highlight above as "Styles that always have to be set" tend to become almost static across projects once they have been setup for one project, except for the settings layer, which changes the values that all the other styles use. Largely speaking I consider all but 2 of these 5 layers to be optional, they are marked with blue. I treat these styles as plain old CSS; they are output as normal CSS files and imported in such a way that they can be loaded as CSS and cached as CSS.

### Settings/Design Tokens

The Settings layer is like the theme object in
Styled-Components except that it is written in CSS and is therefore global - there are no ThemeProviders, no imports, no boundaries and no costs... This is safe because we are not declaring styles. This is the only place that this type of CSS variable is declared
in your application - a boundary by convention.

This is comprised of a structured list of CSS variables (custom
properties). CSS variables are perfect for this use case because they are
scoped, accessible to JS if necessary and respond to context e.g. media queries. I have found
that once set up the actual variables settle down to a consistent set that will be used in all your projects and only the values
change.

I recommend using a couple of conventions:

1. Set up some variable prefixes that identify what the setting sets, e.g.
   `--t-body`; `--c-brand1`; `--s-3`; or you could be more explicit to avoid the
   issues of obtuse syntaxes, e.g. `--text-body`, `--color-brand1`,
   `--space-3x`.
2. Be as explicit as you can with what these are set to, to the point of making
   a named variable to set the token to. This works very well in sass because
   you can do `--c-brand1: #{$bright-red};`, but equally you can do
   `--c-brand1: var(--bright-red);`.
3. Organize your tokens logically - e.g. put colours together, put types
   together, etc
4. Have a token/setting for every theme part you need to set, e.g. some elements, like buttons will have multiple
   settings (border, background, etc) and then have hover, focus, etc states for
   each of those multiple settings too.

These conventions are to address the potential pitfalls of having opaque
variable names and the inherent problem of having a long list of things that
need to be remembered.

### Generic & Elements

Modern day browsers are much more consistent than they used to be, so reset
stylesheets are less "necessary", but there is still the need for a place to put
them. I tend to merge my Generic and Element layers for simplicity. This along
with the "settings" layer are the key areas where we can leverage CSS with a
light touch, without breaking the principles of the approach and simultaneously
overcome the limitations of CSS-in-JS.

I use this layer to apply the "theme" set up in "Settings" on to bare HTML
elements, e.g.

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

Lastly a quick word about Utility classes.

### Utilities (optional)

These are useful classes that one uses a lot, such as `.screenReaderOnly`.
Ideally there are not too many of these because, by their nature they need to be
rule breakers; they need to override other styles. I tend to make this a CSS
module file and `composes` these classes into my components because the
assumption is that my application follows these conventions, but it is not necessary to do so. One
could even use an entire CSS utility library here if one wanted... best not though eh?

### What that looks like

"Settings" and "Elements" files might look something like this:

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

You would use these theme members initially in the "Elements" CSS file to construct a general theme that sets up consistent regular rules, and you
would also use them in your Components.

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

Notice the `:root {}` pseudo-class, it matches the `<html>` element, so all
variables declared in there are scoped to the html tag and its descendants - i.e. globally.

Whether the above looks like a good solution or not, let's examine it by
outlining the boundaries:

1. There is the possible JS/CSS team member boundary as above
2. The `:root {}` - global scope.
3. The files, there are 3 files; 2 CSS and 1 JS.
4. The CSS/JS boundary, unlike above, these are kept separate
5. As above, there is the JSX `<button>`/HTML `<button>` boundary
6. Media Queries.

An interesting thing about these boundaries (number 5 notwithstanding) is that
they don't cross, but sit adjacent and consequently have no cost (apart from
point 5, which is the cost of running React). That said, we still have a
**globally scoped CSS**, albeit controlled by convention.

So the costs of the TOF solution are much lower. This is not a reflection on the
excellent Styled-Components library, but rather an indication of the complexity
of the problem. Styled-Components solves the main issue of global scope, whereas the CSS solution rather "controls" it. Nevertheless it is
clearly a much simpler solution. Notably we don't have a cost for team members and CSS errors remain css errors, not application bugs.

The question is only whether the costs and complexity are worth the the
solution, which they may be in your case. In my case it is much harder to
justify those costs, and that is why I decided to approach the problem in this
way.

## Localized themes

One final note about this approach is that we can create locally scoped themes
in harmony both with CSS and with a boundaried, component based application. The
css variables we saw above were all scoped to the `:root` element, but actually
you can scope them to any css selector. In this way you can make any number of
themes for different boundaries in your application.

```css
.myComponent {
    --color: green;
    --background: black;
    --spacing: 0 var(--s-1);
}

/* now any child of myCompnent can use those theme variables */
.childOfMyComponent {
    color: var(--color);
    background: var(--background);
    margin: var(spacing);
}
```

Interestingly, this moves the styles in components more towards the OOCSS
approach without the cognitive overhead. This becomes extremely powerful
([as you can see in part 2 of this series](/blog/TriangleOfFOrces2)) when
combined with Componentized UI.

## Summary

There have been many ways of approaching styling on the web and I think it is
fair to say that they all have their good points and often
just as many bad points. This is as true of modern CSS-in-JS approaches as of
the dinosaurs of the CSS world. In my estimation, the best solutions work with CSS,
rather than cut across - we can come up with solutions that are better than just
gritting our teeth and trying to hammer a screw in with some pliers. The solution presented here is not the only working solution; the important thing is that we understand the boundaries that our decision impose upon us and the costs that we will pay for them.

## Further reading

<https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/>
<https://medium.com/dailyjs/what-is-actually-css-in-js-f2f529a2757>
<https://gist.github.com/threepointone/731b0c47e78d8350ae4e105c1a83867d>
<https://medium.com/free-code-camp/the-tradeoffs-of-css-in-js-bee5cf926fdb>
<https://mxb.dev/blog/the-css-mindset/> <https://mxstbr.com/thoughts/css-in-js>
<https://css-tricks.com/bridging-the-gap-between-css-and-javascript-css-in-js/>
<https://css-tricks.com/bridging-the-gap-between-css-and-javascript-css-modules-postcss-and-the-future-of-css/>
<https://css-tricks.com/css-modules-part-1-need/>
<https://jxnblk.com/blog/two-steps-forward/>
<https://css-tricks.com/breaking-css-custom-properties-out-of-root-might-be-a-good-idea/>
