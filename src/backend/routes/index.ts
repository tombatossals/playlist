/// <reference path="../../../typings/tsd.d.ts" />

import * as express from "express";
var router = express.Router();

router.get("/", (req, res) => {
	res.render("index", { title: "PlayList APP", message: "Hello there!" });
});

export = router;