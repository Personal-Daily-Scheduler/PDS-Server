const UserDiary = require("../models/Diaries");

const getUserDiaries = async (req, res) => {
  const { userId } = req.params;

  try {
    const userDiaries = await UserDiary.findOne({ userId });

    if (!userDiaries) {
      return res.json({
        result: false,
        message: "해당 날짜의 데이터가 존재하지 않습니다.",
      });
    }

    return res.json({ result: true, message: userDiaries });
  } catch (error) {
    return res.json({ result: false, message: error.message });
  }
};

const saveUserDiary = async (req, res) => {
  const { userId, date } = req.params;
  const diaryObject = req.body;

  try {
    const userDiary = await UserDiary.findOneAndUpdate(
      { userId, date },
      { diary: diaryObject },
      { new: true, upsert: true },
    );

    res.json({
      result: true,
      message: "다이어리가 성공적으로 업데이트 되었습니다.",
      data: userDiary,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({ result: false, message: error.message });
  }
};

const deleteUserDiary = async (req, res) => {
  const { userId, date } = req.params;

  try {
    const deletedDiary = await UserDiary.findOneAndDelete({ userId, date });

    if (!deletedDiary) {
      return res.json({
        result: false,
        message: "해당 날짜의 다이어리가 존재하지 않습니다.",
      });
    }

    return res.json({
      result: true,
      message: "다이어리가 성공적으로 삭제되었습니다.",
      deletedDiary,
    });
  } catch (error) {
    return res.status(500).json({ result: false, message: error.message });
  }
};

module.exports = { getUserDiaries, saveUserDiary, deleteUserDiary };
