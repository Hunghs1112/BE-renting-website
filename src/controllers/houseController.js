const db = require("../models");
const { House, Comment, Utilities, Image } = db;

const houseController = {
  createHouse: async (req, res) => {
    try {
      const { house_name, address, number_of_room, owner_id, area, cost, utilities } = req.body;
      const image = req.file ? `/uploads/${req.file.filename}` : null;

      const newHouse = await House.create({
        house_name,
        address,
        number_of_room,
        owner_id,
        area,
        cost,
        image,
        created_date: new Date(),
      });

      return res.redirect("/houses"); // Chuyển về trang danh sách houses sau khi tạo
    } catch (error) {
      console.error("Error creating house:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Lấy danh sách tất cả bài đăng nhà
  // getAllHouses: async (req, res) => {
  //   try {
  //     const houses = await House.findAll();
  //     return res.render("home", { houses });
  //   } catch (error) {
  //     return res.status(500).json({ success: false, message: error.message });
  //   }
  // },

  getAllHouses: async (req, res) => {
    try {
        const houses = await House.findAll({
            attributes: ["house_id", "house_name", "address", "number_of_room", "image", "area", "cost", "average_rate", "utilities", "description", "owner_id"]
        });
        res.status(200).json(houses);
    } catch (error) {
        res.status(500).json({ message: "Lỗi lấy danh sách nhà", error });
    }
},

  // Lấy thông tin chi tiết một bài đăng nhà theo ID
  getHouseById: async (req, res) => {
    try {
      const { id } = req.params;
      const house = await House.findByPk(id, {
        // include: [
        //   {
        //     model: Room,
        //     as: 'rooms',
        include: [
          {
            model: Comment,
            as: "comments",
          },
        ],
        //   },
        // ],
      });
      console.log("House details:", house);

      if (!house) {
        return res.status(404).render("404", { message: "House not found" });
      }

      res.render("house", { house });
    } catch (error) {
      // console.error('Error fetching house by ID:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },
  getHouseByIdUser: async (req, res) => {
    try {
        const { id } = req.params;
        const house = await House.findByPk(id, {
            attributes: [
                "house_id",
                "house_name",
                "address",
                "number_of_room",
                "image",
                "area",
                "cost",
                "average_rate",
                "description",
                "owner_id"
            ],
            include: [
                {
                    model: Comment,
                    as: "comments",
                },
                {
                    model: Image,
                    as: "images",
                    attributes: ["id", "images"],
                },
                {
                    model: Utilities,
                    as: "Utilities", // Thêm tiện ích vào kết quả trả về
                    attributes: [
                        "bedrooms",
                        "floors",
                        "bathrooms",
                        "security",
                        "fire_protection",
                        "parking",
                        "camera"
                    ],
                }
            ],
        });

        if (!house) {
            return res.status(404).json({ success: false, message: "House not found" });
        }

        res.json({ success: true, data: house });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
},



  // Cập nhật thông tin bài đăng nhà
  updateHouse: async (req, res) => {
    try {
      const { id } = req.params;
      const { house_name, address, number_of_room, utilities } = req.body;

      const bodyUpdate = { house_name, address, number_of_room };
      if (req.file) {
        bodyUpdate.image = `/uploads/${req.file.filename}`;
      }

      const house = await House.findByPk(id);
      if (!house) {
        return res.status(404).json({ success: false, message: "House not found" });
      }

      await house.update(bodyUpdate);

      if (utilities && Array.isArray(utilities)) {
        await Utilities.destroy({ where: { house_id: id } });
        const UtilitiesData = utilities.map((util) => ({
          house_id: id,
          name: util,
        }));
        await Utilities.bulkCreate(UtilitiesData);
      }
      return res.redirect("/houses");

      // return res.json({ success: true, message: "House updated successfully" });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  deleteHouse: async (req, res) => {
    try {
      const { id } = req.params;
      const house = await House.findByPk(id);

      if (!house) {
        return res.status(404).json({ success: false, message: "House not found" });
      }

      await Utilities.destroy({ where: { house_id: id } });
      await house.destroy();
      return res.redirect("/houses");
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  addComment: async (req, res) => {
    try {
      const { house_id } = req.params;
      const { rating, description, rater_id } = req.body;

      await Comment.create({
        house_id,
        rater_id,
        rating,
        description,
        created_date: DEFAULT_TIMESTAMP,
      });

      return res.redirect(`/houses/${house_id}`);
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },


addCommentByUser: async (req, res) => {
  try {
      const { id } = req.params; // Lấy house_id từ URL
      const { rater_id, rating, description } = req.body;

      if (!id || !rater_id || !rating || !description) {
          return res.status(400).json({ success: false, message: "Thiếu thông tin comment" });
      }

      const newComment = await Comment.create({
          house_id: id,
          rater_id,
          rating,
          description,
          created_date: new Date(),
      });

      return res.status(201).json({
          success: true,
          message: "Comment đã được thêm thành công",
          data: newComment
      });
  } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
  }
},

};

module.exports = houseController;
