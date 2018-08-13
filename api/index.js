import express from "express";

const app = express();

app.get("*", (req,res) => {
	res.send("hello world haha");
});

app.listen(process.env.PORT || 3001, () => {
	console.log("Server is listening "+process.env.PORT+" || "+3001);
});