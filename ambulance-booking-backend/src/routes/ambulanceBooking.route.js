import { Router } from "express";
import { fecthAmbulaneBooking, registerAmbulanceBooking } from "../controllers/ambulanceBooking.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";


const router = Router()

router.route("/register-ambulance-booking").post( registerAmbulanceBooking)
router.route("/ambulane-booking-details").get(verifyJWT, fecthAmbulaneBooking)

export default router