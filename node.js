// global objects (for example, in the browser it is window)

// 1. global


// console.log(__dirname) // - испольняемый файл

// console.log(__filename) // весь путь до испольняемого файла

// console.log(process) // - все настройки окружения

// console.log(process.argv) // - содержит аргументы командной строки(массив, первый элемент - node, второй - filename)


// ==========================================


// url 

// const url = new URL('https://webDev.com/path/name#test')

// url.hostname - имя хоста - webDev.com
// url.href - полный адрес
// url.pathname - /path/name, идёт после hostname
// url.hash - #test, То есть, что с решеткой


// ==========================================


// модули: импорты и экспорты

// экспорт module.exports = variable / let / const

// в импорте, создаём const, куда будет присвоено значение импорта
// const ___ = require('way to file');

// const currentUser = require('./export-example');

// если нужно экспортировать несколько сущностей, можно завернуть их в объект
// module.exports = module.exports = {userName, email}

// const dataUser = require('./export-example');


// ==========================================


// чтение, удаление, создание файлов/папок

// модуль filesystme = fs

// const fs = require('fs');

// чтобы прочитать какой-то файл, можно использовать метод readFile()
// принимает два аргумента: первый - файл, который хотим прочесть,
// второй - функция callback, которая сработает, когда вызовем метод
// readFile - async function

// fs.readFile('./text.txt', 'utf8', (error, data) => {
//     // для работы с папки существует метод mkdir(название папки, функция
//     fs.mkdir('./files_2', () => {})
//         // создать файл можно использовать метод writeFile(путь к созданию, данные для записи, функция)
//     fs.writeFile('./files_2/text_2.txt', `${data} ('updated text')`, () => {

//     })
// });

// удаление файла

// можно использовать метод unlink(путь к файлу, функция) 
// либо rmdir

// setTimeout(() => {
    // для проверки существования файла можно использовать метод existsSync(путь к файлу)
//     fs.unlink('./text_2.txt', () => {})
// }, 2000);


// setTimeout(() => {
//     if(fs.existsSync('./files')) {
//         fs.rmdir('./files_2', () => {
//             console.log('File was delete')
//         })
//     }
// }, 2000);


// =========================================================


// модуль событий

// const Logger = require('./log');
// const logger = new Logger();

// logger.on('someEvent', (options) => {
//     const {name, surname} = options;
//     console.log(name, surname)
// })


// logger.log('User Logged');


// если использовать emitter в другом модуле, стоит создать класс-наследник


// ===============================================

// Buffer and Stream - Буфер и Потоки


// const fs = require('fs');
// const zlib = require('zlib');

// // createReadStream - создать читающий поток

// const readStream = fs.createReadStream('./textFish.txt');

// readStream.on('data', (chunk) => {
//     console.log('-----------');
//     console.log(chunk.toString());
// })

// пишущий поток

// createWriteStream(название нового файла) - создать пишущий поток

// write - написать

// const writeStream = fs.createWriteStream('./new-text-fish.txt');

// // создаём транформирующий поток с помощью метода zlib.createGzip

// const compressStream = zlib.createGzip();

// readStream.on('data', (chunk) => {
//     writeStream.write('\n ----CHUNK----START----\n ')
//     writeStream.write(chunk);
//     writeStream.write('\n ----CHUNK----END----\n ')
// })


// метод pipe - дубликсное реализация потока, он осуществляет чтение
// файлов из метода readStrem и передаёт в writeStream

// const handleError = () => {
//     console.log('Error')
//     readStream.destroy(); // уничтожаем поток
//     writeStream.end('Finished with error....') // добавим инфу о ошибке
// }

// readStream
// .on('error', handleError)
// .pipe(compressStream)  // transform stream
// .pipe(writeStream)
// .on('error', handleError)


// ==================================

// Client and Server - Клиент и Серверем 


// ===================== создание сервера

// const http = require("http");

// // метод createServer создает сервер

// const PORT = 3000;

// const server = http.createServer((req, res) => {
//     console.log('Server request')
//     console.log(req, req.method)

//     res.setHeader('Content-Type', 'application/json') // с помощью метода setHeader() можно передавать вспомогательную информацию

//     // res.write('<head><link rel="stylesheet" href="#"></link></head>')
//     // res.write('<h1>Hello world</h1>'); // метод write отображает сущность на странице
//     // res.write('<p>React and Node developer</p>')

//     const data = JSON.stringify([
//         {"name": "Aleksy", "surname": "Malinowski"},
//         {"name": "Nataliya", "surname": "Malinowskaya"}
//     ])

//     res.end(data); // метод end сообщает, что все добавления завершены
// });

// // метод listen назначает порт для слушания

// server.listen(PORT, 'localhost', (error) => {
//     error ? console.log(error) : console.log(`listening port ${3000}`)
// });


// ============================================================


// Base Routing

const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    console.log('request server')

    res.setHeader('Content-type', 'text/html');

    const createPath = (page) => path.resolve(__dirname, 'views', `${page}.html`);

    let basePath = '';

    switch(req.url) {
        case '/': 
            basePath = createPath('index');
            res.statusCode = 200;
            break;  
        case '/contact':
            basePath = createPath('contact');
            res.statusCode = 200;
            break;
        default:
            basePath = createPath('error');
            res.statusCode = 404;
            break;
    }

    fs.readFile(basePath, (err, data) => {
        if(err) {
            res.statusCode = 500;
            res.end();
        }
        else {
            res.write(data);
            res.end();
        }
    })
})

server.listen(3000, 'localhost', () => {
    console.log('listening port 3000')
})