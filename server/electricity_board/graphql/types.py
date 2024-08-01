import graphene
from graphene_django import DjangoObjectType
from electricity_board.models import Applicant, Application, Reviewer


class ApplicantType(DjangoObjectType):
    class Meta:
        model = Applicant
        fields = "__all__"


class ReviewerType(DjangoObjectType):
    class Meta:
        model = Reviewer


# Define a GraphQL type for Application (Return typee)
class ApplicationType(DjangoObjectType):

    class Meta:
        model = Application

    applicant = graphene.Field(ApplicantType)
    reviewer = graphene.Field(ReviewerType)

    # Define a resolver for the 'applicant' field
    def resolve_applicant(self, info):
        return self.applicant

    # Define a resolver for the 'reviewer' field
    def resolve_reviewer(self, info):
        return self.reviewer
