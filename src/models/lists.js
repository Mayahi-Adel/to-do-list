const db = require('../db');


exports.getAll = (callback) => {
    db.query("SELECT id, name, DATE_FORMAT(date_creation, '%d/%m/%Y') date_creation FROM lists ORDER BY date_creation DESC", (error, result) => {
        if (error){
            console.log('error: ', error);
            callback(error, null);
            return;
        }
       
        callback(null, result);

    })
}

exports.addOne = (list, callback) => {
    const date = createDate();

    db.query(`INSERT INTO lists (name, date_creation) VALUE ("${list.name}", "${date}")`, (error, result) => {
        if(error) {
            console.log('error: ', error);
            callback(error, null)
        }
        callback(null, result)
    })
}

exports.remove = (idList, callback) => {
    console.log(idList)
    db.query(`DELETE FROM lists WHERE id = "${idList}"`, (error, result) => {
        if(error) {
            console.log('error : ', error);
            callback(error, null);
        }
        callback(null, result);
    })

}

exports.findById = (idList, callback) => {
        
    db.query(`SELECT * FROM Tasks INNER JOIN Lists ON id = ${idList} WHERE Tasks.listId = ${idList} ORDER BY date DESC`, (error, result) => {
        if (error){
            console.log('error: ', error);
            callback(error, null);
            return;
        }
        
        callback(null, result);
    })
}

exports.findOne = (idtask, callback) => {
        
    db.query(`SELECT * FROM to_do_list_db.Tasks WHERE id_task = ${idtask}`, (error, result) => {
        if (error){
            console.log('error: ', error);
            callback(error, null);
            return;
        }
        callback(null, result);
    })
}

exports.edit = (idtask, state, callback) => {

    const etat = (state == 1)? 0 : 1;
    db.query(`UPDATE Tasks SET state = ${etat} WHERE id_task = ${idtask}`, (error, result) => {
        if(error){
            console.log('error : ', error);
            callback(error, null);
        }
        callback(null, result);
    })
}

// Ajouter une tache a une liste
exports.addNewTask = (tache, callback) => {
    
    const date = createDate();
    db.query(`INSERT INTO Tasks (date, resume, listId) VALUES ( '${ date }', '${ tache.resume}', '${tache.listId}')`, (error, result) => {
        if(error){
            console.log('error : ', error);
            callback(error, null);
        }
        callback(null, result);
    })

}

// supprimer une tache
exports.delete = (idTask, callback) =>{

    db.query(`DELETE FROM Tasks WHERE id_task = ${ idTask }`, (error, result) =>{
        if(error){
            console.log('error : ', error);
            callback(error, null);
        }
        callback(null, result);
    })
}

function createDate(){
    let date = new Date();
    const d = date.getDate();
    const m = date.getMonth()+1; 
    const y = date.getFullYear();
    return (y+"-"+m+"-"+d)
}


