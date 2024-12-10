const USER_SCAFFOLD = {
    id: '',
    email: '',
    name: '',
    classes: [],
    password: '',
}

const CLASS_SCAFFOLD = {
    id: '',
    name: '',
    assignments: [],
}

const ASSIGNMENT_SCAFFOLD = {
    name: '',
    due: 0,
    points: 0,
}

const { v4: uuidv4 } = require('uuid');

function generateId() {
    return uuidv4()
}

function constructUser(email, password, name) {
    if(!email || email.length < 1) {
        throw new Error('Invalid email');
    }

    if(!password || password.length < 1) {
        throw new Error('Invalid password');
    }

    if(!name || name.length < 1) {
        throw new Error('Invalid name');
    }

    const user = { ...USER_SCAFFOLD };
    user.id = generateId();
    user.email = email;
    user.password = password;
    user.name = name;
    return user;
}

function constructClass(name) {
    if(!name || name.length < 1) {
        throw new Error('Invalid class name');
    }

    const classObj = { ...CLASS_SCAFFOLD };
    classObj.id = generateId();
    classObj.name = name;
    return classObj;
}

function constructAssignment(name, due, points, type) {
    if(!name || name.length < 1) {
        throw new Error('Invalid assignment name');
    }

    if(!due || due < 0) {
        throw new Error('Invalid assignment due date');
    }

    if(!points || points < 0) {
        throw new Error('Invalid assignment points');
    }


    if (!type || !['assignment', 'exam'].includes(type)) {
        throw new Error('Invalid assignment type');
    }

    const assignmentObj = { ...ASSIGNMENT_SCAFFOLD };
    assignmentObj.id = generateId();
    assignmentObj.name = name;
    assignmentObj.due = due;
    assignmentObj.points = points;
    assignmentObj.type = type;
    return assignmentObj;
}

module.exports = {
    constructUser,
    constructClass,
    constructAssignment
}