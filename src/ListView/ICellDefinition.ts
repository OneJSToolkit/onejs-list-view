interface ICellDefinition {
    key: string;

    viewType: any;
    viewData: any;

    width: number;
    height: number;

    lineBreak?: boolean;
}

export = ICellDefinition;