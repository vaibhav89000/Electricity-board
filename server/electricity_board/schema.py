import graphene
from electricity_board.graphql.query import Query
from electricity_board.graphql.mutations import Mutation


# schema = graphene.Schema(query=Query, mutation=Mutation)
schema = graphene.Schema(query=Query, mutation=Mutation)
