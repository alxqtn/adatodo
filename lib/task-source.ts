import fs from "fs";
export async function getTodos() {
  const task = JSON.parse(fs.readFileSync("./data/todos.json", "utf-8"));
  return task;
}
