import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";

export default function Header() {
  return (
    <header className="flex items-center justify-around h-16 border-b">
      <Link
        className={buttonVariants({
          variant: "ghost",
        })}
        href="/"
      >
        logo
      </Link>
      <div>
        <Link
          className={buttonVariants({
            variant: "default",
          })}
          href="/login"
        >
          Login
        </Link>
        <Link
          className={buttonVariants({
            variant: "ghost",
          })}
          href="/dashboard"
        >
          Dashboard
        </Link>
      </div>
    </header>
  );
}
