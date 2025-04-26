import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const { user, logout } = useAuth();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Education", href: "/education" },
    { name: "Sports", href: "/sports" },
    { name: "Finance", href: "/finance" },
    { name: "Lawyers", href: "/lawyers" },
    { name: "FAQ", href: "/faq" },
    { name: "Other", href: "/other" },
    { name: "About", href: "/about" },
  ];

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-lg shadow-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Logo />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-2 py-1 text-base font-medium transition-colors duration-200
                  ${pathname === item.href ? "text-blue-700" : "text-gray-700 hover:text-blue-600"}`}
              >
                <span>{item.name}</span>
                <span
                  className={`absolute left-0 -bottom-1 w-full h-0.5 rounded bg-blue-600 transition-all duration-300
                    ${pathname === item.href ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"}`}
                />
              </Link>
            ))}
          </div>

          {/* User/Sign In */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      {user.profileImage ? (
                        <AvatarImage src={user.profileImage} alt={user.name} />
                      ) : (
                        <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
                      )}
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  {user.role === 'Lawyer' && (
                    <DropdownMenuItem asChild>
                      <Link to="/lawyer-profile">Lawyer Profile</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-500">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg transition-all duration-200">
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
          </div>

          {/* Hamburger */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-blue-700 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={toggleMenu}
        aria-hidden={!isOpen}
      />
      <div
        className={`fixed top-0 right-0 z-50 w-64 h-full bg-white/95 shadow-lg transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col h-full p-6 gap-6">
          <div className="flex items-center justify-between mb-4">
            <Link to="/" className="flex items-center gap-2" onClick={toggleMenu}>
              <Logo />
            </Link>
            <button onClick={toggleMenu} className="p-2 rounded-lg text-blue-700 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition">
              <X className="h-7 w-7" />
            </button>
          </div>
          <nav className="flex flex-col gap-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200
                  ${pathname === item.href ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"}`}
                onClick={toggleMenu}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="mt-auto">
            {user ? (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50">
                <Avatar>
                  {user.profileImage ? (
                    <AvatarImage src={user.profileImage} alt={user.name} />
                  ) : (
                    <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <div className="font-medium text-blue-800">{user.name}</div>
                  <div className="text-xs text-blue-600">{user.email}</div>
                  {user.role === 'Lawyer' && (
                    <Link to="/lawyer-profile" className="block text-xs text-blue-600 hover:underline mt-1" onClick={toggleMenu}>
                      Lawyer Profile
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      toggleMenu();
                    }}
                    className="block text-xs text-red-500 hover:underline mt-1"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg transition-all duration-200 mt-2">
                <Link to="/auth" onClick={toggleMenu}>Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
