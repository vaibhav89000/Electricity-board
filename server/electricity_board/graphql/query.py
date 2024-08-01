import graphene
from graphene.types.generic import GenericScalar
from electricity_board.graphql.resolvers import (
    AllApplicationResolver,
    GetApplicantResolver,
    GetMonthWiseApplicationCountResolver,
)
from electricity_board.graphql.types import ApplicationType


class Query(graphene.ObjectType):

    all_application = graphene.List(ApplicationType, resolver=AllApplicationResolver())

    get_application_detail = graphene.Field(
        ApplicationType,
        application_id=graphene.String(required=True),
        resolver=GetApplicantResolver(),
    )

    get_month_wise_application_count = graphene.Field(
        GenericScalar,
        status=graphene.String(),
        resolver=GetMonthWiseApplicationCountResolver(),
    )
