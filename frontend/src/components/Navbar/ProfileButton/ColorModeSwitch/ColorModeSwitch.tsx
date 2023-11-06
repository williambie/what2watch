import { HStack, Switch, Text, useColorMode } from "@chakra-ui/react";

// ColorModeSwitch is a switch that allows the user to change the color mode of the application
const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  // The color mode switch is displayed on the navbar
  return (
    <HStack>
      <Switch isChecked={colorMode === "dark"} onChange={toggleColorMode} />
      <Text>{`${colorMode.charAt(0).toUpperCase()}${colorMode.slice(
        1,
      )} Mode`}</Text>
    </HStack>
  );
};

export default ColorModeSwitch;
