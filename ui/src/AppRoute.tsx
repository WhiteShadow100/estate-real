import { Routes, Route, Navigate  } from "react-router-dom";
import Listing from "./routes/listing/Listing";
import NotFound from "./routes/NotFound";
import ListingDetail from "./routes/listing_detail/ListingDetail";


export default function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/listings" replace />} />
      <Route path="/listings" element={<Listing />} />
      <Route path="/listings/:id" element={<ListingDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}