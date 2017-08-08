const GameObserver = require('rmmv-mrp-core/game-observer');

var conjuredItems;

GameObserver.on('battle.end', () => {
  // Remove conjured items from the inventory.
  if (!conjuredItems) {
    conjuredItems = $dataItems.filter(i => i && i.meta.conjured);
  }

  conjuredItems.forEach(item => {
    delete $gameParty._items[item.id];
  });
});
