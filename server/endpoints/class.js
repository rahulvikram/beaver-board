const { usersAdapter } = require('../services/firestoreAdapter');
const { authenticateToken } = require('../services/authUtility');

module.exports = async (app) => {
    app.post('/assignment', authenticateToken, async (req, res) => {
        const { name, due, points, type } = req.body;
        const user = req.user;
        console.log(user);
        
        // Validate
        try {
            if (!name || !due || !points || !type) {
                throw new Error("Missing assignment information");
            }

            if (type !== "assignment" && type !== "exam") {
                throw new Error("Invalid assignment type");
            }

            if (isNaN(points) || points <= 0) {
                throw new Error("Invalid points");
            }

            if (isNaN(due) || due <= 0) {
                throw new Error("Invalid due date");
            }

            if (name.length === 0 || name.length > 100) {
                throw new Error("Invalid name");
            }
        } catch (error) {
            return res.status(400).json({ success: false, message: error.message });
        }

        // Create assignment
        const assignment = {
            name,
            due,
            points,
            type,
        }
        console.log(assignment);

        return res.status(200).json({ success: true, assignment });
    });
}