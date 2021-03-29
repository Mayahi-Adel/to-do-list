const { response } = require('express');
const Lists = require('../models/lists');



//Recuperer toutes les notes
exports.findAll = (request, response) => {
    Lists.getAll((error, lists) => {
        if (error) {
            response.send(error.message);
        }

        response.render('listsOfTasks.ejs', { lists });
    })
    
}

// Recuperer toutes les taches d'une note
exports.findOne = (req, res) => {
    Lists.findById(req.params.idList, (error, list) => {
        if(error) {
            res.send('error : ', error.message)
        } 
        let listName;
        
        if (list == ""){
             listName = "Pas de taches !"; 
        } else {
            listName = list[0].name;
        }
         
        let listId = req.params.idList;
        res.render('tasksByList.ejs', { listId, listName, list })
        
    })
}

// Recuperer les datails d'une tache
exports.findtaskDetail = (req, res) => {
    Lists.findOne(req.params.idTask, (error, task) => {
        if(error){
            console.log('error : ', 'Not found task with id' + req.params.idTask )
        } else {
            res.render('taskDetails.ejs', { task })
        }
    })
}

// Ajouter une note
exports.addList = (req, res) => {
    
    Lists.addOne(req.body, (error, result) => {
        if(error){
            res.send(error.message)
        }
        res.redirect('/');
    })
}

// Supprimer une note
exports.deleteList = (req, res) => {
    
    Lists.remove(req.params.idList, (error, list) => {
        if(error){
            console.log('error : ', 'id list problem')
        } else {
            res.redirect('/')
        }
    })
}

//Modifier etat tache
exports.editState = (req, res) => {
    const state = req.params.state;
    const listId = req.params.listId;
    const taskId = req.params.taskId;
    Lists.edit(taskId, state, (error, tache) => {
        if(error){
            res.send(error.message)
        }
        res.redirect(`/tasksByList/${ listId }`)
    })
}

// Ajouter une tache
exports.addTask = (req, res) => {
    
    Lists.addNewTask(req.body, (error, task) => {
        
        if(error){
            res.send(error.message)
        }
        
        res.redirect(`/tasksByList/${ req.body.listId }`)
    })
}

// delete task
exports.removeTask = (req, res) => {

    Lists.delete(req.params.idTask, (error, task) => {
        if(error){
            res.send(error.message)
        }
     
        res.redirect(`/tasksByList/${ req.params.idList }`)
    })
}