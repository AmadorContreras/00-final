import Users from "../models/Categorias.js";

// Registra un nuevo usuario
/*------------------------------------------*/
export const registerUser = async (req, res) => {

    const user = Users(req.body);
    user.save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));

   
}

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
// Actualiza dadot de un usuario
/*------------------------------------------*/
export const updateOneUser = async (req, res) => {
    const { username } = req.params;
    const { name, surname, address, birth } = req.body;
    Users
        .updateOne({ username: username }, {$set:{ name, surname, address, birth }})
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


