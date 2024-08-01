import { gql } from "@apollo/client";

export const EDIT_APPLICATION_DETAIL = gql`
  mutation editApplicationDetail(
    $applicationDetails: ApplicationDetailsUpdateInput
  ) {
    editApplicationDetail(applicationDetails: $applicationDetails) {
      message
      ok
    }
  }
`;
