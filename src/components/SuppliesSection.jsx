import React, { useState } from "react";
import { Search, ChevronLeft, ChevronRight, X } from "lucide-react";

const STATUS_STYLES = {
  "In Stock": { bg: "#2FAE601A", color: "#2FAE60" },
  "Low Stock": { bg: "#E5943A1A", color: "#E5943A" },
  "Out of Stock": { bg: "#E14D4D1A", color: "#E14D4D" },
  "On Order": { bg: "#1755F51A", color: "#1755F5" },
};

const INITIAL_SUPPLY_ITEMS = [
  {
    id: "#SUP-001",
    name: "5-Gal Slim Blue Container",
    category: "Containers",
    status: "In Stock",
    qty: "342 pcs",
    price: "₱185.00",
  },
  {
    id: "#SUP-002",
    name: "Non-Spill Caps (55mm)",
    category: "Consumables",
    status: "Low Stock",
    qty: "120 pcs",
    price: "₱1.20",
  },
  {
    id: "#SUP-003",
    name: 'Sediment Filter 5-Micron 20"',
    category: "Filtration",
    status: "In Stock",
    qty: "45 pcs",
    price: "₱220.00",
  },
  {
    id: "#SUP-004",
    name: "Heat Shrink Seal Bands",
    category: "Seals",
    status: "In Stock",
    qty: "420 pcs",
    price: "₱0.45",
  },
  {
    id: "#SUP-005",
    name: "Activated Carbon Block CTO",
    category: "Filtration",
    status: "Low Stock",
    qty: "8 pcs",
    price: "₱420.00",
  },
];

const STATUS_FILTERS = ["In Stock", "Low Stock", "Out of Stock", "On Order"];

