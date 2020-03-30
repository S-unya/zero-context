# Creating re-usable Components by standing on the shoulders of giants

This set of observations is conceptually a part 2 to the [Triangle of Forces](/TriangleOfForces) observations.

One of the things that the approach of "drawing boundaries" has highlighted to me is that there are also **boundaries within our applications**, and being clear about these boundaries can help make components much more reusable.

Before we start I'd like to say that the choice is to use CSS modules for styling, but that doesn't rule out other choices, as long as you understand the boundaries that we are drawing. It even doesn't matter if you not using React, because the concepts are pertinent across the board.

## The proplem

The problem we are trying to solve is how to create Components, or pieces of UI, that we can use in multiple situations, while at the same time not making them so abstract that they are hard to use.

I'd like to user a real world situation to give us a way into this quite nuanced problem and I'm going to try approach this without the benefit of experience and just take it step by step. Hopefully by the end of this, you will have a few simple mental models and rules of thumb that will allow you to shortcut most or all of thes steps.

### First designs

These are some designs that we have been given:

![Vertical list of cards](/static/assets/TOF/card-vertical-list.png)

They show a couple of variants of a Card "content item displayed as a list". The "event" items on the left seem to have an icon and a possible "Sold Out" in the "taxonomy" area. Also the structure and weighting of the content in the card "meta-data" area.

Spend a little time and think about how you would build a/some component/s that caters for these 2 use cases.

### First go at making the UI

As we've disccused elsewhere (@todo #2: Add link here), the first step in making a Component is just making it without too much concern about optimising or re-usability.

```js
// ContentCard.jsx
import React from "react";
import styles from "./ContentCard.module.css";

export const ContentCard = ({
  uri,
  imageSrc,
  imageAlt,
  heading,
  taxonomy,
  published,
  citation
}) => {
  return (
    <article className={styles.component}>
      <a href={uri} className={styles.link}>
        <figure className={styles.imageWrap}>
          <img alt={imageAlt} src={imageSrc} className={styles.image} />
        </figure>
        <div className={styles.contentWrap}>
          <header className={styles.header}>
            <p className={styles.taxonomy}>{taxonomy}</p>
            <h3>{heading}</h3>
          </header>
          <p className={styles.info}>
            <span className={styles.published}>{published}</span> /{" "}
            <span className={styles.citation}>{citation}</span>
          </p>
        </div>
      </a>
    </article>
  );
};
```

There are lots of things wrong with this (admittedly naive) first try at the Component, but sometimes it is the right thing to start simple and make mistakes. That said it also has some "good" ideas. Such as the image makes sure that there is an `alt` attribute...

In terms of boundaries, everything is within the one Component and styles are in their own file (though you might use a different CSS-in-JS solution). The component controls its interfaceAs for the so that it knows where to put content and how to style it, but content comes from a wrapping context; perhaps where the API query for the data lives.

As for the styling, we are going to assume that we have a theme setup as described in part 1. I also want to stress that I am not going to make the full stylesheet here so as to keep things simple, so there will be incomplete implementations of the design.

```css
/** ContentCard.module.css **/

.component {
  /* This is actually an object famously described by OOCSS, so this component can map to that perfectly */
  position: relative;
  padding: calc(var(--s-1) * 1.5) 0;
  border-bottom: 1px solid var(--c-gray-500);
}

.link {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  color: var(--c-body);
  text-decoration: none;
}

.imageWrap {
  width: 10.625rem;
  height: 6rem;
}

.contentWrap {
  flex: 1;
  align-self: stretch;
  margin-left: var(--s-2);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: max-content 1fr max-content;
}

.image {
  width: 100%;
  max-height: 100%;
  object-fit: cover;
}

.metaText {
  font-family: var(--font-family-1);
  font-size: var(--t-body-xs);
}

.taxonomy {
  margin: 0 0 var(--s-1);
  text-transform: uppercase;
  font-weight: var(--tw-bold);
  composes: metaText;
}

.heading {
  font-size: var(--t-body-m);
  font-family: var(--font-family-2);
  font-weight: var(--tw-m);
  line-height: 1.3em;
  margin-bottom: 0;
}

.info {
  align-self: flex-end;
  composes: metaText;
  margin-bottom: 0;
}
```

This results in:

![CardContent](/static/assets/TOF/card-content.png)

Ignoring the fine details, this includes the specifics of the layout and spacing and the bottom border on each content card, along with placeholder fonts...

