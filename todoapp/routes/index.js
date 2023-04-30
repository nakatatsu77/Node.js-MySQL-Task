const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "joker1177",
  database: "todo_app",
});

router.get("/", function (req, res, next) {
  connection.query(`select * from tasks;`, (error, results) => {
    console.log(error);
    console.log(results);
    res.render("index", {
      title: "ToDo App",
      todos: results,
    });
  });
});

router.post("/", function (req, res, next) {
  connection.connect((err) => {
    if (err) {
      console.log("error connecting: " + err.stack);
      return;
    }
    console.log("success");
  });
  const todo = req.body.add;
  connection.query(
    `insert into tasks (user_id, content) values (1, '${todo}');`,
    (error, results) => {
      console.log(error);
      res.redirect("/");
    }
  );
});

router.post("/:id/update", (req, res, next) => {
  const taskId = req.params.id;
  const newTask = req.body.newTask;
  connection.query(
    `UPDATE tasks SET content = '${newTask}' WHERE id = '${taskId}';`,
    (error, results) => {
      res.redirect("/");
    }
  );
});

router.post("/:id/delete", (req, res, next) => {
  const taskId = req.params.id;
  connection.query(
    `DELETE FROM tasks WHERE id = '${taskId}';`,
    (error, results) => {
      res.redirect("/");
    }
  );
});

module.exports = router;
