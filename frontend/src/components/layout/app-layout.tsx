import Sidebar from "./sidebar";
import Header from "./header";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#F7F7F7]">
      
      {/* SIDEBAR (FIXED) */}
      <div className="w-[260px] flex-shrink-0">
        <Sidebar />
      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* HEADER */}
        <Header />

        {/* SCROLLABLE CONTENT */}
        <main className="flex-1 overflow-y-auto px-6 py-6 bg-[#F7F7F7]">
          <div className="max-w-[1200px] mx-auto">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}