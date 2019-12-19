/**
 * Classe modelo da entidade Anotação
 *
 * @author Bruno Eduardo
 * @class Anotacao
 */
class Anotacao {
  /**
   * Cria uma nova instância da classe Anotação
   *
   * @param {Number} [idAnotacao=undefined] - ID
   * @param {String} [dsAnotacao=undefined] - Descrição/título
   * @param {String} [dsText=undefined] - Texto
   * @param {String} [dhModificacao=undefined] - Data da última modificação
   * @memberof Anotacao
   */
  constructor(
    idAnotacao = undefined,
    dsAnotacao = undefined,
    dsText = undefined,
    dhModificacao = undefined
  ) {
    this.idAnotacao = idAnotacao;
    this.dsAnotacao = dsAnotacao;
    this.dsText = dsText;
    this.dhModificacao = dhModificacao;
  }
}

module.exports = Anotacao;
