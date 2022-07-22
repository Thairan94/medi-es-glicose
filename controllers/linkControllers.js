const LinkModels = require('../models/LinkModels')

const redirect = async (req, res, next) => {
    //Pega o valor
    let title = req.params.title; 
    try{
        let doc = await LinkModels.findOne({title})
        if(doc){
          res.redirect(doc.url)
        } else {
          next()
        }
    }catch(error){
        res.send(error)
    }
}

//Adicionar links
const addLink = async (req, res) => {
  let link = new LinkModels(req.body)

  try {
      let doc = await link.save()
      res.redirect('/');
  }catch(error){
    res.render('index', {error, body: req.body});
  }
}
//Listar links
const allLinks = async(req, res) => {
  try {
    let docs = await LinkModels.find({});
    res.render('all', {links: docs});
  } catch (error) {
    res.send(error)
  }
}
//Deletar links
const deleteLink = async(req, res) => {

  let id = req.params.id;
  if(!id){
    id = req.body.id;
  }
  
  try {
    await LinkModels.findByIdAndDelete(id)
    // res.send(id)
    res.redirect('/')
  } catch (error){
    res.status(404).send(error);
  }
}

const loadLink = async(req, res) => {

  let id = req.params.id;
   
  try {
    let doc = await LinkModels.findById(id)
    // res.send(id)
    res.render('edit', {error: false, body: doc})
  } catch (error){
    res.status(404).send(error);
  }
}

const editLink = async (req, res) => {
  let link = {};
  link.title = req.body.title;
  link.description = req.body.description;
  link.url = req.body.url;

  let id = req.params.id;
  if(!id){
    id = req.body.id;
  }
  
  try {
      let doc = await LinkModels.findByIdAndUpdate({_id: id}, link)
      res.redirect('/')
  }catch(error){
    res.render('edit', {error, body: req.body});
  }
}

module.exports = {redirect, addLink, allLinks, deleteLink, loadLink, editLink}
