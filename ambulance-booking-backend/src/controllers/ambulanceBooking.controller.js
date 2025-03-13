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
        const userFullName = user.fullName

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
            userFullName: userFullName || "undefined",
            userEmail: userEmail || "testv@example.com"
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
    try {
        const user = req.user
        const userEmail = user.email

        if (!user) {
            throw new ApiError(400, "please login")
        }

        const ambulanceBookingDetails = await AmbulanceBooking.find({ userEmail })

        if (!ambulanceBookingDetails) {
            throw new ApiError(400, "no detail found")
        }

        return res
            .status(201)
            .json(
                new ApiResponse(200, ambulanceBookingDetails, "ambulance booking details fetched successfully")
            )
    } catch (error) {
        throw new ApiError(500, "Internal server error")
    }
})

const getAllAmbulanceBooking = asyncHandler(async (req, res) => {
    try {
        const ambulanceBookingDetails = await AmbulanceBooking.find()

        if (!ambulanceBookingDetails) {
            throw new ApiError(400, "no detail found")
        }

        return res
            .status(201)
            .json(new ApiResponse(200, ambulanceBookingDetails, "ambulance details fetched successfully"))
    } catch (error) {
        throw new ApiError(500, "Internal server error")
    }
})

export {
    registerAmbulanceBooking,
    fecthAmbulaneBooking,
    getAllAmbulanceBooking
}