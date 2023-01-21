const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    minLength: [3, "Name must have at least 3 characters"],
    required: [true, "Why no name?"],
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /^\d{2,3}-?\d{1,}$/.test(v);
      },
      minlength: [8, "Number must have at least 8 characters"],
      required: [true, "Why no number?"],
    },
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("People", personSchema);
