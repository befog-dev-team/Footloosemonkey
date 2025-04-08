import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
    category: { type: String, required: true }, // e.g., "Dance", "Singing", "Instrumental"
    groupName: { type: String }, // For group registrations
    email: { type: String },
    name: { type: String },
    // ageCriteria: { type: String }, // e.g., "6-8 years", "9-12 years"
    age: { type: Number },
    guardianNumber: { type: String },
    address: { type: String },
    talent: { type: String },
    members: { type: String }, // For group registrations, list of member names
    charge: { type: String }, // Group charge based on age category
    termsAccepted: {
        videoSharing: { type: Boolean },
        offensiveContent: { type: Boolean },
        incidents: { type: Boolean }
    }
});

const Registration = mongoose.models.Registration || mongoose.model('Registration', registrationSchema);

export default Registration;