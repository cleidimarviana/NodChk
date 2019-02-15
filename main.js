
var express = require('express');
var app = express();
const request = require('request');
app.get('/:ufplaca', function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });

    const str = req.params.ufplaca;
    const _plac = str.substr(0, 7);
    const _uf = str.substr(7, 9);

    const _hou = "" + Date.now();
    const _uri = Buffer.from('aHR0cDovL2htbHNtYXJ0LmRla3JhLmNvbS5ici9TbWFydE1vYmlsZS9TZXJ2aWNvcy9JbnRlZ3JhY2FvTW9iaWxlLnN2Yy9Nb2JpbGUvQ29uc3VsdGFyQ2hlY2tBdXRv', 'base64').toString("ascii");
    const _log = Buffer.from('TEFSQVVKTw==', 'base64').toString("ascii");
    const _pw = Buffer.from('TFBBMTIxNQ==', 'base64').toString("ascii");

    var options = {
        uri: _uri,
        method: 'POST',
        json: { "consulta": { "Login": { "Usuario": _log, "Senha": _pw }, "Dados": { "Chassi": " ", "ConsultaCheckAutoTipoID": 2, "EmpresaID": "1", "Login": _log, "NrColeta": _hou, "ProdutoID": 20, "UF": _uf, "Placa": _plac } } }
    }

    request(options, function (error, response, body) {
        if (error) {
            console.log(error);
        } else {

            res.write(buildHtml(JSON.stringify(body)));
            res.end();
        };
    });
});

app.listen(3000);

function buildHtml(pre) {
  
    return '<!DOCTYPE html>'
         + '<html><head> <meta charset="UTF-8"></head><body><textarea readonly>' + pre + '</textarea></body></html>';
};
