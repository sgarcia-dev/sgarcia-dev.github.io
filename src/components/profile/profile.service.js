import profileData from '../../../assets/json/profile.json';

class ProfileService {
    constructor() {
        this.raw = profileData;

        this.profile = parseProfileFromRaw(this.raw);
        this.positions = parsePositionsFromRaw(this.raw);
        this.skills = parseSkillsFromRaw(this.raw);
        this.certifications = parseCertificationsFromRaw(this.raw);
        this.recommendations = parseRecommendationsFromRaw(this.raw);
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

function parseSkillsFromRaw(raw) {
    const rawSkills = Array.from(raw.skills);

    const SKILLS = rawSkills.map(rawSkill => {
        return rawSkill.Name
    });

    return SKILLS;
}

function parseCertificationsFromRaw(raw) {
    const rawCertifications = Array.from(raw.certifications);

    const CERTIFICATIONS = rawCertifications.map(rawCertification => {
        const CERTIFICATION = {};

        CERTIFICATION.name = rawCertification.Name;
        CERTIFICATION.authority = rawCertification.Authority;
        CERTIFICATION.date = new Date(rawCertification['Start Date']);
        CERTIFICATION.expirationDate = rawCertification['End Date'];
        CERTIFICATION.licenseNumber = rawCertification['License Number'];

        return CERTIFICATION;
    });

    return CERTIFICATIONS;
}

function parseRecommendationsFromRaw(raw) {
    const rawRecommendations = Array.from(raw.recommendationsReceived);

    const RECOMMENDATIONS = rawRecommendations.map(rawRecommendation => {
        const RECOMMENDATION = {};

        RECOMMENDATION.fullName = `${rawRecommendation['First Name']} ${rawRecommendation['Last Name']}`;
        RECOMMENDATION.jobTitle = rawRecommendation['Job Title'];
        RECOMMENDATION.company = rawRecommendation.Company;
        RECOMMENDATION.content = rawRecommendation.Text;
        RECOMMENDATION.date = new Date(rawRecommendation['Creation Date']);

        return RECOMMENDATION;
    });

    return RECOMMENDATIONS;
}