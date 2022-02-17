import {
    useQuery,
    gql
  } from "@apollo/client";

//danh sachs pet
export const GET_ALL_PET = gql`
  query GetExchangeRates {
      pets{
      id,
      name,
      owner{
         name
      }
    }
  }
`;

//danh sachs owner
export const GET_ALL_OWNER = gql`
  query GetExchangeRates {
      owners{
      id,
      name
    }
  }
`;




///laays 1  pet
export const GET_PET_BY_ID = gql`
  query getPetById ($id: Int!){
      getPet(id: $id){
      id,
      name,
      owner{
        id,
         name
      }
    }
  }
`;


export const ADD_PET =
gql`
  mutation addPet($input: CreatePetInput!){
      createPet(createPetInput: $input){
  		 name,
      id
  		}
  }
`

///delete pet

export const DELETE_PET =
  gql`
  mutation dl($id: Int!) {
    deletePet(id: $id)
  }
`


//update pet

export const UPDATE_PET =
  gql`
mutation updatePet($id: Int!, $input: UpdatePetInput!) {
  updatePet(id: $id, updatePetInput: $input) {
      id
      name, 
      ownerId
  }
}
`
