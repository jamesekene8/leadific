const mongoose = require("mongoose");

const domainSchema = new mongoose.Schema({
  domainName: {
    type: String,
    required: [true, "A domain must have a name"],
    unique: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  ownerId: String,
});

const Domain = mongoose.model("Domain", domainSchema);

module.exports = Domain;
