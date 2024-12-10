const { usersAdapter } = require('../services/firestoreAdapter');
const { authenticateToken } = require('../services/authUtility');
const { constructAssignment } = require('../services/bbService');

module.exports = async (app) => {
    app.post('/class', authenticateToken, async (req, res) => {
        const { name } = req.body;
        const user = req.user;
        console.log(user);
    })

    app.post('/assignment', authenticateToken, async (req, res) => {
        const { name, due, points, type, classId } = req.body;
        const user = req.user;
        console.log(user);
        
        let newAssignment;
        // Validate
        try {
            const classObj = user.classes[classId];
            if(!classObj) {
                throw new Error('Class not found');
            }

            newAssignment = constructAssignment(name, due, points, type);
        } catch (error) {
            return res.status(400).json({ success: false, message: error.message });
        }

        // Create assignment
        console.log(newAssignment);

        user.classes[classId].assignments[newAssignment.id] = newAssignment;
        await usersAdapter.updateById(user.id, user); 


        return res.status(200).json({ success: true, assignment: newAssignment });
    });
}