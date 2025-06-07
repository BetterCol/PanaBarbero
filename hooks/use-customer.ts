import { useEffect, useState } from "react";

import type { CustomerState } from "@polar-sh/sdk/models/components/customerstate.js";

import { customer as polarCustomer } from "@/lib/auth-client";

export function useCustomer() {
  const [customer, setCustomer] = useState<CustomerState | null>(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      const result = await polarCustomer.state();

      if (result) {
        setCustomer(result.data);
      }
    };

    fetchCustomer();
  }, []);

  return customer;
}
