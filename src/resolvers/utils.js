const { loadState } = require('../state/state');
const Anotacao = require('../model/anotacao');
const moment = require('moment');

/**
 * Retorna o maior ID da lista de Anotações do State
 *
 * @author Bruno Eduardo
 * @returns {Number} O maior ID da lista de Anotações
 */
function getAnotacaoBiggestId() {
  const state = loadState();
  const anotacoes = state.anotacoes;

  if (anotacoes.length === 0) return 1;

  const idList = anotacoes.map(item => item.idAnotacao);
  return Math.max(...idList);
}

/**
 * Retorna as Anotações do State
 *
 * @author Bruno Eduardo
 * @returns {Anotacao[]} Array de Anotações
 */
function getAnotacoesFromState() {
  const state = loadState();
  return state.anotacoes;
}

/**
 * Retorna a data/hora atual no formato passado como parâmetro ou YYYY-MM-DDTHH:mm:ssZZ
 *
 * @author Bruno Eduardo
 * @returns {String} Data/hora atual
 */
function now(format = 'YYYY-MM-DDTHH:mm:ssZZ') {
  return moment().format(format);
}

module.exports = { getAnotacaoBiggestId, getAnotacoesFromState, now };
