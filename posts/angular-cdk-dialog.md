---
title: Angular CDK - Creating a Custom Dialog
published: true
description: The first in a series of posts about using the Angular CDK to create your own custom components. This post uses the Overlay package to create modals.
date: 2021-11-28
series: Angular CDK
tags:
  - angular
  - cdk
  - typescript
  - webdev
layout: layouts/post.njk
cover_image: /img/dialog.png
cover_image_alt: Dialog design
---

_This is the first in a series of posts about using the Angular CDK library to build your own custom components._

If you're building applications using Angular, you probably know about the amazing [Angular Material](https://material.angular.io/) library. It's a component library that implements the Material Design spec. For many teams and applications, particularly those without design resources, it's a fantastic tool for building applications with a high quality design system. I have used it many times with great success.

There have been times, however, where I wanted the amazing developer experience of Angular Material, but I couldn't use the Material design that it implements because the company has an existing design system. It's precisely for these situations that the Angular team created [Angular CDK](https://material.angular.io/cdk/categories), or the "Component Dev Kit". According to their website, the CDK is "a set of behavior primitives for building UI components". The CDK is fantastic because it abstracts away a lot of the really complex behavior implementation in building UI components.

Because of all these benefits, I try to always utilize the CDK for as much as possible when writing Angular applications. For this series of posts I hope to dig in to as many pieces of the CDK as possible to help you build your own high quality design system. In this post I'm going to specifically talk about building an alternative to `MatDialog`, as that is a very commonly used service for creating modals.

## Dialog Service

In Angular Material, the `MatDialog` service allows you to pass a component to the service which it will then open in a floating dialog that's globally centered both horizontally and vertically. Obviously this dialog implements the Material Design spec including animations when opening and closing. Because of this, we want to implement our own design, but the ergonomics of the `MatDialog` service are great. So our implementation, while not exactly the same, will be similar and provide some of the same features.

The design of the API is fairly simple, but extendable when needed. We'll have have an `open` method that takes in an Angular component to be opened in the dialog. We can also pass data to the component that can be used if needed. This method will return a reference to the dialog that we can use to close it programatically or subscribe to when it's closed. This API design is simple and easy to extend as needed, but gets us a highly functional dialog service.

Here is a demo of the finished product with all the features mentioned above. We'll be going through step by step but you're welcome to simply reference the code here if preferred.

<iframe src="https://stackblitz.com/edit/angular-ivy-sdmh7e?embed=1&file=src/app/dialog/dialog.service.ts" title="stackblitz-example"></iframe>

## Prerequisites

First off we need to make sure we've got Angular CDK in our app. You have two ways you can do this. The first and least manual is to install it alongside Angular Material, via their provided Angular CLI schematic. Note that this will also install and configure Angular Material, a theme, and set up the styles. This is good in some ways because it includes the Angular CDK styles as part of the Angular Material theme. You can do that by using the following command:

```shell
$ ng add @angular/material
```

If you know for a fact that you're never going to want to use anything from Angular Material, and only want the CDK, then you can install it by itself from npm. Note that you must install the same version number that matches your Angular version, like so:

```shell
$ npm install --save @angular/cdk@12.2.13
```

This will not configure any styles, so you'll need to reference them properly as the docs outline for each piece you use. This is the method I'll be using in these tutorials because I know I won't want Angular Material as that is the whole point of this series. So now, no matter the path you chose, you have the Angular CDK installed and ready to go!

## CDK Overlay

First let me explain how the CDK overlay concept works. There are three pieces to this that work together. There's the component we want to render, there's a [Portal](https://material.angular.io/cdk/portal/overview) which is a CDK package for rendering dynamic content such as a component, and then there's an [Overlay](https://material.angular.io/cdk/overlay/overview) which is a CDK package for opening floating panels on the screen. Basically what we do is attach a component to a `ComponentPortal`, then attach that portal to an `OverlayRef` which we'll open.

There are a number of ways you can use the Angular CDK's overlay. You can use it programmatically or even as directives on markup. In our situation we want to use it programmatically so we can invoke it from anywhere via a service in our logic. So let's start out by creating a simple Angular service and stubbing out the basic API along with a couple of comments on what needs to be done.

```typescript
import { ComponentType } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor() {}

  open<T>(component: ComponentType<T>) {
    // 1. Create the overlay
    // 2. Attach component portal to the overlay
  }
}
```

This is the very beginning of our service. We know that we want an `open` method, and we know it needs to take some component to open. You'll notice we're using the type of `ComponentType` from the Angular CDK overlay package. This is a type that allows us to receive any Angular component, and that's what is passed to the CDK when instantiating the component. Of course we also have our generic `<T>` which will be the type of the component we pass through.

### Create Overlay

As we mentioned above we need to first create an overlay. To create an overlay we most importantly need a [PositionStrategy](https://material.angular.io/cdk/overlay/overview#position-strategies). This defines _where_ on the screen we want to open this overlay. There are a couple options, but in this post we'll be using the `GlobalPositionStrategy`. This means we won't be attaching it to a specific element. We also can provide a few more optional configuration options, which we'll do. Here's how we create that overlay, injecting the `Overlay` class in the constructor:

```typescript
import { Overlay, ComponentType } from '@angular/cdk/overlay';
//...
export class DialogService {
  constructor(private overlay: Overlay) {}

  open<T>(component: ComponentType<T>) {
    // Globally centered position strategy
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();

    // Create the overlay with customizable options
    const overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'overlay-backdrop',
      panelClass: 'overlay-panel'
    });

    // Attach component portal to the overlay
  }
}
```

We did a couple of things. First, we defined our position strategy. We declared that we want a global strategy, and we want to position the overlay in the center of the screen both horizontally and vertically. You can also position your overlay (similar to absolute positioning) by giving it a top, left, right, or bottom value. This might be useful if you wanted to open a sidepanel or a bottom sheet. Since we're just making a standard modal, we're centering it on the screen.

We're also defining some information about the panel and backdrop. First we're defining that we want a backdrop for this modal, as well as providing the backdrop class for that. That's where we can define how we want to style the backdrop, which I'll be styling with a darkly translucent backdrop. We're also providing a panel class, which will be applied to the parent "panel" that we'll be rendering our component in. I just did some basic styling to make the background white and have a little padding. You can see my styles I provided in `src/styles.scss`.

### Create Component Portal

Next we need to create our `ComponentPortal` that we'll then attach to the overlay. It's quite straightforward, and we do it like so:

```typescript
import { Overlay, ComponentType } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
//...
export class DialogService {
  constructor(private overlay: Overlay) {}

  open<T>(component: ComponentType<T>) {
    // Globally centered position strategy
    // ...

    // Create the overlay with customizable options
    const overlayRef = this.overlay.create({
      // ...
    });

    // Attach component portal to the overlay
    const portal = new ComponentPortal(component);
    overlayRef.attach(portal);
  }
}
```

At this point we can successfully open this dialog if we actually call this method and pass a component to it. While we could just leave our service like this, it definitely doesn't meet the common usecases that we could do with `MatDialog`. We want to be able return a dialog reference so we can programmatically close the overlay or subscribe to when the overlay gets closed. So let's add that to our implementation.

### Dialog Reference

Let's create a simple `DialogRef` class. It should take in an `OverlayRef` which we can use to close the overlay, and it should have an rxjs `Subject` so we can subscribe to when the overlay is closed. So let's implement this simple class:

```typescript
import { OverlayRef } from '@angular/cdk/overlay';
import { Subject, Observable } from 'rxjs';

/**
 * A reference to the dialog itself.
 * Can be injected into the component added to the overlay and then used to close itself.
 */
export class DialogRef {
  private afterClosedSubject = new Subject<any>();

  constructor(private overlayRef: OverlayRef) {}

  /**
   * Closes the overlay. You can optionally provide a result.
   */
  public close(result?: any) {
    this.overlayRef.dispose();
    this.afterClosedSubject.next(result);
    this.afterClosedSubject.complete();
  }

  /**
   * An Observable that notifies when the overlay has closed
   */
  public afterClosed(): Observable<any> {
    return this.afterClosedSubject.asObservable();
  }
}
```

Now we need to add this in to our `open` method so we can create this reference and return it from the method on creation. So let's put that in here:

```typescript
import { Overlay, ComponentType } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { DialogRef } from './dialog-ref';
//...
export class DialogService {
  constructor(private overlay: Overlay) {}

  open<T>(component: ComponentType<T>): DialogRef {
    // Globally centered position strategy
    // ...

    // Create the overlay with customizable options
    const overlayRef = this.overlay.create({
      // ...
    });

    // Create dialogRef to return
    const dialogRef = new DialogRef(overlayRef);

    // Attach component portal to the overlay
    // ...

    return dialogRef;
  }
}
```

This is super helpful for the consumer of this API so they can access the dialog. But what about the component we're opening? We want to be able to allow the component in the overlay to close itself. So how can we pass that `dialogRef` through? Well, for that we'll need to create an Injector which we pass to the component portal. This will allow us to then inject the `dialogRef` in our component. It's pretty easy to do this, you can do it like so:

```typescript
import { Injectable, Injector } from '@angular/core';
import { Overlay, ComponentType } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { DialogRef } from './dialog-ref';
//...
export class DialogService {
  constructor(private overlay: Overlay, private injector: Injector) {}

  open<T>(component: ComponentType<T>): DialogRef {
    // Globally centered position strategy
    // ...

    // Create the overlay with customizable options
    const overlayRef = this.overlay.create({
      // ...
    });

    // Create dialogRef to return
    const dialogRef = new DialogRef(overlayRef);

    // Create injector to be able to reference the DialogRef from within the component
    const injector = Injector.create({
      parent: this.injector,
      providers: [{ provide: DialogRef, useValue: dialogRef }]
    });

    // Attach component portal to the overlay
    const portal = new ComponentPortal(component, null, injector);
    overlayRef.attach(portal);

    return dialogRef;
  }
}
```

Now that we've provided an injector to the component portal, we'll be able to inject the `dialogRef` in our component very simply like so:

```typescript
@Component({
  // ...
})
export class LoginComponent {
  constructor(private dialogRef: DialogRef) {}

  close() {
    this.dialogRef.close();
  }
}
```

Our implementation is much more thorough now that we have a way for the dialog to be programmatically closed from within the component or outside of it. The last major gap in functionality is being able to optionally pass some arbitrary data to the component that is being opened so it can utilize that data as needed.

### Dialog Data

In order to pass data to the component, we'll be using the same method as our `dialogRef`. In this case, however, we'll need to [define our own injection token](https://angular.io/guide/dependency-injection-in-action#injectiontoken-objects) for the dependency injection system. Let's start by doing that in a new file, `dialog-tokens.ts`. It's going to be a very simple file.

```typescript
import { InjectionToken } from '@angular/core';

export const DIALOG_DATA = new InjectionToken<any>('DIALOG_DATA');
```

Now that we've created a very basic injection token, we can add this to our injector. We also need to update our `open` method to accept optional data to be passed to the component. As part of that, we'll define a `DialogConfig` interface that has optional `data`. The reason we're making this a config object like this is so it's easy to extend later if you wanted to, for example, allow customizing the options for the overlay.

```typescript
import { Injectable, Injector } from '@angular/core';
import { Overlay, ComponentType } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { DialogRef } from './dialog-ref';

export interface DialogConfig {
  data?: any;
}

//...
export class DialogService {
  constructor(private overlay: Overlay, private injector: Injector) {}

  open<T>(component: ComponentType<T>, config?: DialogConfig): DialogRef {
    // Globally centered position strategy
    // ...

    // Create the overlay with customizable options
    // ...

    // Create dialogRef to return
    // ...

    // Create injector to be able to reference the DialogRef from within the component
    const injector = Injector.create({
      parent: this.injector,
      providers: [
        { provide: DialogRef, useValue: dialogRef },
        { provide: DIALOG_DATA, useValue: config?.data }
      ]
    });

    // Attach component portal to the overlay
    // ...

    return dialogRef;
  }
}
```

## Conclusion

Now that we've built this highly reusable service, we're able to open any component we want in a nicely centered modal! We can optionally provide data to it, and we can reference that dialog externally to close it if we wanted, or subscribe to it closing and react to that as needed. We could take this further, for example, by defining our own transitions and animations for the modal entering and exiting. Or we could easily pass in a config option to change the position strategy so it opens as a sidepanel instead of a centered modal. There are many ways you could tweak this to get exactly what you want, and it's fully within your control rather than being locked into the Material design dialog design and interactions.

In my next post I'm going to go over the `FlexibleConnectedPositionStrategy` that you can use to build things such as tooltips, popovers, dropdowns, and more. I'll be working hard on that one and hope to have it out soon. Hopefully this helps you get started digging into all the powerful options you have through the Angular CDK, and especially their Overlay package.
