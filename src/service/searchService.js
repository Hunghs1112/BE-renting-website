import db from "../models/index";
import { Op } from "sequelize";

const costTrans = (cost) => {
  switch (cost) {
    case "thoa-thuan":
      return 0;
    case "duoi-1-trieu":
      return { [Op.lte]: 1000000 };
    case "1-3-trieu":
      return { [Op.and]: [{ [Op.gt]: 1000000 }, { [Op.lte]: 3000000 }] };
    case "3-5-trieu":
      return { [Op.and]: [{ [Op.gt]: 3000000 }, { [Op.lte]: 5000000 }] };
    case "5-10-trieu":
      return { [Op.and]: [{ [Op.gt]: 5000000 }, { [Op.lte]: 10000000 }] };
    case "":
      return { [Op.gte]: 0 };
  }
};

const areaTrans = (area) => {
  switch (area) {
    case "duoi-30m":
      return { [Op.lte]: 30 };
    case "30-50m":
      return { [Op.and]: [{ [Op.gt]: 30 }, { [Op.lte]: 50 }] };
    case "50-80m":
      return { [Op.and]: [{ [Op.gt]: 50 }, { [Op.lte]: 80 }] };
    case "80-100m":
      return { [Op.and]: [{ [Op.gt]: 80 }, { [Op.lte]: 100 }] };
    case "":
      return { [Op.gt]: 0 };
  }
};

const getAllDistrict = async () => {
  const districts = await db.District.findAll({
    attributes: ["district_id", "district_name"],
  });

  const districtData = districts.map((district) =>
    district.get({ plain: true })
  );
  return districtData;
};

const districtTrans = async (district_id) => {
  if (!district_id) {
    // Nếu district_id là rỗng, trả về điều kiện không làm gì
    return { [Op.not]: { house_id: 0 } };
  }

  // Tìm kiếm tên quận/huyện
  const districtName = await db.District.findOne({
    attributes: ["district_name"],
    where: {
      district_id: district_id,
    },
  });

  // Kiểm tra nếu không tìm thấy kết quả
  if (!districtName) {
    console.log(">>> District not found for id:", district_id);
    return { [Op.not]: { id: 0 } };
  }

  const _district = districtName.get({ plain: true });
  const _districtName = _district.district_name;
  console.log(">>> Found district name:", _districtName);

  return {
    [Op.or]: [
      { house_name: { [Op.like]: '%${_districtName}%' } },
      { address: { [Op.like]: '%${_districtName}%' } },
      { description: { [Op.like]: '%${_districtName}%' } },
    ],
  };
};

const inputTrans = async (input) => {
  if (!input) {
    // Nếu district_id là rỗng, trả về điều kiện không làm gì
    return { [Op.not]: { house_id: 0 } };
  }
  return {
    [Op.or]: [
      { house_name: { [Op.like]: '%${input}%' } },
      { address: { [Op.like]: '%${input}%' } },
      { description: { [Op.like]: '%${input}%' } },
    ],
  };
};
//lấy danh sách tất cả các nhà
const getAllHouse = async () => {
  const houses = await db.House.findAll({
    attributes: [
      "house_name",
      "address",
      "area",
      "cost",
      "average_rate",
      "utilities",
      "image",
      "description",
    ],
  });

  const houseData = houses.map((house) => house.get({ plain: true }));
  return houseData;
};

//lấy dacnh sách nhà theo input nhập vào
const getHouseByInput = async () => {};

//lấy danh sách nhà theo giá, diện tích, quận/huyện
const getHouseByCostAndArea = async (cost, area, district, input) => {
  const _cost = cost ? cost : "";
  const _area = area ? area : "";
  const _district = district ? district : "";
  const _input = input ? input : "";

  // console.log(">>> _input:", _input);
  const houses = await db.House.findAll({
    attributes: [
      "house_id",
      "house_name",
      "address",
      "area",
      "cost",
      "average_rate",
      "utilities",
      "image",
      "description",
    ],
    where: {
      [Op.and]: [
        { cost: costTrans(_cost) },
        { area: areaTrans(_area) },
        await districtTrans(_district),
        await inputTrans(_input),
      ],
    },
  });

  const housesData = houses.map((house) => house.get({ plain: true }));
  return housesData;
};

module.exports = {
  getAllHouse,
  getAllDistrict,
  getHouseByCostAndArea,
  getHouseByInput,
};