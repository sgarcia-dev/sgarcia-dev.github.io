const fs = require('fs');
const csvParse = require('csv-parse');

const CSV_OUTPUT_PATH = './assets/json/profile.json';
const CSV_ROOT_PATH = './assets/csv'
const CSV_PATHS = {
    certifications: `${CSV_ROOT_PATH}/Certifications.csv`,
    causesYouCareAbout: `${CSV_ROOT_PATH}/Causes You Care About.csv`,
    // connections: `${CSV_ROOT_PATH}/Connections.csv`,
    courses: `${CSV_ROOT_PATH}/Courses.csv`,
    education: `${CSV_ROOT_PATH}/Education.csv`,
    emailAddresses: `${CSV_ROOT_PATH}/Email Addresses.csv`,
    honors: `${CSV_ROOT_PATH}/Honors.csv`,
    // importedContacts: `${CSV_ROOT_PATH}/Imported Contacts.csv`,
    // invitations: `${CSV_ROOT_PATH}/Invitations.csv`,
    languages: `${CSV_ROOT_PATH}/Languages.csv`,
    // messages: `${CSV_ROOT_PATH}/Messages.csv`,
    phoneNumbers: `${CSV_ROOT_PATH}/Phone Numbers.csv`,
    positions: `${CSV_ROOT_PATH}/Positions.csv`,
    profile: `${CSV_ROOT_PATH}/Profile.csv`,
    publications: `${CSV_ROOT_PATH}/Publications.csv`,
    recommendationsGiven: `${CSV_ROOT_PATH}/Recommendations Given.csv`,
    recommendationsReceived: `${CSV_ROOT_PATH}/Recommendations Received.csv`,
    // registration: `${CSV_ROOT_PATH}/Registration.csv`,
    skills: `${CSV_ROOT_PATH}/Skills.csv`,
    videos: `${CSV_ROOT_PATH}/Videos.csv`,
}
const CSV_PATHS_LENGTH = Object.keys(CSV_PATHS).length;
const PARSED_CSV_OBJ = {};
let currentCsvPath = 0;

Object.keys(CSV_PATHS).forEach((pathKey) => {
    fs.readFile(CSV_PATHS[pathKey], 'utf-8', (err, contents) => {
        if (err) {
            return console.error(err);
        }
        csvHandler(pathKey, contents);
    });
});

function csvHandler(key, contents) {
    csvParse(contents, { columns: true }, (err, output) => {
        if (err) {
            return console.error(err);
        }
        PARSED_CSV_OBJ[key] = output;
    });
    currentCsvPath++;

    if (currentCsvPath === CSV_PATHS_LENGTH) {
        writeOutCsvObject();
    }
}

function writeOutCsvObject() {
    const parsedJson = JSON.stringify(PARSED_CSV_OBJ);
    fs.writeFile(CSV_OUTPUT_PATH, parsedJson, (err) => {
        if (err) {
            return console.error(err);
        }
        console.log(`CSV Files parsed and saved to: ${CSV_OUTPUT_PATH}`);
    });
}