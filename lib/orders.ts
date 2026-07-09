import { ProductId } from "./products";

export type OrderType = "order" | "notify";

export interface CartLine {
  productId: ProductId;
  quantity: number;
}

export interface CheckoutInput {
  type: OrderType;
  items: CartLine[];
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  notes: string;
  termsAccepted: boolean;
  marketingOptIn: boolean;
}

export type FieldErrors = Partial<Record<keyof CheckoutInput, string>>;

const PHONE_RE = /^[+()\-.\s\d]{7,20}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CA_POSTAL_RE = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
const US_ZIP_RE = /^\d{5}(-\d{4})?$/;

export function validateCheckout(input: Partial<CheckoutInput>): {
  ok: boolean;
  errors: FieldErrors;
} {
  const errors: FieldErrors = {};
  const isNotify = input.type === "notify";

  if (!isNotify) {
    const items = input.items ?? [];
    const valid =
      items.length > 0 &&
      items.every(
        (l) =>
          l?.productId &&
          Number.isInteger(Number(l.quantity)) &&
          Number(l.quantity) >= 1 &&
          Number(l.quantity) <= 50
      );
    if (!valid) errors.items = "Your box is empty — add a mango box first.";
  }

  if (!input.name || input.name.trim().length < 2) {
    errors.name = "Please enter your full name.";
  }

  if (!input.phone || !PHONE_RE.test(input.phone.trim())) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (input.email && input.email.trim() && !EMAIL_RE.test(input.email.trim())) {
    errors.email = "Please enter a valid email (or leave it blank).";
  }

  if (!isNotify) {
    if (!input.address || input.address.trim().length < 5) {
      errors.address = "Please enter your street address.";
    }
    if (!input.city || input.city.trim().length < 2) {
      errors.city = "Please enter your city.";
    }
    const postal = (input.postalCode ?? "").trim();
    if (!CA_POSTAL_RE.test(postal) && !US_ZIP_RE.test(postal)) {
      errors.postalCode = "Enter a valid postal code (e.g. N9A 1A1).";
    }
  }

  if (!input.termsAccepted) {
    errors.termsAccepted = "You must agree to the Terms & Privacy Policy to continue.";
  }

  return { ok: Object.keys(errors).length === 0, errors };
}

/**
 * Stored order shape. Admin-ready and payment-gateway-ready: totals are
 * always recomputed server-side from the product catalog, and the payment
 * block is where a Stripe PaymentIntent id will live later.
 */
export interface OrderRecord {
  id: string;
  orderNumber: string;
  type: OrderType;
  status: "new" | "waitlisted" | "confirmed" | "out_for_delivery" | "delivered" | "cancelled";
  createdAt: string;
  items: {
    productId: ProductId;
    name: string;
    unit: string;
    unitPriceCad: number;
    quantity: number;
    lineTotalCad: number;
  }[];
  totals: {
    subtotalCad: number;
    deliveryCad: number;
    totalCad: number;
  };
  customer: {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    notes: string;
  };
  consent: {
    terms: { accepted: boolean; acceptedAt: string };
    marketing: { optedIn: boolean; optedInAt: string | null };
  };
  payment: {
    method: "pay_on_confirmation";
    status: "pending";
    stripePaymentIntentId: null;
  };
  source: "website";
}
