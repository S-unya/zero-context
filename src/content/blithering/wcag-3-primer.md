---
title: WCAG 3.0 - Direction of Travel for Designers and Developers
description: WCAG 3.0 is still in draft, but we can see the direction of travel, and it looks good
created: "2026-05-18T18:35:00.000Z"
pubDate: "2026-05-18T18:35:00.000Z"
author: "Śūnya"
image:
    src: "./headers/old-van-cab.jpg"
    alt: "An abandoned 1950s era van cabin, viewed through the passenger window"
    aspectRatio: "16:9"
    width: 4032
    height: 2268
tags: ["Accessibility", "POUR"]
---

## Introduction

WCAG 3.0 (W3C Accessibility Guidelines 3.0) points toward a broader and more flexible model for accessibility guidance. If you've been working with WCAG 2.x, the current drafts can feel both promising and disorienting: some themes are clear, while important details remain unsettled. This primer focuses on that direction of travel and what it means for day-to-day design and development work.

Before we proceed, it's worth anchoring ourselves in the principle that should guide all accessibility work: "Nothing about us without us." These guidelines are tools to help you build more inclusive experiences. They are not, and cannot be, a substitute for meaningfully involving people with disabilities throughout your design and development process.

## What's changing?

The transition from WCAG 2.x to 3.0 touches nearly every aspect of how we conceptualise, implement, and evaluate accessibility. The important thing to keep in mind is that WCAG 3 remains a draft: treat it as a signal of direction, not a fixed target.

### Success criteria become a broader set of requirements

WCAG 2.2 operates through success criteria: binary pass/fail checkpoints that admit no middle ground. You either achieve sufficient colour contrast or you don't. You either provide alt text or you don't. A single failure, regardless of context or severity, means a failure.

Current WCAG 3 drafts reorganise the guidance around **guidelines**, **requirements**, **assertions**, and **methods**. Guidelines are written as outcome statements, while requirements carry more specific, testable expectations. The shift reframes compliance: less as a flat list of checkpoints, more as a system intended to reflect whether people can actually use the content or product.

For practitioners, that suggests greater emphasis on judgement, context, and evidence of real usability alongside technical conformance.

### A, AA, AAA give way to a different conformance approach

The familiar A, AA, AAA levels are expected to give way to a different conformance model. Current drafts discuss **Bronze**, **Silver**, and **Gold**, alongside **Core Requirements**, **Supplemental Requirements**, and **Assertions**.

Exactly how those higher levels will be measured remains unsettled — W3C drafts discuss scoring possibilities ranging from points and percentages to predefined sets of provisions.

The direction of travel is clear even if the mechanics are not: WCAG 3 is trying to describe accessibility in a way that better reflects the overall experience for users, rather than reducing everything to a single pass/fail outcome.

In practice, teams should prepare for conformance claims to become more descriptive and more explicit about scope, tested experience, and supporting evidence.

### Scope broadens beyond traditional web pages

Perhaps the most practically significant change is the broadened scope. Where WCAG 2.x was clearly web-centric, current W3C material explicitly frames WCAG 3 as guidance for web content, native mobile apps, publishing workflows, multi-platform tools, and emerging technologies — XR, voice interfaces, and whatever comes after them.

The practical implication is that accessibility work increasingly needs to be consistent across systems, channels, and product surfaces, not treated as a web-only concern.

## The new structure

Understanding WCAG 3.0 requires grasping its reorganised architecture, which differs substantially from the familiar WCAG 2.x structure.

### Guidelines, requirements, assertions, and methods

Current drafts describe a structure closer to this:

```txt
Guidelines
├── Core Requirements
├── Supplemental Requirements
├── Assertions
└── Best practices
    └── Methods / How-to material
```

**Guidelines** are high-level, user-centred statements.
Example: "Users can identify which element has keyboard focus."

**Core Requirements** are the baseline requirements needed for conformance.
Example: a requirement that a focus indicator is present and detectable.

**Supplemental Requirements** build on that baseline and are used to describe more advanced or situational accessibility support.
Example: a requirement that the focus indicator meets stronger expectations for contrast or size.

**Assertions** document accessibility practices or procedures an organisation can formally claim, such as usability testing or internal accessibility processes.
Example: an organisation states that it carried out usability testing with keyboard and screen reader users, and records what changed as a result.

**Best practices** are useful accessibility guidance that improves outcomes but may not always be objective enough or universal enough for conformance.
Example: a content style guide that encourages especially clear labels and help text across a product.

