import db from "../models/index";
import { Op } from "sequelize";

const checkClientExist = async (email, phone, username) => {
  return await db.Client.findAll({
    where: {
      [Op.or]: [{ email: email }, { phone: phone }, { username: username }],
    },
  });
};

const createClient = async (userData) => {
  const { email, username, phone, password, gender } = userData;
  return await db.Client.create({
    email: email,
    username: username,
    phone: phone,
    password: password,
    gender: gender,
  });
};

const checkHostExist = async (email, phone, username) => {
  return await db.Host.findAll({
    attributes: ["email", "phone", "host_name"],
    where: {
      [Op.or]: [{ email: email }, { phone: phone }, { host_name: username }],
    },
  });
};

const createHost = async (userData) => {
  const { email, username, phone, password, gender } = userData;
  return await db.Host.create({
    email: email,
    host_name: username,
    phone: phone,
    password: password,
    gender: gender,
  });
};

const checkLogin = async (emailPhone, password) => {
  return await db.Host.findOne({
    attributes: ["email", "phone", "host_name"],
    where: {
      [Op.or]: [
        {
          email: emailPhone,
          password: password,
        },
        { phone: emailPhone, password: password },
      ],
    },
  });
};

module.exports = {
  checkClientExist,
  createClient,
  checkHostExist,
  createHost,
  checkLogin,
};
