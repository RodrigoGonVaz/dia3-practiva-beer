// 1. IMPORTACIONES
const express 		= require("express")
const app			= express()

const hbs			= require("hbs")

const PunkAPIWrapper	= require("punkapi-javascript-wrapper")
const punkAPI			= new PunkAPIWrapper()

require("dotenv").config()

// 2. MIDDLEWARES
app.use(express.static("public"))

app.set("views", __dirname + "/views")
app.set("view engine", "hbs")

hbs.registerPartials(__dirname + "/views/partials")

// 3. RUTAS


app.get("/random-beer", (req, res) => {
    const randomBeers = punkAPI.getRandom()
    randomBeers
    .then((beers)=>{
        res.render("random-beer",{
            cheve:beers 
        })
    })
})

app.get("/beers", (req, res) => {

	// PROMESAS
	// ES UNA FUNCIÓN QUE VA A EJECUTAR UN PROCESO ASÍNCRONO (P.E. LA CONEXIÓN A UN SERVIDOR EXTERNO) Y DEPENDIENDO DEL RESULTADO SE VA A EJECUTAR OTRA FUNCIÓN.
	
	// OBTENIENDO LA PROMESA
	const listBeers = punkAPI.getBeers()
	console.log(listBeers)

	// EVALUANDO LA PROMESA
	listBeers
		.then((beers) => { // SI LA PROMESA SE CUMPLIÓ EXITOSAMENTE
            
            console.log(beers)

            res.render("beers", {  // hasta que no regresa la solicitud, no puedo hacer res - responder
				data: beers
			})   

		})
		.catch((error) => { // SI LA PROMESA NO SE CUMPLIÓ. ROMPISTE MI CORAZÓN.
			console.log(error)
		})
	
})


app.get("/", (req,res) => {
	res.render("home")
})

// 4. SERVIDOR

app.listen(process.env.PORT, () => {
	console.log(`Servidor escuchando en el puerto ${process.env.PORT}`)
})