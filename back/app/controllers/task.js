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

    createTask: async function (req,res){
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
    updateTask: async function (req,res){

        const taskId = req.params.id;
        const task = await Task.findByPk(taskId);
        if (! task) {
            return res.status(404).json({ error: "Cannot find Task. Please verify the provided ID in the URL path."});
        }

        const { name } = req.body;
        task.set({ name });
        await task.save();
        res.json(task);
        
      /*   const taskId = Number(req.params.id);
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
        } */
    },
    
    deleteTask: async function (req,res){
        const taskId = req.params.id;
        const task = await Task.findByPk(taskId);
        if (task) {
            await task.destroy();
        }
        res.status(204).end();
    }


}


module.exports = taskController;
