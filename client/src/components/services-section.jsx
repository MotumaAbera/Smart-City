import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  FileText, Users, Building, Home, School, 
  Hospital, MessageSquare, HeartHandshake, 
  Calendar, GraduationCap, Leaf, 
  CreditCard, LandPlot, DollarSign,
  Globe, ArrowRight
} from "lucide-react";

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState("citizen");
  
  const services = {
    citizen: [
      {
        id: 1,
        title: "ID Card & Residence Verification",
        description: "Apply for new ID cards, renew existing ones, or request residence verification letters.",
        icon: <FileText className="text-3xl text-primary" size={32} />,
        action: "Apply Online"
      },
      {
        id: 2,
        title: "Birth & Marriage Certificates",
        description: "Register births and marriages, or request copies of existing certificates.",
        icon: <Users className="text-3xl text-primary" size={32} />,
        action: "Apply Online"
      },
      {
        id: 3,
        title: "Educational Services",
        description: "School registration, transfer requests, and educational support programs.",
        icon: <School className="text-3xl text-primary" size={32} />,
        action: "Learn More"
      },
      {
        id: 4,
        title: "Health Services",
        description: "Health center registration, vaccination programs, and community health initiatives.",
        icon: <Hospital className="text-3xl text-primary" size={32} />,
        action: "Learn More"
      },
      {
        id: 5,
        title: "Complaint Submission",
        description: "File complaints about public services, infrastructure, or other community issues.",
        icon: <MessageSquare className="text-3xl text-primary" size={32} />,
        action: "Submit Complaint"
      },
      {
        id: 6,
        title: "Social Support Programs",
        description: "Apply for financial assistance, emergency aid, and community support services.",
        icon: <HeartHandshake className="text-3xl text-primary" size={32} />,
        action: "Check Eligibility"
      }
    ],
    business: [
      {
        id: 1,
        title: "Business Registration",
        description: "Register new businesses, renew licenses, and update business information.",
        icon: <Building className="text-3xl text-primary" size={32} />,
        action: "Register Now"
      },
      {
        id: 2,
        title: "Tax Services",
        description: "File business taxes, apply for tax clearance certificates, and resolve tax issues.",
        icon: <CreditCard className="text-3xl text-primary" size={32} />,
        action: "Learn More"
      },
      {
        id: 3,
        title: "Investment Opportunities",
        description: "Explore investment opportunities and incentives for businesses in Boku Shanan.",
        icon: <Building className="text-3xl text-primary" size={32} />,
        action: "Explore Options"
      }
    ],
    property: [
      {
        id: 1,
        title: "Land Registration",
        description: "Register property, update ownership records, and process land title transfers.",
        icon: <Home className="text-3xl text-primary" size={32} />,
        action: "Start Process"
      },
      {
        id: 2,
        title: "Construction Permits",
        description: "Apply for building permits, request inspections, and navigate construction regulations.",
        icon: <LandPlot className="text-3xl text-primary" size={32} />,
        action: "Apply for Permit"
      },
      {
        id: 3,
        title: "Property Valuation",
        description: "Request property value assessments for tax, sale, or compensation purposes.",
        icon: <DollarSign className="text-3xl text-primary" size={32} />,
        action: "Request Valuation"
      }
    ],
    community: [
      {
        id: 1,
        title: "Community Events",
        description: "Register for local events, reserve public spaces, and get event permits.",
        icon: <Calendar className="text-3xl text-primary" size={32} />,
        action: "View Calendar"
      },
      {
        id: 2,
        title: "Public Facilities",
        description: "Access information about community centers, libraries, and recreational facilities.",
        icon: <Globe className="text-3xl text-primary" size={32} />,
        action: "Find Facilities"
      },
      {
        id: 3,
        title: "Environmental Programs",
        description: "Participate in green initiatives, waste management, and environmental conservation.",
        icon: <Leaf className="text-3xl text-primary" size={32} />,
        action: "Get Involved"
      }
    ]
  };

  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Our Services</h2>
          <p className="text-gray-500 max-w-3xl mx-auto">
            Access a wide range of government services that have been digitized for your convenience.
          </p>
        </div>
        
        {/* Service Categories Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-10">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6 w-full bg-transparent">
            <TabsTrigger 
              value="citizen" 
              className={`px-6 py-3 rounded-md font-medium ${activeTab === "citizen" ? "bg-primary text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
            >
              Citizen Services
            </TabsTrigger>
            <TabsTrigger 
              value="business" 
              className={`px-6 py-3 rounded-md font-medium ${activeTab === "business" ? "bg-primary text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
            >
              Business Services
            </TabsTrigger>
            <TabsTrigger 
              value="property" 
              className={`px-6 py-3 rounded-md font-medium ${activeTab === "property" ? "bg-primary text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
            >
              Property & Land
            </TabsTrigger>
            <TabsTrigger 
              value="community" 
              className={`px-6 py-3 rounded-md font-medium ${activeTab === "community" ? "bg-primary text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
            >
              Community Services
            </TabsTrigger>
          </TabsList>
          
          {Object.entries(services).map(([key, serviceList]) => (
            <TabsContent key={key} value={key} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {serviceList.map(service => (
                  <div key={service.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
                    <div className="flex items-start">
                      <div className="mr-4">
                        {service.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg text-gray-800 mb-2">{service.title}</h4>
                        <p className="text-gray-500 mb-3">{service.description}</p>
                        <Button variant="link" className="text-primary font-medium hover:text-accent p-0 h-auto flex items-center">
                          {service.action}
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="text-center">
          <Button className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-md transition duration-300">
            View All Services
          </Button>
        </div>
      </div>
    </section>
  );
}
