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
https://medium.com/free-code-camp/the-tradeoffs-of-css-in-js-bee5cf926fdb
https://mxb.dev/blog/the-css-mindset/
https://mxstbr.com/thoughts/css-in-js
https://css-tricks.com/bridging-the-gap-between-css-and-javascript-css-in-js/
https://css-tricks.com/bridging-the-gap-between-css-and-javascript-css-modules-postcss-and-the-future-of-css/
https://css-tricks.com/css-modules-part-1-need/
