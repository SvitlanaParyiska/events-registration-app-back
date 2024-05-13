const express = require("express");

const {
  getAllEvents,
  getEventById,
  getEventParticipants,
  addParticipant,
} = require("../../controllers/events");

const { validateBody } = require("../../middlewares");
const { addParticipantSchema } = require("../../models/event");

const router = express.Router();

router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.get("/participants/:id", getEventParticipants);
router.post(
  "/participants/:id",
  validateBody(addParticipantSchema),
  addParticipant
);

module.exports = router;
