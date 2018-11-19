import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Select } from './styles';
import { changeTypeSelection, changeVariableSelection } from '../../stores/actions/toolBarActions';
import { fetchPnudDataByField } from '../../stores/actions/pnudActions';


class ToolBar extends Component {


    handleChangeType = (e) => {
        console.log(e.target.value)
        //const { changeTypeSelection } = this.pros;
        this.props.changeTypeSelection(e.target.value);
    }

    handleChangeVariable = async (e) => {
        const variable = e.target.value;
        //const { changeVariableSelection } = this.pros;
        await this.props.fetchPnudDataByField(variable);
        this.props.changeVariableSelection(variable);
    }

    render() {
        return (
            <Container>
                <p>Quero visualizar:</p>
                <Select onChange={this.handleChangeType}>
                    <option value='NONE'></option>
                    <option value="ULTRA">Estab. pred. Ultraprocessados</option>
                    <option value="NATURA">Estab. pred. In Natura</option>
                    <option value="FEIRA">Feiras</option>
                    <option value="FEIRA_ORGANICA">Feiras orgânicas</option>
                    <option value="MIX">Estab. pred. Mistos</option>
                </Select>
                <p>Em contraste com:</p>
                <Select onChange={this.handleChangeVariable}>
                    {variable.map((e, i) =>
                        <option key={i} value={e.var}>{e.description}</option>)}
                </Select>
            </Container>







        )
    }
}

const mapStateToPros = (state) => {
    return {
        toolBarReducer: state.toolBarReducer,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeTypeSelection: (type) => { dispatch(changeTypeSelection(type)) },
        changeVariableSelection: (variable) => { dispatch(changeVariableSelection(variable)) },
        fetchPnudDataByField: (variable) => { return dispatch(fetchPnudDataByField(variable)) }

    }
}

export default connect(mapStateToPros, mapDispatchToProps)(ToolBar);


