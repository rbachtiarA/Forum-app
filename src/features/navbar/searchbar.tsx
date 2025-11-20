"use client";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { SearchIcon } from "lucide-react";
import { FormEvent } from "react";

export default function Searchbar() {
  const handleOnSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    alert("hello");
  };

  return (
    <div className="md:flex items-center flex-row gap-8 hidden">
      <form>
        <ButtonGroup className="focus-within:ring-2 ring-accent ring-offset-2 rounded-md">
          <input
            type="text"
            className="bg-background rounded-md focus:outline-0 px-2 placeholder:text-muted-foreground"
            placeholder="Search..."
          />
          <Button type="submit" size={"icon-lg"} onSubmit={handleOnSubmit}>
            <SearchIcon />
          </Button>
        </ButtonGroup>
      </form>
    </div>
  );
}
