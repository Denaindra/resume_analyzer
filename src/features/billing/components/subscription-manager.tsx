"use client";

import React, { useState } from "react";
import { Sparkles, Calendar, CheckCircle } from "lucide-react";
import { PricingCard } from "./pricing-card";
import { Plan, Invoice } from "../types";
import { Button } from "@/components/ui/button";
import { createCheckoutSession } from "../actions/createCheckoutSession";

interface SubscriptionManagerProps {
  subscription: "Free" | "Pro";
}

const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free Plan",
    price: "$0",
    period: "month",
    description: "Essential resume templates with primary builder options.",
    features: [
      "Access to 3 standard templates",
      "Up to 2 active resume drafts",
      "Basic ATS keywords scanner",
      "Standard PDF download",
    ],
  },
  {
    id: "pro",
    name: "Pro Plan",
    price: "$19",
    period: "month",
    description: "Unlock ultimate AI recommendations and premium builder options.",
    features: [
      "Access to all 15+ premium templates",
      "Unlimited active resume drafts",
      "AI-driven bullet points recommendations",
      "Advanced real-time ATS scoring & analysis",
      "Priority multi-format downloads (PDF, Word)",
      "Premium 24/7 dedicated support",
    ],
    isPopular: true,
  },
];

const INVOICES: Invoice[] = [
  { id: "INV-001", date: "2026-07-10", amount: "$19.00", status: "paid" },
  { id: "INV-002", date: "2026-06-10", amount: "$19.00", status: "paid" },
];

export function SubscriptionManager({ subscription }: SubscriptionManagerProps) {
  const [loading, setLoading] = useState(false);

  const handleDowngrade = async () => {
    setLoading(true);
    try {
      const res = await createCheckoutSession("free");
      if (res.success && res.url) {
        window.location.href = res.url;
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* Current Plan Overview Banner */}
      <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex gap-4 items-start">
          <div className="h-12 w-12 rounded-2xl bg-zinc-950 text-white dark:bg-zinc-50 dark:text-zinc-950 flex items-center justify-center shrink-0">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-zinc-950 dark:text-zinc-50">
              {subscription === "Pro" ? "Pro Plan Active" : "Free Plan Active"}
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              {subscription === "Pro"
                ? "Your subscription renews automatically on August 19, 2026."
                : "Upgrade to premium to access AI optimizations."}
            </p>
          </div>
        </div>

        {subscription === "Pro" && (
          <Button
            onClick={handleDowngrade}
            variant="outline"
            size="sm"
            isLoading={loading}
            className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:border-red-900/50 dark:hover:bg-red-950/30"
          >
            Cancel Subscription
          </Button>
        )}
      </section>

      {/* Pricing Grid */}
      <section className="space-y-6">
        <div>
          <h4 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
            Available Plans
          </h4>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Switch plans anytime. Upgrades are instant, while downgrades take effect next cycle.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {PLANS.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              isCurrentPlan={
                (subscription === "Pro" && plan.id === "pro") ||
                (subscription === "Free" && plan.id === "free")
              }
            />
          ))}
        </div>
      </section>

      {/* Invoice History */}
      {subscription === "Pro" && (
        <section className="space-y-6">
          <div>
            <h4 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
              Billing History
            </h4>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Download invoices and view receipts for transactions.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white overflow-hidden dark:border-zinc-800 dark:bg-zinc-950">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50/50 text-xs font-semibold text-zinc-500 uppercase dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400">
                  <th className="px-6 py-3.5">Invoice ID</th>
                  <th className="px-6 py-3.5">Date</th>
                  <th className="px-6 py-3.5">Amount</th>
                  <th className="px-6 py-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 text-sm dark:divide-zinc-800">
                {INVOICES.map((inv) => (
                  <tr key={inv.id} className="text-zinc-700 dark:text-zinc-300">
                    <td className="px-6 py-4 font-mono font-medium">{inv.id}</td>
                    <td className="px-6 py-4 flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-zinc-400" />
                      {inv.date}
                    </td>
                    <td className="px-6 py-4 font-semibold">{inv.amount}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 px-2 py-0.5 rounded-full text-xs font-medium">
                        <CheckCircle className="h-3 w-3" />
                        Paid
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
