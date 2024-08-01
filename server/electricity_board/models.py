from django.db import models
from electricity_board.constants import (
    CATEGORY_CHOICES,
    GENDER_CHOICES,
    GOVT_ID_TYPE_CHOICES,
    OWNERSHIP_CHOICES,
    REVIEWER_COMMENTS_CHOICES,
    STATUS_CHOICES,
)
from django.core.validators import MaxValueValidator, MinValueValidator


class Applicant(models.Model):

    name = models.CharField(max_length=20)
    gender = models.CharField(max_length=6, choices=GENDER_CHOICES)
    district = models.CharField(max_length=20)
    state = models.CharField(max_length=30)
    pin_code = models.CharField(max_length=10)
    govt_id_type = models.CharField(max_length=20, choices=GOVT_ID_TYPE_CHOICES)
    govt_id = models.CharField(max_length=20)

    def __str__(self):
        return self.name


class Reviewer(models.Model):

    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Application(models.Model):

    ownership = models.CharField(max_length=20, choices=OWNERSHIP_CHOICES)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    load_applied_value = models.IntegerField(
        default=0, validators=[MinValueValidator(0), MaxValueValidator(200)]
    )
    date_of_application = models.DateField()
    modified_date = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    reviewer_comments = models.CharField(
        max_length=100, choices=REVIEWER_COMMENTS_CHOICES, null=True, blank=True
    )
    reviewer = models.ForeignKey(
        Reviewer, on_delete=models.CASCADE, related_name="applications_reviewed"
    )
    applicant = models.ForeignKey(
        Applicant, on_delete=models.CASCADE, related_name="applications_submitted"
    )
