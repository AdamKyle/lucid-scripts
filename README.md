# Lucid Scripts for RPG Maker MV

These are a set of scripts for the famous [RPG Maker MV](http://www.rpgmakerweb.com/).

These are all written in ES6 and requires understanding of build tools such as [Webpack](https://webpack.github.io/) and [babel](https://babeljs.io/).

These scripts can be installed in to your RPG Maker game to add additional or enhance existing functionality in the game.

## Contributing

To get started, clone this repository. Either make sure you have [Yarn](https://yarnpkg.com/en/) installed or [npm](https://www.npmjs.com/).

Run `yarn` or `npm install` at the root of the cloned directory.

To compile the scripts run `yarn/npm run build:all:dev` for development or `yarn/npm run build:all` for production.

> ATTN!
>
> `yarn/npm run build:all` should be run before making commits and PR's
> `yarn/npm run build:all:dev` is only for your development purposes and testing the script.


## Submitting Bugs

- What scripts do you have and in what order.
  - Are they the latest version of the authors plugins?
- What is the exact error and stack trace (`f8` to open the console and screen shot please).

## Scripts

All scripts are free to use, edit, modify and redistribute according to the license in this repository.

If any script is used in your game, commercial or other wise, I require credit in the credit section. You can credit: *Adam Balan - Lucid Scripts (Or Eviticous On The Rpg Maker Forums)*

All scripts come from `./dist`

### Lucid Icon Event

Lucid Event Icon allows you to position an icon above the event. The icon will "float" above the event and when interacted with, the event that is, the icon will fade out.
This script allows for you to have multiple events on the page with different icons above them. When one event is interacted with, that events icon will fade out until the event is finished running.

If the event switches pages, the icon will also disappear.

#### How to Use:

Place the script in your plugins section.

> ATTN!
>
> NOT COMPATIBLE WITH:
>
> - Galv's Action Indicators

Enable the script and place: `<actionIcon: iconId>` in your event in a new comment.

### Screen Shot:

![Imgur](http://i.imgur.com/Litg1XM.png)

### Lucid States

Lucid states allows you to create states with note tags that increase or decrease core stats by a percentage.

For example, placing: `<state stat: 'def' amount: x%, action: 'increase/decrease'>` and altering it to: `<state stat: 'def' amount: 10 action: 'increase'>` will increase the defence stat of that player or enemy effected by 10%.

#### How to Use:

Place the script in your plugins section.

Enable the script and place: `<state stat: 'def' amount: x%, action: 'increase/decrease'>` in your state note box.

Multiple state note tags can be used on the same event.

### Screen Shot:

None to show.
