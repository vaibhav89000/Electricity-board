import React, { useState } from "react";
import { useFormik } from "formik";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_APPLICATION_DETAILS } from "../../services.js/Queries";
import { Spin, Empty, message } from "antd";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import "./style.css";
import {
  CATEGORY_CHOICES,
  DEFAULT_ERROR_MESSAGE,
  GENDER_CHOICES,
  OWNERSHIP_CHOICES,
  REVIEWER_COMMENTS_MAPPER,
  REVIEWER_COMMENTS_STATUS,
  SUCCESSFULLY_UPDATED_APPLICATION_MESSAGE,
} from "../../constants";
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { object, string } from "yup";
import { EDIT_APPLICATION_DETAIL } from "../../services.js/Mutations";

const Item = styled(Paper)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(1),
  boxShadow: "none",
}));

function ApplicantDetails() {
  const restrictedFieldOnUpdate = true;
  const { id } = useParams();

  const [updateApplication, setUpdateApplication] = useState(false);

  // Application validation schema
  const applicationSchema = object().shape({
    applicationId: string().required("Required"),
    ownership: string().required("Required"),
    category: string().required("Required"),
    loadAppliedValue: string().required("Required"),
    dateOfApplication: string().required("Required"),
    modifiedDate: string().required("Required"),
    status: string().required("Required"),
    reviewerComments: string().required("Required"),
    reviewerName: string().required("Required"),
    name: string().required("Required"),
    gender: string().required("Required"),
    district: string().required("Required"),
    state: string().required("Required"),
    pinCode: string().required("Required"),
    govtId: string().required("Required"),
    govtIdType: string().required("Required"),
  });

  // Form
  const formik = useFormik({
    initialValues: {
      applicationId: "",
      ownership: "",
      category: "",
      loadAppliedValue: "",
      dateOfApplication: "",
      modifiedDate: "",
      status: "",
      reviewerComments: "",
      reviewerName: "",
      name: "",
      gender: "",
      district: "",
      state: "",
      pinCode: "",
      govtId: "",
      govtIdType: "",
    },
    validationSchema: applicationSchema,
    onSubmit: (values) => {
      let updateApplicationObj = {
        applicationId: values?.applicationId,
        category: values?.category,
        district: values?.district,
        gender: values?.gender,
        loadAppliedValue: values?.loadAppliedValue,
        name: values?.name,
        ownership: values?.ownership,
        pinCode: values?.pinCode,
        reviewerComments: values?.reviewerComments,
        state: values?.state,
      };
      updateApplcaitionData({
        variables: {
          applicationDetails: updateApplicationObj,
        },
      });
    },
  });

  // Handle edit mode
  const handleEdit = () => {
    setUpdateApplication((currVal) => !currVal);
  };

  // Query applicationn details by application id
  const {
    loading: applicantDataLoading,
    error: applicantDataError,
    data: applicantDataData,
  } = useQuery(GET_APPLICATION_DETAILS, {
    variables: {
      applicationId: id,
    },
    onCompleted: () => {
      formik.setValues({
        applicationId: applicantDataData?.getApplicationDetail?.id,
        ownership: applicantDataData?.getApplicationDetail?.ownership,
        category: applicantDataData?.getApplicationDetail?.category,
        loadAppliedValue:
          applicantDataData?.getApplicationDetail?.loadAppliedValue,
        dateOfApplication:
          applicantDataData?.getApplicationDetail?.dateOfApplication,
        modifiedDate: applicantDataData?.getApplicationDetail?.modifiedDate,
        status: applicantDataData?.getApplicationDetail?.status,
        reviewerComments:
          applicantDataData?.getApplicationDetail?.reviewerComments,
        reviewerName: applicantDataData?.getApplicationDetail?.reviewer?.name,
        name: applicantDataData?.getApplicationDetail?.applicant?.name,
        gender: applicantDataData?.getApplicationDetail?.applicant?.gender,
        district: applicantDataData?.getApplicationDetail?.applicant?.district,
        state: applicantDataData?.getApplicationDetail?.applicant?.state,
        pinCode: applicantDataData?.getApplicationDetail?.applicant?.pinCode,
        govtId: applicantDataData?.getApplicationDetail?.applicant?.govtId,
        govtIdType:
          applicantDataData?.getApplicationDetail?.applicant?.govtIdType,
      });
    },
    onError: (error) => {
      message.error(error?.message || DEFAULT_ERROR_MESSAGE);
    },
  });

  // Mutation for applicationn details update
  const [updateApplcaitionData, { loading: editApplicationDataLoading }] =
    useMutation(EDIT_APPLICATION_DETAIL, {
      variables: {
        applicationId: id,
      },
      onCompleted: () => {
        message.success(SUCCESSFULLY_UPDATED_APPLICATION_MESSAGE);
      },
      onError: (error) => {
        message.error(error?.message || DEFAULT_ERROR_MESSAGE);
      },
    });

  // To handle loading time and error
  if (applicantDataLoading || editApplicationDataLoading) {
    return <Spin size="large" fullscreen />;
  }
  if (applicantDataError) {
    return <Empty className="no-data-found" />;
  }

  return (
    <div className="applicant_details_container">
      <FormControlLabel
        className="edit_btn"
        control={<Checkbox onClick={handleEdit} />}
        label="Edit"
      />
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h5" gutterBottom>
          Application Details
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Item>
              <Typography variant="subtitle2" gutterBottom>
                Application Id
              </Typography>
              <TextField
                style={{ width: "80%" }}
                disabled={restrictedFieldOnUpdate}
                size="small"
                type="text"
                id="applicationId"
                name="applicationId"
                onChange={formik.handleChange}
                value={formik.values.applicationId}
              />
            </Item>
          </Grid>
          <Grid item xs={12} md={6}>
            <Item>
              <Typography variant="subtitle2" gutterBottom>
                Date Of Application
              </Typography>
              <TextField
                style={{ width: "80%" }}
                disabled={restrictedFieldOnUpdate}
                size="small"
                type="text"
                name="dateOfApplication"
                onChange={formik.handleChange}
                value={formik.values.dateOfApplication}
              />
            </Item>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Item>
              <Typography variant="subtitle2" gutterBottom>
                Load Applied Value
              </Typography>
              <TextField
                style={{ width: "80%" }}
                disabled={restrictedFieldOnUpdate}
                size="small"
                type="text"
                name="loadAppliedValue"
                onChange={formik.handleChange}
                value={formik.values.loadAppliedValue}
              />
            </Item>
          </Grid>
          <Grid item xs={12} md={6}>
            <Item>
              <Typography variant="subtitle2" gutterBottom>
                Status
              </Typography>
              <Select
                style={{ width: "80%" }}
                size="small"
                disabled={restrictedFieldOnUpdate}
                name="status"
                value={formik.values?.status}
                onChange={(e) => {
                  formik.setFieldValue("status", e.target.value);
                }}
              >
                {Object.keys(REVIEWER_COMMENTS_STATUS)?.map((key) => {
                  return (
                    <MenuItem key={key} value={key}>
                      {REVIEWER_COMMENTS_STATUS[key]}
                    </MenuItem>
                  );
                })}
              </Select>
            </Item>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Item>
              <Typography variant="subtitle2" gutterBottom>
                Reviewer Name
              </Typography>
              <TextField
                style={{ width: "80%" }}
                disabled={restrictedFieldOnUpdate}
                size="small"
                type="text"
                name="reviewerName"
                onChange={formik.handleChange}
                value={formik.values.reviewerName}
              />
            </Item>
          </Grid>
          <Grid item xs={12} md={6}>
            <Item>
              <Typography variant="subtitle2" gutterBottom>
                Reviewer Comments
              </Typography>
              <Select
                style={{ width: "80%" }}
                disabled={!updateApplication}
                size="small"
                name="reviewerComments"
                value={formik.values?.reviewerComments}
                onChange={(e) => {
                  formik.setFieldValue("reviewerComments", e.target.value);
                }}
              >
                {Object.keys(REVIEWER_COMMENTS_MAPPER)?.map((key) => {
                  return (
                    <MenuItem key={key} value={key}>
                      {REVIEWER_COMMENTS_MAPPER[key]}
                    </MenuItem>
                  );
                })}
              </Select>
            </Item>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Item>
              <Typography variant="subtitle2" gutterBottom>
                Ownership
              </Typography>
              <Select
                style={{ width: "80%" }}
                disabled={!updateApplication}
                size="small"
                name="ownership"
                value={formik.values?.ownership}
                onChange={(e) => {
                  formik.setFieldValue("ownership", e.target.value);
                }}
              >
                {Object.keys(OWNERSHIP_CHOICES)?.map((key) => {
                  return (
                    <MenuItem key={key} value={key}>
                      {OWNERSHIP_CHOICES[key]}
                    </MenuItem>
                  );
                })}
              </Select>
            </Item>
          </Grid>
          <Grid item xs={12} md={6}>
            <Item>
              <Typography variant="subtitle2" gutterBottom>
                Category
              </Typography>

              <Select
                style={{ width: "80%" }}
                disabled={!updateApplication}
                size="small"
                name="category"
                value={formik.values?.category}
                onChange={(e) => {
                  formik.setFieldValue("category", e.target.value);
                }}
              >
                {Object.keys(CATEGORY_CHOICES)?.map((key) => {
                  return (
                    <MenuItem key={key} value={key}>
                      {CATEGORY_CHOICES[key]}
                    </MenuItem>
                  );
                })}
              </Select>
            </Item>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Item>
              <Typography variant="subtitle2" gutterBottom>
                Modified Date
              </Typography>
              <TextField
                style={{ width: "80%" }}
                disabled={restrictedFieldOnUpdate}
                size="small"
                type="text"
                id="modifiedDate"
                name="modifiedDate"
                onChange={formik.handleChange}
                value={formik.values.modifiedDate}
              />
            </Item>
          </Grid>
        </Grid>
        <Divider />
        <Typography mt={2} variant="h5" gutterBottom>
          Applicant Details
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Item>
              <Typography variant="subtitle2" gutterBottom>
                Applicant Name
              </Typography>
              <TextField
                style={{ width: "80%" }}
                size="small"
                type="text"
                id="name"
                name="name"
                disabled={!updateApplication}
                onChange={formik.handleChange}
                value={formik.values.name}
                error={formik?.touched?.name && formik?.errors?.name}
                helperText={
                  formik?.touched?.name && formik?.errors?.name && "Required !"
                }
              />
            </Item>
          </Grid>
          <Grid item xs={12} md={6}>
            <Item>
              <Typography variant="subtitle2" gutterBottom>
                Gender
              </Typography>

              <Select
                style={{ width: "80%" }}
                disabled={!updateApplication}
                size="small"
                name="gender"
                value={formik.values?.gender}
                onChange={(e) => {
                  formik.setFieldValue("gender", e.target.value);
                }}
              >
                {Object.keys(GENDER_CHOICES)?.map((key) => {
                  return (
                    <MenuItem key={key} value={key}>
                      {GENDER_CHOICES[key]}
                    </MenuItem>
                  );
                })}
              </Select>
            </Item>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Item>
              <Typography variant="subtitle2" gutterBottom>
                Govt Id Type
              </Typography>
              <TextField
                style={{ width: "80%" }}
                disabled={restrictedFieldOnUpdate}
                size="small"
                type="text"
                id="govtIdType"
                name="govtIdType"
                onChange={formik.handleChange}
                value={formik.values.govtIdType}
              />
            </Item>
          </Grid>
          <Grid item xs={12} md={6}>
            <Item>
              <Typography variant="subtitle2" gutterBottom>
                Govt Id
              </Typography>
              <TextField
                style={{ width: "80%" }}
                disabled={restrictedFieldOnUpdate}
                size="small"
                type="text"
                name="govtId"
                onChange={formik.handleChange}
                value={formik.values.govtId}
              />
            </Item>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Item>
              <Typography variant="subtitle2" gutterBottom>
                District
              </Typography>
              <TextField
                style={{ width: "80%" }}
                disabled={!updateApplication}
                size="small"
                type="text"
                id="district"
                name="district"
                onChange={formik?.handleChange}
                value={formik?.values?.district}
                error={formik?.touched?.district && formik?.errors?.district}
                helperText={
                  formik?.touched?.district &&
                  formik?.errors?.district &&
                  "Required !"
                }
              />
            </Item>
          </Grid>
          <Grid item xs={12} md={6}>
            <Item>
              <Typography variant="subtitle2" gutterBottom>
                State
              </Typography>
              <TextField
                style={{ width: "80%" }}
                disabled={!updateApplication}
                size="small"
                type="text"
                name="state"
                error={formik?.touched?.state && formik?.errors?.state}
                onChange={formik.handleChange}
                helperText={
                  formik?.touched?.state &&
                  formik?.errors?.state &&
                  "Required !"
                }
                value={formik?.values?.state}
              />
            </Item>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Item>
              <Typography variant="subtitle2" gutterBottom>
                Pin Code
              </Typography>
              <TextField
                style={{ width: "80%" }}
                size="small"
                type="text"
                name="pinCode"
                disabled={!updateApplication}
                onChange={formik.handleChange}
                value={formik.values.pinCode}
                error={formik?.touched?.pinCode && formik?.errors?.pinCode}
                helperText={
                  formik?.touched?.pinCode &&
                  formik?.errors?.pinCode &&
                  "Required !"
                }
              />
            </Item>
          </Grid>
        </Grid>

        <Button
          className="submit_btn"
          type="submit"
          variant="outlined"
          disabled={!updateApplication}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default ApplicantDetails;
