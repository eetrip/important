async productSearch(page, limit, search) {
    try {
      const offsetLimit = (page - 1) * limit;
      const whereCondition = ` WHERE
      p.name LIKE '%${search}%'
          OR c.name LIKE '%${search}%'
          OR JSON_CONTAINS(LOWER(a.variants), LOWER('{"Processor":"${search}"}'))
          OR JSON_CONTAINS(LOWER(a.variants), LOWER('{"material":"${search}"}'))
          OR JSON_CONTAINS(LOWER(a.variants), LOWER('{"ram":"${search}"}'))
          OR JSON_CONTAINS(LOWER(a.variants), LOWER('{"color":"${search}"}'))
          OR JSON_CONTAINS(LOWER(a.variants), LOWER('{"size":"${search}"}'))
          OR JSON_CONTAINS(LOWER(a.variants), LOWER('{"memory":"${search}"}'))
          OR JSON_CONTAINS(LOWER(a.variants), LOWER('{"os":"${search}"}'))
          limit ${offsetLimit}, ${limit} `;
      let productSearchQuery = ` SELECT 
          p.id AS productId,
          p.name AS productName,
          a.variants as variants,
          c.id AS productCategoryId,
          c.name AS categoryName
      FROM
          products AS p
              INNER JOIN
          productCategory AS c ON p.productCategoryId = c.id
              INNER JOIN
          productattributes AS a ON p.id = a.productId 
      `;
      if (search) {
        productSearchQuery += whereCondition;
      }
      const list = await this.model.sequelize.query(productSearchQuery, {
        type: this.model.sequelize.QueryTypes.SELECT
      });
      return list;
    } catch (error) {
      throw error;
    }
  }