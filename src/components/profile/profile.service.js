import profileData from '../../../assets/json/profile.json';

class ProfileService {
    constructor() {
        this.raw = profileData;

        this.profile = parseProfileFromRaw(this.raw);
        this.positions = parsePositionsFromRaw(this.raw);
    }
}

export { ProfileService };

function parseProfileFromRaw(raw) {
    const rawProfile = raw.profile[0];
    const PROFILE = {};

    PROFILE.fullName = `${rawProfile['First Name']} ${rawProfile['Last Name']}`;
    PROFILE.headline = rawProfile.Headline;
    PROFILE.aboutMe = rawProfile.Summary;

    return PROFILE;
}

function parsePositionsFromRaw(raw) {
    const rawPositions = Array.from(raw.positions);
    
    const POSITIONS = rawPositions.map(rawPosition => {
        const POSITION = {};

        POSITION.title = rawPosition.Title;
        POSITION.company = rawPosition['Company Name'];
        POSITION.description = rawPosition.Description;
        POSITION.startDate = rawPosition['Started On'];
        POSITION.endDate = rawPosition['Finished On'];
        POSITION.location = rawPosition.Location;

        return POSITION;
    });

    return POSITIONS;
}