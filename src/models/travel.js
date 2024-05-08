import mongoose from 'mongoose';

const tripSchema = mongoose.Schema({
    user:{
        type: String,
        ref: 'user',
        required:[true,"Please insert user's name"]
    },
    tripName:{
        type: String,
        required: [true,"Please provide trip name"]
    },
    startDate:{
        type: Date,
        required: [true,"Please provide start date"]
    },
    endDate:{
        type: Date,
        required: [true,"Please provide end date"]
    },
    source: String,
    destination: String,
    budget: Number,
    itinerary:{
        type: String,
        required: [true,"Please provide itinerary"]

    }
});

const Trip = mongoose.models.Trip || mongoose.model("Trip",tripSchema);

export default Trip;