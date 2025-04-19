"use client";

import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import LanguageSwitcher from "../LanguageSwitcher";
import { ModeToggle } from "../button/ButtonTheme";

export function HumburgerButton() {
  const t = useTranslations();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <GiHamburgerMenu className="w-5 h-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-72 p-4 flex flex-col justify-between">
        <div>
          <SheetHeader>
            <SheetTitle className="text-xl font-bold text-primary mb-4">
              Optima
            </SheetTitle>
          </SheetHeader>

          <nav className="flex flex-col gap-3">
            <Link
              href="/"
              className="text-base font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {t("home")}
            </Link>
            <Link
              href="/package"
              className="text-base font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {t("package")}
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start px-0 text-base font-medium text-muted-foreground hover:text-primary"
                >
                  {t("destination")}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" className="w-56">
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/destination" className="w-full px-2 py-1 text-sm">
                    Destination
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/destination/abu-dhabi" className="w-full px-2 py-1 text-sm">
                    Abu Dhabi
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/destination/dubai" className="w-full px-2 py-1 text-sm">
                    Dubai
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/portfolio"
              className="text-base font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {t("portfolio")}
            </Link>
          </nav>
        </div>

        <SheetFooter className="mt-8">
          <div className="flex items-center justify-between w-full">
            <LanguageSwitcher />
            <ModeToggle />
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
