// 1. IMPORTACIONES
const express 		= require("express")
const app			= express()

const hbs			= require("hbs")

require("dotenv").config()


// 2. MIDDLEWARES
app.use(express.static("public"))

app.set("views", __dirname + "/views")
app.set("view engine", "hbs")

hbs.registerPartials(__dirname + "/views/partials")

// 3. RUTAS

app.get("/", (req,res) => {
	res.render("home")
})



// 4. SERVIDOR

app.listen(process.env.PORT, () => {
	console.log(`Servidor escuchando en el puerto ${process.env.PORT}`)
})
