/**
 * Routas de usuarios
 * host + /api/auth
 *
 */

const express = require("express");
const router = express.router;
const { createUser, renewToken, loginUser } = require("../controllers/auth");

/**grabar usuario */
router.post("/new", createUser);

router.post("/", loginUser);

router.get("/renew", renewToken);

module.exports = router;
