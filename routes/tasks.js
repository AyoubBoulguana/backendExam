const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

// Create new task by user
router.post("/", async (req, res) => {
  const { title, description, category, userId } = req.body;

  if (!title || !category || !userId) {
    return res
      .status(400)
      .json({ error: "Title, category, and userId are required." });
  }

  const validCategories = ["WORK", "PERSONAL", "HEALTH", "FITNESS", "OTHER"];
  if (!validCategories.includes(category)) {
    return res.status(400).json({
      error: `Invalid category. Valid categories are: ${validCategories.join(
        ", "
      )}`,
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    const task = await prisma.task.create({
      data: {
        title,
        description,
        category,
        userId: parseInt(userId),
      },
    });

    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create task." });
  }
});
// Get all tasks without category for a user
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const tasks = await prisma.task.findMany({
      where: { userId: parseInt(userId), isDeleted: false },
    });
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// Update a task
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, category } = req.body;
  try {
    const task = await prisma.task.update({
      where: { id: parseInt(id) },
      data: { title, description, category },
    });
    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update task" });
  }
});

// Soft delete a task
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const task = await prisma.task.update({
      where: { id: parseInt(id) },
      data: { isDeleted: true },
    });
    res.status(200).json({ message: "Task soft deleted", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to soft delete task" });
  }
});

module.exports = router;
