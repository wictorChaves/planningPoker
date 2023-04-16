export class Measures {

    public static sm: string = 'carol';
    private static _measures = {
        carol: {
            1: [5],
            2: [10, 12, 15, 6, 7],
            3: [18, 14, 21],
            0: [0]
        },
        bruno: {
            1: [5],
            2: [10, 15, 6, 7],
            3: [12, 18, 14, 21],
            0: [0]
        }
    }

    static getMeasureBySM(sm: string) {
        return (Measures._measures as any)[sm];
    }

    static getUncertaintyRiskNumber(risk: number): number {
        if (Measures.getMeasureBySM(this.sm)[1].includes(risk))
            return 1;
        if (Measures.getMeasureBySM(this.sm)[2].includes(risk))
            return 2;
        if (Measures.getMeasureBySM(this.sm)[3].includes(risk))
            return 3;
        if (Measures.getMeasureBySM(this.sm)[0].includes(risk))
            return 0;
        return 0;
    }

    static getComplexityRiskNumber(risk: number): number {
        if (Measures.getMeasureBySM(this.sm)[1].includes(risk))
            return 5;
        if (Measures.getMeasureBySM(this.sm)[2].includes(risk))
            return 6;
        if (Measures.getMeasureBySM(this.sm)[3].includes(risk))
            return 7;
        if (Measures.getMeasureBySM(this.sm)[0].includes(risk))
            return 0;
        return 0;
    }

}