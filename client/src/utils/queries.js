import gql from 'graphql-tag';

export const QUERY_CATEGORIES = gql`
query categories {
  
    categories{
        _id
      name
    }
  }`;

export const QUERY_MESSAGES = gql`

query user($email:String) {

  user(email:$email) {
    
    
      messages
      orders {
        products 
        {
          
                _id
                
              
        }

      }
    
  }
}

`;


export const QUERY_PRODUCTS = gql`
query products($category: ID, $name: String){
    products (category:$category,name:$name)
    {
      
            _id
            name
            description
            image
            price
            bidderName
            bidValue
            bidTimeStamp
            sold
            category {
              _id
              name
            }
        
    
    }
    
    }
    

`;

// export const LOGIN = gql`
//   mutation login($email: String!, $password: String!) {
//     login(email: $email, password: $password) {
//       token
//       user {
//         _id
//       }
//     }
//   }
// `;