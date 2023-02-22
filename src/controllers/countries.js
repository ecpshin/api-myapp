const supabase = require('../services/connection');
const fs = require('fs/promises');

async function getCountries (req, res) {

    try{
        const { data, error } = await supabase.from('countries').select();
         
        if(error) {
            return res.status(400).json({"mensagem": "Erro na requisição!"});
        }

        return res.status(200).json(data);
    } catch (err) {
        console.log(err);
    }
}

async function insertCountry (req, res){
    const {name} = req.body;
    const obj = await getLastId();
    obj.id+=1;
    
    const body = {
        id: obj.id,
        name
    }

    
    try {
        const { data, error } = await supabase.from('countries').insert(body).select();
        if(error) {
            return res.status(400).json({"mensagem": "Erro na requisição!"});
        }
        const a = await setLastId([{...obj}]); 
        return res.status(201).json(data);
    } catch (error) {
        return res.status(500).json({"mensagem": "Erro do servidor1"});  
    }    
}

async function getLastId(){
    try {
        const logfile = await fs.readFile('./src/controllers/lastid.json');
        const aux = JSON.parse(logfile);    
        return aux[0];        
    } catch (error) {        
    }
}

async function setLastId(arrayJSON){
    try {
        const aux = JSON.stringify(arrayJSON);
        await fs.writeFile('./src/controllers/lastid.json', aux);
        return true;        
    } catch (error) {
        return error;
    }    
}

module.exports = {
    getCountries,
    insertCountry
};