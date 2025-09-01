---
title: My Completely Biased Reasons for Choosing Angular
published: true
description: I love using Angular for my work and side projects. Come read why in this entirely opinion-based article!
date: 2021-06-11
tags:
  - angular
  - webdev
  - javascript
  - frontend
cover_image: /img/angular.png
---

I wanted the title to be painfully obvious. Just in case that didn't make it obvious enough, let me be even more clear. **This is my completely biased opinion.** You possibly vehemently disagree with me on this, _and that's okay._ This is not a post to try to claim Angular is better than React or Vue or Svelt or whatever other framework you're in love with. It's literally a post talking about why I, John Woodruff, choose to use Angular in personal projects small and large. Honestly, I'm not even trying to convince you to use Angular. In fact, my honest advice for picking a framework for a project is to pick the one you know the best, so you can be as productive as possible. So let's get all that out of the way up front, and dive into my **heavily biased** reasons for choosing Angular for personal projects. Keep in mind, when I make a statement it's an entirely opinion-based statement, so take it with a grain of salt.

## Opinionated Framework

Let's talk about one of the hottest topics up front. Angular is an opinionated framework. If you're not sure what that means, basically it's that the Angular framework defines how you should build applications, and they provide all of the essential tools you need to be able to build your applications. They provide solutions for routing, data fetching, internal data flow, and more, all bundled in the framework itself. Contrast this with something less opinionated like React which specifically does not define how you should build applications, it's simply a library to build components. You can then pick and choose any number of libraries for all the pieces you need to build your application, specifically the same things I mentioned above.

So why is that a hot topic? Well, opinionated or less-opinionated frameworks or libraries elicit all sorts of responses from the developers who use them. Many developers are very against opinionated frameworks, where many other developers love opinionated frameworks. So naturally many of the arguments both in favor of and against Angular are based on the fact that it's a highly opinionated framework. They have rigid structure for how Angular apps should be built, and many tools included out of the box.

Well here we come to my first of several biased opinions. I love Angular because it's an opinionated framework. I love that I don't have to pick and choose from a million libraries to put together a complex app. 95% of what I need is already included in the Angular framework. I also don't need to decide "how" I want to build my applications, because Angular has a detailed style guide for building applications, and I'm able to focus entirely on the actual implementation of my application.

This is also why I love Angular for large complex apps within work environments. When working on teams there is often friction due to different teams or team members doing things differently. With Angular you eliminate a lot of that, because there are defined ways of doing things, and so it's far easier to scale across an organization. Having worked on large complex applications in work environments using both Angular and React, it's been infinitely easier to work within Angular applications due to the lack of a lot of the friction we had with the large React applications. It came down to Angular being opinionated, so there was far less mental overhead.

## Angular CLI

![Image of the terminal with an Angular CLI process running](/img/posts/reasons-for-choosing-angular/angular-cli.png)

