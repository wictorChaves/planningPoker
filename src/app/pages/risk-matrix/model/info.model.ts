export class InfoModel {
    label : string        = '';
    first : InfoItemModel = new InfoItemModel();
    second: InfoItemModel = new InfoItemModel();
}

export class InfoItemModel {
    icons       : string[] = ['🤙', '🤞', '👎'];
    label       : string   = '';
    descriptions: string[] = [];
}