import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Video, FileText, CheckCircle2, PlayCircle } from "lucide-react";
import { toast } from "sonner";

const enrolledCourses = [
  {
    id: 1,
    name: "UT - Ultrasonic Testing",
    progress: 65,
    chapters: [
      { id: 1, title: "Introduction to UT", type: "video", completed: true, duration: "15 min" },
      { id: 2, title: "UT Equipment", type: "video", completed: true, duration: "20 min" },
      { id: 3, title: "UT Techniques", type: "document", completed: true, duration: "30 min" },
      { id: 4, title: "Practical Applications", type: "video", completed: false, duration: "25 min" },
      { id: 5, title: "Safety Procedures", type: "document", completed: false, duration: "15 min" },
    ],
    mockTestAvailable: true,
    mockTestCompleted: false,
  },
  {
    id: 2,
    name: "RT - Radiographic Testing",
    progress: 40,
    chapters: [
      { id: 1, title: "Introduction to RT", type: "video", completed: true, duration: "20 min" },
      { id: 2, title: "RT Fundamentals", type: "video", completed: true, duration: "25 min" },
      { id: 3, title: "Film Interpretation", type: "document", completed: false, duration: "35 min" },
      { id: 4, title: "Digital Radiography", type: "video", completed: false, duration: "30 min" },
    ],
    mockTestAvailable: false,
    mockTestCompleted: false,
  },
];

export default function Courses() {
  const [selectedCourse, setSelectedCourse] = useState(enrolledCourses[0]);
  const [showMockTest, setShowMockTest] = useState(false);

  const handleStartMockTest = () => {
    setShowMockTest(true);
    toast.success("Mock test started! Good luck!");
  };

  const handleCompleteMockTest = () => {
    toast.success("Mock test completed! Check the results.");
    setShowMockTest(false);
  };

  if (showMockTest) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        <div>
          <h1 className="text-4xl font-heading font-bold mb-2">Mock Test</h1>
          <p className="text-muted-foreground">{selectedCourse.name}</p>
        </div>

        <Card className="p-8 gradient-card shadow-custom-lg">
          <div className="space-y-6">
            <div className="bg-primary/10 rounded-xl p-6 text-center">
              <h2 className="text-2xl font-heading font-bold mb-2">Mock Test in Progress</h2>
              <p className="text-muted-foreground">
                Answer all questions to complete the mock test. This is a practice test to prepare you for the final assessment.
              </p>
            </div>

            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((q) => (
                <div key={q} className="bg-secondary/30 rounded-xl p-6">
                  <h3 className="font-heading font-semibold mb-4">
                    Question {q}: What is the primary principle of {selectedCourse.name.split(" - ")[1]}?
                  </h3>
                  <div className="space-y-2">
                    {["Option A", "Option B", "Option C", "Option D"].map((option, i) => (
                      <label
                        key={i}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-background/50 cursor-pointer transition-colors"
                      >
                        <input type="radio" name={`question-${q}`} className="w-4 h-4" />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => setShowMockTest(false)}
                className="flex-1"
              >
                Save Progress
              </Button>
              <Button
                onClick={handleCompleteMockTest}
                className="flex-1 gradient-primary"
              >
                Submit Mock Test
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
        <h1 className="text-4xl font-heading font-bold mb-2">Courses & Mock Tests</h1>
        <p className="text-muted-foreground">Access your enrolled courses and practice with mock tests.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Course List */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-xl font-heading font-bold">My Courses</h2>
          {enrolledCourses.map((course) => (
            <Card
              key={course.id}
              className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-custom-md ${
                selectedCourse.id === course.id
                  ? "border-primary bg-primary/5 shadow-custom-md"
                  : "gradient-card"
              }`}
              onClick={() => setSelectedCourse(course)}
            >
              <h3 className="font-heading font-semibold mb-3">{course.name}</h3>
              <Progress value={course.progress} className="h-2 mb-2" />
              <p className="text-sm text-muted-foreground">{course.progress}% Complete</p>
              {course.mockTestAvailable && (
                <Badge className="mt-2 bg-success text-success-foreground">
                  Mock Test Available
                </Badge>
              )}
            </Card>
          ))}
        </div>

        {/* Course Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 gradient-card shadow-custom-md">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-heading font-bold mb-1">{selectedCourse.name}</h2>
                <p className="text-muted-foreground">Complete all chapters to unlock the mock test</p>
              </div>
              <Badge className="bg-primary text-primary-foreground text-lg px-4 py-2">
                {selectedCourse.progress}%
              </Badge>
            </div>
            <Progress value={selectedCourse.progress} className="h-3" />
          </Card>

          {/* Chapters */}
          <div className="space-y-3">
            <h3 className="text-xl font-heading font-bold">Course Chapters</h3>
            {selectedCourse.chapters.map((chapter) => (
              <Card
                key={chapter.id}
                className={`p-5 transition-all duration-200 hover:shadow-custom-md hover:-translate-y-0.5 ${
                  chapter.completed
                    ? "gradient-card border-success/20"
                    : "gradient-card"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-xl ${
                      chapter.completed ? "bg-success/10" : "bg-primary/10"
                    }`}
                  >
                    {chapter.type === "video" ? (
                      <Video className={`h-5 w-5 ${chapter.completed ? "text-success" : "text-primary"}`} />
                    ) : (
                      <FileText className={`h-5 w-5 ${chapter.completed ? "text-success" : "text-primary"}`} />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-heading font-semibold mb-1">{chapter.title}</h4>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="text-xs">
                        {chapter.duration}
                      </Badge>
                      {chapter.completed && (
                        <span className="flex items-center gap-1 text-xs text-success">
                          <CheckCircle2 className="h-3 w-3" />
                          Completed
                        </span>
                      )}
                    </div>
                  </div>
                  <Button
                    variant={chapter.completed ? "outline" : "default"}
                    size="sm"
                    className={!chapter.completed ? "gradient-primary" : ""}
                  >
                    {chapter.completed ? "Review" : "Start"}
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Mock Test Section */}
          {selectedCourse.mockTestAvailable && (
            <Card className="p-6 bg-gradient-to-br from-success/10 to-success/5 border-success/20 shadow-custom-md">
              <div className="flex items-start gap-4">
                <div className="p-4 bg-success/10 rounded-xl">
                  <BookOpen className="h-8 w-8 text-success" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-heading font-bold mb-2">Mock Test Available</h3>
                  <p className="text-muted-foreground mb-4">
                    Test your knowledge with a comprehensive mock test. Once completed, you'll receive detailed feedback on your performance.
                  </p>
                  <Button onClick={handleStartMockTest} className="gradient-success">
                    <PlayCircle className="h-4 w-4 mr-2" />
                    Start Mock Test
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
