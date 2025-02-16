import userService from "../service/userService";

const createUser = async (req, res) => {
  console.log(">>> check req.body: ", req.body);

  //kiểm tra xem đã tồn tại tài khoản này chưa

  const hostExist = await userService.checkHostExist(
    req.body.email,
    req.body.username,
    req.body.phone
  );

  console.log(">>> check host exist:", hostExist);

  if (hostExist.length > 0) {
    console.log(
      ">>>ERROR: Email, Phone number or Username is already exist!!!"
    );
    return res.render("register.ejs");
  }

  if (req.body.role === "client") {
    await userService.createClient(req.body);
  } else if (req.body.role === "host") {
    await userService.createHost(req.body);
  }

  console.log(">>>REGISTER SUCCESS!!!");
  return res.render("home.ejs");
};

const login = async (req, res) => {
  // console.log(">>> check req.body: ", req.body);
  const user = await userService.checkLogin(
    req.body.emailPhone,
    req.body.password
  );
  console.log(">>> user: ", user);

  const _user = user.get({ plain: true });

  console.log(">>> check _user: ", _user);

  if (_user) {
    console.log(">>> Login success!!!");
    return res.render("home.ejs");
  } else {
    console.log(">>> Incorrect phone email or password");
    return res.render("login.ejs");
  }
};

module.exports = {
  createUser,
  login,
};
