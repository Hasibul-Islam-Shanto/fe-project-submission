const PRODUCT_LIST_FIELDS = `
  uid
  enName
  images {
    url
  }
  variants {
    uid
    ebsItemCode
    mrpPrice
    quantity
    discount {
      amount
      value
      type
    }
  }
`;

export const PRODUCTS_LIST_QUERY = `
  query ProductsList($skip: Int!, $limit: Int!, $filter: ProductFilterInput) {
    getProducts(
      pagination: { skip: $skip, limit: $limit }
      filter: $filter
    ) {
      message
      statusCode
      result {
        count
        products {
          ${PRODUCT_LIST_FIELDS}
        }
      }
    }
  }
`;

export const PRODUCT_DETAIL_QUERY = `
  query ProductDetail($uid: String!) {
    getProducts(
      pagination: { skip: 0, limit: 1 }
      filter: { uid: $uid }
    ) {
      message
      statusCode
      result {
        products {
          uid
          enName
          images {
            url
          }
          productAttributes {
            enLabel
            values {
              enName
            }
          }
          detailedDescriptions {
            enLabel
            values {
              enName
            }
          }
          deliveries {
            enLabel
            values {
              enName
            }
          }
          serviceAndDeliveries {
            enLabel
            values {
              enName
            }
          }
          priceAndStocks {
            enLabel
            values {
              enName
            }
          }
          variants {
            uid
            mrpPrice
            ebsItemCode
            posItemCode
            quantity
            images {
              url
            }
            discount {
              amount
              value
              type
            }
          }
        }
      }
    }
  }
`;
