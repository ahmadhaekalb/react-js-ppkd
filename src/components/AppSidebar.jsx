import { Home, Settings, Users, DoorOpen, ShoppingBasket, Apple, List } from "lucide-react";
import { Link } from "react-router-dom";

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
const handleLogout = () =>
{
  // Jalankan fungsi logout Anda (misal: clear token, signOut(), atau redirect)

  localStorage.removeItem("token");
  window.location.href = "/login";
};
// Menu navigasi utama
const items = [
  { title: "Home", url: "#", icon: Home },
  { title: "Order", url: "/transaction", icon: ShoppingBasket },
  { title: "Product", url: "/product", icon: Apple },
  { title: "Category", url: "/category", icon: List },
  { title: "User", url: "/user", icon: Users },
  { title: "Settings", url: "#", icon: Settings },
  { title: "Logout", url: "#", icon: DoorOpen },
];

export function AppSidebar()
{
  return (
    <Sidebar collapsible="icon">
      {/* Header Aplikasi / Logo */}
      <SidebarHeader>
        <div className="flex items-center gap-2 py-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">A</div>
          <div className="flex min-w-0 flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold">Halo!</span>
            <span className="text-xs text-muted-foreground">Selamat Datang</span>
          </div>
        </div>
      </SidebarHeader>

      {/* Menu / Navigasi Utama */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Navigasi</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton tooltip={item.title} render={<Link to={item.url} />}>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Bagian Bawah / Profil User */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            {/* <DropdownMenu>
              <DropdownMenuTrigger>
                <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                  <User2 />
                  <span className="font-medium">John Doe</span>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}