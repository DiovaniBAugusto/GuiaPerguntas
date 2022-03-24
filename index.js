//requerendo o express, e então criando uma instância no app
const express = require("express");
//const { where } = require("sequelize/types");
const app = express();
const connection = require("./database/database");
const Pergunta = require("./database/pergunta");
const Resposta = require("./database/resposta");

connection
    .authenticate()
    .then(() => {
        console.log("conexão realizada com sucesso");
    })
    .catch((msgErro)=>{
        console.log(msgErro);
    })
//Definindo o EJS como a view engine deste projeto
app.set('view engine','ejs');
app.use(express.static('public'));

/*incluindo o body parser a partir da própria constante express, recurso do express para traduzir dados enviados de um formulário
  em uma estrutura javaScript*/
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//criando a rota para a pagina home do projeto
app.get("/", (req,res) => {
    Pergunta.findAll({raw: true, order:[
        ['id','DESC']
    ]}).then((perguntas) => {
        res.render("index",{
            perguntas: perguntas
        });
    });
    
});

app.get("/pergunta/:id", (req,res) => {
    var idPergunta = req.params.id;
    Pergunta.findOne({raw: true, where: {
        id: idPergunta
    }}).then(obj => {
        if(obj){
            Resposta.findAll({where:{idpergunta : obj.id}, raw:true, order:[['id','DESC']]}).then(resp => {
                res.render('pgPergunta',{
                    pergunta: obj,
                    respostas: resp
                });
            });
        }else{
            res.redirect('/');
        }
        
    });
});

//criação da rota para o questionário de perguntas
app.get("/pergunta", (req,res) => {
    res.render("perguntas");
});

app.post("/salvarpergunta", (req,res) =>{
    var titulo = req.body.titulo;
    var desc = req.body.descricao;
    Pergunta.create({
        titulo: titulo,
        descricao: desc
    }).then(() => {
        res.redirect("/");
    })
});

app.post("/salvarresposta",(req,res)=>{
    var autor = req.body.autor;
    var corpo = req.body.corpo;
    var id = req.body.pergunta;

    if(autor == "")
        autor = "autor anônimo";
    
    Resposta.create({
        corpo: corpo,
        idpergunta: id,
        autor: autor
    }).then(()=>{
        res.redirect("/pergunta/"+id);
    }).catch((msgErro) => {
        console.log(msgErro);
        res.redirect("/");
    })
});

//definindo a porta que sera hospedada a aplicação
app.listen(8080, () => {console.log("Aplicação OK");});