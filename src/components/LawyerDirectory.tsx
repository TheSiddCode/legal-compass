import { useState } from "react";
import { Search, Filter, ChevronsUpDown, MessageCircle, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LawyerCard from "./LawyerCard";
import { motion } from "framer-motion";

const LAWYERS = [
  {
    id: "1",
    name: "Sarah Johnson",
    specialization: "Education Law Specialist",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 4.8,
    experience: 12,
    availability: "Available Now",
    freeMessagesLimit: 5,
    freeMessagesUsed: 2,
    hasPdfAgreement: true,
    contactInfo: {
      phone: "+1 (555) 123-4567",
      email: "sarah.johnson@legalcompass.com",
      availability: "Mon-Fri, 9am-5pm EST"
    }
  },
  {
    id: "2",
    name: "Michael Chen",
    specialization: "Sports Law Expert",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 4.9,
    experience: 15,
    availability: "Available in 1 hour",
    freeMessagesLimit: 5,
    freeMessagesUsed: 0,
    hasPdfAgreement: true,
    contactInfo: null
  },
  {
    id: "3",
    name: "Jessica Rodriguez",
    specialization: "Finance & Securities Law",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 4.7,
    experience: 10,
    availability: "Available Tomorrow",
    freeMessagesLimit: 5,
    freeMessagesUsed: 5,
    hasPdfAgreement: true,
    contactInfo: null
  },
  {
    id: "4",
    name: "David Thompson",
    specialization: "Real Estate & Property Law",
    image: "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 4.6,
    experience: 8,
    availability: "Busy until Friday",
    freeMessagesLimit: 5,
    freeMessagesUsed: 3,
    hasPdfAgreement: true,
    contactInfo: null
  },
  {
    id: "5",
    name: "Amara Patel",
    specialization: "Corporate Law Expert",
    image: "https://images.unsplash.com/photo-1587614387466-0a72ca909e16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 4.9,
    experience: 14,
    availability: "Available Now",
    freeMessagesLimit: 5,
    freeMessagesUsed: 1,
    hasPdfAgreement: true,
    contactInfo: null
  },
  {
    id: "6",
    name: "Robert Williams",
    specialization: "Criminal Defense Attorney",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 4.7,
    experience: 18,
    availability: "Available in 2 hours",
    freeMessagesLimit: 5,
    freeMessagesUsed: 4,
    hasPdfAgreement: true,
    contactInfo: null
  },
  {
    id: "7",
    name: "Emily Chang",
    specialization: "Intellectual Property Law",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 4.8,
    experience: 9,
    availability: "Available Now",
    freeMessagesLimit: 5,
    freeMessagesUsed: 0,
    hasPdfAgreement: true,
    contactInfo: null
  },
  {
    id: "8",
    name: "James Wilson",
    specialization: "Employment Law Specialist",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 4.5,
    experience: 11,
    availability: "Available Tomorrow",
    freeMessagesLimit: 5,
    freeMessagesUsed: 2,
    hasPdfAgreement: true,
    contactInfo: null
  }
];

const LawyerDirectory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [messageAvailabilityFilter, setMessageAvailabilityFilter] = useState("all");

  const filteredLawyers = LAWYERS.filter(lawyer => {
    const matchesSearch = lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          lawyer.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSpecialization = specialization === "" || specialization === "all" || 
                                 lawyer.specialization.toLowerCase().includes(specialization.toLowerCase());
    
    const matchesAvailability = availabilityFilter === "all" || 
                              (availabilityFilter === "available" && lawyer.availability.toLowerCase().includes("available"));
    
    const messageAvailability = lawyer.freeMessagesLimit - lawyer.freeMessagesUsed;
    const matchesMessageAvailability = 
      messageAvailabilityFilter === "all" || 
      (messageAvailabilityFilter === "available" && messageAvailability > 0) ||
      (messageAvailabilityFilter === "full" && messageAvailability === 0);
    
    return matchesSearch && matchesSpecialization && matchesAvailability && matchesMessageAvailability;
  }).sort((a, b) => {
    if (sortBy === "rating") {
      return b.rating - a.rating;
    } else if (sortBy === "experience") {
      return b.experience - a.experience;
    } else if (sortBy === "messages") {
      return (b.freeMessagesLimit - b.freeMessagesUsed) - (a.freeMessagesLimit - a.freeMessagesUsed);
    }
    return 0;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-2xl font-semibold mb-4">Find Qualified Lawyers</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by name or specialization..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select value={specialization} onValueChange={setSpecialization}>
            <SelectTrigger>
              <SelectValue placeholder="All Specializations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Specializations</SelectItem>
              <SelectItem value="education">Education Law</SelectItem>
              <SelectItem value="sports">Sports Law</SelectItem>
              <SelectItem value="finance">Finance Law</SelectItem>
              <SelectItem value="real estate">Real Estate Law</SelectItem>
              <SelectItem value="corporate">Corporate Law</SelectItem>
              <SelectItem value="criminal">Criminal Defense</SelectItem>
              <SelectItem value="intellectual">Intellectual Property</SelectItem>
              <SelectItem value="employment">Employment Law</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <div className="flex items-center">
                <ChevronsUpDown className="mr-2 h-4 w-4" />
                <span>Sort By: {
                  sortBy === "rating" ? "Highest Rating" :
                  sortBy === "experience" ? "Most Experience" :
                  "Most Free Messages"
                }</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Highest Rating</SelectItem>
              <SelectItem value="experience">Most Experience</SelectItem>
              <SelectItem value="messages">Most Free Messages</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
          <div className="flex flex-wrap gap-2">
            <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Lawyers</SelectItem>
                <SelectItem value="available">Available Now</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={messageAvailabilityFilter} onValueChange={setMessageAvailabilityFilter}>
              <SelectTrigger className="w-[210px]">
                <SelectValue placeholder="Message Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Message Status</SelectItem>
                <SelectItem value="available">Free Messages Available</SelectItem>
                <SelectItem value="full">Free Messages Used</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center">
            <MessageCircle className="h-4 w-4 mr-2 text-primary" />
            <span className="text-sm mr-4">Each lawyer offers 5 free messages</span>
            <Button variant="outline" size="sm" className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>
        </div>
      </div>
      
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pt-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.08
            }
          }
        }}
      >
        {filteredLawyers.map((lawyer, idx) => (
          <motion.div key={lawyer.id} variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}>
            <LawyerCard {...lawyer} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default LawyerDirectory;
