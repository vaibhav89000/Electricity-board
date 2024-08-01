import {
  Button,
  DatePicker,
  Empty,
  Input,
  Space,
  Spin,
  Table,
  message,
} from "antd";
import { useQuery } from "@apollo/client";
import React, { useRef, useState } from "react";
import {
  DEFAULT_ERROR_MESSAGE,
  REVIEWER_COMMENTS_MAPPER,
  REVIEWER_COMMENTS_STATUS,
} from "../../constants";
import { GET_ALL_APPLICATION } from "../../services.js/Queries";
import "./style.css";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

function Application() {
  const { RangePicker } = DatePicker;
  const navigate = useNavigate();

  // Componenet usestates
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  // Redirect to view application page
  const handleView = (applicant) => {
    navigate(`/applicant-details/${applicant?.id}`);
  };

  // Query all applcaition data
  const { loading: applicationDataLoading, error: applicationDataError } =
    useQuery(GET_ALL_APPLICATION, {
      onCompleted: (data) => {
        let applications = data.allApplication.map((application, index) => ({
          id: application.id,
          key: (index + 1).toString(),
          applicantName: application?.applicant?.name,
          ownership: application?.ownership,
          status: application?.status,
          category: application?.category,
          loadAppliedValue: application?.loadAppliedValue,
          dateOfApplication: application?.dateOfApplication,
          reviewerComments: application?.reviewerComments,
          reviewerName: application?.reviewer?.name,
        }));

        setApplications(applications);
        setFilteredApplications(applications);
      },
      onError: (error) => {
        message.error(error?.message || DEFAULT_ERROR_MESSAGE);
      },
    });

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: () => <SearchOutlined style={{ color: "black" }} />,
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  // Table columns
  const columns = [
    {
      title: "No",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Applicant Name",
      dataIndex: "applicantName",
      key: "applicantName",
      ...getColumnSearchProps("applicantName"),
    },
    {
      title: "Application Id",
      dataIndex: "id",
      key: "id",
      ...getColumnSearchProps("id"),
    },
    {
      title: "Ownership",
      dataIndex: "ownership",
      key: "ownership",
      filters: [
        {
          text: "Joint",
          value: "JOINT",
        },
        {
          text: "Individual",
          value: "INDIVIDUAL",
        },
      ],
      onFilter: (value, record) => {
        return record?.ownership === value;
      },
      render: (text) => text.toLowerCase(),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      filters: [
        {
          text: "Commercial",
          value: "COMMERCIAL",
        },
        {
          text: "Residential",
          value: "RESIDENTIAL",
        },
      ],
      onFilter: (value, record) => {
        return record?.category === value;
      },
      render: (text) => text.toLowerCase(),
    },
    {
      title: "Load Applied Value",
      dataIndex: "loadAppliedValue",
      key: "loadAppliedValue",
      sorter: (a, b) => a?.loadAppliedValue - b?.loadAppliedValue,
    },
    {
      title: "Date Of Application",
      dataIndex: "dateOfApplication",
      key: "dateOfApplication",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        {
          text: "Approved",
          value: "APPROVED",
        },
        {
          text: "Pending",
          value: "PENDING",
        },
        {
          text: "Connection Released",
          value: "CONNECTION_RELEASED",
        },
        {
          text: "Rejected",
          value: "REJECTED",
        },
      ],
      onFilter: (value, record) => {
        return record?.status === value;
      },
      render: (text) => REVIEWER_COMMENTS_STATUS[text],
    },
    {
      title: "Reviewer Comments",
      dataIndex: "reviewerComments",
      key: "reviewerComments",
      filters: [
        {
          text: REVIEWER_COMMENTS_MAPPER["INSTALLATION_PENDING"],
          value: "INSTALLATION_PENDING",
        },
        {
          text: REVIEWER_COMMENTS_MAPPER["DOCUMENTS_VERIFICATION_IN_PROGRESS"],
          value: "DOCUMENTS_VERIFICATION_IN_PROGRESS",
        },
        {
          text: REVIEWER_COMMENTS_MAPPER["INSTALLATION_COMPLETED"],
          value: "INSTALLATION_COMPLETED",
        },
        {
          text: REVIEWER_COMMENTS_MAPPER["KYC_FAILED"],
          value: "KYC_FAILED",
        },
      ],
      onFilter: (value, record) => {
        return record?.reviewerComments === value;
      },
      render: (text) => REVIEWER_COMMENTS_MAPPER[text],
    },
    {
      title: "Reviewer Name",
      dataIndex: "reviewerName",
      key: "reviewerName",
      ...getColumnSearchProps("reviewerName"),
    },
    {
      title: "View",
      key: "view",
      align: "center",
      render: (applicant) => {
        return <Button onClick={() => handleView(applicant)}>View</Button>;
      },
    },
  ];

  // To handle loading time and error
  if (applicationDataLoading) return <Spin size="large" fullscreen />;
  if (applicationDataError) {
    return <Empty className="no-data-found" />;
  }

  return (
    <div className="application_container">
      <Space
        direction="horizontal"
        size={12}
        className="application_container_date_picker"
      >
        <Typography variant="subtitle3" gutterBottom>
          Date of application
        </Typography>
        <RangePicker
          format={"YYYY-MM-DD"}
          id={{
            start: "startInput",
            end: "endInput",
          }}
          onChange={(e) => {
            if (e) {
              // Selected start date
              let startDate = `${e[0]?.year()}-${
                e[0]?.month() + 1
              }-${e[0]?.date()}`;

              // Selected end date
              let endDate = `${e[1]?.year()}-${
                e[1]?.month() + 1
              }-${e[1]?.date()}`;

              let filteredApplicationsData = applications.filter(
                (application) => {
                  let applicationDate = new Date(application.dateOfApplication);

                  // Need to set hourse zero as date need to compared not time
                  applicationDate.setHours(0, 0, 0, 0);
                  let startDateObj = new Date(startDate);
                  let endDateObj = new Date(endDate);

                  // Date comparision
                  return (
                    applicationDate >= startDateObj &&
                    applicationDate <= endDateObj
                  );
                }
              );

              setFilteredApplications(filteredApplicationsData);
            } else {
              setFilteredApplications(applications);
            }
          }}
        />
      </Space>
      {/* Applications Table  */}
      <Table dataSource={filteredApplications} columns={columns} />
    </div>
  );
}

export default Application;
