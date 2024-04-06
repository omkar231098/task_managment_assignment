const validateTaskData = (req, res, next) => {
    const { title, description, dueDate } = req.body;
    
    // Check if required fields are present
    if (!title || !description || !dueDate) {
        return res.status(400).json({ message: "Title, description, and dueDate are required fields" });
    }

    // Check data types
    if (typeof title !== "string" || typeof description !== "string" || typeof dueDate !== "string") {
        return res.status(400).json({ message: "Invalid data types" });
    }

    // Continue to the next middleware if validation passes
    next();
};

module.exports = validateTaskData;
