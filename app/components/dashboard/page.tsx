"use client";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">داشبورد فروشنده</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">فروش حضوری امروز</p>
          <p className="text-2xl font-semibold">—</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">سفارشات آنلاین</p>
          <p className="text-2xl font-semibold">—</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">موجودی کل</p>
          <p className="text-2xl font-semibold">—</p>
        </div>
      </div>
    </div>
  );
}
