from django.contrib import admin
from .models import Applicant, Application, Reviewer


@admin.register(Applicant)
class ApplicantAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "gender",
        "district",
        "state",
        "pin_code",
        "govt_id_type",
        "govt_id",
    )


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "ownership",
        "category",
        "load_applied_value",
        "date_of_application",
        "modified_date",
        "status",
        "reviewer_comments",
        "reviewer",
        "applicant",
    )


@admin.register(Reviewer)
class ReviewerAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
    )
