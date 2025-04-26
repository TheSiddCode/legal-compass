import { Book, Award, CreditCard, Puzzle } from "lucide-react";
import { Link } from "react-router-dom";
import CategoryCard from "@/components/CategoryCard";
import LawyerDirectory from "@/components/LawyerDirectory";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const categories = [
  {
    title: "📘 Education",
    description: "Legal advice for schools, colleges, educational institutions, and policies.",
    icon: <Book className="h-5 w-5 text-white" />,
    path: "/education",
    color: "bg-blue-600"
  },
  {
    title: "🏅 Sports",
    description: "Legal guidance for sports organizations, athletes, and sports-related businesses.",
    icon: <Award className="h-5 w-5 text-white" />,
    path: "/sports",
    color: "bg-green-600"
  },
  {
    title: "💰 Finance",
    description: "Legal advice for financial institutions, credit firms, and financial compliance.",
    icon: <CreditCard className="h-5 w-5 text-white" />,
    path: "/finance",
    color: "bg-amber-600"
  },
  {
    title: "🧩 Other Domains",
    description: "Legal assistance for real estate, marriage, cyber law, and other specialized areas.",
    icon: <Puzzle className="h-5 w-5 text-white" />,
    path: "/other",
    color: "bg-purple-600"
  }
];

const Index = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-100 min-h-screen font-sans">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-20 md:py-32 bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 text-white relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
              Navigate Legal Challenges<br />
              <span className="text-blue-200">with Confidence</span>
            </h1>
            <p className="text-lg md:text-2xl mb-8 text-blue-100/90 font-medium">
              Get expert legal assistance across education, sports, finance, and more. Connect with qualified lawyers for personalized guidance.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild className="transition-transform duration-200 hover:scale-105 hover:bg-blue-700 focus:ring-2 focus:ring-blue-200">
                <Link to="/education">Ask Legal Questions</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-blue-100 transition-transform duration-200 hover:scale-105">
                <Link to="/lawyers">Find a Lawyer</Link>
              </Button>
            </div>
          </div>
          <motion.div
            className="flex-1 hidden md:flex justify-center items-center relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="relative h-[28rem] w-full max-w-lg mx-auto rounded-3xl shadow-2xl overflow-hidden flex items-start bg-gradient-to-br from-white/60 to-blue-100/60 backdrop-blur-lg">
              <img
                src="https://images.unsplash.com/photo-1589578527966-fdac0f44566c?auto=format&fit=crop&w=800&q=80"
                alt="Lady Justice"
                className="object-cover h-full w-full"
                style={{ objectPosition: "top" }}
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Categories Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="py-20 bg-gradient-to-br from-blue-100 via-white to-purple-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">Legal Categories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Choose your area of interest to get specialized legal guidance from our AI assistant.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)" }}
                transition={{ type: "spring", stiffness: 300 }}
                className="rounded-2xl bg-white/70 backdrop-blur-lg shadow-lg p-6 flex flex-col items-center text-center border border-blue-100 hover:border-blue-300 transition-all duration-200"
              >
                <div className={`w-12 h-12 flex items-center justify-center rounded-full mb-4 text-white text-2xl ${category.color} shadow-lg`}>{category.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-blue-800">{category.title}</h3>
                <p className="text-blue-700/80 mb-2">{category.description}</p>
                <Link to={category.path} className="mt-2 text-blue-600 hover:underline font-medium">Explore</Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Consultants Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">Consult a Lawyer</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Connect with verified legal experts for personalized consultations and professional advice.
            </p>
          </div>
          <LawyerDirectory />
          <div className="text-center mt-12">
            <Button size="lg" asChild className="transition-transform duration-200 hover:scale-105 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400">
              <Link to="/lawyers">View All Lawyers</Link>
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="py-20 bg-gradient-to-br from-blue-100 via-white to-purple-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">Why Choose Legal Compass</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              We provide comprehensive legal assistance tailored to your specific needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <motion.div
              whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.17)" }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-blue-100 hover:border-blue-300 transition-all duration-200"
            >
              <div className="h-12 w-12 bg-blue-600/10 rounded-lg flex items-center justify-center mb-4">
                <Book className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-800">AI-Powered Assistance</h3>
              <p className="text-blue-700/80">
                Get instant legal guidance on various domains with our advanced AI assistant.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.17)" }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-blue-100 hover:border-blue-300 transition-all duration-200"
            >
              <div className="h-12 w-12 bg-green-600/10 rounded-lg flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-800">Verified Lawyers</h3>
              <p className="text-blue-700/80">
                Connect with thoroughly vetted legal professionals with expertise in various domains.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.17)" }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-blue-100 hover:border-blue-300 transition-all duration-200"
            >
              <div className="h-12 w-12 bg-amber-600/10 rounded-lg flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-800">Secure Consultations</h3>
              <p className="text-blue-700/80">
                Book paid consultations with lawyers through our secure payment gateway.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Index;
