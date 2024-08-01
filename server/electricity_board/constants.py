# Gender column choices
GENDER_CHOICES = (
    ("MALE", "Male"),
    ("FEMALE", "Female"),
)

# Govt ID Type column choices
GOVT_ID_TYPE_CHOICES = (
    ("AADHAR", "Aadhar"),
    ("VOTER_ID", "Voter Id"),
    ("PAN", "PAN"),
    ("PASSPORT", "Passport"),
)

# Ownership column choices
OWNERSHIP_CHOICES = (
    ("JOINT", "Joint"),
    ("INDIVIDUAL", "Individual"),
)

# Category column choices
CATEGORY_CHOICES = (
    ("COMMERCIAL", "Commercial"),
    ("RESIDENTIAL", "Residential"),
)

# Status column choices
STATUS_CHOICES = (
    ("APPROVED", "Approved"),
    ("PENDING", "Pending"),
    ("CONNECTION_RELEASED", "Connection Released"),
    ("REJECTED", "Rejected"),
)

# Reviewer Comments column choices
REVIEWER_COMMENTS_CHOICES = (
    ("INSTALLATION_PENDING", "Installation Pending"),
    ("DOCUMENTS_VERIFICATION_IN_PROGRESS", "Documents Verification In Progress"),
    ("INSTALLATION_COMPLETED", "Installation Completed"),
    ("KYC_FAILED", "KYC Failed"),
)

# Status types
PENDING = "PENDING"
APPROVED = "APPROVED"
CONNECTION_RELEASED = "CONNECTION_RELEASED"
REJECTED = "REJECTED"

# Reviewer Comments types
DOCUMENTS_VERIFICATION_IN_PROGRESS = "DOCUMENTS_VERIFICATION_IN_PROGRESS"
INSTALLATION_PENDING = "INSTALLATION_PENDING"
INSTALLATION_COMPLETED = "INSTALLATION_COMPLETED"
KYC_FAILED = "KYC_FAILED"

# Mapping that relates status of application on reviewer comments
STATUS_REVIEWER_COMMENTS_MAPPING = {
    DOCUMENTS_VERIFICATION_IN_PROGRESS: "PENDING",
    INSTALLATION_PENDING: "APPROVED",
    INSTALLATION_COMPLETED: "CONNECTION_RELEASED",
    KYC_FAILED: "REJECTED",
}

MONTHS = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
}

# Validation Error
EDIT_APPLICATION_INSTALLATION_COMPLETED_VALIDATION_MESSAGE = (
    "Installation already completed, can not change reviewer comment."
)
EDIT_APPLICATION_INSTALLATION_PENDING_VALIDATION_MESSAGE = (
    "Application is already approved, can not reject now!, Wrong action."
)
EDIT_APPLICATION_KYC_FAILED_VALIDATION_MESSAGE = "Application was rejected due to KYC failure, Failed application can only moved to dpcument verification."
EDIT_APPLICATION_DOCUMENTS_VERIFICATION_IN_PROGRESS_VALIDATION_MESSAGE = "Application directly can not move from documents verification to installation completed."
WRONG_STATUS_SELECT = "Please provide correct status."
# successful messages
EDIT_APPLICATION_SUCCESSFULLY = "Application Details updated successfully"
FETCH_CHART_DATA_SUCCESSFULLY = "Successfuly fetched chart details"


# Object does not exist error
APPLICATION_ID_DOES_NOT_EXIST = "Applciation ID does not exist"
