import FeaturedFacilities from "@/components/FeaturedFacilities";
import Banner from "../components/homepage/Banner";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";
import UserReviews from "@/components/userReviews";
import PremiumCTA from "@/components/PremiumCTA";


export default function Home() {
  return (
   <>
   <Banner />
   <FeaturedFacilities />
   <HowItWorks />
   <WhyChooseUs />
   <UserReviews />
   <PremiumCTA />
   </>
  );
}