## Making cards reusable by understanding their boundaries

### The school of hard knocks

We are happily implementing these cards in the lists when we get get the rest of the designs for the card:

![CardContent](/static/assets/TOF/card-content-variants.png)

Looking at these new designs, we can see that these cards display in some very different ways; we have at least 2 new layouts and multiple variations of spacing and borders.

Spend a little time considering what you might do.

The most common thing would be to start adding styles or JS logic to cater for all of these situations. To illustrate this, let's look at the simplest scenario, the small screen layout.

First, how does it currently adapt in size?

<img src="/static/assets/TOF/card-content-unchanged-small.png" alt="Card Content in a small context" width="224px" />

Easy fix! Just add some rules allow it to wrap in flex - we aren't even going to need a media query!

```css
/* ContentCard.module.css */

.link {
  display: flex;
  /* Just allow wrapping in the link */
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-start;
  ...;
}

.contentWrap {
  flex: 1;
  align-self: stretch;
  margin-left: var(--s-2);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: max-content 1fr max-content;
  /* and add a min-width here... */
  min-width: 170px;
}
```

Which results in...

<img src="/static/assets/TOF/card-content-changed-small.png" alt="Adjusted Card Content in a small context" width="224px" />

Not quite. How are we going to take that margin off the left of the content and put spacing around the image? Maybe we do need a media query after all? But then how are we going to get those other layouts similar to this but on larger screens?

### Learning a lesson in boundaries

Hopefully I have illustrated the kind of panic that can be induced by this type of dilemma. Hopefully I have also shown that just piling on more code to cover all the options will just become messy quickly.

This is an exemplary situation for the usefulness of drawing boundaries. If we know where the boundaries are, we know where responsibility lies and we know how to shape our code.

For the purposes of this example, there are 3 types of boundary:

1. A layout context
2. A UI element
3. A UI element's contents

Let's list out the first 2

#### Layout contexts

1. "Normal" - as they appear in our first designs - this is how the card "naturally flows.
2. "Vertical" - as they appear in contrained space, whether due to screen width or display context
3. "Hero" - as per the first item in the "Dynamic grid" - this gives precendence to the image, but the flow is quite similar to the "Normal"... and one expects from these designs that the behaviour is the same as "Normal" on smaller screens.
4. Vertical list
5. Horizontal list
6. Hero list

Notice that there are 2 distinct types of layout context, the layout of the card's elements and the way the cards are layed out?

#### UI Elements

We have already done this work, when we made our first example though we may not have been conscious of it. This is a good time to also consider conceptual, design, hierarchical and semantic boundaries that abound (sorry) in this part of an application. Each of these boundaries serves a function, such as accessibility, look and feel, etc. Sometimes these boundaries are at odds with each other, such as when a design shows a tiny heading to a page, or where there is a conceptual boundary that is not semantic, whereas some boundaries such as hierarchy and semantics cooperate to the point of being symbiotic. It is good to be clear about **which of these is most important to your use case** - in my opinion it is invariably semantics and hierarchy for the value they add.

1.  The wrapping element - an `<article>` makes a good, semantic option
2.  A link - an `<a>` anchor element is the semantic tag for hyperlinking
3.  An image - we chose to semantically wrap the image in a `<figure>`, which gives us a new, conceptual boundary:
4.  An area concerned with media
5.  To which we could add another concept, an area concerned with textual content; in our case a `<div>`
6.  Taxonomy - we chose a simple, semantic text element, `<p>`
7.  Article heading - the heading hierarchy in HTML is well defined and important for screen reader users, who can use them to navigate the page. It is very hard to make a re-usable component that has a defined heading in, but we had a stab at guessing the hierarchy with `<h3>`
8.  In all the designs, there is a hierarchical boundary between the heading plus taxonomy and the meta text below - in HTML there is the structural element `<header>` for this.
9.  The meta information - this is one of the areas of the design that changes the most. Earlier we chose to use a `<p>` to identify this area, but actually, as the text doesn't really form a coherent sentence or paragraph, it would probably be better to just use a semantically neutral `<div>`
10. Variously we ahve a published date (`<time>`), an author (`<span>`) and a location (`<address>`)

