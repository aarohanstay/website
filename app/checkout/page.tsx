"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  Tag,
  Lock,
  Calendar,
  Users,
  MapPin,
  Sparkles,
  CreditCard,
  User,
  Check,
  Navigation
} from "lucide-react";
import { HOTEL_INFO, ROOMS } from "@/lib/hotel-data";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CustomDatePicker } from "@/components/custom-date-picker";
import { CustomRoomSelect } from "@/components/custom-room-select";
import { PropertyImageSlider } from "@/components/property-image-slider";

function CheckoutContent() {
  const searchParams = useSearchParams();

  // Selected room or default to Family Cedar Suite
  const roomIdParam = searchParams.get("roomId") || ROOMS[0].id;
  const [selectedRoomId, setSelectedRoomId] = useState(roomIdParam);
  const room = ROOMS.find((r) => r.id === selectedRoomId) || ROOMS[0];

  // Property & Waterfall Image Slideshow with unique image URLs
  const bookingImageSlides = [
    room.image, // 1st: Selected Room Interior
    "/photos_videos/chhoie_waterfall.jpg", // 2nd: Chhoie Waterfall Tirthan Valley
    "/photos_videos/photo_05.jpg", // 3rd: Alpine Haven Bedroom View
    "/photos_videos/chhoie_waterfall_stream.jpg", // 4th: Chhoie Stream Cascade
    "/photos_videos/photo_07.jpg", // 5th: Wooden Balcony Mountain Stream View
  ];

  // Interactive Check-In & Check-Out Dates
  const checkInParam = searchParams.get("checkIn");
  const checkOutParam = searchParams.get("checkOut");

  const [checkIn, setCheckIn] = useState<Date>(() =>
    checkInParam ? new Date(checkInParam) : new Date()
  );
  const [checkOut, setCheckOut] = useState<Date>(() => {
    if (checkOutParam) return new Date(checkOutParam);
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d;
  });

  // Form Guest Info
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  // Voucher state: Default 10% voucher applied
  const [couponCode, setCouponCode] = useState("TIRTHAN10");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; percentage: number } | null>({
    code: "TIRTHAN10",
    percentage: 10,
  });
  const [couponMessage, setCouponMessage] = useState("Default 10% voucher discount pre-applied!");

  // Payment flow state
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  // Dynamic Date & Price Calculations
  const diffTime = Math.max(checkOut.getTime() - checkIn.getTime(), 1000 * 60 * 60 * 24);
  const nights = Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 1);

  const roomSubtotal = room.priceNightly * nights;
  const originalSubtotal = room.originalPriceNightly * nights;
  const totalSavings = originalSubtotal - roomSubtotal;
  const gstTax = Math.round(roomSubtotal * 0.12);

  // 10% Voucher Discount Calculation
  const couponDiscount = appliedCoupon
    ? Math.round((roomSubtotal * appliedCoupon.percentage) / 100)
    : 0;

  const finalTotal = Math.max(roomSubtotal + gstTax - couponDiscount, 0);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const codeUpper = couponCode.trim().toUpperCase();
    if (codeUpper === "TIRTHAN10" || codeUpper === "WELCOME10" || codeUpper === "AAROHAN10") {
      setAppliedCoupon({ code: codeUpper, percentage: 10 });
      setCouponMessage(`Voucher ${codeUpper} successfully applied (10% OFF)!`);
    } else if (codeUpper === "VIP15") {
      setAppliedCoupon({ code: codeUpper, percentage: 15 });
      setCouponMessage(`VIP Voucher ${codeUpper} applied (15% OFF)!`);
    } else {
      setCouponMessage("Invalid or expired voucher code");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponMessage("Voucher removed");
  };

  const handleConfirmPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestPhone.trim() || !guestEmail.trim()) {
      alert("Please fill in your Full Name, Phone Number, and Email Address.");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const generatedRef = "ARH-" + Math.floor(100000 + Math.random() * 900000);
      setBookingRef(generatedRef);
      setBookingConfirmed(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090a0f] text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        {/* SUCCESS PAGE VIEW */}
        {bookingConfirmed ? (
          <div className="max-w-3xl mx-auto my-12 ios-glass p-8 sm:p-12 rounded-3xl border border-amber-500/40 shadow-2xl space-y-8 animate-in fade-in zoom-in-95 duration-300">
            {/* Header Badge */}
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 mx-auto shadow-xl shadow-amber-500/30">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block">
                Booking & Payment Successful
              </span>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white">
                Reservation Confirmed!
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm font-light max-w-md mx-auto">
                We look forward to welcoming you to <strong className="text-white">{HOTEL_INFO.name}</strong>, Tirthan Valley.
              </p>
            </div>

            {/* Reference Card */}
            <div className="p-6 rounded-2xl ios-glass-card border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium block">
                  Booking Reference ID
                </span>
                <span className="text-2xl font-mono font-bold text-amber-300">
                  #{bookingRef}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium block">
                  Payment Status
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                  <Check className="w-3.5 h-3.5" /> PAID (₹{finalTotal.toLocaleString()})
                </span>
              </div>
            </div>

            {/* Summary Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-slate-300 pt-4 border-t border-slate-800">
              <div className="space-y-2">
                <h4 className="font-bold text-white uppercase tracking-wider text-[11px] text-amber-400">
                  Stay & Room Details
                </h4>
                <p><strong className="text-white">Property:</strong> {HOTEL_INFO.name}</p>
                <p><strong className="text-white">Room Category:</strong> {room.name}</p>
                <p><strong className="text-white">Check-In:</strong> {checkIn.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}</p>
                <p><strong className="text-white">Check-Out:</strong> {checkOut.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })} ({nights} Night{nights > 1 ? "s" : ""})</p>
                <p><strong className="text-white">Occupancy:</strong> Up to {room.maxGuests} Guests</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-white uppercase tracking-wider text-[11px] text-amber-400">
                  Guest Contact Info
                </h4>
                <p><strong className="text-white">Guest Name:</strong> {guestName}</p>
                <p><strong className="text-white">Phone:</strong> {guestPhone}</p>
                <p><strong className="text-white">Email:</strong> {guestEmail}</p>
                {specialRequests && <p><strong className="text-white">Requests:</strong> {specialRequests}</p>}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-800">
              <a
                href={HOTEL_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all hover:bg-amber-400 shadow-lg text-center"
              >
                <Navigation className="w-4 h-4 fill-slate-950" />
                <span>Get Directions on Google Maps</span>
              </a>
              <Link
                href="/"
                className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl ios-glass-pill text-slate-200 font-bold text-xs uppercase tracking-wider transition-all hover:bg-slate-800 hover:text-white text-center"
              >
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
        ) : (
          /* CHECKOUT / BOOKING PAGE VIEW */
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Top Bar Security Title */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-white">
                Guest Checkout & Reservation
              </h1>
              <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5" />
                256-Bit SSL Encrypted Direct Booking
              </div>
            </div>

            {/* Main Grid: Left (Property & Interactive Date Selector) | Right (Billing & Payment) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* LEFT COLUMN: Property Info, Interactive Room & Date Selector */}
              <div className="lg:col-span-7 space-y-8">
                {/* Property Animated Image Slider Banner */}
                <div className="ios-glass p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
                  <PropertyImageSlider
                    images={bookingImageSlides}
                    badgeText={room.discountBadge}
                    companyText={HOTEL_INFO.company}
                    titleText={room.name}
                  />

                  {/* Interactive Room Category & Date Selector Panel */}
                  <div className="p-5 rounded-2xl ios-glass-card border border-amber-500/30 space-y-4">
                    <h4 className="text-xs uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      Modify Stay Room & Dates
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {/* Room Select */}
                      <CustomRoomSelect
                        value={selectedRoomId}
                        onChange={(id) => setSelectedRoomId(id)}
                      />

                      {/* Check-In */}
                      <CustomDatePicker
                        label="Check-In"
                        selectedDate={checkIn}
                        onSelectDate={(date) => {
                          setCheckIn(date);
                          if (checkOut && date >= checkOut) {
                            setCheckOut(new Date(date.getTime() + 24 * 60 * 60 * 1000));
                          }
                        }}
                      />

                      {/* Check-Out */}
                      <CustomDatePicker
                        label="Check-Out"
                        selectedDate={checkOut}
                        onSelectDate={(date) => setCheckOut(date)}
                        minDate={checkIn ? new Date(checkIn.getTime() + 24 * 60 * 60 * 1000) : new Date()}
                      />
                    </div>
                  </div>

                  {/* Property Highlights */}
                  <div className="space-y-4 text-xs text-slate-300">
                    <p className="leading-relaxed font-light">
                      {room.description}
                    </p>

                    <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl ios-glass-card border border-white/5 text-center">
                      <div>
                        <Users className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                        <span className="font-semibold text-white block">{room.maxGuests} Members</span>
                        <span className="text-[10px] text-slate-500">Max Capacity</span>
                      </div>
                      <div>
                        <Calendar className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                        <span className="font-semibold text-white block">{nights} Night{nights > 1 ? "s" : ""}</span>
                        <span className="text-[10px] text-slate-500">Duration</span>
                      </div>
                      <div>
                        <MapPin className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                        <span className="font-semibold text-white block">Tirthan River</span>
                        <span className="text-[10px] text-slate-500">Gushaini, HP</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Included Amenities & Privileges */}
                <div className="ios-glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
                  <h3 className="text-base font-serif font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    Included Privileges & Room Amenities
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-xs text-slate-200">
                    {room.amenities.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-3 rounded-xl ios-glass-pill border border-white/5">
                        <Check className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Guest Details, Voucher Code & Billing Summary */}
              <div className="lg:col-span-5 space-y-6">
                <form onSubmit={handleConfirmPayment} className="space-y-6">
                  {/* Guest Details Card */}
                  <div className="ios-glass p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
                    <h3 className="text-base font-serif font-bold text-white flex items-center gap-2">
                      <User className="w-4 h-4 text-amber-400" />
                      Primary Guest Contact Details
                    </h3>

                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium mb-1 block">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          placeholder="e.g. Monu Rathor"
                          className="w-full bg-slate-900/90 text-white px-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-500/60"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium mb-1 block">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            required
                            value={guestPhone}
                            onChange={(e) => setGuestPhone(e.target.value)}
                            placeholder="+91 98765 43210"
                            className="w-full bg-slate-900/90 text-white px-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-500/60"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium mb-1 block">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={guestEmail}
                            onChange={(e) => setGuestEmail(e.target.value)}
                            placeholder="yourname@email.com"
                            className="w-full bg-slate-900/90 text-white px-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-500/60"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium mb-1 block">
                          Special Requests (Optional)
                        </label>
                        <input
                          type="text"
                          value={specialRequests}
                          onChange={(e) => setSpecialRequests(e.target.value)}
                          placeholder="e.g. Late check-in, river-facing room, airport pickup..."
                          className="w-full bg-slate-900/90 text-white px-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-500/60"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Voucher Code Section (10% OFF) */}
                  <div className="ios-glass p-6 rounded-3xl border border-amber-500/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5" />
                        Voucher & Promotional Discount
                      </h4>
                      {appliedCoupon && (
                        <span className="text-[10px] text-emerald-400 font-bold uppercase bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                          {appliedCoupon.percentage}% OFF Applied
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter Voucher Code (e.g. TIRTHAN10)"
                        className="flex-1 bg-slate-900/90 text-xs text-white uppercase tracking-wider px-3.5 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-500/50"
                      />
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        className="bg-amber-500 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-amber-400 transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>

                    {couponMessage && (
                      <div className="flex items-center justify-between text-[11px]">
                        <span className={appliedCoupon ? "text-emerald-400 font-medium" : "text-amber-400"}>
                          {couponMessage}
                        </span>
                        {appliedCoupon && (
                          <button
                            type="button"
                            onClick={handleRemoveCoupon}
                            className="text-slate-500 hover:text-slate-300 underline text-[10px]"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Billing Summary Box */}
                  <div className="ios-glass p-6 sm:p-8 rounded-3xl border border-amber-500/40 shadow-2xl space-y-4">
                    <h3 className="text-base font-serif font-bold text-white border-b border-slate-800 pb-3">
                      Billing Breakdown
                    </h3>

                    <div className="space-y-2.5 text-xs text-slate-300">
                      <div className="flex justify-between">
                        <span>Room Rate ({nights} Night{nights > 1 ? "s" : ""} × ₹{room.priceNightly.toLocaleString()})</span>
                        <span className="font-semibold text-white">₹{roomSubtotal.toLocaleString()}</span>
                      </div>

                      <div className="flex justify-between text-slate-400">
                        <span>Original Price</span>
                        <span className="line-through">₹{originalSubtotal.toLocaleString()}</span>
                      </div>

                      <div className="flex justify-between text-amber-400 font-medium">
                        <span>Seasonal Room Discount (25% OFF)</span>
                        <span>-₹{totalSavings.toLocaleString()}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>GST & Resort Taxes (12%)</span>
                        <span>₹{gstTax.toLocaleString()}</span>
                      </div>

                      {appliedCoupon && (
                        <div className="flex justify-between text-emerald-400 font-bold pt-1">
                          <span>Voucher Discount ({appliedCoupon.code} - {appliedCoupon.percentage}%)</span>
                          <span>-₹{couponDiscount.toLocaleString()}</span>
                        </div>
                      )}

                      <div className="pt-3 border-t border-slate-800 flex justify-between items-end">
                        <div>
                          <span className="text-sm font-bold text-white block">Total Amount</span>
                          <span className="text-[10px] text-slate-500">Taxes & 10% Voucher Included</span>
                        </div>
                        <span className="text-2xl font-serif font-bold text-amber-300">
                          ₹{finalTotal.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Final CTA Button */}
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider py-4 rounded-2xl shadow-xl shadow-amber-500/25 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer disabled:opacity-50 mt-4 border border-amber-300/30"
                    >
                      {isProcessing ? (
                        <span className="animate-pulse">Processing Payment Gateway...</span>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4 fill-slate-950" />
                          <span>Proceed to Pay ₹{finalTotal.toLocaleString()}</span>
                        </>
                      )}
                    </button>

                    <p className="text-[10px] text-slate-500 text-center font-light">
                      🔒 Secure checkout simulation. Payment Gateway integrations (Razorpay, PhonePe, UPI) ready for production keys.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#090a0f] text-slate-100 flex items-center justify-center">
        <div className="text-center text-amber-400 text-xs font-semibold animate-pulse">
          Loading Checkout...
        </div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
