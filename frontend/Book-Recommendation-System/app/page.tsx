// import { div } from "framer-motion/client";
import { Navbar } from "@/components/navbar";
import AutosuggestInput from "@/components/autoSuggestInput";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <div className="w-9/12 mx-auto my-10">
        <AutosuggestInput/>
      </div>
    </div>
  )
}
