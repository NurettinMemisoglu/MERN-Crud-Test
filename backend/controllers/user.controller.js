import User from "../models/user.model.js";

export const getUser = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json({ success: true, data: filteredUsers });
  } catch (error) {
    console.error("Error in getUser: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
