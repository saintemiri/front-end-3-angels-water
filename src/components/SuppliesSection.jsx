import React, { useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

const STATUS_STYLES = {
  "In Stock": { bg: "#2FAE601A", color: "#2FAE60" },
  "Low Stock": { bg: "#E5943A1A", color: "#E5943A" },
  "Out of Stock": { bg: "#E14D4D1A", color: "#E14D4D" },
  "On Order": { bg: "#1755F51A", color: "#1755F5" },
};

const supplyItems = [
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

export default function SuppliesSection() {
  const [activeFilters, setActiveFilters] = useState(["In Stock"]);
  const [search, setSearch] = useState("");

  const toggleFilter = (status) => {
    setActiveFilters((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const filteredItems = supplyItems.filter((item) => {
    const matchesStatus =
      activeFilters.length === 0 || activeFilters.includes(item.status);
    const matchesSearch =
      search.trim() === "" ||
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.name.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="px-8 py-6">
      {/* Filter row */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <span className="text-sm font-medium text-[#4B5468]">
            Status Filter:
          </span>
          {STATUS_FILTERS.map((status) => (
            <label
              key={status}
              className="flex items-center gap-2 text-sm text-[#4B5468]"
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

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-[#E3E7EF] bg-white">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-[#F3F5F9] text-[11px] uppercase tracking-wide text-[#8890A6]">
              <th className="px-5 py-3 font-medium">Supply ID</th>
              <th className="px-5 py-3 font-medium">Item Name</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Stock Status</th>
              <th className="px-5 py-3 font-medium">Quantity</th>
              <th className="px-5 py-3 font-medium">Unit Price</th>
              <th className="px-5 py-3 font-medium">Actions</th>
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
                  <td className="px-5 py-3 font-medium">{item.id}</td>
                  <td className="px-5 py-3">{item.name}</td>
                  <td className="px-5 py-3 text-[#6B7383]">{item.category}</td>
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
                  <td className="px-5 py-3">
                    <button className="rounded-lg bg-[#1755F5] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#123FC0]">
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

        <div className="flex items-center justify-between border-t border-[#EEF0F4] px-5 py-3 text-xs text-[#8890A6]">
          <span>
            Showing 1-{filteredItems.length} of {supplyItems.length} items
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
    </div>
  );
}
