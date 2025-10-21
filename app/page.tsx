import Image from "next/image";
import Pagination from "./components/pagination";
import OTP from "./components/otp";

export default function Home() {
  return (
    <>
      {/* <Pagination></Pagination> */}
      <OTP textLength={4}/>
    </>
  );
}
