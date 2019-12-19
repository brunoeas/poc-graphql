const { setState, loadState } = require('../state/state');
const moment = require('moment');
const Anotacao = require('../model/anotacao');
const { getAnotacaoBiggestId, getAnotacoesFromState, now } = require('./utils');

/**
 * Retorna uma anotação pelo ID
 *
 * @author Bruno Eduardo
 * @param {{ idAnotacao: Number }} params - Parâmetros da requisição com o ID
 * @returns {Anotacao} Anotação filtrada pelo ID ou null
 */
function anotacaoById({ idAnotacao }) {
  const anotacoes = getAnotacoesFromState();

  return anotacoes.find(item => item.idAnotacao === +idAnotacao) || null;
}

/**
 * Retorna todas as Anotações
 *
 * @author Bruno Eduardo
 * @returns {Anotacao[]} Array com todas as Anotações
 */
function allAnotacoes() {
  return getAnotacoesFromState();
}

/**
 * Retorna todas as Anotações modificadas depois da data passada por parâmetro
 *
 * @author Bruno Eduardo
 * @param {{ dhModificacao: String }} params - Parâmetros da requisição com a data
 * @returns {Anotacao[]} Array de Anotações modificadas depois da data especificada
 */
function anotacoesAfterDate({ dhModificacao }) {
  const anotacoes = getAnotacoesFromState();
  const data = moment(dhModificacao);

  return anotacoes.filter(isSameOrAfter);

  /**
   * Valida se a data da última modificação da Anotação é posterior ou igual a data
   *
   * @param {Anotacao} item - Anotação
   * @returns {Boolean} true - caso seja igual ou posterior; false - caso seja antecedente;
   */
  function isSameOrAfter(item) {
    return moment(item.dhModificacao).isSameOrAfter(data);
  }
}

/**
 * Salva uma nova Anotação
 *
 * @author Bruno Eduardo
 * @param {Anotacao} anotacao - Anotação que vai ser salva
 * @returns {Anotacao} A Anotação salva
 */
function saveAnotacao(anotacao) {
  const state = loadState();
  const anotacoes = state.anotacoes;

  const newId = getAnotacaoBiggestId() + 1;
  const newAnotacao = { ...anotacao, idAnotacao: newId, dhModificacao: now() };

  anotacoes.push(newAnotacao);

  setState(state);
  return newAnotacao;
}

/**
 * Atualiza uma Anotação
 *
 * @author Bruno Eduardo
 * @param {Anotacao} anotacao - Anotação que vai ser atualizada
 * @returns {Anotacao} A Anotação atualizada
 */
function updateAnotacao(anotacao) {
  const state = loadState();
  const anotacoes = state.anotacoes;

  const anotacaoFromState = anotacoes.find(item => item.idAnotacao === +anotacao.idAnotacao);
  if (!anotacaoFromState) return null;

  for (const propName in anotacaoFromState) {
    if (propName === 'idAnotacao') continue;

    const actualValue = anotacaoFromState[propName];
    const transientValue = anotacao[propName];

    if (transientValue !== undefined && transientValue !== actualValue) {
      anotacaoFromState[propName] = anotacao[propName];
    }
  }

  anotacaoFromState.dhModificacao = now();

  setState(state);
  return anotacaoFromState;
}

/**
 * Deleta uma Anotação pelo ID
 *
 * @author Bruno Eduardo
 * @param {{ idAnotacao: Number }} params - Parâmetros da requisição com o ID
 * @returns {Number} 0 - caso tenha ocorrido algum erro; 1 - caso tenha dado tudo certo;
 */
function deleteAnotacaoById({ idAnotacao }) {
  const state = loadState();
  const anotacoes = state.anotacoes;

  const anotacaoIndex = anotacoes.findIndex(item => item.idAnotacao === +idAnotacao);
  if (anotacaoIndex === -1) return 0;

  anotacoes.splice(anotacaoIndex, 1);

  setState(state);
  return 1;
}

module.exports = {
  anotacaoById,
  allAnotacoes,
  anotacoesAfterDate,
  saveAnotacao,
  updateAnotacao,
  deleteAnotacaoById
};
