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

Note that the `.md` files that contain the header comments, must be the same name as the the `.dist/` file thats generated by webpack.

## Submitting Bugs

- What scripts do you have and in what order.
  - Are they the latest version of the authors plugins?
- What is the exact error and stack trace (`f8` to open the console and screen shot please).

## Scripts

All scripts are free to use, edit, modify and redistribute according to the license in this repository.

If any script is used in your game, commercial or other wise, I require credit in the credit section. You can credit: *Adam Balan - Lucid Scripts (Or Eviticous On The Rpg Maker Forums)*

All scripts come from `./dist`

# List Of Scripts

- [Lucid Icon Event](#lucid-icon-event)
- [Lucid States](#lucid-states)
- [Lucid Experience Points](#lucid-experience-points)


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

#### Screen Shot:

![Imgur](http://i.imgur.com/Litg1XM.png)

### Lucid States

Lucid states allows you to create states with note tags that increase or decrease core stats by a percentage.

For example, placing: `<state stat: 'def' amount: x%, action: 'increase/decrease'>` and altering it to: `<state stat: 'def' amount: 10 action: 'increase'>` will increase the defence stat of that player or enemy effected by 10%.

#### How to Use:

Place the script in your plugins section.

Enable the script and place: `<state stat: 'def' amount: x%, action: 'increase/decrease'>` in your state note box.

Multiple state note tags can be used on the same event.

#### Screen Shot:

None to show.

### Lucid Experience Points

Lucid Experience Points allows you to define a custom formula for your characters experience points, based on a note tag place in the class notes section.

For example: `<expFormula: "level + 500 * pow(level, 6)">` would evaluate to: `(level + (500 * pow(level, 6))` which is then replaced by appropriate values.

Level in this case is replaced by the characters next level, to calculate needed xp.

You have access to the following for your EXP formulas:

- **level**: This is a variable thats replaced by the actual level.
- **pow(x, y)**: x to the power of y.
- **exp x**: Exponential x, also known as e^x.
- **ceil x**: The ceiling of x.
- **floor x**: The floor of x.
- **round x**: Round the value of X either up or down.

For example, a formula that uses all of these would look like:

```
<expFormula: "round (level + 500 * pow(level, 6) + exp level +
  ceil (1000 * 1.18) - 100 + floor (1000 * 1.18))">
```

You can have formulas as simple as: `<expFormula: 100>`, this means that no
matter the level you will always need 100 exp to gain the next level. The
formula will scale based on your level, but specific values will not.

#### Screen Shot:

None To Show

### Lucid Inventory

Allows you to merge, store and recover inventories for various parties.

You have three functions to work with and one option that has to be set.

```js
lucidScripts.lucidInventory.separate(partyIndex)
lucidScripts.lucidInventory.recover(partyIndex)
lucidScripts.lucidInventory.merge(partyIndex)
```

The option is `parties` which is an array of arrays containing actor id's
which represent parties. Example: `[[1, 2], [3, 4]]`

#### Separating, recovering and Merging Inventory

In the game editor, before you remove party members 1 and 2 and then add 3 and 4,
you would call `lucidScripts.lucidInventory.separate(0)`. This states that
we store the first parties inventory aside, before switching removing people.

This includes weapons, amor and items not equipped.

Now you remove actors 1 and 2 and then add 3 and 4. When you want to switch back,
to actors 1 and 2, you would first call the `separate` method, but this time with
and index of 1.

> ## ATTN!
>
> parties array is a 0 based array, that is we start at 0, so the first party
> of actors 1 and 2 is 0, the second is 1 and so on.

Now that you have separate party 1 and 2's items, we need to recover party
1's inventory, so we do: `lucidScripts.lucidInventory.recover(0)` AFTER adding
the party members for party 1.

What happens if the two parties meet up and join? Lets say party 2 joins party one
and party 2 has items and weapons and armour.

You would add actors 3 and 4 to your party containing actors 1 and 2 and then
call: `lucidScripts.lucidInventory.merge(1)` which will merge party twos items with
party one.

> ## ATTN!
>
> This is irreversible.

##### Why do we need parties option?

This indicates what party has what inventory.

#### Screen Shots?

None to show.
