import { useId, type ChangeEvent } from "react";
import { Card, Flex, Stack, Text, TextInput } from "@sanity/ui";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { set, type StringInputProps, unset } from "sanity";

import {
  formatLucideIconName,
  isLucideIconName,
  lucideIconNames,
} from "@/sanity/lib/lucide-icons";

export function LucideIconInput(props: StringInputProps) {
  const { elementProps, onChange, value } = props;
  const listId = useId();

  const selectedIcon =
    typeof value === "string" && isLucideIconName(value)
      ? (value as IconName)
      : null;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const nextValue = event.currentTarget.value.trim();
    onChange(nextValue ? set(nextValue) : unset());
  }

  return (
    <Stack space={3}>
      <TextInput
        {...elementProps}
        list={listId}
        onChange={handleChange}
        value={value ?? ""}
      />
      <datalist id={listId}>
        {lucideIconNames.map((iconName) => (
          <option key={iconName} value={iconName}>
            {formatLucideIconName(iconName)}
          </option>
        ))}
      </datalist>
      <Card border padding={3} radius={2}>
        <Flex align="center" gap={3}>
          {selectedIcon ? (
            <>
              <DynamicIcon name={selectedIcon} size={18} />
              <Text size={1}>{formatLucideIconName(selectedIcon)}</Text>
            </>
          ) : (
            <Text muted size={1}>
              Enter a Lucide icon name like `mail`, `linkedin`, or `globe`.
            </Text>
          )}
        </Flex>
      </Card>
    </Stack>
  );
}
