import graphene


class ApplicationDetailsUpdateInput(graphene.InputObjectType):
    application_id = graphene.String(required=True)
    ownership = graphene.String(required=True)
    category = graphene.String(required=True)
    load_applied_value = graphene.Int(required=True)
    reviewer_comments = graphene.String(required=True)
    name = graphene.String(required=True)
    gender = graphene.String(required=True)
    pin_code = graphene.String(required=True)
    district = graphene.String(required=True)
    state = graphene.String(required=True)
