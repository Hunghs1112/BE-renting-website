const getHomePage = async (req, res) => {
  try {
    const { House } = require("../models"); // Lấy model House từ DB
    const houses = await House.findAll(); // Lấy danh sách tất cả các nhà
    res.render("home", { houses }); // Render trang "home"
  } catch (error) {
    console.error("Error fetching houses:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
const getUserPage = (req, res) => {
  return res.render("user.ejs");
};

const getHousePage = async (req, res) => {
  try {
    const { House, Room, Comment } = require("../models"); // Lấy các model từ DB
    const house = await House.findByPk(req.params.id, {
      include: [
        {
          model: Room,
          as: "rooms", // Bao gồm danh sách phòng
          include: [{ model: Comment, as: "comments" }], // Kèm theo bình luận
        },
      ],
    });

    if (!house) {
      return res.status(404).render("404", { message: "House not found" });
    }

    res.render("house", { house }); // Truyền dữ liệu house vào view
  } catch (error) {
    console.error("Error fetching house details:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getLoginPage = (req, res) => {
  return res.render("login.ejs");
};

const getRegisterPage = (req, res) => {
  return res.render("Register.ejs");
};

const getSearchPage = (req, res) => {
  return res.render("search.ejs");
};

module.exports = {
  getHomePage,
  getUserPage,
  getHousePage,
  getLoginPage,
  getRegisterPage,
  getSearchPage,
};
