const http = require('http');

// Création d'un objet avec les routes du server
const router = {
    "/" : (req, res) => {

        res.writeHead(200);
        res.write('<h1>Home</h1>');
        res.end();
    },

    "/about" : (req, res) => {

        res.writeHead(200);
        res.write('<h1>About</h1>');
        res.end();
    }
};

const server = http.createServer((req, res) => {
    // Log des requetes
    console.log(`Requete : [${req.method}] ${req.url}`);

    // Systeme de routing (Version simple)
    if(req.url in router) {
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
