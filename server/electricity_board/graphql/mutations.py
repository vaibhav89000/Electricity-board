import graphene
from graphql import GraphQLError
from django.core.exceptions import ObjectDoesNotExist
from electricity_board.graphql.inputs import ApplicationDetailsUpdateInput
from electricity_board.models import Application
from electricity_board.constants import (
    APPLICATION_ID_DOES_NOT_EXIST,
    DOCUMENTS_VERIFICATION_IN_PROGRESS,
    EDIT_APPLICATION_DOCUMENTS_VERIFICATION_IN_PROGRESS_VALIDATION_MESSAGE,
    EDIT_APPLICATION_INSTALLATION_COMPLETED_VALIDATION_MESSAGE,
    EDIT_APPLICATION_INSTALLATION_PENDING_VALIDATION_MESSAGE,
    EDIT_APPLICATION_KYC_FAILED_VALIDATION_MESSAGE,
    EDIT_APPLICATION_SUCCESSFULLY,
    INSTALLATION_COMPLETED,
    INSTALLATION_PENDING,
    KYC_FAILED,
    STATUS_REVIEWER_COMMENTS_MAPPING,
)


class EditApplicationDetailMutation(graphene.Mutation):
    """
    This mutation is for updating application and related applicant details
    """

    ok = graphene.Boolean()
    message = graphene.String()

    class Arguments:
        application_details = ApplicationDetailsUpdateInput()

    def mutate(self, info, **kwargs):
        try:
            application_details = kwargs["application_details"]
            application = Application.objects.get(id=application_details.application_id)

            application.category = application_details.category
            application.ownership = application_details.ownership
            application.load_applied_value = application_details.load_applied_value

            if (
                application.reviewer_comments == INSTALLATION_COMPLETED
                and application_details.reviewer_comments != INSTALLATION_COMPLETED
            ):
                raise GraphQLError(
                    EDIT_APPLICATION_INSTALLATION_COMPLETED_VALIDATION_MESSAGE
                )

            if (
                application.reviewer_comments == INSTALLATION_PENDING
                and application_details.reviewer_comments
                in [KYC_FAILED, DOCUMENTS_VERIFICATION_IN_PROGRESS]
            ):
                raise GraphQLError(
                    EDIT_APPLICATION_INSTALLATION_PENDING_VALIDATION_MESSAGE
                )

            if (
                application.reviewer_comments == KYC_FAILED
                and application_details.reviewer_comments
                not in [KYC_FAILED, DOCUMENTS_VERIFICATION_IN_PROGRESS]
            ):
                raise GraphQLError(EDIT_APPLICATION_KYC_FAILED_VALIDATION_MESSAGE)

            if (
                application.reviewer_comments == DOCUMENTS_VERIFICATION_IN_PROGRESS
                and application_details.reviewer_comments == INSTALLATION_COMPLETED
            ):
                raise GraphQLError(
                    EDIT_APPLICATION_DOCUMENTS_VERIFICATION_IN_PROGRESS_VALIDATION_MESSAGE
                )
            application.reviewer_comments = application_details.reviewer_comments
            application.status = STATUS_REVIEWER_COMMENTS_MAPPING[
                application.reviewer_comments
            ]
            application.full_clean()

            applicant = application.applicant
            applicant.name = application_details.name
            applicant.gender = application_details.gender
            applicant.pin_code = application_details.pin_code
            applicant.district = application_details.district
            applicant.state = application_details.state

            applicant.full_clean()

            applicant.save()
            application.save()

            return {"message": EDIT_APPLICATION_SUCCESSFULLY, "ok": True}
        except ObjectDoesNotExist:
            raise GraphQLError(APPLICATION_ID_DOES_NOT_EXIST)
        except Exception as e:
            raise GraphQLError(str(e))


class Mutation(graphene.ObjectType):
    edit_application_detail = EditApplicationDetailMutation.Field()
