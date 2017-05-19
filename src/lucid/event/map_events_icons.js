module.exports = class MapEventsIcons {

  getAllEventIcons() {
    let eventIconObjects = [];

    $gameMap._events.forEach((event) => {
      if (event !== undefined) {
        let eventPageCount = event.page().list.length;

        for (let i = 0; i < eventPageCount; i++) {
          if (event.page().list[i].code === 108) {
            let icon = event.page().list[i].parameters[0].match(/<eventIcon: (.*)>/i);

            if (icon) {
              eventIconObjects.push({
                event_id: event._eventId,
                icon_id: Number(icon[1])
              });
            }
          }
        }
      }
    });

    return eventIconObjects;
  }
}
