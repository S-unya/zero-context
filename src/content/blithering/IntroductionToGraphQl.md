---
title: An introduction to the GraphQL puzzle
description: An overview of the pieces of the GraphQL architecture; introducing each piece and where it fits in the puzzle and how the pieces work together.
headerImage: ../../assets/headers/tree-lines.png
created: "2020-05-24T09:54:57.397Z"
pubDate: "2020-05-24T16:38:49.518Z"
author: "Śūnya"
image:
    src: "./headers/tree-lines.png"
    alt: "A line of trees above a river"
    aspectRatio: "16:9"
    width: 4032
    height: 2268
tags: ["GraphQL", "Architecture", "Schema", "Resolver", "Query", "Mutation", "Subscription"]
draft: true
---

The intention of this series of articles is to take a high level overview the puzzle pieces of the GraphQL architecture; introducing each piece and where it fits in the puzzle and how the pieces work together. This seems necessary because GraphQL is not a single thing or a single piece of technology, rather it spans the full stack and can be implemented in many different ways

## What is GraphQL

Technically, GraphQL is a specification for a "query Language" designed to query (and mutate) "graphs" of data... aaand unpacking that...

**A "specification"** is a description of something (like the WC3 specification for HTML or CSS), as distinct from the implementations of that thing (like the various browser implementations of HTML/CSS).

**A "graph"** of data is fundamentally a set of data that has **a defined relationship**; graphs are a Computer Science term for a data structure made up of "nodes" (or "points" or "vertices") and the connections between them, "links" (or "edges" or "lines" or "arrows"). This means that the data connections (relationships) are part of the data and not added on through things like foreign keys, etc.

So we can say that **GraphQL is a language specification for querying and mutating data with and from their relationships.**

In practice however, it is a bit more than that. On the one hand it is a query language. On the other it is a language for describing those graphs (GraphQL schema). And on the third hand, it is a architectural pattern to allow the schema to remain absolutely agnostic to the origin and shape of the original data (the resolver pattern).

These 3 things make up the "pieces" of a GraphQL system regardless of the rest of the system. This series is about an overview of each and how it works with the others. It will be as example laden as possible to illustrate the terms and ideas.

First up Schema because it sits in the middle of the architecture and underpins the other parts.

## Schema

The Schema in a GraphQL API is designed to be an "expressive shared language" between all parts of your stack and as such,
the GraphQL Schema language has been specifically designed to describe data - specifically, graphs of data. It has a really small but flexible syntax, with only a few very simple data types - called Scalar types.

1. **Int**: A signed 32‐bit integer, e.g. `10`, `1000`, `26`, etc
2. **Float**: A signed double-precision floating-point value, e.g. `3.14159`
3. **String**: A UTF‐8 character sequence, e.g. `hello`, `world`
4. **Boolean**: true or false.
5. **ID**: The ID scalar type represents a unique identifier. It is similar to an string, but intended to be unique.

and 2 main structural types:

1. **list** and
2. **object**

