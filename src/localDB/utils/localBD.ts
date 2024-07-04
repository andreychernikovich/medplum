import database from '../index';

const dataQuery = (query: string) => {
    return database.get(query)?.query()?.unsafeFetchRaw()
}

export {
    dataQuery
};
