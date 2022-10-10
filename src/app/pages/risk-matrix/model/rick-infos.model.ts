import { InfoModel } from "./info.model";

export class RiskInfosModel {
    
    uncertainty: InfoModel = new InfoModel();
    reproduce  : InfoModel = new InfoModel();

    static createRiskInfosModelDefault() {
        return {
            uncertainty: {
                label: 'Incerteza',
                first: {
                    icons       : ['🛴', '🚲', '🚗'],
                    label       : 'O que fazer',
                    descriptions: [
                        'A história é simples?',
                        'A história é complexa?',
                        'A história tem algo diferente?',
                        'Temos muitas regras de negócio?'
                    ]
                },
                second: {
                    icons       : ['✨', '🦺', '🧨'],
                    label       : 'Como fazer',
                    descriptions: [
                        'Como fazer é simples?',
                        'Como fazer é complexo?',
                        'Não sabemos como fazer?'
                    ]
                }
            },
            reproduce: {
                label: 'Complexidade',
                first: {
                    icons       : ['🐱‍💻', '👩‍💻', '🔨'],
                    label       : 'Desenvolver',
                    descriptions: [
                        'Estamos trabalhando no legado?',
                        'A arquitetura do projeto é nova?',
                        'A arquitetura do projeto é simples?',
                        'A parte que vamos trabalhar esta bem organizada?',
                        'Precisamos refatorar algo?',
                        'Temos dependências com terceiros?'
                    ]
                },
                second: {
                    icons       : ['😄', '🤔', '🤡'],
                    label       : 'Reproduzir',
                    descriptions: [
                        'É simples para testar?',
                        'Afeta outras telas?',
                        'A massa de testes precisa ser criada?',
                        'A história possui muitos critérios?',
                        'Temos dependência com SAP/terceiros?',
                        'Necessário validar a história no app?'
                    ]
                }
            }
        }
    }

}