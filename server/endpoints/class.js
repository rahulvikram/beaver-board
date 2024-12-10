const { usersAdapter } = require('../services/firestoreAdapter');
const { authenticateToken } = require('../services/authUtility');
const { constructAssignment, constructClass } = require('../services/bbService');

module.exports = async (app) => {
    app.post('/class', authenticateToken, async (req, res) => {
        const { name } = req.body;
        const user = req.user;
        console.log(user);

        let newClass;
        try {
            newClass = constructClass(name);
        } catch (error) {
            return res.status(400).json({ success: false, message: error.message });
        }

        user.classes[newClass.id] = newClass;
        await usersAdapter.updateById(user.id, user); 

        console.log(user);
        return res.status(200).json({ success: true, class: newClass });
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

    app.post('/assignment/delete', authenticateToken, async (req, res) => {
        const { assignmentId, classId } = req.body;
        const user = req.user;
        console.log(user);

        if(!user.classes[classId]?.assignments?.[assignmentId]) {
            console.log(user.classes[classId],classId);
            return res.status(400).json({ success: false, message: 'Assignment or class not found' });
        }

        delete user.classes[classId].assignments[assignmentId];
        await usersAdapter.updateById(user.id, user); 

        return res.status(200).json({ success: true });
    })
}