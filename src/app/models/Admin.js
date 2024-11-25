import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
    _id: { type: String }, // UUID will be a string
    talent: { type: String },
    offerCharge: { type: String },
    groupACharge: { type: String },
    groupBCharge: { type: String },
    groupCCharge: { type: String },
});

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

export default Admin;
