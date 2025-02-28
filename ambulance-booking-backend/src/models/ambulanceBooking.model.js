import mongoose, { Schema } from "mongoose";

const ambulanceBookingSchema = Schema(
    {
        patientName: {
            type: String
        },
        patientAge: {
            type: String
        },
        patientMobile: {
            type: Number
        },
        patientGender: {
            type: String,
            enum: ["male", "female"],
            lowercase: true
        },
        pickupLocation: {
            type: String
        },
        destination: {
            type: String,
        },
        emergencyType: {
            type: String
        },
        preferredAmbulanceType: {
            type: String
        },
        appointmentDate: {
            type: String,
            trim: true,
            set: function (value) {
                if (value) {
                    const originalDate = new Date(value);
                    if (!isNaN(originalDate)) {
                        return originalDate
                            .toLocaleDateString('en-GB') // Format as dd-mm-yyyy
                            .split('/')
                            .join('-'); // Replace "/" with "-"
                    }
                }
                return value;
            },
        },
        appointmentTime: {
            type: String,
            trim: true,
            set: function (value) {
                if (value) {
                    const originalTime = new Date(`1970-01-01T${value}`);
                    if (!isNaN(originalTime)) {
                        return originalTime.toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                        });
                    }
                }
                return value;
            },
        },
        userEmail: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

export const AmbulanceBooking = mongoose.model("AmbulanceBooking", ambulanceBookingSchema)