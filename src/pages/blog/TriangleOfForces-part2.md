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
          <p className={styles.taxonomy}>{taxonomy}</p>
          <header className={styles.header}>
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

Ignoring the fine details, this includes the specifics of the layout and spacing and the bottom border on each content card, along with placeholder fonts... We are happily implementing this in the lists when we get get the rest of the designs for the card:

![CardContent](/static/assets/TOF/card-content-variants.png)

Looking at these new designs, we can see that these cards display in some very different ways; we have at least 2 new layouts and multiple variations of spacing and borders.

Spend a little time considering what you might do.

The most common thing would be to start adding styles or JS logic to cater for all of these situations. To illustrate this, let's look at the simplest scenario, the small screen layout.

First, what does it curretnly do?

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

Not quite. How are we going to take that margin off the left of the content and put spacing around the image? Maybe we do need a media query? But then how are we going to get those other layouts similar to this but on larger screens?

Hopefully I have illustrated the kind of panic that can be induced by this type of dilemma. Hopefully I have also shown that just adding more code to cover all the options will just become messy quickly.

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

#### UI Elements

We have already done this work, when we tried to make our first example.

1.

Well the first thing to do is step away from the keyboard and stop adding even more styles to the fray!

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
