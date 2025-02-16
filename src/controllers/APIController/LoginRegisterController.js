import loginRegisterService from "../../service/FE/loginRegisterService";

const register = async (req, res) => {
  console.log(">>> check req.body: ", req.body);
  try {
    if (!req.body) {
      return res.status(404).json({
        EM: "Missing data",
        EC: -2,
        Data: "",
      });
    }

    let data = await loginRegisterService.createAnUser(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (e) {
    console.log(">>> catch error from apiController: ", e);
    return res.status(500).json({
      EM: "error from server",
      EC: "-2",
      DT: "",
    });
  }
};

const login = async (req, res) => {
  console.log(">>> check req.body: ", req.body);
  try {
    if (!req.body) {
      return res.status(404).json({
        EM: "Missing data",
        EC: -2,
        Data: "",
      });
    }

    let data = await loginRegisterService.findAnUser(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (e) {
    console.log(">>> catch error from apiController: ", e);
    return res.status(500).json({
      EM: "error from server",
      EC: "-2",
      DT: "",
    });
  }
};

module.exports = {
  register,
  login,
};
