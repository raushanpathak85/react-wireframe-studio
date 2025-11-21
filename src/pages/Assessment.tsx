import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, CheckCircle2, Clock, FileCheck, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const assessmentData = [
  {
    id: 1,
    courseName: "UT - Ultrasonic Testing",
    status: "completed",
    theoryScore: 85,
    practicalScore: 90,
    completedDate: "2024-03-15",
    certificateReady: true,
  },
  {
    id: 2,
    courseName: "RT - Radiographic Testing",
    status: "ready",
    theoryScore: null,
    practicalScore: null,
    completedDate: null,
    certificateReady: false,
  },
  {
    id: 3,
    courseName: "MT - Magnetic Testing",
    status: "pending",
    theoryScore: 88,
    practicalScore: null,
    completedDate: null,
    certificateReady: false,
  },
];

export default function Assessment() {
  const [selectedAssessment, setSelectedAssessment] = useState<number | null>(null);

  const handleStartAssessment = (id: number) => {
    toast.success("Assessment started! Redirecting to test interface...");
    setSelectedAssessment(id);
  };

  const handleDownloadCertificate = (courseName: string) => {
    toast.success(`Certificate for ${courseName} downloaded successfully!`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-success text-success-foreground">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        );
      case "ready":
        return (
          <Badge className="bg-primary text-primary-foreground">
            <AlertCircle className="h-3 w-3 mr-1" />
            Ready to Start
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-warning text-warning-foreground">
            <Clock className="h-3 w-3 mr-1" />
            In Progress
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-4xl font-heading font-bold mb-2">Final Theory & Practical Assessment</h1>
        <p className="text-muted-foreground">
          Complete your final assessments to earn your professional certificates.
        </p>
      </div>

      {/* Assessment Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 gradient-card shadow-custom-md">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-success/10 rounded-xl">
              <CheckCircle2 className="h-6 w-6 text-success" />
            </div>
            <div>
              <h3 className="text-2xl font-heading font-bold">
                {assessmentData.filter((a) => a.status === "completed").length}
              </h3>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 gradient-card shadow-custom-md">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-warning/10 rounded-xl">
              <Clock className="h-6 w-6 text-warning" />
            </div>
            <div>
              <h3 className="text-2xl font-heading font-bold">
                {assessmentData.filter((a) => a.status === "pending").length}
              </h3>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 gradient-card shadow-custom-md">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-heading font-bold">
                {assessmentData.filter((a) => a.certificateReady).length}
              </h3>
              <p className="text-sm text-muted-foreground">Certificates Ready</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Assessment List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-heading font-bold">Available Assessments</h2>
        {assessmentData.map((assessment) => (
          <Card
            key={assessment.id}
            className="p-6 gradient-card shadow-custom-md hover:shadow-custom-lg transition-all duration-200"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-xl font-heading font-bold">{assessment.courseName}</h3>
                  {getStatusBadge(assessment.status)}
                </div>

                {assessment.status === "completed" && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <FileCheck className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          Theory: <span className="font-semibold text-success">{assessment.theoryScore}%</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileCheck className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          Practical: <span className="font-semibold text-success">{assessment.practicalScore}%</span>
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Completed on {new Date(assessment.completedDate!).toLocaleDateString()}
                    </p>
                  </div>
                )}

                {assessment.status === "pending" && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <span className="text-sm">
                        Theory: <span className="font-semibold text-success">{assessment.theoryScore}%</span>
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">Practical assessment pending</p>
                  </div>
                )}

                {assessment.status === "ready" && (
                  <p className="text-sm text-muted-foreground">
                    You have completed all course requirements. Start your final assessment when ready.
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                {assessment.status === "ready" && (
                  <Button
                    onClick={() => handleStartAssessment(assessment.id)}
                    className="gradient-primary"
                  >
                    Start Assessment
                  </Button>
                )}

                {assessment.status === "pending" && (
                  <Button
                    onClick={() => handleStartAssessment(assessment.id)}
                    className="gradient-primary"
                  >
                    Continue Assessment
                  </Button>
                )}

                {assessment.status === "completed" && assessment.certificateReady && (
                  <Button
                    onClick={() => handleDownloadCertificate(assessment.courseName)}
                    className="gradient-success"
                  >
                    <Award className="h-4 w-4 mr-2" />
                    Download Certificate
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Assessment Information */}
      <Card className="p-6 bg-primary/5 border-primary/20 shadow-custom-md">
        <h3 className="text-lg font-heading font-bold mb-3">Assessment Guidelines</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <span>Complete all course chapters before starting the final assessment</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <span>The assessment consists of both theory and practical components</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <span>A minimum score of 70% is required in both components to pass</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <span>Upon successful completion, your certificate will be available for download</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <span>Certificates need to be verified and approved by an admin before issuance</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
