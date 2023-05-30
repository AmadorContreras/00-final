import Users from "./../models/Users.js";
import bcrypt from 'bcryptjs';

// Registra un nuevo usuario
/*------------------------------------------*/
export const registerUser = async (req, res) => {
    try {
        // Get user input
        const { username,name,surname,address, email,birth, password } = req.body;

        console.log("registerUser", req.body);
        
        // Validate user input
        if (!(email && password && username)) {
            return res.status(400).json({
                "error": true,
                "message": "All input is required"
            });
        }

        // Check if user already exist. Validate if user exist in our database
        const oldUser1 = await Users.findOne({ username });
        const oldUser2 = await Users.findOne({ email });
        console.log("usuario encontrado 1", oldUser1);
        
        if (oldUser1) {
            // res.status(409).send("User Already Exist. Please Login");
            return res.status(409).json({
                "error": true,
                "message": "usuario ya registrado, inicia sesión"
            });

        }
        if (oldUser2) {
            return res.status(409).json({
                "error": true,
                "message": "mail ya registrado, inicia sesión"
            });
        }


        //Encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await Users.create({
            username: username.toLowerCase(),
            name,
            surname,
            address,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            birth,
            password: encryptedPassword
            // password: password
        });
        // return new user
        return res.status(201).json({
            "error": false,
            "message": "Register successful",
            "user": user
        });

    } catch (err) {
        console.log(err);
    }
}

// Autentica un nuevo usuario
/*------------------------------------------*/
export const loginUser = async (req, res) => {
    try {
        // Get user input
        const { email, password } = req.body;

        console.log(req.body);
        console.log(email);
        console.log(password);
        // Validate user input
        if (!(email && password)) {
            //res.status(400).send("All input is required");
            // Con el error 400 informamos que no se ha podido resolver la solicitud
            res.status(400).json(
                {
                    "error": true,
                    "message": "All input is required in login"
                }
            );
        }
        // Validate if user exist in our database
        const user = await Users.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // user and password are valid. Send user data
            res.status(200).json({
                "error": false,
                "message": "Login successful",
                "user": user
            });
        } else {
            // Password is not valid
            //res.status(400).send("Invalid Credentials");
            res.status(400).json(
                {
                    "error": true,
                    "message": "Invalid Credentials"
                }
            );
        }

    } catch (err) {
        console.log(err);
    }
};

// Muestra todos los usuarios
/*------------------------------------------*/
export const allUsers = async (req, res) => {
    Users
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
}
// Muestra un  usuario
/*------------------------------------------*/
export const oneUser = async (req, res) => {
    const { username } = req.params;

    let findUsers = { $regex: '.*' + username + '.*' };
    Users
        .find({ username: findUsers })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
}
export const findOneUser = async (req, res) => {
    const { username } = req.params;
    Users
        .findOne({ username })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
}
export const oneUserId = async (req, res) => {
    const { _id } = req.params;
    Users
        .findById({ _id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
}
// Actualiza dados de un usuario
/*------------------------------------------*/
export const updateOneUser = async (req, res) => {
    const { username } = req.params;
    const { name, surname, address, birth } = req.body;
    Users
        .updateOne({ username: username }, { $set: { name, surname, address, birth } })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
}
// Borra un usuario
/*------------------------------------------*/
export const removeOneUser = async (req, res) => {
    const { _id } = req.params;
    Users
        .remove({ _id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
}



