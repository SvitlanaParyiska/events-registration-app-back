const { Event } = require("../models/event");
const { ctrlWrapper, HttpError } = require("../helpers");

const getAllEvents = async (req, res) => {
  const result = await Event.find();
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const getEventById = async (req, res) => {
  const { id } = req.params;
  const result = await Event.findById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const getEventParticipants = async (req, res) => {
  const { id } = req.params;
  const result = await Event.findById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result.participants);
};

const addParticipant = async (req, res) => {
  const { id } = req.params;
  const { name, email, dateOfBirth, hearInfo } = req.body;
  const resultEvent = await Event.findById(id);
  if (!resultEvent) {
    throw HttpError(404, "Event not found");
  }
  if (resultEvent.participants.find((item) => item.email === email)) {
    throw HttpError(409, "User with this email is already registered");
  }
  const newParticipants = [
    ...resultEvent.participants,
    {
      name,
      email,
      dateOfBirth,
      hearInfo,
    },
  ];
  console.log(newParticipants);
  const result = await Event.findOneAndUpdate(
    { _id: id },
    { participants: newParticipants },
    { new: true }
  );
  res.json(result);
};

module.exports = {
  getAllEvents: ctrlWrapper(getAllEvents),
  getEventById: ctrlWrapper(getEventById),
  getEventParticipants: ctrlWrapper(getEventParticipants),
  addParticipant: ctrlWrapper(addParticipant),
};
