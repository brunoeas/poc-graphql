const Anotacao = require('../model/anotacao');

/**
 * Classe modelo do State
 *
 * @author Bruno Eduardo
 * @class State
 */
class State {
  /**
   * Cria uma nova instância da classe State
   *
   * @param {Anotacao[]} [anotacoes=[]] - Anotações
   * @memberof State
   */
  constructor(anotacoes = []) {
    this.anotacoes = anotacoes;
  }
}

module.exports = State;
