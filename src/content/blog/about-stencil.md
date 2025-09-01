---
title: Component Libraries with Stencil.js - About Stencil
published: true
description: The first in a series of posts about creating a component library using Stencil.js
date: 2018-09-15
series: Component Libraries with Stencil.js
tags:
  - stencil
  - webcomponents
  - typescript
cover_image: /img/stenciljs.png
cover_image_alt: Stencil.js logo
---

_This is the first in a series of posts about creating a web component library using Stencil.js_

I've been doing frontend development professionally since 2012. During that time, I've learned JavaScript framework after JavaScript framework. I started with [Backbone.js](http://backbonejs.org/) and disliked it quite a bit. I'm sure it was a great framework at the time, but I use it as a curse word to this day. I was thrilled to learn [Angular.js](https://angularjs.org/) back at the end of 2012, and shocked everyone by re-writing our complex backbone application with Angular.js in a matter of two days, with approximately 1/8th the amount of code.

That weekend kicked off a love for learning new JavaScript frameworks that has never left me. I followed closely the development of [Angular](https://angular.io/), the successor to and complete re-write of Angular.js, and still use Angular heavily in my current job at Domo. [React](https://reactjs.org/) also came along and brought with it a different paradigm of not being an all inclusive "framework", but rather a view rendering library. I loved learning a whole new way of building applications, by wiring together the various pieces I needed using different libraries in addition to React. I've of course messed around with many other frameworks including but not limited to [Ember.js](https://www.emberjs.com/), [Vue](https://vuejs.org/), and [Aurelia](https://aurelia.io/).

## Component Libraries

I highly recommend the usage of component libraries. Unless you're an amazing designer as well as developer, they simplify things a great deal for most of us. In all my aforementioned experimentation with frameworks, however, I discovered a major pain point. Any time I used a new framework, the component library I used likely had it's own specific version for that new framework, or it didn't have a version for it at all. For example, I heavily use [Angular Material](https://material.angular.io/) at work and on side projects. However, whenever I work on a React app, all those components are obviously unusable in that React app because it's Angular specific. So, I find the most commonly used React alternative, [Material-UI](https://material-ui.com/). While a great library, I now have to do a context switch as these components were built with entirely different individuals, architecture, and terminology. This is the best case scenario, however, as that is with two of the most widely used frameworks with one of the most widely used design systems.

Many companies are now open sourcing their own component libraries using their business style guide. Libraries such as [Atlaskit](https://atlaskit.atlassian.com/) by Atlassian, [Clarity](https://vmware.github.io/clarity/) by VMWare, or [Carbon](http://www.carbondesignsystem.com/) by IBM. In the case of IBM specifically, they had to release one version of the library for Angular, one for React, and another for no framework with just HTML and CSS partials, similar to how [Bootstrap](https://getbootstrap.com/) works. This is simply not feasible or maintainable for most businesses without the resources of IBM. Instead, many pick a framework of choice and release only that library.

## Enter Stencil.js

I've rarely been as excited about a technology in the last few years as I have about [Stencil.js](https://stenciljs.com/). It's not another framework; in fact it's not a framework at all. Built by the [Ionic](https://ionicframework.com/) team, Stencil.js took a different approach. Instead of providing a component framework, they built a component compiler, which takes components built with modern tools and high level APIs such as [TypeScript](https://www.typescriptlang.org/), [decorators](https://www.typescriptlang.org/docs/handbook/decorators.html), and [TSX](https://www.typescriptlang.org/docs/handbook/jsx.html), and compiles them down to standards-compliant [web components](https://www.webcomponents.org/). You don't need a framework to run these components, they're using native browser APIs to render custom elements.

The web component standard consists of various APIs that together allow you to render complex custom elements. While you could absolutely write these yourself, they are purposely designed to be low-level APIs. This is why I highly recommend Stencil, it takes the best parts from Angular and React when it comes to building components, and takes care of the rest of the complicated work for you such as dynamically polyfilling missing features and performing async rendering. All the benefits of a library like React, but using the platform itself, which allows you to use these components in any framework or no framework at all.

## A Basic Stencil Component

Let's take a look at a basic Stencil component.

```tsx
import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'hello-world',
  styleUrl: 'hello-world.css'
})
export class HelloWorld {
  @Prop() name: string;

  render() {
    return <p>Hello {this.name}!</p>;
  }
}
```

You would simply use this component in a standard HTML page like so:

```html
<!DOCTYPE html>
<html lang="en">
  <head> </head>
  <body>
    <hello-world name="John Woodruff"></hello-world>
  </body>
</html>
```

If you're familiar at all with Angular, you'll recognize the component decorator:

```tsx
@Component({
  tag: 'hello-world',
  styleUrl: 'hello-world.css'
})
```

This decorator allows you to define the HTML tag name, and a link to the stylesheet that will provide the CSS for this component.

After the component decorator, you have a plain TypeScript class. You'll notice a `@Prop()` decorator on the class property `name`. This defines that there is a public prop you can use on your custom element to pass in a string to the `name` property.

Finally we have the standard `render()` method. You return TSX (TypeScript XML) which is the markup that will be rendered in your custom element. In this case we're simply passing back a `<p>` tag with a message. This message is "Hello" with the name that we passed in on the prop. If we were to change the name passed to the prop, the component would detect that and re-render accordingly.

## Why Stencil?

You, a savvy reader, may be asking yourself why would I choose Stencil when I could use Polymer instead? The answer is that you're absolutely welcome to use Polymer. It's a great technology that has helped bring web components to the web at large. Personally I love building web components with Stencil much more than with Polymer, just due to the developer experience and tools used. It's a very similar experience to building components in React and Angular, two technologies I'm very familiar with.

In other reasoning, Stencil-compiled web components are highly performant, small, and incredibly easy to build and publish. You could publish a single web component, or an entire library of components. I've been using Stencil for months now in building out a component library at my job. The experience has been overwhelmingly positive for me, and we now have a library of shared components that can be consumed in the various frameworks being used throughout the company.

## Next Steps

If you've made it this far and are still interested in building a component library along with me in these posts, thank you for being here! This first post had very little in the way of actual code, as I didn't want to jump into that before you had the reasoning and benefits clear in your mind. Now that we've gotten that, I'll see you in the [next post](/posts/stencil-getting-started)!

_Simply want to see the end result repo? Check it out [here](https://github.com/johnbwoodruff/mountain-ui)_
