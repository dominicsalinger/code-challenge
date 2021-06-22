
CovalentCreative Coding Challenge
---

Thank you so much for your interest in being part of the CovalentCreative engineering team!

This coding challenge is optional. If you have existing code that you're proud of (and can share with us), you can use it in lieu of this challenge (see the "Using existing code" section below).

Compensation for this challenge is only provided if you are writing new code.

---

## Using existing code

If you have existing code, please follow the following guidelines:

* Include a link to the hosted repository (e.g. Github, Bitbucket).
* The repo should include a README that follows the [principles described below](#readme) In particular, please make sure to include high-level explanation about what the code is doing.
* Ideally, the code you're providing:
  * Has been written by you alone. If not, please tell us which part you wrote and are most proud of in the README.
  * Is leveraging web technologies.
  * Is deployed and hosted somewhere.

---

## Writing a project README

Regardless of whether it's your own code, or our coding challenge, write your README as if it was for a production service. Include the following items:

* Description of the problem and solution.
* Whether the solution focuses on back-end, front-end, or if it's full-stack.
* Any relevant installation or demo instructions, including usage examples.
* The reasoning behind your technical choices, including architectural decisions.
* Trade-offs you might have made, anything you left out, or what you might do differently if you were to spend additional time on the project.
* Link to the hosted application (where applicable).

---

## How we review your code

Your application will be reviewed by two engineers.

The goal of this code sample is to help us identify what you consider production-ready code. You should consider this code as it were ready for final review with your colleague, i.e. this would be the last step before deploying to production.

The aspects of your code we will assess include:

* **Architecture**: How clean is the separation between the front-end and the back-end? Is the architecture simple and elegant while solving technical problems?
* **Clarity**: Does the README clearly and concisely explains the problem and solution? Are technical tradeoffs explained?
* **Correctness**: Does the application do what was asked? If there is anything missing, does the README explain why it is missing?
* **Code quality**: Is the code simple, easy to understand, and maintainable?  Are there any code smells or other red flags? Does object-oriented code follows principles such as the single responsibility principle? Is the coding style consistent with the language's guidelines? Is it consistent throughout the codebase?
* **Security**: Are there any obvious vulnerabilities?
* **Performance**: Are there any obvious performance issues?
* **UX**: Is the interface understandable and pleasing to use? Is it UI mobile-responsive? Is the API intuitive?
* **Technical choices**: Do choices of libraries, databases, architecture etc. seem appropriate for the chosen application?

---

## Coding challenge

If you don't have existing code to share, you can work on the full-stack coding challenge described below. Flat-rate compensation will be provided if you choose this option.

Please organize, design, document and deploy your code as if it were going into production, then send us a link to the hosted repository.

### Functional spec

Prototype one of the following full-stack projects:

1. **Basic e-commerce flow:** Create a basic inventory management backend for product data entry. Allow end users to browse the product list, add products to a cart, and "check out" (note: the cart doesn't actually have to process any payments - you can stub this functionality).

2. **Food truck map:** Create a service that tells the user what types of food trucks are closest to their current location, visualized on a map ([food truck data set](https://data.sfgov.org/Economy-and-Community/Mobile-Food-Facility-Permit/rqzj-sfat)). Feel free to use this basic map+geolocation concept with a different data set.

3. **Real-time notification dispatcher**. Create a socket-powered application that allows a centralized server to push real-time notifications to any clients that are visiting a certain URL. 

4. **Downtime detector**. Create a service that monitors URLs for downtime (any non-200 response). Graph downtime using a charting library and give the user the ability to subscribe to email or text message alerts ([Twilio API](https://www.twilio.com/docs/api/rest))


### Technical spec

The architecture will be split between a back-end and a web front-end, for instance providing a RESTful API consumed by a client application. Feel free to use any preferred technologies provided that the general client/service architecture is respected.

Our standard stack is Django/React.

### UI/UX

The UI/UX is totally up to you. If you want, get creative and add additional features the user might find useful!

### Back-end

You are free to use any web framework. If you choose to use a framework that results in boilerplate code in the repository, please detail in your README which code was written by you (as opposed to generated code).

### Front-end

The front-end should ideally be a single page app with a single `index.html` linking to external JS/CSS/etc. You may take this opportunity to demonstrate your React and HTML/CSS knowledge.


