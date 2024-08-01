import { gql } from "@apollo/client";

export const GET_ALL_APPLICATION = gql`
  {
    allApplication {
      id
      applicant {
        name
      }
      ownership
      status
      category
      loadAppliedValue
      dateOfApplication
      reviewerComments
      reviewer {
        name
      }
    }
  }
`;

export const GET_APPLICATION_DETAILS = gql`
  query getApplicationDetail($applicationId: String!) {
    getApplicationDetail(applicationId: $applicationId) {
      id
      ownership
      category
      loadAppliedValue
      dateOfApplication
      modifiedDate
      status
      reviewerComments
      reviewer {
        name
      }
      applicant {
        name
        gender
        district
        state
        pinCode
        govtId
        govtIdType
      }
    }
  }
`;

export const GET_MONTH_WISE_APPLICATION_COUNT = gql`
  query getMonthWiseApplicationCount($status: String) {
    getMonthWiseApplicationCount(status: $status)
  }
`;
