"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CheckIcon, Circle, PlusCircle } from "lucide-react";

interface MultiSelectProps {
  title?: string;
  options:
    | {
        id: string;
        value: string;
        label?: string;
      }[]
    | undefined;
  selectedItems: {
    id: string;
    value: string;
  }[];
  onChange: (
    val: {
      id: string;
      value: string;
    }[]
  ) => void;
}

function MultiSelect({
  title,
  options,
  selectedItems,
  onChange,
}: MultiSelectProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex w-[200px] p-1 pl-4 rounded-md border min-h-10 h-auto items-center justify-start bg-inherit hover:bg-inherit"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          {title}
          {selectedItems && selectedItems?.length > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedItems && selectedItems.length}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedItems && selectedItems.length > 4 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedItems && selectedItems.length} selected
                  </Badge>
                ) : (
                  options &&
                  options
                    .filter(
                      (option) =>
                        selectedItems &&
                        selectedItems
                          .map((item) => item.value)
                          .includes(option.value)
                    )
                    .map((option) => {
                      if (title !== "colors") {
                        return (
                          <Badge
                            variant="secondary"
                            key={option.value}
                            className="rounded-sm px-1 font-normal"
                          >
                            {option.value}
                          </Badge>
                        );
                      }
                      return (
                        <Badge
                          variant="secondary"
                          key={option.value}
                          className="rounded-full p-2 font-normal"
                          style={{ backgroundColor: option.value }}
                        >
                          {/* {option.value} */}
                        </Badge>
                      );
                    })
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options &&
                options.map((option) => {
                  const isSelected = selectedItems
                    ?.map((i) => i.id)
                    .includes(option.id);
                  return (
                    <CommandItem
                      disabled={false}
                      key={option.value}
                      onSelect={() => {
                        // const newSelectedValues = [...selectedItems, option];
                        if (isSelected) {
                          // selectedValues.delete(option.value);
                          onChange(
                            selectedItems!.filter((i) => i.id !== option.id)
                          );
                        } else {
                          //   selectedValues.add(option.value);
                          onChange([...selectedItems!, option]);
                        }
                      }}
                    >
                      <div
                        className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "opacity-50 [&_svg]:invisible"
                        )}
                      >
                        <CheckIcon className={cn("h-4 w-4")} />
                      </div>

                      <span>{option.label}</span>
                      {title !== "colors" ? (
                        <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                          {option.value}
                        </span>
                      ) : (
                        <div
                          className="ml-auto flex h-4 w-4 items-center justify-center border p-2 rounded-full"
                          style={{ backgroundColor: option.value }}
                        />
                      )}
                    </CommandItem>
                  );
                })}
            </CommandGroup>
            {selectedItems.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      onChange([]);
                    }}
                    className="justify-center text-center"
                  >
                    Clear Values
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
export default MultiSelect;