**Methods** explain ways to meet requirements. They may be technology-specific, but drafts also allow for more general methods where the advice applies across technologies.
Example: an HTML method that uses native buttons and visible `:focus` styles rather than relying on custom scripted controls.

This separation is useful in practice. Designers can focus on the user-centred intent of a guideline. Developers can work through relevant methods. Teams can also document process work that matters but is difficult to verify through code inspection alone.

## Practical comparisons: WCAG 2.2 vs WCAG 3.0

These structural changes become clearer when grounded in concrete examples. Let's examine how several familiar accessibility requirements evolve under the new framework.

### Text alternatives

**WCAG 2.2 (SC 1.1.1: Non-text Content):**
> All non-text content... has a text alternative that serves the equivalent purpose.

This is binary. Either the alt text exists and is sufficient, or it isn't.

**WCAG 3.0 direction of travel:**
Current drafts are more granular than WCAG 2.x. Instead of treating alt text as a single checkpoint, they break the space into distinct requirements: can assistive technologies detect the image at all, is decorative imagery correctly hidden, does each informative image carry a genuine text equivalent, and are teams using supporting practices like style guides and review workflows?

That is a useful readiness signal. Even under WCAG 2.2, strong teams do more than check for the presence of alt text: they ask whether the alternative is accurate, contextual, and maintainable.

### Colour and contrast

**WCAG 2.2 (SC 1.4.3: Contrast Minimum):**
> The visual presentation of text... has a contrast ratio of at least 4.5:1.

This is a fixed threshold, with limited allowances for size and font weight.

**WCAG 3.0 direction of travel:**
Contrast remains active territory. The current WCAG 3 drafts aim for broader text appearance guidance — readability, adaptability, more nuanced treatment of text presentation — and newer contrast models like Advanced Perception of Colour Algorithm (APCA) circulate in adjacent W3C conversations, though APCA is not currently a settled recommendation in the draft.

The readiness takeaway is straightforward: keep meeting WCAG 2.2 contrast requirements, but also test readability in realistic conditions, especially in design systems, small text, dense interfaces, and dark mode.

**Designer implications:** Do not treat contrast as a ratio-only exercise. Build tokens and review practices that account for typography, interface state, and theme variation.

**Developer implications:** Keep your existing WCAG 2.2 checks, but pair them with manual review of actual readability and component states.

### Focus visibility

**WCAG 2.2 (SC 2.4.7: Focus Visible):**
> Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible.

**WCAG 3.0 direction of travel:**
Current drafts break focus into clearer requirements: the indicator's contrast against adjacent colours, its size and shape, whether it gets obscured by other content, and the effect of animations or transitions on its visibility.

This is less a rejection of WCAG 2.2 than a continuation of where WCAG 2.2 was already heading with `Focus Visible`, `Focus Appearance`, and `Focus Not Obscured`. The readiness lesson is to design robust focus states now, rather than aiming for the thinnest technically acceptable indicator.

## Functional needs: a useful way of thinking

WCAG 3 places strong emphasis on **functional needs** and **functional performance statements**. The exact grouping may continue to evolve, but the central idea is already useful: teams should think about the capabilities people need in order to complete tasks, not just individual checkpoints. Current drafts cluster these under vision and visual, hearing and auditory, sensory intersections, motor, cognitive and learning and neurological, and speech.

That perspective illuminates the *why* behind each requirement. It helps move accessibility beyond checklist behaviour and toward thinking about who may be blocked, fatigued, excluded, or put at risk.

## What this means for your workflow

The value of these ideas lies in how they shape practice. Here's how they might affect different phases of product development.

### Design phase

Start with user needs and key tasks rather than checkpoints: ask whether users with a given functional need can accomplish this task reliably. Design for dependable usability, not the thinnest defensible pass — key tasks should remain understandable, perceivable, and operable under realistic conditions. WCAG 3.0 treats context as a first-class concern, so document the intent behind your decisions: developers and testers need to understand what experience you were designing toward.

### Development phase

When implementing a component, think through the functional needs it must support. How does this work for someone using only a keyboard? A screen reader? Voice control? Switch access?

### Testing and QA

Automated tools can identify certain categories of issues, but WCAG 3's direction of travel places even more value on human evaluation of quality and appropriateness. Machines can detect the presence of alt text; only humans can assess whether it is adequate. Manual testing with assistive technologies becomes even more important.

