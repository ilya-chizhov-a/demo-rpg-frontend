import { Badge, Box, Link, Skeleton, Stack, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { useId } from 'react';

import type {
  ExplainerTechnicalSectionId,
} from '../../model/ExplainerWidgetViewModel';
import type { ExplainerDescriptor, ExplainerSubgraph } from '../../model/types';
import type { UiCopy } from 'src/shared/model';
import { CodePanel } from '../CodePanel/CodePanel';

interface ExplainerContentProps {
  readonly copy: UiCopy['explainer'];
  readonly descriptor: ExplainerDescriptor;
  readonly isSectionOpen: (section: ExplainerTechnicalSectionId) => boolean;
  readonly isLoading?: boolean;
  readonly onToggleSection: (section: ExplainerTechnicalSectionId) => void;
  readonly sharedCopy: UiCopy['shared'];
}

export const ExplainerContent = observer(function ExplainerContent({
  copy,
  descriptor,
  isLoading = false,
  isSectionOpen,
  onToggleSection,
  sharedCopy,
}: ExplainerContentProps) {
  const panelIdBase = useId();

  return (
    <>
      <Stack align="flex-start" direction="row" gap="2" wrap="wrap">
        {descriptor.subgraphsInUse.map((subgraph) => (
          <Badge colorPalette={subgraphColorPalette(subgraph)} key={subgraph} variant="subtle">
            {subgraph}
          </Badge>
        ))}
      </Stack>

      <Text color="gray.600" lineHeight="1.5">
        {descriptor.summary}
      </Text>

      <CodePanel
        collapsible
        hideLabel={sharedCopy.codePanelHide}
        isOpen={isSectionOpen('graphql')}
        label="GraphQL"
        meta={descriptor.surfaces.graphql.operationName}
        onToggle={() => onToggleSection('graphql')}
        panelId={`${panelIdBase}-graphql-panel`}
        showLabel={sharedCopy.codePanelShow}
      >
        {descriptor.surfaces.graphql.request}
      </CodePanel>
      {descriptor.surfaces.rest ? (
        <CodePanel
          collapsible
          hideLabel={sharedCopy.codePanelHide}
          isOpen={isSectionOpen('rest')}
          label="REST"
          meta={`${descriptor.surfaces.rest.method} ${descriptor.surfaces.rest.path}`}
          onToggle={() => onToggleSection('rest')}
          panelId={`${panelIdBase}-rest-panel`}
          showLabel={sharedCopy.codePanelShow}
        >
          {descriptor.surfaces.rest.request ?? descriptor.surfaces.rest.path}
        </CodePanel>
      ) : null}
      {descriptor.surfaces.mcp ? (
        <CodePanel
          collapsible
          hideLabel={sharedCopy.codePanelHide}
          isOpen={isSectionOpen('mcp')}
          label="MCP"
          meta={descriptor.surfaces.mcp.toolName}
          onToggle={() => onToggleSection('mcp')}
          panelId={`${panelIdBase}-mcp-panel`}
          showLabel={sharedCopy.codePanelShow}
        >
          {descriptor.surfaces.mcp.request}
        </CodePanel>
      ) : null}
      <CodePanel
        collapsible
        hideLabel={sharedCopy.codePanelHide}
        isOpen={isSectionOpen('variables')}
        label={copy.variables}
        onToggle={() => onToggleSection('variables')}
        panelId={`${panelIdBase}-variables-panel`}
        showLabel={sharedCopy.codePanelShow}
      >
        {JSON.stringify(descriptor.variables, null, 2)}
      </CodePanel>
      {isLoading ? (
        <Box
          aria-label={copy.loadingResponse}
          bg="gray.100"
          borderColor="gray.200"
          borderRadius="md"
          borderWidth="1px"
          minW="0"
          p="3"
        >
          <Skeleton h="4" mb="3" w="120px" />
          <Skeleton h="4" mb="2" />
          <Skeleton h="4" mb="2" />
          <Skeleton h="4" w="70%" />
        </Box>
      ) : (
        <CodePanel
          collapsible
          hideLabel={sharedCopy.codePanelHide}
          isOpen={isSectionOpen('responseSample')}
          label={copy.responseSample}
          onToggle={() => onToggleSection('responseSample')}
          panelId={`${panelIdBase}-response-panel`}
          showLabel={sharedCopy.codePanelShow}
        >
          {JSON.stringify(descriptor.responseSample, null, 2)}
        </CodePanel>
      )}

      {descriptor.localeFallbacks && descriptor.localeFallbacks.length > 0 ? (
        <Box bg="orange.50" borderColor="orange.200" borderRadius="md" borderWidth="1px" p="3">
          <Text color="orange.900" fontSize="sm" fontWeight="bold">
            {copy.localeFallbacks}
          </Text>
          <Stack as="ul" gap="1" listStyleType="none" mt="2" p="0">
            {descriptor.localeFallbacks.map((fallback) => (
              <Text as="li" color="orange.900" fontSize="sm" key={fallback.path}>
                {fallback.path}: {fallback.requestedLocale} -&gt; {fallback.renderedLocale}
              </Text>
            ))}
          </Stack>
        </Box>
      ) : null}

      {descriptor.fieldAttribution && descriptor.fieldAttribution.length > 0 ? (
        <Box bg="blue.50" borderColor="blue.200" borderRadius="md" borderWidth="1px" p="3">
          <Text color="blue.900" fontSize="sm" fontWeight="bold">
            {copy.fieldAttribution}
          </Text>
          <Stack as="ul" gap="1" listStyleType="none" mt="2" p="0">
            {descriptor.fieldAttribution.map((field) => (
              <Text as="li" color="blue.900" fontSize="sm" key={field.path}>
                {field.path}: {field.owningSubgraph}
              </Text>
            ))}
          </Stack>
        </Box>
      ) : null}

      {descriptor.federation ? (
        <Box bg="purple.50" borderColor="purple.200" borderRadius="md" borderWidth="1px" p="3">
          <Text color="purple.900" fontSize="sm" fontWeight="bold">
            {copy.federation}
          </Text>
          <Text color="purple.900" fontSize="sm" mt="1">
            {descriptor.federation.summary}
          </Text>
          <CodePanel
            collapsible
            hideLabel={sharedCopy.codePanelHide}
            isOpen={isSectionOpen('federationSdl')}
            label={copy.federationSdl}
            onToggle={() => onToggleSection('federationSdl')}
            panelId={`${panelIdBase}-federation-panel`}
            showLabel={sharedCopy.codePanelShow}
          >
            {descriptor.federation.sdlExcerpt}
          </CodePanel>
        </Box>
      ) : null}

      <Box bg="white" borderColor="blue.200" borderRadius="md" borderWidth="1px" p="3">
        <Text color="blue.950" fontSize="sm" fontWeight="bold">
          {copy.revisiumCloud}
        </Text>
        <Stack align="flex-start" gap="2" mt="2">
          <Link color="blue.800" href={descriptor.deepLinks.cloudTable} rel="noreferrer" target="_blank">
            {copy.cloudTable}
          </Link>
          {descriptor.deepLinks.cloudSchema ? (
            <Link color="blue.800" href={descriptor.deepLinks.cloudSchema} rel="noreferrer" target="_blank">
              {copy.cloudSchema}
            </Link>
          ) : null}
          {descriptor.deepLinks.cloudRow ? (
            <Link color="blue.800" href={descriptor.deepLinks.cloudRow} rel="noreferrer" target="_blank">
              {copy.cloudRow}
            </Link>
          ) : null}
          {descriptor.deepLinks.openApi ? (
            <Link color="blue.800" href={descriptor.deepLinks.openApi} rel="noreferrer" target="_blank">
              {copy.openApi}
            </Link>
          ) : null}
          {descriptor.deepLinks.mcpTool ? (
            <Link color="blue.800" href={descriptor.deepLinks.mcpTool} rel="noreferrer" target="_blank">
              {copy.mcpTool}
            </Link>
          ) : null}
          {descriptor.deepLinks.federationSdlSource ? (
            <Link color="blue.800" href={descriptor.deepLinks.federationSdlSource} rel="noreferrer" target="_blank">
              {copy.federationSdl}
            </Link>
          ) : null}
        </Stack>
      </Box>

      <Text borderTopColor="gray.200" borderTopWidth="1px" color="gray.600" fontSize="sm" pt="3">
        {descriptor.footerNote}
      </Text>
    </>
  );
});

function subgraphColorPalette(subgraph: ExplainerSubgraph): string {
  if (subgraph === 'cms') return 'orange';
  if (subgraph === 'backend') return 'purple';
  return 'blue';
}
