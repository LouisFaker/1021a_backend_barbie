import express, {Request} from 'express';
import BancoMongoDB from './infra/banco/banco-mongodb' //paso 2: banco de dados add
import ListarFilme from './aplicacao/listar-filme.use-case' //paso 1: adiconar import listarfilme
import cors from 'cors'
const bancoMongoDB = new BancoMongoDB();
const app = express();
app.use(express.json())
app.use(cors())


app.get('/filmes', async (req, res) => {
    const listarFilme = new ListarFilme(bancoMongoDB)
    const filmes = await listarFilme.execute()
    // res.send(filmes).status(200)
    res.status(200).send(filmes) //passar primeiro status seguido do send
})

// // Define uma rota padrão
// app.get('/filmes/:id', (req, res) => {
//     const id = parseInt(req.params.id)
//     const filme = filmes_repositorio.find(filme => filme.id === id)
//     if (!filme) res.status(404).send()
//     res.send(filme)        
// });

app.post('/filmes', async (req:Request, res) => {
    const {id, titulo, descricao, foto} = req.body
    const filme:Filme = {
        id,
        titulo,
        descricao,
        foto,
    }
    filmes_repositorio.push(filme)
    await bancoMongoDB.salvar(filme)
    res.status(201).send(filme)
});

app.delete('/filmes/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const filme = filmes_repositorio.find(filme => filme.id === id)
    if (!filme) return res.status(404).send(filme)
    const filterFilme = filmes_repositorio.filter(filme => filme.id !== id)
    filmes_repositorio = filterFilme
    res.status(200).send(filme)
});

app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
});

type Filme = {
    id: number,
    titulo: string,
    descricao: string,
    foto: string,
}
let filmes_repositorio:Filme[] = [] //usar no lugar usecase para listar filmes e usar para que este listar aquil no banco de dados
