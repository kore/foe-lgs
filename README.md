# Forge Of Empries: Great Building Calculator

This is mainly a playground project to play around with a fully offline page
based on the following technologies:

* PReact
* Tailwind
* Local Storage & Service Workers (for full offline)
* Typescript (in progress)

It implements a mobile optimized version of the common necessary investment
calculators of Innogames Forge Of Empires game.

You can use this on https://foe.k023.de/ – we now reach a Lighthouse scrore of
93 – 100 – 93 – 100 – Full PWA. This should be maintained or improved. The
server which runs that misses HTTP/2 and proper caching directives for static
assets, though.

## Develop

To install all dependencies run `yarn install`. Then running `yarn run start`
will start the application and webpack hot relaod. Open the provided URL in the
browser and start hacking.

## Deploy

```
$ yarn run deploy
```
