class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i", //case insensitive
          },
        }
      : {};

    // console.log(keyword);

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };

    // Removing some fields for category
    const removeFields = ["keyword", "page", "limit"];

    removeFields.forEach((key) => delete queryCopy[key]);

    // Filter For Price and Rating

    // console.log(queryCopy);
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`); //mogodb use $ for variable; adding this to keyword

    // console.log(queryStr);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  // Pagiination
  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1; //if req no. of pg not present then pg1

    const skip = resultPerPage * (currentPage - 1); //if totalp=50 each pg=10p skip: 10-21-31-41

    this.query = this.query.limit(resultPerPage).skip(skip); //limits product on each page

    return this;
  }
}

export default ApiFeatures;
