import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Swal from "sweetalert2";

const NewsletterSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const axiosInstance = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await axiosInstance.post("/subscribe/newsletter", {
        name,
        email,
      });
      setName("");
      setEmail("");
      if (result?.data?.insertedId) {
        await Swal.fire({
          title: "Subscribed successfully!",
          text: "You'll receive our next newsletter.",
          icon: "success",
          confirmButtonText: "Got it!",
          confirmButtonColor: "#3b82f6",
        });
      }
    } catch (err) {
      await Swal.fire({
        title: "Subscription failed",
        text: err.response?.data?.message || "Please try again later.",
        icon: "error",
        confirmButtonText: "Try again",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full px-4 py-12 flex justify-center">
      <Card className="border-none shadow-none w-full rounded-2xl overflow-hidden flex flex-col md:flex-row bg-card/80">
        {/* Left Section */}
        <div className="flex-1/3 p-8 flex flex-col justify-center text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-bold  leading-tight">
            Stay Updated with AthleticHub
          </h2>
          <p className="mt-4 px-4 md:px-0 text-sm md:text-base opacity-75">
            Join our newsletter for exclusive workout plans, nutrition tips, and
            early access to new features. No spam, ever.
          </p>
        </div>
        {/* divider */}
        <div className=" hidden  md:block h-full border-r-2 bg-primary"></div>
        {/* Right Section - Form */}
        <div className="p-8 flex-1/3">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="border border-primary"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="border border-primary"
                  required
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? "Subscribing..." : "Subscribe"}
            </Button>
            <p className="text-xs text-gray-500 text-center">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default NewsletterSignup;
