import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, Calendar, Award, HelpCircle, Key } from "lucide-react";
import { toast } from "sonner";

export default function Profile() {
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handlePasswordChange = () => {
    toast.success("Password changed successfully!");
    setIsChangingPassword(false);
  };

  const handleHelpRequest = () => {
    toast.success("Help request submitted! Our team will contact you shortly.");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h1 className="text-4xl font-heading font-bold mb-2">Profile</h1>
        <p className="text-muted-foreground">Manage your account settings and view your progress.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1 p-6 gradient-card shadow-custom-md">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-32 w-32 mb-4 ring-4 ring-primary/10">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=student" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-heading font-bold mb-1">John Smith</h2>
            <p className="text-sm text-muted-foreground mb-4">Student ID: ST-2024-1234</p>
            <Badge className="bg-primary text-primary-foreground mb-6">Active Student</Badge>
            
            <div className="w-full space-y-3 text-left">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>john.smith@email.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>+1 234 567 8900</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Joined: Jan 2024</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Profile Details & Actions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Academic Progress */}
          <Card className="p-6 gradient-card shadow-custom-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-success/10 rounded-xl">
                <Award className="h-6 w-6 text-success" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold">Academic Progress</h3>
                <p className="text-sm text-muted-foreground">Your learning achievements</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-secondary/50 rounded-xl p-4 text-center">
                <div className="text-3xl font-heading font-bold text-primary mb-1">2</div>
                <div className="text-xs text-muted-foreground">Completed Courses</div>
              </div>
              <div className="bg-secondary/50 rounded-xl p-4 text-center">
                <div className="text-3xl font-heading font-bold text-primary mb-1">2</div>
                <div className="text-xs text-muted-foreground">Active Courses</div>
              </div>
              <div className="bg-secondary/50 rounded-xl p-4 text-center">
                <div className="text-3xl font-heading font-bold text-success mb-1">2</div>
                <div className="text-xs text-muted-foreground">Certificates</div>
              </div>
              <div className="bg-secondary/50 rounded-xl p-4 text-center">
                <div className="text-3xl font-heading font-bold text-accent mb-1">87%</div>
                <div className="text-xs text-muted-foreground">Avg. Score</div>
              </div>
            </div>
          </Card>

          {/* Password Change */}
          <Card className="p-6 gradient-card shadow-custom-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Key className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold">Password & Security</h3>
                <p className="text-sm text-muted-foreground">Manage your account security</p>
              </div>
            </div>

            {!isChangingPassword ? (
              <Button
                onClick={() => setIsChangingPassword(true)}
                variant="outline"
                className="w-full md:w-auto"
              >
                Change Password
              </Button>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Current Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">New Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Confirm new password"
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={handlePasswordChange}
                    className="gradient-primary"
                  >
                    Update Password
                  </Button>
                  <Button
                    onClick={() => setIsChangingPassword(false)}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </Card>

          {/* Help Center */}
          <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20 shadow-custom-md">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-accent/10 rounded-xl">
                <HelpCircle className="h-6 w-6 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-heading font-bold mb-2">Help Center</h3>
                <p className="text-muted-foreground mb-4">
                  Need assistance? Our support team is here to help you with any questions or issues.
                </p>
                <div className="space-y-3">
                  <Button onClick={handleHelpRequest} className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Contact Support
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Response time: Usually within 24 hours
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
