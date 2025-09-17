"use client";

import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

const howItWorksSteps = [
  {
    quote:
      "Sign up for an account to access our secure platform. We use advanced encryption to protect your medical data and ensure HIPAA compliance.",
    name: "Step 1",
    title: "Create Account",
  },
  {
    quote:
      "Upload your medical reports and images. We currently support PDF reports, JPEG/PNG scans, and DICOM medical images for analysis.",
    name: "Step 2",
    title: "Upload Files",
  },
  {
    quote:
      "Our AI system analyzes your reports and images, identifying critical values, red flags, and potential areas of concern that need attention.",
    name: "Step 3",
    title: "Instant Analysis",
  },
  {
    quote:
      "Review the automated findings which highlight abnormal results, flag critical values, and identify concerning patterns in your medical data.",
    name: "Step 4",
    title: "Review Findings",
  },
  {
    quote:
      "Use our integrated AI chatbot for instant answers about your reports and analysis results. Get clarity on medical terms and findings.",
    name: "Step 5",
    title: "Chat Support",
  },
];

export function HowItWorks() {
  return (
    <div className="relative py-20 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-black/90">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Start analyzing your medical reports and images with AI-powered insights in minutes
          </p>
        </div>

        {/* Infinite scrolling cards */}
        <div className="py-8">
          <InfiniteMovingCards
            items={howItWorksSteps}
            direction="right"
            speed="slow"
          />
        </div>
      </div>
    </div>
  );
}