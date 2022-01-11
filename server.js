const http = require('http');
const path = require('path');
const ejs = require('ejs');

// Méthode pour utiliser EJS
const renderView = (res, viewName, data = {}) => {
    // Méthode qui permet de générer le nom du fichier avec les séparateur adaptés
    // => Evite les conflits entre les chemins windows et unix.
    const fileName = path.resolve(__dirname, 'views', 'pages', viewName + '.ejs');
    console.log(fileName);

    // Utilisation du moteur de template EJS, pour convertir le fichier EJS
    // en chaine de charactere contenant de l'html
    ejs.renderFile(fileName, data, (error, contentHtml) => {

        res.writeHead(200);
        res.write(contentHtml);
        res.end();
    });
};

// Création d'un objet avec les routes du server
const router = {
    "/": (req, res) => {
        const now = new Date();
        const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };


        const dataHome = {
            dateDuJour: now.toLocaleDateString('fr-be', optionsDate),
            isDay: now.getHours() < 18 && now.getHours() > 8
        };
        renderView(res, 'home', dataHome);
    },

    "/about": (req, res) => {

        renderView(res, 'about');
    },

    "/products": (req, res) => {
        // Récuperation d'une liste de donnée (En reel -> Une base de donnée ou une API)
        const category = "Food";
        const products = [
            { name: 'Pomme', price: 3.14 },
            { name: 'Chocolat', price: 5 },
            { name: 'Cerise', price: 2 },
            { name: 'Fraise', price: 1 }
        ];

        renderView(res, 'products', { category, products });
    }
};

const server = http.createServer((req, res) => {
    // Log des requetes
    console.log(`Requete : [${req.method}] ${req.url}`);

    // Systeme de routing (Version simple)
    if (req.url in router) {
        const action = router[req.url];
        action(req, res);
        return;
    }

    // Envoi d'une page 404
    res.writeHead(404);
    res.write('<h1>Zone des perdus :(</h1>');
    res.end();
});

server.listen(3000, () => console.log("Start server on port 3000"));
