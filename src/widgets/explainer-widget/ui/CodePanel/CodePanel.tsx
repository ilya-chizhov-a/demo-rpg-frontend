import { Box, Text } from '@chakra-ui/react';

interface CodePanelBaseProps {
  readonly children: string;
  readonly label: string;
  readonly meta?: string;
}

interface CollapsibleCodePanelProps extends CodePanelBaseProps {
  readonly collapsible: true;
  readonly hideLabel: string;
  readonly isOpen: boolean;
  readonly onToggle: () => void;
  readonly panelId: string;
  readonly showLabel: string;
}

interface StaticCodePanelProps extends CodePanelBaseProps {
  readonly collapsible?: false;
}

type CodePanelProps = CollapsibleCodePanelProps | StaticCodePanelProps;

interface CodePanelHeaderProps {
  readonly label: string;
  readonly meta?: string;
}

export function CodePanel(props: CodePanelProps) {
  const { children, label, meta } = props;
  const isOpen = props.collapsible ? props.isOpen : true;
  const panelId = props.collapsible ? props.panelId : undefined;
  const panelStyle = getPanelStyle(props.collapsible, isOpen);
  const codeAreaStyle = getCodeAreaStyle(props.collapsible, isOpen);
  const content = (
    <Box
      as="pre"
      fontFamily="mono"
      fontSize="xs"
      id={panelId}
      lineHeight="1.45"
      minH="0"
      overflow="auto"
      overflowWrap="anywhere"
      p="3"
      style={codeAreaStyle}
      whiteSpace="pre-wrap"
    >
      {children}
    </Box>
  );

  return (
    <Box
      bg="gray.100"
      borderColor="gray.200"
      borderRadius="md"
      borderWidth="1px"
      flexShrink="0"
      minW="0"
      overflow="hidden"
      style={panelStyle}
    >
      {props.collapsible ? (
        <Box
          as="button"
          aria-controls={panelId}
          aria-expanded={isOpen}
          alignItems="center"
          appearance="none"
          bg="transparent"
          borderBottomColor={isOpen ? 'gray.200' : 'transparent'}
          borderBottomWidth={isOpen ? '1px' : '0'}
          borderColor="transparent"
          borderRadius="0"
          borderWidth="0"
          color="gray.700"
          cursor="pointer"
          display="flex"
          fontSize="xs"
          fontWeight="normal"
          h="64px"
          justifyContent="space-between"
          lineHeight="1.2"
          minH="64px"
          onClick={props.onToggle}
          px="3"
          py="0"
          w="full"
        >
          <CodePanelHeader label={label} meta={meta} />
          <Text as="span" color="gray.600" flexShrink="0">
            {isOpen ? props.hideLabel : props.showLabel}
          </Text>
        </Box>
      ) : (
        <Box
          alignItems="center"
          borderBottomColor="gray.200"
          borderBottomWidth="1px"
          color="gray.600"
          display="flex"
          fontSize="xs"
          gap="3"
          justifyContent="space-between"
          px="3"
          py="2"
        >
          <CodePanelHeader label={label} meta={meta} />
        </Box>
      )}
      {isOpen ? content : null}
    </Box>
  );
}

function getPanelStyle(isCollapsible: boolean | undefined, isOpen: boolean) {
  if (!isCollapsible) return undefined;
  const height = isOpen ? '340px' : '64px';
  return { height, minHeight: height };
}

function getCodeAreaStyle(isCollapsible: boolean | undefined, isOpen: boolean) {
  if (!isCollapsible || !isOpen) return undefined;
  return { height: '292px', minHeight: '292px' };
}

function CodePanelHeader({ label, meta }: CodePanelHeaderProps) {
  return (
    <Box alignItems="center" display="flex" gap="3" minW="0">
      <Text lineHeight="1.2">{label}</Text>
      {meta ? (
        <Text as="strong" lineHeight="1.2" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
          {meta}
        </Text>
      ) : null}
    </Box>
  );
}