Combined, these allow us to describe most structures of data. For the few situations where these are insufficient (e.g. Dates), it is usually possible to declare custom data types. There _are_ some other scalars and structural types (some of which we'll cover below) but these ones do the bulk of the work.

To see what this looks like, let's make a `Person` in GraphQL schema.

```gql
type Person {
    id: ID!
    name: String
    age: Int
    hobbies: [String]
}
```

Firstly we declare a new `type` and name it `Person`. The most fundamental components of a schema are **object** types, which describe a number of related fields that you can fetch from your API - this is a small graph. Our `Person` is an object with a `name`, `age` and some `hobbies`... The `name` is a string, as you might expect, and age is a number (`Int`) as you might expect. For `hobbies`, we wanted to allow our `Person` to be passionate about more than one thing, so we allow them to have more than one hobby `String` by using the **list** structure.

In Schema language everything is optional unless we specifically say it is required and so far we have not required the people of our system to have names, hobbies or even an age, but because we want each `Person` that we create to be uniquely identifiable, we use the built in `ID` type to describe a unique identifier, and we indicate that this is required with a `!`.

So you can see that we can achieve a lot with relatively simple set of "scalar" types. So far this is not much different from a `Person` table in a database... but as the people in our system tend to be very outgoing, they make a lot of friends from different neighbourhoods.

```gql
type Person {
    id: ID!
    name: String
    age: Int
    hobbies: [String]
    friends: [Person]
}
```

Now we can see the power of graphs, because that list of `Person` types doesn't just reference a `Person.id` as a foreign key, but a "link" to the actual `Person` data nodes.

Even more, if we add an `Address` type, we can see how we can quickly describe quite complex data and their relationships:

```gql
type Person {
    id: ID!
    name: String
    age: Int
    hobbies: [String]
    friends: [Person]
    address: [Address]
}

<!-- Declare a completely custom scalar (that our system must implement) -->
scalar AddressUnit
type Address {
    id: ID!
    unitNameOrNumber: AddressUnit
    streetName: String
    city: String
    neighbourhood: Neighbourhood!
    location: LatLong!
    country: Country
}

type Neighbourhood {
    id: ID!
    name: String
    boundary: GeoShape!
}

type GeoShape {
    id: ID!
    points: [LatLong!]!
}

type LatLong {
    id: ID!
    lat: Float!
    long: Float!
}

enum Country {
    NEVERLAND
    OZ
    ETERNIA
}
```

There are a few interesting things to note in these new descriptions of data relationships. We have a described some complex relationships and also introduced a couple of new types.

The first new type is the `Address` type's `unitNameOrNumber` field; the `AddressUnit` is a new `scalar` that can be either a `String` or an `Int`. GraphQL doesn't [currently support scalar union types](https://github.com/facebook/graphql/issues/215), but with custom scalars, essentially it is up to the implementation how this is validated.

Another way to allow different values for a field, but limit it to a limited set of values is to use the `enum` (enumeration) type, like the `Country` enum type. Enums allow you to:

1. Validate any arguments of this type
2. Communicate that a field will always be one of these values and nothing else

The final thing of interest to note is the type declaration for the `points` field in the `GeoShape` type, `[LatLong!]!`. The `!` tells us that the value is required or cannot be `null`, but here we are saying that the field must always have a list, which can be empty but none of the values in the list can be `null`.

That is pretty much it for describing data shapes and relationships; there is one more utility that can help describe data shape expectations - the `interface`. Interfaces are ubiquitous in strongly typed languages, but in GraphQL Schema language, they might be a little confusing.

## Implementation details

Interfaces are a way of describing the shape of something without describing the thing itself - like describing a car by saying "it has 4 wheels, an engine, no more than 6 seats and some windows', we can make look at a Tesla, and a Ferrari and agree that both fit that description even thought we haven't described the actual, "concrete" cars themselves.

Interfaces are called "abstract" because they are not used directly, rather we use them to make sure that "concrete" types fit the description, or interface described. When this happens, we say that the concrete type "implements" the interface. As an example, let's say that we have a number of different peoples of our lands. Let's convert our `Person` type into an `interface` and make some more specific, concrete people `types`.

```gql
interface Person {
    id: ID!
    age: Int
    name: String
    hobbies: [String]
    friends: [Person]
    address: [Address]
}

type Human implements Person {
    eyeColour: String
    friends: [Person]
    id: ID!
    age: Int
    name: String
    hobbies: [String]
    address: [Address]
}

type Tree implements Person {
    evergreen: Boolean
    id: ID!
    age: Int
    name: String
    hobbies: [String]
    friends: [Person]
    address: [Address]
}

type Jellyfish implements Person {
    symbiotes: [Person!]
    id: ID!
    age: Int
    name: String
    hobbies: [String]
    friends: [Person]
    address: [Address]
}
```

With the above code, we can ensure all the fields in the `Person` interface are in our "concrete" type's declaration by telling the Schema that the type `implements Person`; anything that we add to the concrete type's declaration is additional to the fields in `Person` - e.g. the `Human` type also has a `eyeColour` field.

There are other benefits to using `interfaces` that we'll cover in Part 2, GraphQL, Say what? Queries and Mutations.

## Describing data summary

The Schema language gives us a powerful way to both describe data and to describe the relationships in the data. This was an overview of the most commonly useful parts of the language, but it was by no means exhaustive.

As an interesting exercise to embed some of these concepts, you could try making some types for the people and characters of the Lord of the Rings universe, or the Marvel

## Further reading

-   [GraphQL.org's amazing reference](https://graphql.org/learn/)
-   [How to GraphQL](https://www.howtographql.com/)
-   [Tutorials point article](https://www.tutorialspoint.com/graphql/graphql_introduction.htm)
-   [GraphQL.com's tutorial](https://www.graphql.com/tutorials/)
