const { Schema, model } = require("mongoose");
const handleMongooseError = require("../helpers/handleMongooseError");

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    organizer: {
      type: String,
      required: true,
    },
    participants: {
      type: [
        {
          name: {
            type: String,
            required: [true, "name is required"],
          },
          email: {
            type: String,
            required: [true, "name is required"],
          },
          dateOfBirth: {
            type: String,
            required: [true, "date of birth is required"],
          },
          hearInfo: {
            type: String,
            enum: ["socialMedia", "friends", "findMyself"],
            required: [true, "hear info is required"],
          },
        },
      ],
      required: true,
    },
  },
  { versionKey: false, timestamps: false }
);

eventSchema.post("save", handleMongooseError);

const Event = model("event", eventSchema);

const Joi = require("joi");

const addParticipantSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "missing required full name field",
  }),
  email: Joi.string().required().messages({
    "any.required": "missing required email field",
  }),
  dateOfBirth: Joi.string().required().messages({
    "any.required": "missing required date of birth field",
  }),
  hearInfo: Joi.string().required().messages({
    "any.required": "missing required hear info field",
  }),
});

module.exports = { Event, addParticipantSchema };
