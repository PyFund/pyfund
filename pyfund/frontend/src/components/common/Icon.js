import React, { Fragment } from "react";

export const IconInfo = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    className="bi bi-info-circle"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
    />
    <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z" />
    <circle cx="8" cy="4.5" r="1" />
  </svg>
);

export const IconEdit = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    className="bi bi-pencil-square"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
    <path
      fillRule="evenodd"
      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
    />
  </svg>
);

export const IconBack = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    className="bi bi-arrow-return-left"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M5.854 5.646a.5.5 0 0 1 0 .708L3.207 9l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z"
    />
    <path
      fillRule="evenodd"
      d="M13.5 2.5a.5.5 0 0 1 .5.5v4a2.5 2.5 0 0 1-2.5 2.5H3a.5.5 0 0 1 0-1h8.5A1.5 1.5 0 0 0 13 7V3a.5.5 0 0 1 .5-.5z"
    />
  </svg>
);

export const IconLoading = () => (
  <Fragment>
    <span className="spinner-border spinner-border-sm" role="status" />
  </Fragment>
);
