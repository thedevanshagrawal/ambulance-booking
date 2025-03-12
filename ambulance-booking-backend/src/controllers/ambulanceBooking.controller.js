import { AmbulanceBooking } from "../models/ambulanceBooking.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const registerAmbulanceBooking = asyncHandler(async (req, res) => {
    try {
        const { patientName, patientMobile, patientAge, patientGender, pickupLocation, destination, emergencyType, preferredAmbulanceType, appointmentDate, appointmentTime } = req.body


        // if (!patientName || !patientMobile || !patientAge || !patientGender || !pickupLocation || !emergencyType || !preferredAmbulanceType || !appointmentDate || !appointmentTime) {
        //     throw new ApiError(400, "All fields are required")
        // }

        const user = req.user
        const userEmail = user.email

        const newAmbulanceBooking = await AmbulanceBooking.create({
            patientName,
            patientMobile: patientMobile || "12345",
            patientAge: patientAge || "20",
            patientGender: patientGender || "male",
            pickupLocation: pickupLocation || "raipur",
            destination: destination || "bhilai",
            emergencyType: emergencyType || "accident",
            preferredAmbulanceType: preferredAmbulanceType || "ambulance",
            appointmentDate: appointmentDate || "2023-01-01",
            appointmentTime: appointmentTime || "10:00",
            userEmail: userEmail || "n2M1v@example.com"
        })

        if (!newAmbulanceBooking) {
            throw new ApiError(400, "Something went wrong while registering the ambulance booking")
        }

        return res
            .status(201)
            .json(
                new ApiResponse(200, newAmbulanceBooking, "Ambulance booking registered successfully")
            )
    } catch (error) {
        console.log("Error in registering ambulance booking: ", error)
    }
})

const fecthAmbulaneBooking = asyncHandler(async (req, res) => {
    const user = req.user
    const userEmail = user.email
    const ambulanceBookingDetails = await AmbulanceBooking.find({ userEmail })

    return res
        .status(201)
        .json(
            new ApiResponse(200, ambulanceBookingDetails, "ambulance booking details fetched successfully")
        )
})

export {
    registerAmbulanceBooking,
    fecthAmbulaneBooking
}