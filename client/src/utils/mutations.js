import gql from 'graphql-tag';


export const UPDATE_BID = gql`
mutation updateProduct($_id:ID!,$value:Float!,$bidTimeStamp:String!,$bidderName:String!,$bidderId:String!){
  updateProduct(_id:$_id,value:$value,bidTimeStamp:$bidTimeStamp,bidderName:$bidderName,bidderId:$bidderId){
  bidValue
  bidTimeStamp 
  bidderId
  name
  _id
  }
}`;



export const ADD_USER = gql`
  mutation addUser($firstName: String!, $lastName: String!, $email: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email) {
      user{
        _id
      }
    }
  }
`;
export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
      name
      description
      price
      quantity
      category {
        name
      } 
      }
    }
  }
`;