class Controller {
  public skip!: any;
  public limit!: any;
  public sortKey!: any;
  public sortType!: any;
  public static preparePaginationPayload(query: {
    skip: any;
    limit: any;
    sortKey: any;
    sortType: any;
  }) {
    const { skip, limit, sortKey, sortType } = query;
    const sortingPayload = { $sort: { [sortKey]: sortType === 'desc' ? -1 : 1 } };
    const limitPayload = { $limit: parseInt(limit, 10) };
    const skipPayload = { $skip: parseInt(skip, 10) };
    let finalObject = [];
    if (sortKey && sortType) {
      finalObject.push(sortingPayload);
    }
    if (skip) {
      finalObject.push(skipPayload);
    }
    if (limit) {
      finalObject.push(limitPayload);
    }
    return finalObject;
  }
}

export default Controller;
