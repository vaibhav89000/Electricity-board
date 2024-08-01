from electricity_board.models import Application
from graphql import GraphQLError
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Count
from electricity_board.constants import (
    APPLICATION_ID_DOES_NOT_EXIST,
    APPROVED,
    CONNECTION_RELEASED,
    FETCH_CHART_DATA_SUCCESSFULLY,
    MONTHS,
    PENDING,
    REJECTED,
    WRONG_STATUS_SELECT,
)


class AllApplicationResolver:
    """
    This Resolver is for returning all application details
    """

    def __call__(self, name, info):
        try:
            return Application.objects.all()
        except Exception as e:
            raise GraphQLError(str(e))


class GetApplicantResolver:
    """
    This Resolver returns application and applicant deatils on the basis of application_id
    """

    def __call__(self, name, info, application_id):
        try:
            return Application.objects.get(id=application_id)
        except ObjectDoesNotExist:
            raise GraphQLError("Application with this id does not exist")
        except Exception as e:
            raise GraphQLError(str(e))


class GetMonthWiseApplicationCountResolver:
    """
    This Resolver returns month and count of application in that month.
    Data is also filtered on basis of status
    """

    def __call__(self, name, info, **kwargs):
        try:
            application_data = Application.objects.all()
            status = kwargs.get("status")
            if status:
                if status not in [PENDING, APPROVED, CONNECTION_RELEASED, REJECTED]:
                    raise GraphQLError(WRONG_STATUS_SELECT)
                application_data = application_data.filter(status=status)

            application_data = (
                application_data.values("date_of_application__month")
                .order_by("date_of_application__month")
                .annotate(count=Count("id"))
            )
            final_result = {
                "Jan": {},
                "Feb": {},
                "Mar": {},
                "Apr": {},
                "May": {},
                "Jun": {},
                "Jul": {},
                "Aug": {},
                "Sep": {},
                "Oct": {},
                "Nov": {},
                "Dec": {},
            }
            for key in final_result:
                final_result[key] = {
                    "month": key,
                    "count": 0,
                }

            for application in application_data:
                final_result[MONTHS[application["date_of_application__month"]]][
                    "count"
                ] = application["count"]

            return {
                "message": FETCH_CHART_DATA_SUCCESSFULLY,
                "ok": True,
                "data": list(final_result.values()),
            }
        except ObjectDoesNotExist:
            raise GraphQLError(APPLICATION_ID_DOES_NOT_EXIST)
        except Exception as e:
            raise GraphQLError(str(e))
