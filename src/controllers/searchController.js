import searchService from "../service/searchService";

const handleFindAllHouses = async (req, res) => {
  console.log(">>> check req.query: ", req.query);
  console.log(">>> check req.params: ", req.params);
  let housesData;
  if (
    (req.query && (req.query.dt || req.query.gia || req.query.input)) ||
    (req.params && req.params.district_id)
  ) {
    const cost = req.query.gia;
    const area = req.query.dt;
    const district_id = req.params.district_id;
    const input = req.query.input;

    console.log(">>> check input: ", input);

    housesData = await searchService.getHouseByCostAndArea(
      cost,
      area,
      district_id,
      input
    );
    // console.log(">>> check housesData by cost and area: ", housesData);
  } else {
    housesData = await searchService.getAllHouse();
    // console.log(">>> check all houseData: ", housesData);
  }
  const districtData = await searchService.getAllDistrict(); // lấy dữ liệu tất cả các quận huyện cho nút chọn quận huyện
  return res.render("search.ejs", {
    housesData: housesData,
    districtData: districtData,
  });
};

const handleSelectDistrict = async (req, res) => {
  const district_id = req.params.district_id;
  const districtData = await searchService.getAllDistrict();
  // console.log(">>> district_id : ", district_id);
  const HouseInDistrictData = await searchService.getHouseInDistrict(
    district_id
  );

  return res.render("search.ejs", {
    housesData: HouseInDistrictData,
    districtData: districtData,
  });
};

module.exports = {
  handleFindAllHouses,
  handleSelectDistrict,
};