import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Star, MessageCircle, CreditCard, ExternalLink, Clock, FileText, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface LawyerCardProps {
  id: string;
  name: string;
  specialization: string;
  image: string;
  rating: number;
  experience: number;
  availability: string;
  freeMessagesLimit?: number;
  freeMessagesUsed?: number;
  hasPdfAgreement?: boolean;
  contactInfo?: {
    phone: string;
    email: string;
    availability: string;
  };
}

const LawyerCard = ({ 
  id, 
  name, 
  specialization, 
  image, 
  rating, 
  experience,
  availability,
  freeMessagesLimit = 5,
  freeMessagesUsed = 0,
  hasPdfAgreement = true,
  contactInfo
}: LawyerCardProps) => {
  const navigate = useNavigate();
  const [isPaid, setIsPaid] = useState(!!contactInfo);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [pdfDialogOpen, setPdfDialogOpen] = useState(false);
  
  const handlePayment = () => {
    setPaymentDialogOpen(false);
    navigate(`/payment?lawyerId=${id}&lawyerName=${name}&amount=99.00`);
  };

  const isAvailableNow = availability.toLowerCase().includes("available now");
  const messagesRemaining = freeMessagesLimit - freeMessagesUsed;
  const messagePercentUsed = (freeMessagesUsed / freeMessagesLimit) * 100;

  return (
    <Card className="overflow-visible hover:shadow-md transition-shadow duration-300">
      <div className="aspect-[3/2] w-full overflow-hidden relative">
        <img 
          src={image} 
          alt={`Photo of ${name}`} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <Badge 
            variant={isAvailableNow ? "secondary" : "outline"} 
            className={`${isAvailableNow ? 'bg-green-500 text-white' : ''}`}
          >
            <Clock className="mr-1 h-3 w-3" />
            {availability}
          </Badge>
        </div>
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl break-words whitespace-normal">{name}</CardTitle>
            <CardDescription className="mt-1 break-words whitespace-normal">{specialization}</CardDescription>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-0">
        <div className="flex items-center space-x-2 mb-4">
          <Badge variant="secondary">{experience} Years Experience</Badge>
          <Badge variant="outline">Top Rated</Badge>
        </div>
        {isPaid && contactInfo && (
          <div className="mt-4 p-3 bg-secondary rounded-md space-y-1">
            <h4 className="text-sm font-medium mb-2">Contact Information</h4>
            <div className="text-sm space-y-1 break-words whitespace-normal">
              <p><span className="font-medium">Phone:</span> {contactInfo.phone}</p>
              <p><span className="font-medium">Email:</span> {contactInfo.email}</p>
              <p><span className="font-medium">Availability:</span> {contactInfo.availability}</p>
            </div>
            {hasPdfAgreement && (
              <Button variant="outline" size="sm" className="mt-3 w-full" onClick={() => setPdfDialogOpen(true)}>
                <FileText className="mr-2 h-4 w-4" />
                View Agreement Document
              </Button>
            )}
          </div>
        )}
        {!isPaid && (
          <div className="mt-3">
            <div className="flex justify-between items-center text-sm mb-1">
              <span className="font-medium">Free Messages</span>
              <span className="text-muted-foreground">{freeMessagesUsed} of {freeMessagesLimit} used</span>
            </div>
            <Progress value={messagePercentUsed} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {messagesRemaining > 0 
                ? `${messagesRemaining} free messages remaining` 
                : "Free message limit reached"}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-2 pt-4">
        <Dialog open={messageDialogOpen} onOpenChange={setMessageDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="w-full">
              <MessageCircle className="mr-2 h-4 w-4" />
              Message Lawyer
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Message {name}</DialogTitle>
              <DialogDescription>
                {messagesRemaining > 0 
                  ? `You have ${messagesRemaining} free messages remaining with this lawyer.`
                  : "You've used all your free messages with this lawyer. Purchase a consultation for unlimited messaging."}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {messagesRemaining > 0 ? (
                <div>
                  <textarea 
                    className="w-full p-3 border rounded-md h-32 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder={`Ask ${name} a brief legal question...`}
                  ></textarea>
                </div>
              ) : (
                <div className="border rounded-lg p-4 bg-secondary/50">
                  <p className="text-center text-sm">
                    Purchase a consultation to continue messaging with {name}.
                  </p>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setMessageDialogOpen(false)}>
                Cancel
              </Button>
              {messagesRemaining > 0 ? (
                <Button>
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              ) : (
                <Button onClick={() => {
                  setMessageDialogOpen(false);
                  setPaymentDialogOpen(true);
                }}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Purchase Consultation
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {!isPaid ? (
          <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="w-full">
                <CreditCard className="mr-2 h-4 w-4" />
                Pay & Book Advice
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Book a Paid Consultation</DialogTitle>
                <DialogDescription>
                  Get access to {name}'s contact information and schedule a consultation.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span>Consultation Fee</span>
                    <span className="font-medium">$99.00</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    One-time payment for direct contact and consultation scheduling.
                  </p>
                  <ul className="mt-3 text-sm space-y-1">
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span> Unlimited messaging
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span> Direct phone contact
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span> Legal document reviews
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span> PDF agreement document
                    </li>
                  </ul>
                </div>
                <div className="flex items-center justify-center p-4">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png" 
                    alt="Stripe" 
                    className="h-8 mx-2"
                  />
                  <span className="mx-2 text-muted-foreground">or</span>
                  <img 
                    src="https://razorpay.com/assets/razorpay-glyph.svg" 
                    alt="Razorpay" 
                    className="h-8 mx-2"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setPaymentDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handlePayment}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Pay $99.00
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : (
          <Button size="sm" className="w-full">
            <ExternalLink className="mr-2 h-4 w-4" />
            Schedule Meeting
          </Button>
        )}
        {/* PDF Agreement Dialog */}
        {hasPdfAgreement && (
          <Dialog open={pdfDialogOpen} onOpenChange={setPdfDialogOpen}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Legal Consultation Agreement</DialogTitle>
                <DialogDescription>
                  Review the terms and conditions of your legal consultation with {name}.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4 border rounded-lg p-5 bg-secondary/30 h-[400px] overflow-y-auto">
                <h3 className="text-lg font-bold text-center mb-4">LEGAL CONSULTATION AGREEMENT</h3>
                <p className="mb-3">This Legal Consultation Agreement (the "Agreement") is entered into between {name} ("Attorney") and you, the client ("Client").</p>
                <h4 className="font-bold mt-4 mb-2">1. SCOPE OF SERVICES</h4>
                <p>Attorney agrees to provide legal consultation services to Client limited to:</p>
                <ul className="list-disc pl-5 mb-3">
                  <li>Initial legal assessment and guidance</li>
                  <li>Response to basic legal questions</li>
                  <li>Preliminary review of documents</li>
                  <li>General legal advice within Attorney's area of expertise</li>
                </ul>
                <h4 className="font-bold mt-4 mb-2">2. FEES</h4>
                <p>Client agrees to pay Attorney a consultation fee of $99.00. This fee is non-refundable once consultation services have begun.</p>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardFooter>
    </Card>
  );
};

export default LawyerCard;
