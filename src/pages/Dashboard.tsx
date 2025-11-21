import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, PlayCircle, Award } from "lucide-react";

const trainingData = {
  completed: [
    { id: 1, name: "PT - Penetrant Testing", completedDate: "2024-01-15", certificate: "PT-2024-001" },
    { id: 2, name: "MT - Magnetic Testing", completedDate: "2024-02-20", certificate: "MT-2024-002" },
  ],
  ongoing: [
    { id: 3, name: "UT - Ultrasonic Testing", progress: 65, chaptersCompleted: 13, totalChapters: 20 },
    { id: 4, name: "RT - Radiographic Testing", progress: 40, chaptersCompleted: 8, totalChapters: 20 },
  ],
  paused: [
    { id: 5, name: "VT - Visual Testing", progress: 25, lastAccessed: "2024-03-01" },
  ],
  certificates: [
    { id: 1, name: "PT Level 2 Certificate", issueDate: "2024-01-20", validity: "2027-01-20" },
    { id: 2, name: "MT Level 2 Certificate", issueDate: "2024-02-25", validity: "2027-02-25" },
  ],
};

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-heading font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your training overview.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 gradient-card shadow-custom-md hover:shadow-custom-lg transition-shadow duration-200">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-success/10 rounded-xl">
              <CheckCircle2 className="h-6 w-6 text-success" />
            </div>
            <Badge variant="secondary" className="bg-success/10 text-success border-0">Completed</Badge>
          </div>
          <h3 className="text-3xl font-heading font-bold mb-1">{trainingData.completed.length}</h3>
          <p className="text-sm text-muted-foreground">Training Completed</p>
        </Card>

        <Card className="p-6 gradient-card shadow-custom-md hover:shadow-custom-lg transition-shadow duration-200">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-primary/10 rounded-xl">
              <PlayCircle className="h-6 w-6 text-primary" />
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-0">Active</Badge>
          </div>
          <h3 className="text-3xl font-heading font-bold mb-1">{trainingData.ongoing.length}</h3>
          <p className="text-sm text-muted-foreground">Ongoing Training</p>
        </Card>

        <Card className="p-6 gradient-card shadow-custom-md hover:shadow-custom-lg transition-shadow duration-200">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-warning/10 rounded-xl">
              <Clock className="h-6 w-6 text-warning" />
            </div>
            <Badge variant="secondary" className="bg-warning/10 text-warning border-0">Paused</Badge>
          </div>
          <h3 className="text-3xl font-heading font-bold mb-1">{trainingData.paused.length}</h3>
          <p className="text-sm text-muted-foreground">In-Progress (Paused)</p>
        </Card>

        <Card className="p-6 gradient-card shadow-custom-md hover:shadow-custom-lg transition-shadow duration-200">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-accent/10 rounded-xl">
              <Award className="h-6 w-6 text-accent" />
            </div>
            <Badge variant="secondary" className="bg-accent/10 text-accent border-0">Earned</Badge>
          </div>
          <h3 className="text-3xl font-heading font-bold mb-1">{trainingData.certificates.length}</h3>
          <p className="text-sm text-muted-foreground">Certificates</p>
        </Card>
      </div>

      {/* Ongoing Training */}
      <div>
        <h2 className="text-2xl font-heading font-bold mb-4">Ongoing Training</h2>
        <div className="grid gap-4">
          {trainingData.ongoing.map((training) => (
            <Card key={training.id} className="p-6 gradient-card shadow-custom-md hover:shadow-custom-lg transition-all duration-200 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-heading font-semibold mb-1">{training.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {training.chaptersCompleted} of {training.totalChapters} chapters completed
                  </p>
                </div>
                <Badge className="bg-primary text-primary-foreground">{training.progress}%</Badge>
              </div>
              <Progress value={training.progress} className="h-2" />
            </Card>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Completed Training */}
        <div>
          <h2 className="text-2xl font-heading font-bold mb-4">Completed Training</h2>
          <div className="space-y-3">
            {trainingData.completed.map((training) => (
              <Card key={training.id} className="p-4 gradient-card shadow-custom-md hover:shadow-custom-lg transition-all duration-200">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-success/10 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-semibold mb-1">{training.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Completed: {new Date(training.completedDate).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Certificate: {training.certificate}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Certificates */}
        <div>
          <h2 className="text-2xl font-heading font-bold mb-4">My Certificates</h2>
          <div className="space-y-3">
            {trainingData.certificates.map((cert) => (
              <Card key={cert.id} className="p-4 gradient-card shadow-custom-md hover:shadow-custom-lg transition-all duration-200">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Award className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-semibold mb-1">{cert.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Issued: {new Date(cert.issueDate).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-success mt-1">
                      Valid until: {new Date(cert.validity).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Paused Training */}
      {trainingData.paused.length > 0 && (
        <div>
          <h2 className="text-2xl font-heading font-bold mb-4">Paused Training</h2>
          <div className="grid gap-4">
            {trainingData.paused.map((training) => (
              <Card key={training.id} className="p-6 gradient-card shadow-custom-md border-warning/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-heading font-semibold mb-1">{training.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Last accessed: {new Date(training.lastAccessed).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant="outline" className="border-warning text-warning">
                    {training.progress}% Complete
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
