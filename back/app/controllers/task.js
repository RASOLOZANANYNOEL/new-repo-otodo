const { Task } = require('../models');

const taskController = {

    listTasks: async function (req, res) {
        // Récupérer la liste des taches
        const allTasks = await Task.findAll({
            order: [['id', 'ASC']]
        })
        // Renvoyer la liste des taches en json
        res.json(allTasks);
    },

    createTask: async function (req,res,next){
        const name = req.body.name;
        try {
            const task = await Task.create({name});
            res.json(task)
        } catch (error) {
                res.status(500).json({
                    statusCode: 500,
                    message: "Server error",
                })
            }
    },
    updateTask: async function (req,res,next){
        const taskId = Number(req.params.id);
        try {
            const task = await Task.findByPk(taskId)
            // récupérer les données envoyées dans la requête post
            const taskData = {
                name: req.body.name || task.name,
            }
            // mettre à jour le model
            await task.update(taskData);
            // renvoyer le model à jour
            res.json(task);
        } catch (error) {
            res.status(500).json({
                statusCode: 500,
                message: "Server error",
            })
        }
    }
}


module.exports = taskController;
