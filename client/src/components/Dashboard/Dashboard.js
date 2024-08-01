import { Empty, Spin, message } from "antd";
import { useQuery } from "@apollo/client";
import React, { useState } from "react";

import { GET_MONTH_WISE_APPLICATION_COUNT } from "../../services.js/Queries";
import "./style.css";
import { Column, Line } from "@ant-design/plots";
import {
  DEFAULT_ERROR_MESSAGE,
  REVIEWER_COMMENTS_STATUS_WITH_ALL,
} from "../../constants";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

function Dashboard() {
  const [status, SetStatus] = useState("ALL");

  // Query to get application counts per month
  const {
    loading: monthWiseChartDataLoading,
    error: monthWiseChartDataError,
    data: monthWiseChartData,
  } = useQuery(GET_MONTH_WISE_APPLICATION_COUNT, {
    variables: {
      status: status === "ALL" ? "" : status,
    },
    onError: (error) => {
      message.error(error?.message || DEFAULT_ERROR_MESSAGE);
    },
  });

  // Config for line chart
  const lineConfig = {
    data: monthWiseChartData?.getMonthWiseApplicationCount?.data,
    height: 400,
    xField: "month",
    yField: "count",
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 2,
    },
  };

  // Config for bar chart
  const barConfig = {
    data: monthWiseChartData?.getMonthWiseApplicationCount?.data,
    height: 400,
    xField: "month",
    yField: "count",
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 2,
    },
  };

  // To handle loading time and error
  if (monthWiseChartDataLoading) return <Spin size="large" fullscreen />;
  if (monthWiseChartDataError) {
    return <Empty className="no-data-found" />;
  }

  return (
    <div className="dashboard_container">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          className="status_select"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          size="small"
          label="Status"
          value={status}
          onChange={(e) => {
            SetStatus(e.target.value);
          }}
        >
          {Object.keys(REVIEWER_COMMENTS_STATUS_WITH_ALL)?.map((key) => {
            return (
              <MenuItem key={key} value={key}>
                {REVIEWER_COMMENTS_STATUS_WITH_ALL[key]}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <div className="dashboard_charts_container">
        <Column {...barConfig} />
        <Line {...lineConfig} />
      </div>
      <Typography
        variant="h5"
        gutterBottom
        className="dashboard_container_title"
      >
        Number Of Connection Per Month
      </Typography>
    </div>
  );
}

export default Dashboard;
