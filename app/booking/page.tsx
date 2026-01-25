"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Calendar from "@/components/Calendar";
import BookingForm from "@/components/BookingForm";

function BookingContent() {
  const searchParams = useSearchParams();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [step, setStep] = useState<"calendar" | "form">("calendar");
  const [selectedPackage, setSelectedPackage] = useState<string>("");
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);

  useEffect(() => {
    const packageParam = searchParams.get("package");
    if (packageParam) {
      setSelectedPackage(packageParam);
    }
  }, [searchParams]);

  useEffect(() => {
    if (selectedDate) {
      setIsLoadingSlots(true);
      fetch(`/api/booking?date=${selectedDate.toISOString()}`)
        .then(res => res.json())
        .then(data => {
          setBookedSlots(data.bookedSlots || []);
        })
        .catch(err => console.error("Failed to fetch slots:", err))
        .finally(() => setIsLoadingSlots(false));
    } else {
      setBookedSlots([]);
    }
  }, [selectedDate]);

  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime("");
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      setStep("form");
    }
  };

  const handleBack = () => {
    setStep("calendar");
  };

  return (
    <section className="min-h-screen py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-900 dark:text-white">
          Book a Session
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          Schedule your photography session with us
        </p>

        {selectedPackage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 mb-6 text-center"
          >
            <p className="text-yellow-800 dark:text-yellow-200">
              <span className="font-semibold">Selected Package:</span>{" "}
              {selectedPackage.charAt(0).toUpperCase() +
                selectedPackage.slice(1)}
            </p>
          </motion.div>
        )}

        {step === "calendar" ? (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                Select Date & Time
              </h2>
              <Calendar
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
              />

              {selectedDate && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="mt-6"
                >
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    Available Time Slots
                  </h3>
                  {isLoadingSlots ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                      {timeSlots.map(time => {
                        const isBooked = bookedSlots.includes(time);
                        return (
                          <button
                            key={time}
                            onClick={() => handleTimeSelect(time)}
                            disabled={isBooked}
                            className={`px-4 py-2 rounded border transition-colors ${
                              selectedTime === time
                                ? "bg-black text-white border-black"
                                : isBooked
                                  ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed decoration-slice line-through"
                                  : "hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600"
                            }`}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              )}
            </div>

            {selectedDate && selectedTime && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                  Selected: {selectedDate.toLocaleDateString()} at{" "}
                  {selectedTime}
                </p>
                <button
                  onClick={handleContinue}
                  className="btn btn-primary w-full md:w-auto"
                >
                  Continue to Booking Form
                </button>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <BookingForm
              selectedDate={selectedDate!}
              selectedTime={selectedTime}
              selectedPackage={selectedPackage}
              onBack={handleBack}
            />
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <BookingContent />
    </Suspense>
  );
}