Test across components, views, and end-to-end task flows. Even where draft conformance details are unsettled, the emphasis on realistic task completion is already clear. Document scope, assumptions, known limitations, and test evidence — that discipline will help regardless of how the final conformance model lands.

## Transition considerations

WCAG 3.0 remains in development as of early 2026, with final publication still some years away. That gives teams time to prepare in ways that are valuable now rather than chasing draft details that may still change.

### Do now

- **Ensure WCAG 2.2 AA compliance.** The fundamentals remain relevant; work that genuinely improves accessibility under 2.2 will still matter under 3.0.
- **Familiarise your team with the new structure.** Start talking about guidelines, requirements, functional needs, and task completion rather than only success criteria.
- **Audit your testing tools.** Check which of your automated tools are beginning to surface WCAG 3 work or roadmaps.

### Do soon

- **Strengthen qualitative review.** For content like alt text, help, error handling, and task flows, practise evaluating whether the experience is genuinely usable, not merely present.
- **Watch adjacent accessibility research.** If colour and typography are important in your design system, keep an eye on APCA and related contrast work, but continue treating WCAG 2.2 as the current benchmark.

### Do later (when 3.0 is finalised)

- **Update your accessibility statements.** Conformance claims will look different under 3.0.
- **Retrain your teams.** The conceptual shift is toward richer evidence of usability, broader scope, and more explicit process documentation.
- **Revisit your design systems.** Components that technically pass WCAG 2.2 may still deserve improvement when you evaluate readability, focus, clarity, and task completion more holistically.

## Common questions

### Will my WCAG 2.2 compliant site automatically comply with WCAG 3.0?

Not automatically, but the fundamental principles remain consonant. A site that genuinely serves users well under 2.2 should be well placed. However, WCAG 3 is likely to expect clearer evidence around usability, task completion, scope, and supporting practices, so a technical pass alone may not tell the whole story.

### Is WCAG 3.0 harder or easier to meet?

It is likely to be different rather than simply harder or easier. The direction of travel suggests more judgement, more explicit scope, and more attention to real task completion. For mature accessibility programmes, that may feel like a more honest description of quality. For organisations that rely heavily on binary checklists, it may feel less certain and more demanding.

### What happens to legal requirements that reference WCAG 2.x?

Legal and regulatory frameworks will need to update their references, a process that typically lags behind W3C publication. In practice, that means WCAG 2.x is likely to remain the legal benchmark for some time even after WCAG 3 matures, which is another reason to maintain robust WCAG 2.2 compliance while preparing for what comes next.

## Further reading

For further reading, it helps to separate official WCAG 3 sources from related accessibility reading:

- [WCAG 3.0 Working Draft](https://www.w3.org/TR/wcag-3.0/) - the current published draft specification
- [Explainer for WCAG 3.0](https://www.w3.org/TR/wcag-3.0-explainer/) - background on structure and conformance direction
- [WCAG 3 Introduction](https://www.w3.org/WAI/standards-guidelines/wcag/wcag3-intro/) - W3C's overview page and entry point
- [WCAG 3 Editor's Draft](https://w3c.github.io/wcag3/guidelines/) - includes material beyond the published Working Draft
- [Requirements for WCAG 3.0](https://www.w3.org/TR/wcag-3.0-requirements/) - design goals and rationale behind the new model
- [WCAG 3 Timeline](https://www.w3.org/WAI/GL/wiki/WCAG_3_Timeline) - current planning and publication history
- [APCA Contrast Tool](https://contrast.tools/?tab=apca) - related contrast research and experimentation
- [A list of APCA tools](https://git.apcacontrast.com/documentation/thirdpartytools.html) - related tools for exploration
- [An intro to APCA](https://git.apcacontrast.com/documentation/APCAeasyIntro) - background on APCA as adjacent reading, not current WCAG 3 normative text
- [WCAG 2.2 Understanding Documents](https://www.w3.org/WAI/WCAG22/Understanding/) - for comparison with current standards
- [Accessibility techniques](./accessibility-techniques.md) - practical patterns for accessible UI
- [Screen readers](./at-screen-readers.md)
- [Keyboard navigation](./at-keyboard-navigation.md)
- [Voice control](./at-voice-control.md)

---

*This primer reflects WCAG 3.0 as understood in early 2026. The specification is subject to change before final publication. Always refer to the latest W3C working drafts for current guidance.*
