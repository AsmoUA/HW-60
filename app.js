import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import { createRequire } from 'node:module';
import fs, { promises } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

const PORT = process.env.PORT || 3000;
// PORT=8080 npm start
if (process.env.NODE_ENV == 'development') {
    console.log('development mode');
} else {
    console.log('production mode');
}

const app = express();

// app.get('/', (req, res)=>{
//     res.send('<h1>Wellcome</h1>');
// })

// fs.readFile(path.join(__dirname, './package.json'), (err, content) => {
//     if (err) {
//         console.error(err);
//     }
//     app.get('/', (req, res) => {
//         res.send(`<h1>Wellcome</h1><h2>JSON text:</h2><pre>${content.toString()}</pre>`);
//     })
// });

app.get('/', async (req, res) => {
    try {
        const content = await fs.promises.readFile(path.join(__dirname, './package.json'));
        res.send(`<h1>Welcome</h1><h2>JSON text:</h2><pre>${content.toString()}</pre>`);
    } catch (err) {
        console.error(err);
        res.send('<h1>Error</h1>');
    }
});


app.listen(PORT, ()=> {
    console.log(`Server started on http://localhost:${PORT}`);
})