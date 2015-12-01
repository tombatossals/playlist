/// <reference path="../../../typings/tsd.d.ts" />

import * as express from "express";
var router = express.Router();

router.get("/", (req, res) => {
	res.send("Hello");
});

export = router;