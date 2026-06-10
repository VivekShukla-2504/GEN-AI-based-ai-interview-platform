import {
    getAllInterviewReports,
    generateInterviewReport,
    getInterviewReportById,
    generateResumePdf
} from "../services/interview.api";

import { useContext, useEffect } from "react";
import { InterviewContext } from "../interview.context";
import { useParams } from "react-router";

export const useInterview = () => {
    const context = useContext(InterviewContext);
    const { interviewId } = useParams();

    if (!context) {
        throw new Error("useInterview must be used within InterviewProvider");
    }

    const { loading, setLoading, report, setReport, reports, setReports } =
        context;

    /* ---------------- GENERATE ---------------- */
    const generateReport = async (payload) => {
        setLoading(true);

        try {
            const res = await generateInterviewReport(payload);

            if (!res.success) {
                alert(res.message); // API limit message here
                return null;
            }

            const interview = res.data.interviewReport;
            setReport(interview);

            return interview;
        } catch (err) {
            console.log(err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    /* ---------------- GET BY ID ---------------- */
    const getReportById = async (id) => {
        setLoading(true);

        try {
            const res = await getInterviewReportById(id);

            if (!res.success) {
                return null;
            }

            setReport(res.data.interviewReport);
            return res.data.interviewReport;
        } finally {
            setLoading(false);
        }
    };

    /* ---------------- GET ALL ---------------- */
    const getReports = async () => {
        setLoading(true);

        try {
            const res = await getAllInterviewReports();

            if (!res.success) {
                return [];
            }

            setReports(res.data.interviewReports);
            return res.data.interviewReports;
        } finally {
            setLoading(false);
        }
    };

    /* ---------------- PDF ---------------- */
    const getResumePdf = async (interviewReportId) => {
        setLoading(true);

        try {
            const res = await generateResumePdf({ interviewReportId });

            if (!res.success) {
                alert(res.message);
                return;
            }

            const url = window.URL.createObjectURL(
                new Blob([res.data], { type: "application/pdf" })
            );

            const link = document.createElement("a");
            link.href = url;
            link.setAttribute(
                "download",
                `resume_${interviewReportId}.pdf`
            );

            document.body.appendChild(link);
            link.click();
        } finally {
            setLoading(false);
        }
    };

    /* ---------------- AUTO LOAD ---------------- */
    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId);
        } else {
            getReports();
        }
    }, [interviewId]);

    return {
        loading,
        report,
        reports,
        generateReport,
        getReportById,
        getReports,
        getResumePdf
    };
};