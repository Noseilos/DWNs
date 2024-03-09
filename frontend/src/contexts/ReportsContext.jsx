import { createContext, useState, useEffect, useContext, useReducer } from "react";

const BASE_URL = "http://localhost:8000";

const ReportsContext = createContext();

const initialState = {
  reports: [],
  isLoading: false,
  currentReport: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "reports/loaded":
      return {
        ...state,
        isLoading: false,
        reports: action.payload,
      };
    case "report/loaded":
      return { ...state, isLoading: false, currentReport: action.payload };
    case "report/created":
      return {
        ...state,
        isLoading: false,
        reports: [...state.reports, action.payload],
        currentReport: action.payload,
      };
    case "report/deleted":
      return {
        ...state,
        isLoading: false,
        reports: state.reports.filter((report) => report.id !== action.payload),
        currentReport: {},
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error("Unknown action type.");
  }
}

function ReportsProvider({ children }) {
  const [{ reports, isLoading, currentReport, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchReports() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/reports`);
        const data = await res.json();
        dispatch({ type: "reports/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading reports...",
        });
      }
    }
    fetchReports();
  }, []);

  async function getReport(id) {
    if (id === currentReport.id) return;

    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/reports/${id}`);
      const data = await res.json();
      dispatch({
        type: "report/loaded",
        payload: data,
      });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error loading report...",
      });
    }
  }

  async function createReport(newReport) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/reports`, {
        method: "POST",
        body: JSON.stringify(newReport),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({
        type: "report/created",
        payload: data,
      });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error creating report...",
      });
    }
  }

  async function deleteReport(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/reports/${id}`, {
        method: "DELETE",
      });
      dispatch({
        type: "report/deleted",
        payload: id,
      });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting report...",
      });
    }
  }

  return (
    <ReportsContext.Provider
      value={{
        reports,
        isLoading,
        error,
        currentReport,
        createReport,
        getReport,
        deleteReport,
      }}
    >
      {children}
    </ReportsContext.Provider>
  );
}

function useReports() {
  const context = useContext(ReportsContext);

  if (context === undefined) {
    throw new Error("ReportsContext has been used outside of ReportsProvider");
  }

  return context;
}

export { ReportsProvider, useReports };
