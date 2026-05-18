import FeaturedFacilities from "@/components/homepage/FeaturedFacilities";
import Banner from "../components/homepage/Banner";
import HowItWorks from "@/components/homepage/HowItWorks";
import WhyChooseUs from "@/components/homepage/WhyChooseUs";
import UserReviews from "@/components/homepage/userReviews";
import PremiumCTA from "@/components/homepage/PremiumCTA";


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




