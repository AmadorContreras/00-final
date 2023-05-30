import Postres from "../models/allProducts.js";
// import bcrypt from 'bcryptjs';

// Registra un nuevo usuario
/*------------------------------------------*/
export const registerUser = async (req, res) => {
    try {
        // Get user input
        const { name, description, ingredients, price, sizes, parts, url } = req.body;

        console.log("registerUser", req.body);

        // Validate user input
        if (!(name && description && price)) {
            return res.status(400).json({
                "error": true,
                "message": "Datos necesarios no introducidos|nombre|des|price"
            });
        }

        // Check if user already exist. Validate if user exist in our database
        const oldUser1 = await Postres.findOne({ name });
        console.log("usuario encontrado 1", oldUser1);

        if (oldUser1) {
            // res.status(409).send("User Already Exist. Please Login");
            return res.status(409).json({
                "error": true,
                "message": "usuario ya registrado, inicia sesión"
            });

        }
        // Crear postre en base de datos
        const postre = await Postres.create({
                name,
                description,
                ingredients,
                price,
                sizes,
                parts,
                url
            });
        // return new user
        return res.status(201).json({
            "error": false,
            "message": "Register successful",
            "user": postre
        });

    } catch (err) {
        console.log(err);
    }
}


// Muestra todos los usuarios
/*------------------------------------------*/
export const allPostres = async (req, res) => {
    Postres
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
}
// // Busqueda de postres
// /*------------------------------------------*/
export const oneUser = async (req, res) => {
    const { name } = req.params;

    // let findPostres = { $regex: '.*' + name + '.*' };
    
    Postres
        .find({ name: new RegExp(name, 'i') })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
}
export const findOneUser = async (req, res) => {
    const { username } = req.params;
    Postres
        .findOne({ username })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
}
export const oneUserId = async (req, res) => {
    const { _id } = req.params;
    Postres
        .findById({ _id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
}
// Actualiza dados de un usuario
/*------------------------------------------*/
export const updateOneUser = async (req, res) => {
    const { name } = req.params;
    const { description, ingredients, price, sizes, parts, url } = req.body;
    Postres
        .updateOne({ name }, { $set: { name, description, ingredients, price, sizes, parts, url } })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
}
// Borra un usuario
/*------------------------------------------*/
export const removeOneUser = async (req, res) => {
    const { _id } = req.params;
    Postres
        .remove({ _id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
}



