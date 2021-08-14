const User = require ('../../models/user') ;

const ShowOneUser = async (req, res) => {
  const _userId = req.params.id;

  try {
    const user = await User.findOne({ _id: _userId });

    return res.status(200).json(user);

  } catch (error) {

    return res.status(400).json({
      errors: error,
    });
  }
};

module.exports = ShowOneUser;
