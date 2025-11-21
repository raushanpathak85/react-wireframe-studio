import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import { 
  LayoutDashboard, 
  FileText, 
  BookOpen, 
  Award, 
  User,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

interface LayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Training Form", href: "/training-form", icon: FileText },
  { name: "Courses & Tests", href: "/courses", icon: BookOpen },
  { name: "Final Assessment", href: "/assessment", icon: Award },
  { name: "Profile", href: "/profile", icon: User },
];

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const NavLinks = () => (
    <>
      {navigation.map((item) => {
        const isActive = location.pathname === item.href;
        return (
          <NavLink
            key={item.name}
            to={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              isActive
                ? "bg-primary text-primary-foreground shadow-custom-md"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.name}</span>
          </NavLink>
        );
      })}
    </>
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 z-50 bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-heading font-bold text-primary">Student Portal</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <div className="p-6">
              <h2 className="text-2xl font-heading font-bold text-primary mb-6">Navigation</h2>
              <nav className="flex flex-col gap-2">
                <NavLinks />
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-72 md:flex-col bg-card border-r border-border">
        <div className="p-6 border-b border-border">
          <h1 className="text-2xl font-heading font-bold text-primary">Student Portal</h1>
          <p className="text-sm text-muted-foreground mt-1">Learning Management System</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <NavLinks />
        </nav>
        <div className="p-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">© 2024 Student Portal</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="container max-w-7xl mx-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
