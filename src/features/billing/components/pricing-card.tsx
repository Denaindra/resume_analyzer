"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createCheckoutSession } from "../actions/createCheckoutSession";
import { Plan } from "../types";

interface PricingCardProps {
  plan: Plan;
  isCurrentPlan?: boolean;
}

export function PricingCard({ plan, isCurrentPlan }: PricingCardProps) {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const res = await createCheckoutSession(plan.id);
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
    <article
      className={`relative flex flex-col justify-between rounded-3xl border p-8 shadow-sm transition-all duration-300 ${
        plan.isPopular
          ? "border-zinc-900 bg-white dark:border-zinc-50 dark:bg-zinc-950 scale-105 md:scale-105 z-10"
          : "border-zinc-200 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/40 hover:border-zinc-300 dark:hover:border-zinc-700"
      }`}
    >
      {plan.isPopular && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 bg-zinc-950 text-white dark:bg-zinc-50 dark:text-zinc-950 text-[10px] tracking-wider uppercase font-bold px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800">
          Most Popular
        </span>
      )}

      <div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            {plan.name}
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {plan.description}
          </p>
        </div>

        <div className="mt-6 flex items-baseline gap-1">
          <span className="text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50">
            {plan.price}
          </span>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            /{plan.period}
          </span>
        </div>

        <ul className="mt-8 space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <Check className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        {isCurrentPlan ? (
          <Button
            disabled
            className="w-full bg-zinc-100 text-zinc-400 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-600 dark:border-zinc-800"
          >
            Your Current Plan
          </Button>
        ) : (
          <Button
            onClick={handleSubscribe}
            className="w-full"
            variant={plan.isPopular ? "primary" : "outline"}
            isLoading={loading}
          >
            Upgrade to {plan.name}
          </Button>
        )}
      </div>
    </article>
  );
}