const variable = [
    { var: 'AREA', description: 'Área' },
    { var: 'DENSIDADE', description: 'Densidade demográfica' },
    { var: 'ESPVIDA', description: 'Esperança de vida ao nascer' },
    { var: 'FECTOT', description: 'Taxa de fecundidade total' },
    { var: 'MORT1', description: 'Mortalidade até um ano de idade' },
    { var: 'MORT5', description: 'Mortalidade até cinco anos de idade' },
    { var: 'SOBRE40', description: 'Probabilidade de sobrevivência até 40 anos' },
    { var: 'SOBRE60', description: 'Probabilidade de sobrevivência até 60 anos' },
    { var: 'RAZDEP', description: 'Percentual da população de menos de 15 anos e da população de 65 anos e mais em relação à população de 15 a 64 anos' },
    { var: 'T_ENV', description: 'Taxa de envelhecimento' },
    { var: 'E_ANOSESTUDO', description: 'Expectativa de anos de estudo aos 18 anos de idade' },
    { var: 'T_ANALF11A14', description: 'Taxa de analfabetismo da população de 11 a 14 anos de idade' },
    { var: 'T_ANALF15A17', description: 'Taxa de analfabetismo da população de 15 a 17 anos de idade' },
    { var: 'T_ANALF15M', description: 'Taxa de analfabetismo da população de 15 anos ou mais de idade' },
    { var: 'T_ANALF18A24', description: 'Taxa de analfabetismo da população de 18 a 24 anos de idade' },
    { var: 'T_ANALF18M', description: 'Taxa de analfabetismo da população de 18 anos ou mais de idade' },
    { var: 'T_ANALF25A29', description: 'Taxa de analfabetismo da população de 25 a 29 anos de idade' },
    { var: 'T_ANALF25M', description: 'Taxa de analfabetismo da população de 25 anos ou mais de idade' },
    { var: 'T_ATRASO_2_BASICO', description: 'Percentual da população de 6 a 17 anos de idade frequentando o ensino básico que tem 2 anos ou mais de atraso idade-série.' },
    { var: 'T_ATRASO_2_FUND', description: 'Percentual da população de 6 a 14 anos de idade frequentando o ensino fundamental que tem 2 anos ou mais de atraso idade-série.' },
    { var: 'T_FBBAS', description: 'Taxa de frequência bruta ao ensino   básico REGULAR SERIADO ' },
    { var: 'T_FBBAS_TUDO', description: 'Taxa de frequência bruta ao ensino   básico' },
    { var: 'T_FBFUND', description: 'Taxa de frequência bruta ao ensino   fundamental REGULAR SERIADO ' },
    { var: 'T_FBFUND_TUDO', description: 'Taxa de frequência bruta ao ensino   fundamental' },
    { var: 'T_FBMED', description: 'Taxa de frequência bruta ao ensino  médio REGULAR SERIADO ' },
    { var: 'T_FBMED_TUDO', description: 'Taxa de frequência bruta ao ensino   médio' },
    { var: 'T_FBSUPER', description: 'Taxa de frequência bruta ao ensino   superior' },
    { var: 'T_FLBAS', description: 'Taxa de frequência líquida ao ensino   básico REGULAR SERIADO ' },
    { var: 'T_FLBAS_TUDO', description: 'Taxa de frequência líquida ao ensino   básico ' },
    { var: 'T_FLFUND', description: 'Taxa de frequência líquida ao ensino   fundamental REGULAR SERIADO ' },
    { var: 'T_FLFUND_TUDO', description: 'Taxa de frequência líquida ao ensino   fundamental' },
    { var: 'T_FLMED', description: 'Taxa de frequência líquida ao ensino   médio REGULAR SERIADO ' },
    { var: 'T_FLMED_TUDO', description: 'Taxa de frequência líquida ao ensino   médio' },
    { var: 'T_FLSUPER', description: 'Taxa de frequência líquida ao ensino   superior' },
    { var: 'T_FREQ0A5', description: 'Taxa de atendimento escolar da população até 5 anos de idade ' },
    { var: 'T_FREQ15A17', description: 'Taxa de atendimento escolar da população de 15 a 17 anos de idade ' },
    { var: 'T_FREQ18A24', description: 'Taxa de atendimento escolar da população de 18 a 24 anos de idade ' },
    { var: 'T_FREQ25A29', description: 'Taxa de atendimento escolar da população de 25 a 29 anos de idade ' },
    { var: 'T_FREQ5a6', description: 'Percentual da população de 5 a 6 anos de idade frequentando a escola' },
    { var: 'T_FREQ6A14', description: 'Taxa de atendimento escolar da população de 6 a 14 anos de idade ' },
    { var: 'T_FREQ6A17', description: 'Taxa de atendimento escolar da população de 6 a 17 anos de idade ' },
    { var: 'T_FREQFUND1517', description: 'Percentual da população de 15 a 17 anos de idade frequentando o ensino fundamental REGULAR SERIADO' },
    { var: 'T_FREQFUND1824', description: 'Percentual da população de 18 a 24 anos de idade frequentando o ensino fundamental REGULAR SERIADO' },
    { var: 'T_FREQMED1824', description: 'Percentual da população de 18 a 24 anos de idade frequentando o ensino médio REGULAR SERIADO' },
    { var: 'T_FUND11a13', description: 'Percentual da população de 11 a 13 anos de idade frequentando os anos  finais do fundamental REGULAR SERIADO ou que já concluiu o fundamental' },
    { var: 'T_FUND11a13_TUDO', description: 'Percentual da população de 11 a 13 anos de idade frequentando os anos  finais do fundamental ou que já concluiu o fundamental' },
    { var: 'T_FUND15A17', description: 'Percentual da população de 15 a 17 anos com fundamental completo' },
    { var: 'T_FUND18A24', description: 'Percentual da população de 18 a 24 anos com fundamental completo' },
    { var: 'T_FUND18M', description: 'Percentual da população de 18 anos ou mais com fundamental completo' },
    { var: 'T_FUND25M', description: 'Percentual da população de 25 anos ou mais com fundamental completo' },
    { var: 'T_MED18a20', description: 'Percentual da população de 18 a 20 anos de idade com o ensino médio completo' },
    { var: 'T_MED18A24', description: 'Percentual da população de 18 a 24 anos com ensino médio completo' },
    { var: 'T_MED18M', description: 'Percentual da população de 18 anos ou mais com ensino médio completo' },
    { var: 'T_MED25M', description: 'Percentual da população de 25 anos ou mais com ensino médio completo' },
    { var: 'T_SUPER25M', description: 'Percentual da população de 25 anos ou mais com superior completo' },
    { var: 'CORTE1', description: 'Renda domiciliar per capita máxima do quinto mais pobre' },
    { var: 'CORTE2', description: 'Renda domiciliar per capita máxima do 2º quinto mais pobre' },
    { var: 'CORTE3', description: 'Renda domiciliar per capita máxima do 3º quinto mais pobre' },
    { var: 'CORTE4', description: 'Renda domiciliar per capita máxima do 4º quinto mais pobre' },
    { var: 'CORTE9', description: 'Renda domiciliar per capita mínima do décimo mais rico' },
    { var: 'GINI', description: 'Índice de Gini' },
    { var: 'PIND', description: 'Proporção de extremamente pobres' },
    { var: 'PINDCRI', description: 'Proporção de crianças extremamente pobres' },
    { var: 'PMPOB', description: 'Proporção de pobres' },
    { var: 'PMPOBCRI', description: 'Proporção de crianças pobres' },
    { var: 'PPOB', description: 'Proporção de vulneráveis à pobreza' },
    { var: 'PPOBCRI', description: 'Proporção de crianças vulneráveis à pobreza' },
    { var: 'PREN10RICOS', description: 'Percentual da renda total apropriada pelos 10% da população com maior renda domiciliar per capita' },
    { var: 'PREN20', description: 'Percentual da renda total apropriada pelos 20% da população com menor renda domiciliar per capita' },
    { var: 'PREN20RICOS', description: 'Percentual da renda total apropriada pelos 20% da população com maior renda domiciliar per capita' },
    { var: 'PREN40', description: 'Percentual da renda total apropriada pelos 40% da população com menor renda domiciliar per capita' },
    { var: 'PREN60', description: 'Percentual da renda total apropriada pelos 60% da população com menor renda domiciliar per capita' },
    { var: 'PREN80', description: 'Percentual da renda total apropriada pelos 80% da população com menor renda domiciliar per capita' },
    { var: 'PRENTRAB', description: 'Percentual da renda proveniente de rendimentos do trabalho' },
    { var: 'R1040', description: 'Razão 10% mais ricos / 40% mais pobres' },
    { var: 'R2040', description: 'Razão 20% mais ricos / 40% mais pobres' },
    { var: 'RDPC', description: 'Renda per capita média' },
    { var: 'RDPC1', description: 'Renda domiciliar per capita média do quinto mais pobre' },
    { var: 'RDPC10', description: 'Renda domiciliar per capita média do décimo mais rico' },
    { var: 'RDPC2', description: 'Renda domiciliar per capita  média do 2º quinto mais pobre' },
    { var: 'RDPC3', description: 'Renda domiciliar per capita  média do 3º quinto mais pobre' },
    { var: 'RDPC4', description: 'Renda domiciliar per capita  média do 4º quinto mais pobre' },
    { var: 'RDPC5', description: 'Renda domiciliar per capita média do quinto mais rico' },
    { var: 'RDPCT', description: 'Renda domiciliar per capita média, exceto renda nula' },
    { var: 'RIND', description: 'Renda domiciliar per capita média dos extremamente pobres' },
    { var: 'RMPOB', description: 'Renda domiciliar per capita média dos pobres' },
    { var: 'RPOB', description: 'Renda domiciliar per capita média dos vulneraveis à pobreza' },
    { var: 'THEIL', description: 'Índice de Theil - L' },
    { var: 'P_AGRO', description: 'Percentual dos ocupados no setor agropecuário' },
    { var: 'P_COM', description: 'Percentual dos ocupados no setor comércio' },
    { var: 'P_CONSTR', description: 'Percentual dos ocupados no setor de construção ' },
    { var: 'P_EXTR', description: 'Percentual dos ocupados no setor extrativo mineral' },
    { var: 'P_SERV', description: 'Percentual dos ocupados no setor serviços' },
    { var: 'P_SIUP', description: 'Percentual dos ocupados nos setores de serviços industriais de utilidade pública' },
    { var: 'P_TRANSF', description: 'Percentual dos ocupados na indústria de transformação' },
    { var: 'CPR', description: 'Percentual de ocupados de 18 anos ou mais que são trabalhadores por conta própria.' },
    { var: 'EMP', description: 'Percentual de ocupados de 18 anos ou mais que são empregadores' },
    { var: 'P_FORMAL', description: 'Grau de formalização do trabalho das pessoas ocupadas' },
    { var: 'TRABCC', description: 'Percentual de ocupados de 18 anos ou mais que são empregados com carteira ' },
    { var: 'TRABPUB', description: 'Percentual de ocupados de 18 anos ou mais que são trabalhadores do setor público.' },
    { var: 'TRABSC', description: 'Percentual de ocupados de 18 anos ou mais que são empregados sem carteira ' },
    { var: 'P_FUND', description: 'Percentual dos ocupados com fundamental completo' },
    { var: 'P_MED', description: 'Percentual dos ocupados com médio completo' },
    { var: 'P_SUPER', description: 'Percentual dos ocupados com superior completo' },
    { var: 'REN0', description: 'Percentual dos ocupados sem rendimento' },
    { var: 'REN1', description: 'Percentual dos ocupados com rendimento de até 1 salário mínimo' },
    { var: 'REN2', description: 'Percentual dos ocupados com rendimento de até 2 salários mínimos' },
    { var: 'REN3', description: 'Percentual dos ocupados com rendimento de até 3 salários mínimo' },
    { var: 'REN5', description: 'Percentual dos ocupados com rendimento de até 5 salários mínimo' },
    { var: 'RENOCUP', description: 'Rendimento médio dos ocupados' },
    { var: 'THEILtrab', description: 'Índice de Theil-L dos rendimentos do trabalho - 18 anos ou mais de idade' },
    { var: 'T_ATIV', description: 'Taxa de atividade das pessoas de 10 anos ou mais de idade' },
    { var: 'T_ATIV1014', description: 'Taxa de atividade das pessoas de 10 a  14 anos de idade' },
    { var: 'T_ATIV1517', description: 'Taxa de atividade das pessoas de 15 a  17 anos de idade' },
    { var: 'T_ATIV1824', description: 'Taxa de atividade das pessoas de 18 a 24 anos de idade' },
    { var: 'T_ATIV18M', description: 'Taxa de atividade das pessoas de 18 anos ou mais de idade' },
    { var: 'T_ATIV2529', description: 'Taxa de atividade das pessoas de 25 a 29 anos de idade' },
    { var: 'T_DES', description: 'Taxa de desocupação da população de 10 anos ou mais de idade' },
    { var: 'T_DES1014', description: 'Taxa de desocupação da população de 10 a 14 anos de idade' },
    { var: 'T_DES1517', description: 'Taxa de desocupação da população de 15 a 17 anos de idade' },
    { var: 'T_DES1824', description: 'Taxa de desocupação da população de 18 a 24 anos de idade' },
    { var: 'T_DES18M', description: 'Taxa de desocupação da população de 18 anos ou mais de idade' },
    { var: 'T_DES2529', description: 'Taxa de desocupação da população de 25 a 29 anos de idade' },
    { var: 'T_AGUA', description: 'Percentual da população que vive em domicílios com água encanada' },
    { var: 'T_BANAGUA', description: 'Percentual da população que vive em domicílios com banheiro e água encanada' },
    { var: 'T_DENS', description: 'Percentual da população que vive em domicílios com densidade superior a 2 pessoas por dormitório' },
    { var: 'T_LIXO', description: 'Percentual da população que vive em domicílios urbanos com serviço de coleta de lixo' },
    { var: 'T_LUZ', description: 'Percentual da população que vive em domicílios com energia elétrica' },
    { var: 'AGUA_ESGOTO', description: 'Percentual de pessoas em domicílios com abastecimento de água e esgotamento sanitário inadequados' },
    { var: 'PAREDE ', description: 'Percentual de pessoas em domicílios com paredes que não sejam de alvenaria ou madeira aparelhada' },
    { var: 'T_CRIFUNDIN_TODOS', description: 'Percentual de crianças que vivem em domicílios em que nenhum dos moradores tem o ensino fundamental completo.' },
    { var: 'T_FORA0A5', description: 'Percentual de crianças de 0 a 5 anos que não frequenta a escola' },
    { var: 'T_FORA6A14', description: 'Percentual de crianças de 6 a 14 anos que não frequenta a escola' },
    { var: 'T_FUNDIN_TODOS', description: 'Percentual pessoas que vivem em domicílios em que nenhum morador tem o ensino fundamental completo.' },
    { var: 'T_FUNDIN_TODOS_MMEIO', description: 'Percentual de pessoas em domicílios vulneráveis à pobreza e em que ninguém tem fundamental completo.' },
    { var: 'T_FUNDIN18MINF', description: 'Percentual de pessoas de 18 anos ou mais sem fundamental completo e em ocupação informal' },
    { var: 'T_M10A17CF', description: 'Percentual de mulheres de 10 a 17 anos de idade que tiveram filhos' },
    { var: 'T_MULCHEFEFIF014', description: 'Percentual de mães chefes de família, sem fundamental completo e com pelo menos um filho menor de 15 anos de idade, no total de mães chefes de família' },
    { var: 'T_NESTUDA_NTRAB_MMEIO', description: ' Percentual de pessoas de 15 a 24 anos que não estudam, não trabalham e são vulneráveis à pobreza, na população total dessa faixa etária' },
    { var: 'T_OCUPDESLOC_1', description: 'Percentual de pessoas em domicílios vulneráveis à pobreza e que gastam mais de uma hora até o trabalho no total de pessoas ocupadas.' },
    { var: 'T_RMAXIDOSO', description: 'Percentual de pessoas em domicílios vulneráveis à pobreza e dependentes de idosos' },
    { var: 'T_SLUZ', description: '% de pessoas em domicílios sem energia elétrica' },
    { var: 'T_VULNERA_NESTUDA_NTRAB_MMEIO', description: ' Percentual de pessoas de 15 a 24 anos que não estudam, não trabalham e são vulneráveis, na população vulnerável dessa faixa etária.' },
    { var: 'T_VULNERA_MULCHEFE', description: 'Percentual de mães chefes de família, sem fundamental completo e com pelo menos um filho menor de 15 anos de idade, no total de mães chefes de família e com filho menor' },
    { var: 'T_VULNERA_RMAXIDOSO', description: '% de pessoas vulneráveis e dependentes de idosos, no total de pessoasem domicílios vulneráveis e com idosos.' },
    { var: 'T_VULNERA_OCUPDESLOC_13', description: 'Percentual de pessoas em domicílios vulneráveis à pobreza e que gastam mais de uma hora até o trabalho no total de pessoas ocupadas, vulneráveis e que retornam diariamente do trabalho.' },
    { var: 'HOMEM0A4', description: 'População masculina de 0 a 4 anos de idade' },
    { var: 'HOMEM10A14', description: 'População masculina de 10 a 14 anos de idade' },
    { var: 'HOMEM15A19', description: 'População masculina de 15 a 19 anos de idade' },
    { var: 'HOMEM20A24', description: 'População masculina de 20 a 24 anos de idade' },
    { var: 'HOMEM25A29', description: 'População masculina de 25 a 29 anos de idade' },
    { var: 'HOMEM30A34', description: 'População masculina de 30 a 34 anos de idade' },
    { var: 'HOMEM35A39', description: 'População masculina de 35 a 39 anos de idade' },
    { var: 'HOMEM40A44', description: 'População masculina de 40 a 44 anos de idade' },
    { var: 'HOMEM45A49', description: 'População masculina de 45 a 49 anos de idade' },
    { var: 'HOMEM50A54', description: 'População masculina de 50 a 54 anos de idade' },
    { var: 'HOMEM55A59', description: 'População masculina de 55 a 59 anos de idade' },
    { var: 'HOMEM5A9', description: 'População masculina de 5 a 9 anos de idade' },
    { var: 'HOMEM60A64', description: 'População masculina de 60 a 64 anos de idade' },
    { var: 'HOMEM65A69', description: 'População masculina de 65 a 69 anos de idade' },
    { var: 'HOMEM70A74', description: 'População masculina de 70 a 74 anos de idade' },
    { var: 'HOMEM75A79', description: 'População masculina de 75 a 79 anos de idade' },
    { var: 'HOMENS80', description: 'População masculina com 80 anos e mais de idade' },
    { var: 'HOMEMTOT', description: 'População residente masculina' },
    { var: 'MULH0A4', description: 'População feminina de 0 a 4 anos de idade' },
    { var: 'MULH10A14', description: 'População feminina de 10 a 14 anos de idade' },
    { var: 'MULH15A19', description: 'População feminina de 15 a 19 anos de idade' },
    { var: 'MULH20A24', description: 'População feminina de 20 a 24 anos de idade' },
    { var: 'MULH25A29', description: 'População feminina de 25 a 29 anos de idade' },
    { var: 'MULH30A34', description: 'População feminina de 30 a 34 anos de idade' },
    { var: 'MULH35A39', description: 'População feminina de 35 a 39 anos de idade' },
    { var: 'MULH40A44', description: 'População feminina de 40 a 44 anos de idade' },
    { var: 'MULH45A49', description: 'População feminina de 45 a 49 anos de idade' },
    { var: 'MULH50A54', description: 'População feminina de 50 a 54 anos de idade' },
    { var: 'MULH55A59', description: 'População feminina de 55 a 59 anos de idade' },
    { var: 'MULH5A9', description: 'População feminina de 5 a 9 anos de idade' },
    { var: 'MULH60A64', description: 'População feminina de 60 a 64 anos de idade' },
    { var: 'MULH65A69', description: 'População feminina de 65 a 69 anos de idade' },
    { var: 'MULH70A74', description: 'População feminina de 70 a 74 anos de idade' },
    { var: 'MULH75A79', description: 'População feminina de 75 a 79 anos de idade' },
    { var: 'MULHER80', description: 'População feminina com 80 anos e mais de idade' },
    { var: 'MULHERTOT', description: 'População residente feminina' },
    { var: 'PEA', description: 'População economicamente ativa de 10 anos ou mais de idade' },
    { var: 'PEA1014', description: 'População economicamente ativa de 10 a 14 anos de idade' },
    { var: 'PEA1517', description: 'População economicamente ativa de 15 a 17 anos de idade' },
    { var: 'PEA18M', description: 'População economicamente ativa de 18 anos ou mais de idade' },
    { var: 'PESO1', description: 'População de até 1 ano de idade' },
    { var: 'PESO1114', description: 'População de 11 a 14 anos de idade' },
    { var: 'PESO1113', description: 'População de 11 a 13 anos de idade' },
    { var: 'PESO1214', description: 'População de 12 a 14 anos de idade' },
    { var: 'PESO13', description: 'População de 1 a 3 anos de idade' },
    { var: 'PESO15', description: 'População de 15 anos ou mais de idade' },
    { var: 'PESO1517', description: 'População de 15 a 17 anos de idade' },
    { var: 'PESO1524', description: 'População de 15 a 24 anos de idade' },
    { var: 'PESO1618', description: 'População de 16 a 18 anos de idade' },
    { var: 'PESO18', description: 'População de 18 anos ou mais de idade' },
    { var: 'Peso1820', description: 'População de 18 a 20 anos de idade' },
    { var: 'Peso1824', description: 'População de 18 a 24 anos de idade' },
    { var: 'Peso1921', description: 'População de 19 a 21 anos de idade' },
    { var: 'PESO25', description: 'População de 25 anos ou mais de idade' },
    { var: 'PESO4', description: 'População de 4 anos de idade' },
    { var: 'PESO5', description: 'População de 5 anos de idade' },
    { var: 'PESO6', description: 'População de 6 anos de idade' },
    { var: 'PESO610', description: 'População de 6 a 10 anos de idade' },
    { var: 'Peso617', description: 'População de 6 a 17 anos de idade' },
    { var: 'PESO65', description: 'População de 65 anos ou mais de idade' },
    { var: 'PESOM1014', description: 'Mulheres de 10 a 14 anos de idade' },
    { var: 'PESOM1517', description: 'Mulheres de 15 a 17 anos de idade' },
    { var: 'PESOM15M', description: 'Mulheres de 15 anos ou mais de idade' },
    { var: 'PESOM25M', description: 'Mulheres de 25 anos ou mais de idade' },
    { var: 'PESORUR', description: 'População rural' },
    { var: 'PESOTOT', description: 'População total' },
    { var: 'PESOURB', description: 'População urbana' },
    { var: 'PIA', description: 'População de 10 anos ou mais de idade - Amostra' },
    { var: 'PIA1014', description: 'População de 10 a 14 anos de idade - Amostra' },
    { var: 'PIA1517', description: 'População de 15 a 17 anos de idade - Amostra' },
    { var: 'PIA18M', description: 'População de 18 anos ou mais de idade - Amostra' },
    { var: 'POP', description: 'População total que reside em domicílios particulares permanentes' },
    { var: 'POPT', description: 'População total que reside em domicílios particulares permanentes, exceto os com renda nula' },
    { var: 'MULCHEFEFDOM', description: 'População de mulheres chefes de família com pelo menos um filho menor de 15 anos de idade' },
    { var: 'DOMVULNERACOMID', description: 'População em domicílios vulneráveis e com idoso' },
    { var: 'POPVULNERAVEL15A24', description: 'População de 15 a 24 anos de idade que é vulnerável à pobreza' },
    { var: 'OCUPMMEIOD', description: 'População ocupada vulnerável à pobreza que retorna diariamente do trabalho para o domicílio' },
    { var: 'I_ESCOLARIDADE', description: 'Subíndice de escolaridade da população adulta - IDHM Educação' },
    { var: 'I_FREQ_PROP', description: 'Subíndice de frequência escolar da população jovem - IDHM Educação' },
    { var: 'IDHM', description: 'Índice de Desenvolvimento Humano Municipal' },
    { var: 'IDHM_E', description: 'Índice de Desenvolvimento Humano Municipal - Dimensão Educação' },
    { var: 'IDHM_L', description: 'Índice de Desenvolvimento Humano Municipal  - Dimensão Longevidade' },
    { var: 'IDHM_R', description: 'Índice de Desenvolvimento Humano Municipal - Dimensão Renda' }
];
