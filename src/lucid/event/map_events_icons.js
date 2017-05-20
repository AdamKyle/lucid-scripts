/**
 * Process all event icons on the map.
 *
 */
module.exports = class MapEventsIcons {

  /**
   * Responsible for getting all event icons for a given map and all its events.
   *
   * @return {array} - array of objects.
   */
  getAllEventIcons() {
    let eventIconObjects = [];

    // Loop over the events.
    $gameMap._events.forEach((event) => {
      if (event !== undefined) {
        let eventPageCount = event.page().list.length;

        // Loop over the event page count
        for (let i = 0; i < eventPageCount; i++) {
          // If the event code is a comment.
          if (event.page().list[i].code === 108) {
            // get the icon assuming there is a tag that matches:
            let icon = event.page().list[i].parameters[0].match(/<eventIcon: (.*)>/i);

            if (icon) {
              // Create the icon object with event id and icon id.
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

  /**
   * Get a specific events Icon.
   *
   * Will return a object with an icon_id of 0
   * if we cannot find one. this symbolizes no icon.
   *
   * @param {number} eventId - The if od the event.
   * @return {object} {event_id: x, icon_id: 0} || {event_id: x, icon_id: y}
   */
  getEventIcon(eventId) {
    const event = $gameMap.event(eventId);
    const eventPageCount = event.page().list.length;

    for (let i = 0; i < eventPageCount; i++) {
      if (event.page().list[i].code === 108) {
        let icon = event.page().list[i].parameters[0].match(/<eventIcon: (.*)>/i);

        if (icon) {
          return { event_id: event._eventId, icon_id: Number(icon[1]) };
        } else {
          return { event_id: event._eventId, icon_id: 0 }
        }
      } else {
        return { event_id: event._eventId, icon_id: 0 }
      }
    }
  }
}
