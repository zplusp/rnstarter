declare type PlaceItem = {
    'Name': string,
    'Nearest': string,
    'Ratings': string,
    'Category': string
}

declare type ApiResponse = {
    [propName: string]: Array<PlaceItem>
}

declare type UIData = {
    title: string;
    data: Array<UIContent>
}

declare type UIContent = {
    data: Array<PlaceItem>
}