import db from "../../models/index";
import { Op, where } from "sequelize";

const fetchAllPost = async () => {
  try {
    const posts = await db.House.findAll({
      attributes: [
        "house_id",
        "house_name",
        "address",
        "area",
        "cost",
        "average_rate",
        "description",
        "image",
      ],
      include: [
        {
          model: db.Image,
          as: "images",
        },
        {
          model: db.Utilities,
          as: "Utilities",
        },
      ],
    });

    return {
      EM: "get all posts success!",
      EC: 0,
      DT: posts,
    };
  } catch (e) {
    console.log(">>> catch error in service: ", e);
    return {
      EM: "Something went wrong in service.",
      EC: -2,
      DT: "",
    };
  }
};

const uploadAPost = async (postData) => {
  try {
    const {
      address,
      kind,
      cost,
      area,
      utilities,
      host_name,
      phone,
      email,
      house_name,
      description,
      images,
    } = postData;

    // Kiểm tra dữ liệu đầu vào
    if (!host_name) {
      return { EM: "Host name is required.", EC: -1, DT: "" };
    }
    if (!Array.isArray(images) || images.length === 0) {
      return { EM: "At least one image is required.", EC: -1, DT: "" };
    }
    if (!utilities) {
      return { EM: "Utilities data is required.", EC: -1, DT: "" };
    }

    // Tìm host
    const user = await db.Host.findOne({
      attributes: ["id"],
      where: { host_name },
    });

    if (!user) {
      return { EM: "Host not found.", EC: -1, DT: "" };
    }
    console.log(">>> check user: ", user.get({ plain: true }));

    const host_id = user.id;

    // Tạo House
    const house = await db.House.create({
      house_name,
      address,
      image: images[0],
      area,
      cost,
      description,
      owner_id: host_id,
    });

    const house_id = house.house_id;

    // Tạo Utilities
    await db.Utilities.create({
      house_id,
      bedrooms: utilities.numberBedroom,
      floors: utilities.numberFloor,
      bathrooms: utilities.numberBathroom,
      security: utilities.security,
      fire_protection: utilities.pccc,
      parking: utilities.parking,
      camera: utilities.camera,
    });

    // Tạo Image bằng Promise.all()
    const imgs = await Promise.all(
      images.map(async (img) => {
        let createdImg = await db.Image.create({ house_id, images: img });
        return createdImg.get({ plain: true });
      })
    );

    return {
      EM: "Create new post success!!!",
      EC: 0,
      DT: { house, utilities, images: imgs },
    };
  } catch (e) {
    console.error(">>> catch error in service:", e);
    return {
      EM: "Something went wrong in service.",
      EC: -2,
      DT: "",
    };
  }
};

module.exports = {
  fetchAllPost,
  uploadAPost,
};
