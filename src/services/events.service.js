import {
    AsyncStorage
} from 'react-native';
import API from '../services/api.manager';

var env = require('../env');

let moment = require('moment');
import {parseData} from './json.api.mapper.service';

exports.writeEventsToStorage = async function (events) {
  if (events && events.data && events.data.length) {
    events['date'] = moment().format('YMD');
    console.log("Setting events", events.date);
    await AsyncStorage.setItem('RALLYBUS:EVENTS', JSON.stringify(events));
  }
};

exports.fetchEventsFromStorage = async function () {
  let events = await AsyncStorage.getItem('RALLYBUS:EVENTS');
  try {
    events = JSON.parse(events);
  } catch (err) {
    console.log("Unable to parse events", err);
    return {};
  }
  return events;
};

exports.removeEventsFromStorage = async function () {
  await AsyncStorage.removeItem('RALLYBUS:EVENTS');
};

exports.fetchEvents = async function (callback) {
  let events = await exports.fetchEventsFromStorage();
  if (events && events.date) {
    //Check if events are from yesterday, if no use same events from storage else fetch from api
    if (events.date === moment().format('YMD')) {
      //Same day, Don't fetch new events
      delete events.date;
      if (events && events.data && events.data.length) {
        console.log("Fetching events from cache");
        let finalEvents = parseData(events);
        let allEvents = finalEvents.findAll('events');
        return allEvents;
      }
    } else exports.removeServiceStateFromStorage();
  }

//fetch new events from api
  events = await API.userEvents();
  if (events) {
    // parse events from JSON API parser
    let finalEvents = parseData(events);
    let allEvents = finalEvents.findAll('events');
    await exports.writeEventsToStorage(events);
    return allEvents
  }
  return new Error("Unable to fetch events");
};


