<<<<<<< HEAD
=======
const extractAll = require('rmmv-mrp-core/option-parser').extractAll;

>>>>>>> b61f4e24e4bb97491a1ec3688c057284de885754
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
<<<<<<< HEAD
            let icon = event.page().list[i].parameters[0].match(/<eventIcon: (.*)>/i);

            if (icon) {
=======
            const iconEventInfo = extractAll(event.page().list[i].parameters[0]);

            if (iconEventInfo.length > 0) {
>>>>>>> b61f4e24e4bb97491a1ec3688c057284de885754
              // Create the icon object with event id and icon id.
              eventIconObjects.push({
                event_id: iconEventInfo[0].event || event._eventId,
                icon_id: Number(iconEventInfo[0].icon)
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
<<<<<<< HEAD
=======

    // if (event === undefined) {
    //   return {event_id: 0, icon_id: 0};
    // }

>>>>>>> b61f4e24e4bb97491a1ec3688c057284de885754
    const eventPageCount = event.page().list.length;

    for (let i = 0; i < eventPageCount; i++) {
      if (event.page().list[i].code === 108) {
<<<<<<< HEAD
        let icon = event.page().list[i].parameters[0].match(/<eventIcon: (.*)>/i);

        if (icon) {
          return { event_id: event._eventId, icon_id: Number(icon[1]) };
=======

        let iconEventInfo = extractAll(event.page().list[i].parameters[0]);

        if (iconEventInfo.length > 0) {
          return { event_id: event._eventId, icon_id: Number(iconEventInfo[0].icon) };
>>>>>>> b61f4e24e4bb97491a1ec3688c057284de885754
        } else {
          return { event_id: event._eventId, icon_id: 0 }
        }
      } else {
        return { event_id: event._eventId, icon_id: 0 }
      }
    }
  }
}
