---
title: An introduction to GraphQl
date: 2020-05-04
headerImage: ../../assets/headers/tree-lines.png
---

In this exposition I hope to outline the general shape of the "pieces" of GraphQl, but I will deliberately steer clear of particular technological implementations of it. I will touch on the benefits, but the aim here is simply to orient a developer to how the various pieces work together and where they will be coding in that jigsaw.

## What is it?

GraphQl is a specification for a "query Language" designed to query "graphs" of data... coff... unpacking that... So the fact that it is a specification (like HTML or CSS is a specification), rather than an implementation is that there are a number of implementations of the specification (like the various browser implementations of HTML/CSS) - this is partially why I'm not talking about specific technologies. A "graph" of data is fundamentally a set of data that has a defined relationship; graphs are a Computer Science term for a data structure made up of "nodes" (or "points" or "vertices") and the connections between them, "links" (or "edges" or "lines" or "arrows"). This means that the data connections are inherent to the data and not inferred through things like foreign keys, etc. So, GraphQl is a language specification for querying data with and from these relationships.

In practice it is a bit more than that. On the one hand it is a language and mechanism for querying and mutating those graphs (GraphQl queries and mutations). On the other it is a language and mechanism for describing those graphs (GraphQl schema). And on yet the other hand, it is a pattern to allow the schema to remain absolutely agnostic to the origin and shape of the original data (the resolver pattern).

These 3 things make up the "pieces" of GraphQl and we will look at each in turn and what each means.

- Tools for introspection
- Mecanism for describing graphs
- Mechanism for querying those graphs

interesting thing about GraphQl is that it doesn't care what or where the original data comes from, just that it fulfills the promise of your API's schema by the time it is processed by the GraphQl implementation.
