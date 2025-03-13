import { Router } from "express";
import { fecthAmbulaneBooking, getAllAmbulanceBooking, registerAmbulanceBooking } from "../controllers/ambulanceBooking.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";


const router = Router()

router.route("/register-ambulance-booking").post(verifyJWT, registerAmbulanceBooking)
router.route("/ambulane-booking-details").get(verifyJWT, fecthAmbulaneBooking)
router.route("/get-all-ambulane-booking-details").get(verifyJWT, getAllAmbulanceBooking)

export default router