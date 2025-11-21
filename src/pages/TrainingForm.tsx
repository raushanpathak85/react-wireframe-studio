import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, FileText, Clock } from "lucide-react";
import { toast } from "sonner";

const trainingCourses = [
  { id: "PT", name: "PT - Penetrant Testing", duration: "40 hours", level: "Level 2" },
  { id: "MT", name: "MT - Magnetic Testing", duration: "40 hours", level: "Level 2" },
  { id: "UT", name: "UT - Ultrasonic Testing", duration: "80 hours", level: "Level 2" },
  { id: "RT", name: "RT - Radiographic Testing", duration: "80 hours", level: "Level 2" },
  { id: "VT", name: "VT - Visual Testing", duration: "24 hours", level: "Level 2" },
  { id: "ET", name: "ET - Eddy Current Testing", duration: "40 hours", level: "Level 2" },
  { id: "MT-HT", name: "MT - High Temperature", duration: "16 hours", level: "Advanced" },
  { id: "HT", name: "HT - Hardness Testing", duration: "16 hours", level: "Level 1" },
  { id: "IMU", name: "IMU - In-Service Monitoring", duration: "24 hours", level: "Specialized" },
  { id: "LMIU", name: "LMIU - Level Measurement", duration: "16 hours", level: "Specialized" },
  { id: "AMT", name: "AMT - Advanced Magnetic Testing", duration: "40 hours", level: "Level 3" },
  { id: "ATI", name: "ATI - Advanced Technical Inspection", duration: "40 hours", level: "Level 3" },
];

export default function TrainingForm() {
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStep, setFormStep] = useState<"selection" | "form" | "confirmation">("selection");

  const handleCourseToggle = (courseId: string) => {
    setSelectedCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleNextStep = () => {
    if (selectedCourses.length === 0) {
      toast.error("Please select at least one course");
      return;
    }
    setFormStep("form");
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormStep("confirmation");
      toast.success("Training registration submitted successfully!");
    }, 2000);
  };

  if (formStep === "confirmation") {
    return (
      <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
        <Card className="p-12 text-center gradient-card shadow-custom-xl">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-success/10 rounded-full mb-6">
            <CheckCircle2 className="h-10 w-10 text-success" />
          </div>
          <h1 className="text-3xl font-heading font-bold mb-4">Registration Confirmed!</h1>
          <p className="text-muted-foreground mb-6 text-lg">
            Your training registration has been submitted successfully. You will receive a confirmation email shortly, and an admin will approve your request.
          </p>
          <div className="bg-secondary/50 rounded-xl p-6 mb-6">
            <h3 className="font-heading font-semibold mb-3">Selected Courses:</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {selectedCourses.map((courseId) => {
                const course = trainingCourses.find((c) => c.id === courseId);
                return (
                  <Badge key={courseId} variant="secondary" className="px-3 py-1">
                    {course?.name}
                  </Badge>
                );
              })}
            </div>
          </div>
          <Button
            onClick={() => {
              setFormStep("selection");
              setSelectedCourses([]);
            }}
            className="gradient-primary"
          >
            Register for More Courses
          </Button>
        </Card>
      </div>
    );
  }

  if (formStep === "form") {
    return (
      <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
        <div>
          <h1 className="text-4xl font-heading font-bold mb-2">Training Registration Form</h1>
          <p className="text-muted-foreground">Fill in the required information to complete your registration.</p>
        </div>

        <Card className="p-8 gradient-card shadow-custom-lg">
          <div className="space-y-6">
            <div className="bg-secondary/50 rounded-xl p-4">
              <h3 className="font-heading font-semibold mb-3">Selected Courses:</h3>
              <div className="flex flex-wrap gap-2">
                {selectedCourses.map((courseId) => {
                  const course = trainingCourses.find((c) => c.id === courseId);
                  return (
                    <Badge key={courseId} variant="secondary">
                      {course?.name}
                    </Badge>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Educational Background</label>
                <textarea
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={3}
                  placeholder="Describe your educational background"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Previous Experience</label>
                <textarea
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={3}
                  placeholder="Describe any relevant experience"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                variant="outline"
                onClick={() => setFormStep("selection")}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 gradient-primary"
              >
                {isSubmitting ? "Submitting..." : "Submit Registration"}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-4xl font-heading font-bold mb-2">Online NOT Training Form</h1>
        <p className="text-muted-foreground">Select the training courses you wish to enroll in.</p>
      </div>

      <Card className="p-6 gradient-card shadow-custom-md">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-primary/10 rounded-xl">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-heading font-semibold">Course Selection</h3>
            <p className="text-sm text-muted-foreground">
              {selectedCourses.length} course(s) selected
            </p>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        {trainingCourses.map((course) => {
          const isSelected = selectedCourses.includes(course.id);
          return (
            <Card
              key={course.id}
              className={`p-6 cursor-pointer transition-all duration-200 hover:shadow-custom-lg hover:-translate-y-1 ${
                isSelected
                  ? "border-primary bg-primary/5 shadow-custom-md"
                  : "gradient-card shadow-custom-sm"
              }`}
              onClick={() => handleCourseToggle(course.id)}
            >
              <div className="flex items-start gap-4">
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => handleCourseToggle(course.id)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <h3 className="font-heading font-semibold mb-2">{course.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                      <Clock className="h-3 w-3 mr-1" />
                      {course.duration}
                    </Badge>
                    <Badge variant="outline">{course.level}</Badge>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {selectedCourses.length > 0 && (
        <div className="flex justify-end">
          <Button
            onClick={handleNextStep}
            size="lg"
            className="gradient-primary px-8"
          >
            Continue to Registration Form
          </Button>
        </div>
      )}
    </div>
  );
}
