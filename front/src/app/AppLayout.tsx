import { useGetHistoryQuery } from "@modules/hitsory/api/useGetHistoryQuery";
import { useHistoryStore } from "@modules/hitsory/store";
import { ExitIcon } from "@radix-ui/react-icons";
import { ChevronUp, FileIcon, User2 } from "lucide-react";
import { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";

import { PATHS } from "@shared/constants";
import { ThemeSubGroup } from "@shared/theme/ThemeSubGroup";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@shared/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger
} from "@shared/ui/sidebar";
import { Spinner } from "@shared/ui/spinner";

const now = new Date();
const oneDayAgo = new Date();
const oneMonthAgo = new Date();

oneDayAgo.setDate(now.getDate() - 1);
oneMonthAgo.setMonth(now.getMonth() - 1);

export const AppLayout = () => {
  const { data, isLoading } = useGetHistoryQuery({});
  const { setUml, historyData } = useHistoryStore();

  useEffect(() => {
    if (data) setUml(data.data.data);
  }, [data, setUml]);

  const lastDayFiles = historyData.filter((item) => {
    const fileDate = new Date(item.timestamp);
    return fileDate >= oneDayAgo;
  });

  const lastDayFileTitles = new Set(lastDayFiles?.map((file) => file.uid));

  const lastMonthFiles = historyData.filter((item) => {
    const fileDate = new Date(item.timestamp);
    return fileDate >= oneMonthAgo && fileDate < oneDayAgo && !lastDayFileTitles.has(item.uid);
  });

  return (
    <SidebarProvider>
      <Sidebar className='font-medium ' variant='inset'>
        <SidebarHeader className='ml-2'>IgnizAI</SidebarHeader>
        <SidebarContent className='px-2 relative'>
          {isLoading && <Spinner />}
          {data && (
            <SidebarMenu>
              <SidebarGroup>
                <NavLink
                  to='/'
                  className={({ isActive }) =>
                    isActive ? "bg-sidebar-foreground text-background rounded-lg" : ""
                  }
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton>+ Новый файл</SidebarMenuButton>
                  </SidebarMenuItem>
                </NavLink>
              </SidebarGroup>
              <SidebarSeparator />
              <SidebarGroup>
                <SidebarHeader>Последние файлы</SidebarHeader>
                {lastDayFiles.length > 0 ? (
                  lastDayFiles.map((item, index) => (
                    <SidebarMenuItem key={item.summary + index.toString()}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={`${PATHS.MINDMAP}/${item.uid}`}
                          className={({ isActive }) =>
                            isActive ? "bg-sidebar-foreground rounded-lg" : "text-background"
                          }
                        >
                          <FileIcon />
                          <span>{item.summary.slice(0, 20) + "..."}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))
                ) : (
                  <p className='text-center font-normal'>Нет файлов</p>
                )}
              </SidebarGroup>
              <SidebarSeparator />
              <SidebarGroup>
                <SidebarHeader>За последние 30 дней</SidebarHeader>
                {lastMonthFiles.length > 0 ? (
                  lastMonthFiles.map((item) => (
                    <SidebarMenuItem key={item.summary}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={`${PATHS.MINDMAP}/${item.uid}`}
                          className={({ isActive }) =>
                            isActive ? "bg-sidebar-foreground rounded-lg" : "text-background"
                          }
                        >
                          <FileIcon />
                          <span>{item.summary.slice(0, 20) + "..."}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))
                ) : (
                  <p className='text-center font-normal'>Нет файлов</p>
                )}
              </SidebarGroup>
            </SidebarMenu>
          )}
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 /> Username
                    <ChevronUp className='ml-auto' />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side='top' className='w-[--radix-popper-anchor-width]'>
                  <ThemeSubGroup />
                  <DropdownMenuItem>
                    <div className='flex items-center gap-2'>
                      <ExitIcon />
                      <span>Выйти</span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarTrigger className='mt-2 mr-2' />
      <main className='container bg-accent'>
        <div className='flex flex-col m-20 h-max rounded-3xl justify-center bg-background'>
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};