As an aside [schema.org](https://schema.org/Article) has some further data that we can add to this to make it more consumable by search engines...

Now that we have clear boundaries, 10 UI and 6 layout contexts, it is easier to see why piling on more code jsut gets messy!

### Assigning responsibility

Once we are clear of the boundaries, it is time to examine the responsibilites and how they relate. As there are so many combinations here, we'll have to limit this a bit to some exemplary ones so that the concepts can be extrapolated.

#### Dealing out the cards :spades: :hearts: :diamonds: :clubs:

Let's look at the layout boundaries first. We have apparently 3 ways that cards can relate to each other in a layout; vertical lists, horizontal lists and hero lists (which is like a horizontal list with a twist). Each of these layouts starts off as a vertical list.

Now is it the Card's responisbility to know to layout vertically or horizontally, or is it the component that is outputting the cards? _I think that it is not hard to see that the card cannot layout other cards, so it makes sense for the parent to take responsibility for laying out the cards_.

Hopefully there are those among you immediately asking "what about spacing"? Many people would likely put a margin right and bottom on the cards and then do whatever they needed to do to then swallow that margin for the ends of rows, etc... Once we have done this, however, we end up with a card that can't be used in each of our other layout contexts because they will have different whitespace needs. In fact, when we consider this problem from the point of view of the boundary, _it is hard to to see why the cards should be responsible for this when we already know that the parent is responsible for layout_, of which this is an integral part... and once we move this spacing to our layout context, the cards can be used as is in all our layout contexts!

So we can extrapolate 2 rules for one of our types of layout context:

1. The layout context is responsible for the laying out of its content
2. The white space in the layout context is part of that responsibility

Luckily, CSS grid and flex are amazing for giving us this layout control from the parent (flex to a slightly lesser degree because of the lack of fixed spacing).

### Them's the cards :diamonds:

Now let us look at the layouts of the cards themselves; to understand the layout, we also need to look at the UI elements and the content that sits in them. 3 sets of boundaries...

It is probably intuitive to understand that a component is responsible for its own styles. indeed that is the entire premise of CSS-in-JS! So it makes sense that the component lays itself out... or does it? Looking closely at the design, we can see that the taxonomy content changes quite a lot, we can see that sometimes there is a "locked" status and we can see that sometimes the cards are arbitrarily horizontally aligned and some times vertically - I'm thinking of the "hero" card.

We can understand something about the responsibilities here if we examine the flow of information - what "knows" what? In the case of the taxonomy content, the schema of data that is being displayed is different and where this schema is understood is the component that fetches and formats the data...

In the case of the locked status, again this is data passed

In the case of the "hero" component, it would seem like the wrapping componet is treating the first element in the data as different. This means that the wrapping component understands something about the data that is opaque to the card.

```js
// ContentCard.jsx
import React from "react";
import cx from "classnames";

import styles from "./ContentCard.module.css";

export const CardImage = ({ className, uri, alt, ...rest }) => (
  <figure className={cx(className, styles.imageWrap)}>
    <img alt={alt} src={uri} className={styles.image} {...rest} />
  </figure>
);
export const CardTitle = ({ className, text, ...rest }) => (
  <header className={cx(className, styles.header)} {...rest}>
    <h3>{text}</h3>
  </header>
);
export const CardTaxonomy = ({ className, text, ...rest }) => (
  <p className={cx(className, styles.taxonomy)}>{text}</p>
);

export const ContentCard = ({ className, children, uri, ...rest }) => {
  return (
    <article className={cx(className, styles.component)} {...rest}>
      <a href={uri} className={styles.link}>
        {children}
      </a>
    </article>
  );
};
```

```javascript
// NewList.jsx
import React from "react";
import cx from "classnames";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { ContentCard, CardTaxonomy, CardTitle, CardImage } from "./ContentCard";
import styles from "./NewsList.module.css";

const NEWS_QUERY = gql`
  {
    listNewsItems {
      results {
        title
        taxonomy
        status
        pageLink
        publishedDate
        primaryImage {
          imagePath
          imageDescription
        }
        author {
          id
          name
        }
      }
    }
  }
`;

export const NewList = ({ className, ...rest }) => {
  const { data, loading, error } = useQuery(NEWS_QUERY);

  return (
    <div className={cx(className, styles.widget)} {...rest}>
      {loading ? (
        <p className={styles.loading}>Loading...</p>
      ) : data ? (
        data.listNewsItems.results.map(news => (
          <ContentCard>
            <CardImage
              alt={news.primaryImage.imageDescription}
              uri={news.primaryImage.imagePath}
            />
          </ContentCard>
        ))
      ) : error ? (
        <ErrorMessage />
      ) : null}
    </div>
  );
};
```
