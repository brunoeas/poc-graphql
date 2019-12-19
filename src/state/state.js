const fs = require('fs');
const State = require('./model');

const filePath = `content.json`;

/**
 * Setta um valor no arquivo content.json
 *
 * @author Bruno Eduardo
 * @param {State} content - Valor que vai ser convertido para JSON e salvo no content.json
 */
function setState(content) {
  const contentString = JSON.stringify(content);
  fs.writeFileSync(filePath, contentString);
}

/**
 * Carrega os dados do arquivo content.json,
 * se ocorrer algum erro na leitura do arquivo ou o arquivo não existir é criado um arquivo usando o model do State
 *
 * @author Bruno Eduardo
 * @returns {State} Um objeto JavaScript que representa o JSON do arquivo content.json
 */
function loadState() {
  let fileBuffer;
  try {
    fileBuffer = fs.readFileSync(filePath, 'utf-8');
  } catch (err) {
    console.info(
      '> O arquivo content.json não existe ou ocorreu um erro na leitura, assumindo seu valor padrão'
    );
    setState(new State());
    fileBuffer = fs.readFileSync(filePath, 'utf-8');
  }

  const contentJSON = JSON.parse(fileBuffer);
  return contentJSON;
}

module.exports = { setState, loadState };
