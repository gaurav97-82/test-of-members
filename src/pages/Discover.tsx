import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BottomNav } from "@/components/BottomNav";
import { 
  Award, 
  Calendar, 
  Activity, 
  Sparkles, 
  TrendingUp,
  Users,
  Briefcase,
  GraduationCap,
  Bell,
  Settings
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const Discover = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  // Mock data
  const profileCompletion = 65;
  const achievements = [
    { id: 1, title: "First Course", icon: GraduationCap, color: "text-blue-500" },
    { id: 2, title: "Week Streak", icon: TrendingUp, color: "text-green-500" },
    { id: 3, title: "Top Learner", icon: Award, color: "text-yellow-500" },
  ];

  const upcomingEvents = [
    { id: 1, title: "Web Dev Workshop", date: "Nov 25", location: "Online" },
    { id: 2, title: "Career Fair 2024", date: "Dec 2", location: "Campus Hall" },
  ];

  const recentActivities = [
    { id: 1, title: "Completed React Basics", icon: Activity, time: "2 hours ago" },
    { id: 2, title: "Joined Study Group", icon: Users, time: "5 hours ago" },
    { id: 3, title: "Applied for Internship", icon: Briefcase, time: "1 day ago" },
  ];

  const discoverSections = [
    { title: "Learning Paths", icon: GraduationCap, gradient: "from-green-500 to-emerald-600" },
    { title: "Internships", icon: Briefcase, gradient: "from-emerald-500 to-teal-600" },
    { title: "Collaboration", icon: Users, gradient: "from-teal-500 to-cyan-600" },
    { title: "Career Dev", icon: TrendingUp, gradient: "from-cyan-500 to-green-600" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback className="bg-primary text-primary-foreground">
                {user?.email?.[0].toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-sm font-semibold text-foreground">Welcome back,</h2>
              <p className="text-xs text-muted-foreground">{user?.email || "Student"}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleSignOut}>
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Profile Completion */}
        <Card className="border-primary/20">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Profile Completion</CardTitle>
              <span className="text-2xl font-bold text-primary">{profileCompletion}%</span>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={profileCompletion} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">Complete your profile to unlock all features</p>
          </CardContent>
        </Card>

        {/* Recent Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex flex-col items-center gap-2 min-w-[80px]"
                >
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                    <achievement.icon className={`h-8 w-8 ${achievement.color}`} />
                  </div>
                  <p className="text-xs text-center text-muted-foreground">{achievement.title}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                <Calendar className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">{event.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">{event.date}</Badge>
                    <span className="text-xs text-muted-foreground">{event.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <activity.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI Mentor */}
        <Card className="bg-gradient-to-br from-primary/20 to-accent/10 border-primary/30">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              AI Mentor
            </CardTitle>
            <CardDescription>Your personal learning assistant</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              Start Conversation
            </Button>
          </CardContent>
        </Card>

        {/* Discover Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Discover
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {discoverSections.map((section, index) => (
              <Card key={index} className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                <div className={`h-24 bg-gradient-to-br ${section.gradient} flex items-center justify-center`}>
                  <section.icon className="h-12 w-12 text-white" />
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold text-sm text-center">{section.title}</h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Discover;