function RestockModal({ item, onClose, onSave }) {
  const [form, setForm] = useState({
    quantity: "",
    cost: "",
    supplier: "ClearSpring Supplies",
    invoice: "",
  });

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleChange = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({
      quantity: Number(form.quantity),
      cost: Number(form.cost),
      supplier: form.supplier.trim(),
      invoice: form.invoice.trim(),
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="restock-title"
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h2 id="restock-title" className="text-lg font-semibold text-[#2B3050]">
              Restock {item.name}
            </h2>
            <p className="mt-1 text-xs text-[#8890A6]">
              Enter the delivery and invoice details.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-[#8890A6] hover:bg-[#F3F5F9]"
            aria-label="Close restock form"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-medium text-[#3A4256]">
            Quantity
            <input
              required
              type="number"
              min="1"
              step="1"
              value={form.quantity}
              onChange={handleChange("quantity")}
              className="mt-1.5 w-full rounded-lg border border-[#E3E7EF] px-3 py-2 text-sm outline-none focus:border-[#1755F5]"
            />
          </label>
          <label className="block text-sm font-medium text-[#3A4256]">
            Restock cost (₱)
            <input
              required
              type="number"
              min="0.01"
              step="0.01"
              value={form.cost}
              onChange={handleChange("cost")}
              className="mt-1.5 w-full rounded-lg border border-[#E3E7EF] px-3 py-2 text-sm outline-none focus:border-[#1755F5]"
            />
          </label>
          <label className="block text-sm font-medium text-[#3A4256]">
            Supplier name
            <input
              required
              value={form.supplier}
              onChange={handleChange("supplier")}
              className="mt-1.5 w-full rounded-lg border border-[#E3E7EF] px-3 py-2 text-sm outline-none focus:border-[#1755F5]"
            />
          </label>
          <label className="block text-sm font-medium text-[#3A4256]">
            Invoice number
            <input
              required
              value={form.invoice}
              onChange={handleChange("invoice")}
              placeholder="e.g. INV-2026-001"
              className="mt-1.5 w-full rounded-lg border border-[#E3E7EF] px-3 py-2 text-sm outline-none focus:border-[#1755F5]"
            />
          </label>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-[#E3E7EF] px-4 py-2 text-xs font-semibold text-[#6B7383] hover:bg-[#F3F5F9]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-[#1755F5] px-4 py-2 text-xs font-semibold text-white hover:bg-[#123FC0]"
            >
              Save restock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function SuppliesSection() {
  const [items, setItems] = useState(INITIAL_SUPPLY_ITEMS);
  const [activeFilters, setActiveFilters] = useState(["In Stock"]);
  const [search, setSearch] = useState("");
  const [restockingItem, setRestockingItem] = useState(null);
  const [restockNotice, setRestockNotice] = useState("");

  const toggleFilter = (status) => {
    setActiveFilters((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const filteredItems = items.filter((item) => {
    const matchesStatus =
      activeFilters.length === 0 || activeFilters.includes(item.status);
    const matchesSearch =
      search.trim() === "" ||
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.name.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleRestock = (details) => {
    const quantity = Number.parseInt(restockingItem.qty, 10) || 0;
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === restockingItem.id
          ? {
              ...item,
              qty: `${quantity + details.quantity} pcs`,
              status: "In Stock",
            }
          : item
      )
    );
    setRestockNotice(
      `Restock recorded for ${restockingItem.name}: ${details.quantity} pcs at ₱${details.cost.toFixed(2)} from ${details.supplier} (Invoice ${details.invoice}).`
    );
    setRestockingItem(null);
  };

  return (
    <div className="px-8 py-6">
      {restockNotice && (
        <div
          className="mb-4 flex items-center justify-between gap-4 rounded-lg border border-[#BDE8CE] bg-[#F0FBF4] px-4 py-3 text-sm text-[#237A43]"
          role="status"
        >
          <span>{restockNotice}</span>
          <button
            type="button"
            onClick={() => setRestockNotice("")}
            className="shrink-0 rounded p-1 hover:bg-[#DDF5E6]"
            aria-label="Dismiss restock confirmation"
          >
            <X size={16} />
          </button>
        </div>
      )}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-5">
          <span className="text-sm font-medium text-[#4B5468]">
            Status Filter:
          </span>
          {STATUS_FILTERS.map((status) => (
            <label
              key={status}
              className="flex items-center gap-2 text-sm text-[#4B5468] cursor-pointer"
            >
              <input
                type="checkbox"
                checked={activeFilters.includes(status)}
                onChange={() => toggleFilter(status)}
                className="h-4 w-4 rounded border-[#C7CEDD] accent-[#1755F5]"
              />
              {status}
            </label>
          ))}
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-[#E3E7EF] bg-white px-3 py-2 text-sm text-[#8890A6]">
          <Search size={15} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Supply ID or Item Name..."
            className="w-56 bg-transparent text-[#1B2130] outline-none placeholder:text-[#8890A6]"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#E3E7EF] bg-white">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[800px] table-fixed text-left text-sm">
            <thead>
              <tr className="bg-[#F3F5F9] text-[11px] uppercase tracking-wide text-[#8890A6]">
                <th className="w-[15%] px-5 py-3 font-medium">Supply ID</th>
                <th className="w-[28%] px-5 py-3 font-medium">Item Name</th>
                <th className="w-[15%] px-5 py-3 font-medium">Category</th>
                <th className="w-[15%] px-5 py-3 font-medium">Stock Status</th>
                <th className="w-[10%] px-5 py-3 font-medium">Quantity</th>
                <th className="w-[10%] px-5 py-3 font-medium">Unit Price</th>
                <th className="w-[12%] px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => {
                const style = STATUS_STYLES[item.status];
                return (
                  <tr
                    key={item.id}
                    className="border-t border-[#EEF0F4] text-[#3A4256]"
                  >
                    <td className="px-5 py-3 font-medium whitespace-nowrap">{item.id}</td>
                    <td className="px-5 py-3 truncate" title={item.name}>{item.name}</td>
                    <td className="px-5 py-3 text-[#6B7383] truncate">{item.category}</td>
                    <td className="px-5 py-3">
                      <span
                        className="inline-flex rounded-full px-2.5 py-1 text-xs font-medium"
                        style={{ backgroundColor: style.bg, color: style.color }}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">{item.qty}</td>
                    <td className="px-5 py-3">{item.price}</td>
                    <td className="px-5 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => {
                          setRestockNotice("");
                          setRestockingItem(item);
                        }}
                        className="rounded-lg bg-[#1755F5] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#123FC0] whitespace-nowrap"
                      >
                        Restock
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filteredItems.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-8 text-center text-sm text-[#8890A6]"
                  >
                    No supplies match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-[#EEF0F4] px-5 py-3 text-xs text-[#8890A6]">
          <span>
            Showing 1-{filteredItems.length} of {items.length} items
          </span>
          <div className="flex items-center gap-2">
            <button className="rounded-md border border-[#E3E7EF] p-1 hover:bg-[#F3F5F9]">
              <ChevronLeft size={14} />
            </button>
            <button className="rounded-md border border-[#E3E7EF] p-1 hover:bg-[#F3F5F9]">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
      {restockingItem && (
        <RestockModal
          item={restockingItem}
          onClose={() => setRestockingItem(null)}
          onSave={handleRestock}
        />
      )}
    </div>
  );
}