Ah the [Angular CLI](https://angular.io/cli). This goes right along with the previous point of Angular being opinionated. The Angular CLI is the best way to build Angular applications due to it tightly following the Angular style guide. It generates a fully scaffolded Angular project for you, and has numerous generator commands for adding new components, services, modules, etc., has automated testing all set up for you out of the box, and more.

It also completely controls your build process, which means they fully manage the building and optimizing of your application. So all of your production builds make use of optimizations such as ahead-of-time compilation, source code minification, tree shaking, style auto-prefixing, and more. This is all stuff that you would have to figure out and do yourself using a build tool and numerous libraries and plugins. Instead of wasting time on all that, I can enjoy knowing that the Angular CLI is generating the best possible production build for me and I can focus on building awesome features.

## Version Updates

One of the best features of Angular CLI, if not the best feature, is the `ng update` command. Ever since Angular 6 was released, the Angular CLI has included this command. It takes basically all the work out of doing version upgrades, and the Angular team did an absolutely phenomenal job of making this command work exceptionally well. They even have a super helpful [Update Guide](https://update.angular.io/) which gives detailed instructions, but almost all of them say that the changes should be automated by the `ng update` command. Normally when you have a major version update, you would have to manually go through your app updating dependencies, delving into changelogs, changing code in your app in numerous places to get rid of deprecated or removed features, and then painstakingly testing to make sure you haven't broken anything. This command, however, automates essentially all of that, including running code migrations that automatically migrate you to the latest recommended syntax. There have only been a handful of times where the changes required manual intervention in the code, and usually they were exceptionally quick to resolve. All the rest is fully automated by Angular CLI.

Ever since this command was released, I have spent approximately 5-10 minutes updating to the latest each time a new major version is released. Contrast this with major version upgrades that can sometimes take hours or even days to update your large complex applications to the latest versions. It even allows library authors to define their own schematics to automatically update their libraries, and that's awesome for users of the framework to not have to worry about manually keeping those up to date when they can just automate it. This has saved me countless hours every single time a major version is released, and I am completely spoiled when using other frameworks that don't provide this incredible functionality. (that's actually another upside to opinionated frameworks, it allows features like this that are otherwise unrealistic with unopinionated frameworks) The Angular team absolutely knocked it out of the park with this feature.

## Angular CDK

![Screenshot of the Angular CDK docs page](/img/posts/reasons-for-choosing-angular/angular-docs.png)

Alongside [Angular Material](https://material.angular.io) is a super awesome little package called [Angular CDK](https://material.angular.io/cdk/categories). CDK stands for Component Dev Kit, and it is an incredibly handy package for helping you develop some of the more complex components an application requires. They're marketed as "behavior primitives" that you can use to build your own branded components.

Building buttons and input fields and such are fairly straightforward for people building component libraries, but there are other components that are much more complex such as modals, accordions, data tables, drag and drop, trees, and more. Rather than building all this yourself or relying on libraries that style these components how they want, Angular CDK gives you ways to very easily build your own complex behavioral components that you can style easily to fit your company or project's branding. Not only that, but these components are often much more accessible than components you would build yourself. As has been the theme with this post, Angular CDK helps you save a ton of time by having these abstractions built out for you so you can worry about the look, feel, and implementation of your components rather than the more complex details such as positioning, scroll behaviors, etc. It has saved me an enormous amount of time and complexity when building my components. If you're building with Angular, even if you don't use Angular Material, you should absolutely use Angular CDK.

## Dependency Injection

This is a hot topic for some reason, but Dependency Injection is another huge reason why I love to use Angular. It allows me to not have to worry about defining my own patterns for singleton vs factories. Instead, [Angular's Dependency Injection](https://angular.io/guide/dependency-injection) tooling makes it exceptionally easy for me to provide the dependencies I need, anywhere I need them, and to do it in an easy manner. Rather than have to instantiate a service in a component, I can simply inject my service and Angular's Dependency Injection will ensure I am given the correctly instantiated service, like so:

```typescript
// Some service I've defined
@Injectable()
export class MyService {
  /* ... */
}

// Some component in my app
@Component({
  /* ... */
})
export class MyComponent {
  constructor(private service: MyService) {}
}
```

The other huge benefit to Dependency Injection is for better testability. Automated tests are something that I consider absolutely vital to the success or failure of a product and the team that builds it. Dependency Injection in Angular makes it incredibly easy to test, mock out, and handle dependencies external to the unit of code I'm testing at the moment. Consider the above component. To mock a method I simply need to inject the correct dependency and then utilize Jasmine's spies to mock out the method.

```typescript
describe('MyComponent', () => {
  let service: MyService;

  beforeEach(async () => {
    // Initialize Angular TestBed
    await TestBed.configureTestingModule({
      declarations: [MyComponent]
    }).compileComponents();

    // Inject MyService for mocking
    service = TestBed.inject(MyService);
    // Mock out `sayHello` method
    spyOn(service, 'sayHello').and.returnValue('Hello World!');
  });
});
```

It makes working in large complex codebases much more trivial, and makes testing vastly more simple. Are there downsides to Dependency Injection? Absolutely. No matter what pattern you choose, there are always going to be tradeoffs. It comes down to what tradeoffs you're willing to make in exchange for the benefits you consider most valuable. For me, Angular's Dependency Injection is one of the main reasons I choose it over other frameworks.

## Conclusion

In case you've forgotten by this point, I'll reiterate one more time that this post is incredibly biased and entirely opinion-based. I absolutely love to use Angular, it's my framework of choice for side projects, and I believe it's an excellent choice for many of you as well. _That being said,_ I absolutely would argue that it's not a good choice for many others. When it comes down to it, you need to weigh the pros and cons of each framework, decide what tradeoffs you're willing to make, and choose based on what you decide. For many of you that's going to be React, or Vue, or Svelt, or Stencil, or Ember, or heck maybe even Backbone. And that's absolutely okay.

I wanted to write this article to provide perspective to why I personally choose Angular over another framework. Not to provide more fodder for the "framework wars" or to bash on another person's choice. I will always say that the best framework choice for a project is the one you or your team is the most familiar with that will help you be the most productive and provide the fewest tradeoffs for what you want. In fact I love to read other peoples' completely biased articles on why they choose their framework (or library or text editor or whatever) and I enjoy celebrating their success and happiness over what they've chosen, while I enjoy what I've chosen. If there's anyone else out there like me who chooses Angular for their side projects, I'd love to chat in the comments about what your reasons are! And if you want to bash Angular or another framework for it not being as good as Framework X or Y, I humbly request you save those comments for the posts that encourage it. ❤🌈
