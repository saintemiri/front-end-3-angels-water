import React from "react";
import { Search, ChevronLeft, ChevronRight, ListFilter, X } from "lucide-react";

// Replace with a real fetch to your orders API when it's ready.
const MOCK_ORDERS = [
  { id: "ORD-001", customer: "Jayvee Satoru", address: "699 San Roque...", status: "Pending", total: 150, date: "Today, 09:30 AM" },
  { id: "ORD-002", customer: "Ken Cruise", address: "123 Santo Nino...", status: "Completed", total: 150, date: "Today, 08:14 AM" },
  { id: "ORD-003", customer: "Christina D'arc", address: "123 Santo Nino...", status: "Pending", total: 250, date: "Today, 10:34 AM" },
  { id: "ORD-004", customer: "Astolfo Gian", address: "123 Santo Nino...", status: "Pending", total: 150, date: "Today, 12:30 PM" },
];

const STATUS_FILTERS = ["Pending", "Out for Delivery", "Completed", "Cancelled"];
const PAGE_SIZE = 4;

const STATUS_STYLES = {
  Pending: "bg-[#E3E7FB] text-[#3B4EE0]",
  "Out for Delivery": "bg-[#FDEECB] text-[#B9770E]",
  Completed: "bg-[#D9F7E3] text-[#1C9A4B]",
  Cancelled: "bg-[#FBDADA] text-[#D13F3F]",
};

function StatusBadge({ status }) {
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLES[status] || "bg-[#F3F5F9] text-[#6B7383]"}`}>
      {status}
    </span>
  );
}

function DetailRow({ label, children }) {
  return (
    <div className="flex items-start justify-between gap-6 border-t border-[#EEF0F4] py-3 text-sm first:border-t-0">
      <span className="text-[#8890A6]">{label}</span>
      <span className="text-right font-medium text-[#3A4256]">{children}</span>
    </div>
  );
}

function OrderDetailsModal({ order, onClose }) {
  React.useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-details-title"
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 id="order-details-title" className="text-lg font-semibold text-[#2B3050]">
              Order #{order.id}
            </h2>
            <p className="text-xs text-[#8890A6]">{order.date}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-[#8890A6] hover:bg-[#F3F5F9]"
            aria-label="Close order details"
          >
            <X size={18} />
          </button>
        </div>

        <div>
          <DetailRow label="Customer">{order.customer}</DetailRow>
          <DetailRow label="Address">{order.address}</DetailRow>
          <DetailRow label="Status">
            <StatusBadge status={order.status} />
          </DetailRow>
          <DetailRow label="Total">₱{order.total}</DetailRow>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-md bg-[#1755F5] px-4 py-1.5 text-xs font-semibold text-white hover:opacity-90"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function OrdersSection({ orders = MOCK_ORDERS, totalCount = 24 }) {
  const [query, setQuery] = React.useState("");
  const [activeFilters, setActiveFilters] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [selectedOrder, setSelectedOrder] = React.useState(null);

  const toggleFilter = (status) => {
    setPage(1);
    setActiveFilters((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  const filteredOrders = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return orders.filter((order) => {
      const matchesFilter = activeFilters.length === 0 || activeFilters.includes(order.status);
      const matchesQuery =
        q === "" || order.id.toLowerCase().includes(q) || order.customer.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [orders, activeFilters, query]);

  const pageCount = Math.max(1, Math.ceil(filteredOrders.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const pageOrders = filteredOrders.slice(pageStart, pageStart + PAGE_SIZE);

  const handleAssign = (order) => {
    // TODO: wire this up to your assign-rider flow
    console.log("Assign order", order.id);
  };

  const handleDetails = (order) => {
    setSelectedOrder(order);
  };

  return (
    <div className="px-8 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="relative w-64 opacity-0 pointer-events-none" aria-hidden="true">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setPage(1);
              setQuery(e.target.value);
            }}
            placeholder="Order ID or Customer Name"
            className="w-full rounded-full border border-[#E3E7EF] bg-[#F3F5F9] px-4 py-2 pr-9 text-sm text-[#3A4256] outline-none focus:border-[#1755F5]"
          />
          <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8890A6]" />
        </div>
      </div>

      <div className="mb-5 flex flex-wrap items-center gap-5 rounded-xl bg-[#E3E7FB] px-5 py-3">
        <span className="flex items-center gap-2 text-sm font-semibold text-[#2B3050]">
          <ListFilter size={15} className="text-[#3B4EE0]" /> Status Filter:
        </span>
        {STATUS_FILTERS.map((status) => (
          <label key={status} className="flex cursor-pointer items-center gap-2 text-sm text-[#3A4256]">
            <input
              type="checkbox"
              checked={activeFilters.includes(status)}
              onChange={() => toggleFilter(status)}
              className="h-3.5 w-3.5 accent-[#1755F5]"
            />
            {status}
          </label>
        ))}
      </div>

      <div className="rounded-xl bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-[#E3E7FB] text-[13px] text-[#2B3050]">
              <th className="rounded-tl-xl px-6 py-4 font-semibold">Order ID</th>
              <th className="px-6 py-4 font-semibold">Customer Name</th>
              <th className="px-6 py-4 font-semibold">Address</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Total</th>
              <th className="px-6 py-4 font-semibold">Date</th>
              <th className="rounded-tr-xl px-6 py-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageOrders.map((order) => (
              <tr key={order.id} className="border-t border-[#EEF0F4] text-[#3A4256]">
                <td className="px-6 py-4 font-medium">#{order.id}</td>
                <td className="px-6 py-4">{order.customer}</td>
                <td className="px-6 py-4">{order.address}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-6 py-4">₱{order.total}</td>
                <td className="px-6 py-4">{order.date}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDetails(order)}
                      className="rounded-md border border-[#1755F5] px-4 py-1.5 text-xs font-semibold text-[#1755F5] hover:bg-[#F3F5FF]"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => handleAssign(order)}
                      disabled={order.status === "Completed"}
                      className="rounded-md bg-[#1755F5] px-4 py-1.5 text-xs font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:bg-[#C7CEDD]"
                    >
                      Assign
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {pageOrders.length === 0 && (
              <tr>
                <td colSpan={7} className="py-10 text-center text-[#8890A6]">
                  No orders match your search or filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex items-center justify-between border-t border-[#EEF0F4] px-6 py-4 text-sm text-[#6B7383]">
          <span>
            Showing {filteredOrders.length === 0 ? 0 : pageStart + 1}-
            {Math.min(pageStart + PAGE_SIZE, filteredOrders.length)} of {totalCount} orders
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-[#E3E7EF] bg-white text-[#8890A6] hover:border-[#1755F5] disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Previous page"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              disabled={currentPage === pageCount}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-[#E3E7EF] bg-white text-[#8890A6] hover:border-[#1755F5] disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Next page"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {selectedOrder && (
        <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
    </div>
  );
}
